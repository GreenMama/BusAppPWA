// workbox-config.cjs
module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{json,js,css,html,png,jpg,jpeg,gif,svg}'],
  swDest: 'dist/sw.js',
};
