const { createProxyMiddleware } = require('http-proxy-middleware');

const proxyBaseUrl = {
  target: 'https://merket-id.vercel.app/api/v1',
  changeOrigin: true,
  pathRewrite: {
    "^/api": "",
  },
}

const proxyWilayah = {
  target: 'http://www.emsifa.com/api-wilayah-indonesia/api',
  changeOrigin: true,
  pathRewrite: {
    "^/api-wilayah": "",
  },
}

module.exports = function(app) {
  app.use('/api', createProxyMiddleware(proxyBaseUrl))
  app.use('/api-wilayah', createProxyMiddleware(proxyWilayah))
};