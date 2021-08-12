/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  alias: {
    '@app': './src',
  },
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: [
    [
      '@snowpack/plugin-typescript',
      {
        /* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
        ...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {}),
      },
    ],
    [
      '@snowpack/plugin-run-script',
      {
        cmd: 'eslint src --ext .js,.jsx,.ts,.tsx',
        // Optional: Use npm package "eslint-watch" to run on every file change
        watch: 'esw -w --clear src --ext .js,.jsx,.ts,.tsx',
      },
    ],
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    entrypoints: ['src/lib/index.ts'],
    bundle: true,
    // loader?: {[ext: string]: Loader},
    sourcemap: 'external',
    splitting: false,
    treeshake: true,
    manifest: false,
    minify: true,
    target: 'es2017',
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
