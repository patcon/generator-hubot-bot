'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-release');

  grunt.initConfig({
    release: {
      options: {
        tagName: 'v<%= version %>',
        commitMessage: 'Prepared to release <%= version %>.'
      }
    },
  });

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['release']);
};
