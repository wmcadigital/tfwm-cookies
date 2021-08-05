const { src, dest, watch, series, parallel } = require('gulp');
const paths = require('./gulp-tasks/paths');

// SCRIPTS
const lintScripts = require('./gulp-tasks/lint-scripts'); // Lint scripts/JS
const buildScripts = require('./gulp-tasks/build-scripts'); // Minify, and concatenate scripts

// Move HTML file
const moveHTML = () => {
  return src(paths.public.src).pipe(dest(paths.public.output));
};

// Browser
const { startBrowserSync, reload } = require('./gulp-tasks/browser-sync'); // BrowserSync server

// Envs
// const dev = done => {
//   // eslint-disable-next-line no-return-assign
//   return (process.env.NODE_ENV = 'development');
// };

// WATCHERS
function watchFiles() {
  watch(paths.public.src, series(moveHTML, reload));
  // Lint, concat, minify JS then reload server
  watch(paths.scripts.src, series(buildScripts, lintScripts, reload)); // lint and build scripts
}

// const nodeEnv = () => ( === 'development' ? 'development' : 'production');
const serve = series(
  // nodeEnv,
  moveHTML,
  buildScripts,
  lintScripts,
  parallel(watchFiles, startBrowserSync)
);
const build = series(buildScripts, lintScripts);

// Export items to be used in terminal
exports.default = serve;
exports.build = build;
