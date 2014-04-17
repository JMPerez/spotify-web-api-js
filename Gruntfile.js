'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: [
        'spotify-web-api.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    watch: {
      // If you want to watch files and run tests automatically on change
      test: {
        files: [
          'tests/**/*.html',
          '*.js'
        ],
        tasks: ['jshint']
      }
    },
    mocha: {
      test: {
        src: ['tests/**/*.html'],
      },
      options: {
        run: true,
        reporter: 'Nyan'
      }
    }
  });
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['jshint', 'mocha:test']);
};
