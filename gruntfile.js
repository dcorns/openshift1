/**
 * gruntfile.js
 * Created by dcorns on 1/18/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-add-view');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.initConfig({
    add_view: {
      prod:{
        src:  ['app/views/**/*.html'],
        dest: 'app/js/build/views.js'
      },
      dev:{
        src:  ['app/views/**/*.html'],
        dest: 'app/js/build/views.js'
      }
    },
    simplemocha: {
      all: {
        src: ['test/api/**/*.js']
      }
    }
  });
  grunt.registerTask('default','add_view:dev');
  grunt.registerTask('test', 'simplemocha');
};

