/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('hubot-bot generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('hubot-bot:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            // add files you expect to exist here.
            'bin/hubot',
            'bin/hubot.cmd',
            'Procfile',
            'README.md',
            'external-scripts.json',
            'hubot-scripts.json',
            '.gitignore',
            'package.json'
        ];

        helpers.mockPrompt(this.app, {
            'botName': "botbotbot",
            'botDescription': "Just a bot",
            'botOwner': "Colonel Brownpantsmanship"
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});
