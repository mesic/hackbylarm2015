module.exports = function(grunt){

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-html-build');


  var config = {
    client_dir: 'client/',
    build_dir: 'client/build/',
    build_dir_js: 'client/build/vendor/',

    app: {
      scss: 'client/src/app.scss'
    },

    vendor_files: {
      js: [
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/bootstrap-sass/assets/javascript/bootstrap.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/chartjs/Chart.js'
      ]
    }
  };

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    config: config,

    clean: ['<%= config.build_dir %>'],

    htmlbuild:{
      dev: {  
        src: 'client/src/index.html',
        dest: 'client/build/',
        options: {
          beautify: true,
          scripts: {
            bundle: [
              '<%= config.build_dir %>vendor/angular.js',
              '<%= config.build_dir %>vendor/angular-route.js',
              '<%= config.build_dir %>vendor/angular-resource.js',              
              '<%= config.build_dir %>vendor/jquery.js',
              '<%= config.build_dir %>vendor/Chart.js',
              '<%= config.build_dir %>app.js',
              '<%= config.build_dir %>assets/*.png',
              'client/build/components/**/*.js'
            ]
          },
          styles: {
            bundle: [
              'client/build/mm-boilerplate.css',
              'client/src/components/home/custom.css'
            ]
          }
        }
      }
    },



    copy: {
      html: {
        files: [
          // {
          //   expand: true,
          //   dest: '<%= config.build_dir %>',
          //   src: '<%= config.client_dir %>index.html',
          //   flatten: true
          // },
          {
            expand: true,
            cwd: '<%= config.client_dir %>/src/',
            src: '**/*.html',
            dest: '<%= config.build_dir %>'
          }
        ]
      },
      app_js: {
        files: [
          {
            expand: true,
            cwd: '<%= config.client_dir %>/src/',
            src: '**/*.js',
            dest: '<%= config.build_dir %>'
          }
        ]
      },
      vendor_js: {
        files: [
          {
            expand: true,
            flatten: true,
            src: '<%= config.vendor_files.js %>',
            dest: '<%= config.build_dir_js %>'
          }
        ]
      }
    },

    sass: {
      dev: {
        outputStyle: 'nested',
        files: {
          '<%= config.build_dir %><%= pkg.name %>.css' : '<%= config.app.scss %>'
        }
      }
    },

    watch: {
      scss: {
        files: '<%= config.client_dir %>src/**/*.scss',
        tasks: ['build'],
        options: {
          livereload: true
        }
      },
      js: {
        files: '<%= config.client_dir %>src/**/*.js',
        tasks: ['build'],
        options: {
          options: {
            livereload: true
          }
        }
      },
      html: {
        files: '<%= config.client_dir %>src/**/*.html',
        tasks: ['build'],
        options: {
          livereload: true
        }
      }
    }



  });

  grunt.registerTask('build', ['clean', 'sass:dev', 'copy:vendor_js',
    'copy:app_js', 'copy:html', 'htmlbuild:dev']);


  grunt.registerTask('default', ['build', 'watch']);

  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });

};
