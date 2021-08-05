// Gulp requires
const { src, dest } = require('gulp');
const webpack = require('webpack-stream');
// Local requires
const paths = require('./paths');

// Placeholder function for buildScripts to loop through
function minifyJS(jsFile) {
  return src(jsFile.src)
    .pipe(
      webpack({
        config: {
          module: {
            rules: [
              {
                test: /\.m?js$/,
                exclude: [/node_modules/],
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      [
                        '@babel/preset-env',
                        {
                          targets: {
                            browsers: ['ie >= 11']
                          }
                        }
                      ]
                    ]
                  }
                }
              }
            ]
          },

          mode: process.env.NODE_ENV || 'developement', // detemined by buildMode const above
          devtool: 'source-map', // Set a sourcemap for this build
          output: { filename: jsFile.minName } // output name of the bundled js
        }
      })
    )
    .pipe(dest(jsFile.output)); // Spit out concat + minified file in ./build/
}

const minifyingJS = done => {
  paths.scripts.minifySrc.map(jsFile => minifyJS(jsFile));
  done();
};

// Minify, and concatenate scripts
module.exports = minifyingJS;
