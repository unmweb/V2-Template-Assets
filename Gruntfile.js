module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
    	
        pkg: grunt.file.readJSON('package.json'),   
        
        clean: {
  			build: {
    			src: [ 'dist' ]
  			},
		},

		concat: {  
			options : {
			banner: '/*! *** <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */\r\n',
        	separator: '\r\n /*******  *******/ \r\n'
			},
		    dist: {
		        src: [
		        	  'bower_components/jquery/dist/jquery.js', //JQuery
		        	  'bower_components/bootstrap/js/transition.js',
			          'bower_components/bootstrap/js/alert.js',
			          'bower_components/bootstrap/js/button.js',
			          'bower_components/bootstrap/js/carousel.js',
			          'bower_components/bootstrap/js/collapse.js',
			          'bower_components/bootstrap/js/dropdown.js',
			          'bower_components/bootstrap/js/modal.js',			          
			          'bower_components/bootstrap/js/tooltip.js',	
			          'bower_components/bootstrap/js/popover.js',
			          'bower_components/bootstrap/js/scrollspy.js',
			          'bower_components/bootstrap/js/tab.js',			          		          
			          'bower_components/bootstrap/js/affix.js',
			          'src/js/unm-scripts.js', 	
		        ],
		        dest: 'dist/js/unm-scripts.js',
		    }
		},

		'customize-bootstrap': {
    		dist: {
      			options: {
        			src: 'src/bootstrap/',
        			dest: 'src/less/',
      			}
    		},
  		},

        less: {
            dev: {
                options: {
                    paths: ["src/less"],
                    optimization: 99,
                    
                },
                files: {
                    "dist/css/unm-styles.css": [
                    	"bower_components/fontawesome/less/font-awesome.less", // Font Awesome
                    	"src/less/unm-styles.less",  // Bootstrap and UNM Styles in one
                      ],
                    "dist/css/unm-hsc-styles.css": [
                    	"bower_components/fontawesome/less/font-awesome.less", // Font Awesome
                    	"src/less/unm-hsc-styles.less",  // Bootstrap and UNM Styles in one
                      ],                    	
                }
            },

            dist: {
                options: {
                    paths: ["src/less"],
                    cleancss: true,
				//	sourceMap: true,
  			    //  sourceMapFilename: 'unm-styles.css.map',
                },
                files: {
                    "dist/css/unm-styles.min.css": [
                    	"bower_components/fontawesome/less/font-awesome.less", // Font Awesome
                    	"src/less/unm-styles.less",  // Bootstrap and UNM Styles in one
                      ],	
                    "dist/css/unm-hsc-styles.min.css": [
                    	"bower_components/fontawesome/less/font-awesome.less", // Font Awesome
                    	"src/less/unm-hsc-styles.less",  // Bootstrap and UNM Styles in one
                      ],
                }
            }
        },

		csslint: {		
			  	lax: {
			    	options: {
			      		import: false
			    	},
			    	src: ['dist/**/*.css']
		  	}
		},

		uglify: {
		 	options: {
        		//sourceMap: true,
        		//sourceMapName: 'unm-scripts.map'
      		},
 		   dist: {
        		src: 'dist/js/unm-scripts.js',
        		dest: 'dist/js/unm-scripts.min.js'
    		}
		},
		
		copy: {
    	 	dist: {
      			files: [
     				{expand: true, cwd : 'bower_components/fontawesome/fonts/', src: ['**/*'], dest: 'dist/fonts/fontawesome', filter: 'isFile'},
     				{expand: true, cwd : 'bower_components/lato/font/', src: ['**/*'], dest: 'dist/fonts/lato', filter: 'isFile'},
     				{expand: true, cwd : 'src', src: ['**/*.html'], dest: 'dist', filter: 'isFile'},
				]
     		}
   		},

		fontAwesomeVars: {
        	main: {
            	variablesLessPath: 'bower_components/fontawesome/less/variables.less',
            	fontPath: '../fonts/fontawesome/'      //NOTE: this must be relative to FINAL, compiled .css file - NOT the variables.less / _variables.scss file! For example, this would be the correct path if the compiled css file is main.css which is in 'src/build' and the font awesome font is in 'src/bower_components/font-awesome/fonts' - since to get from main.css to the fonts directory, you first go back a directory then go into bower_components > font-awesome > fonts.
        	}
    	},
		
		watch: {
		    styles: {
		        files: ['src/less/*'],
		        tasks: ['less:dev'],
		        options: {
		            spawn: false,
        		},
    		} 
		}		
		

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-font-awesome-vars');
    grunt.loadNpmTasks('grunt-customize-bootstrap');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    
    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.

    grunt.registerTask('default', ['customize-bootstrap', 'fontAwesomeVars', 'concat',  'less', 'copy' ]);
    grunt.registerTask('test', ['default', 'uglify' ]);

};



// Other plugins jshint

