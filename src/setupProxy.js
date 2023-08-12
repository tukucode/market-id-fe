const { createProxyMiddleware } = require('http-proxy-middleware');

const baseURL = {
  target: 'https://merket-id.vercel.app/api/v1',
  changeOrigin: true,
  pathRewrite: {
    "^/api": "",
  },
}

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware(baseURL)
  );
};