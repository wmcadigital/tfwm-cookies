module.exports = {
  server: {
    port: 8080,
    baseDir: './build/',
    root: './build/'
  },
  public: {
    src: './public/**/*.html',
    output: 'build/'
  },
  scripts: {
    src: ['src/**/*.js'], // Src of JS files to watch
    // List of JS folders to concatenate, lint and minified to one file (DON'T LINT ASSETS AS IT WILL TAKE TOO LONG TO SCAN MINIFIED LIBS)
    minifySrc: [
      {
        src: 'src/js/index.js',
        minName: 'tfwm-cookies.min.js',
        output: 'build/'
      } // Javascript used on the Umbraco website
    ]
  },
  logs: {
    sourcemaps: '_sourcemaps/'
  }
};
