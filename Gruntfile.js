'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: [
        'src/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    watch: {
      test: {
        files: [
          'src/**/*.js',
          'tests/**/*.js',
          'tests/**/*.html'
        ],
        tasks: ['default']
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
    },
    blanket_mocha: {
      test: {
        src: ['tests/**/*.html'],
        options: {
          threshold: 60,
          globalThreshold: 65,
          log: true,
          logErrors: true,
          moduleThreshold: 60,
          modulePattern: './src/'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-blanket-mocha');
  grunt.registerTask('default', ['jshint', 'mocha']);
  grunt.registerTask('coverage', ['blanket_mocha']);
};
