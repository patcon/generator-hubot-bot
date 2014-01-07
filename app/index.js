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
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'confirm',
    name: 'someOption',
    message: 'Would you like to enable this option?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;

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
