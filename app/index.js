'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var HubotBotGenerator = module.exports = function HubotBotGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(HubotBotGenerator, yeoman.generators.Base);

HubotBotGenerator.prototype.askFor = function askFor() {
  var cb = this.async(),
    botName = this._.slugify(this.appname),
    userName = this.user.git.username,
    userEmail = this.user.git.email;


  var prompts = [
    {
      name: 'botName',
      message: 'Bot name',
      default: botName
    },
    {
      name: 'botDescription',
      message: 'Description',
      default: 'A simple helpful robot for your Company'
    },
    {
      name: 'botOwner',
      message: 'Owner',
      default: userName+' <'+userEmail+'>'
    }
  ];

  this.prompt(prompts, function (props) {
    this.botName = props.botName;
    this.botDescription = props.botDescription;
    this.botOwner = props.botOwner;

    cb();
  }.bind(this));
};

HubotBotGenerator.prototype.app = function app() {
  this.mkdir('bin');
  this.copy('bin/hubot', 'bin/hubot');
  this.copy('bin/hubot.cmd', 'bin/hubot.cmd');

  this.copy('Procfile', 'Procfile');
  this.copy('README.md', 'README.md');
  this.copy('external-scripts.json', 'external-scripts.json');
  this.copy('hubot-scripts.json', 'hubot-scripts.json');

  this.copy('gitignore', '.gitignore');
  this.copy('_package.json', 'package.json');
};
