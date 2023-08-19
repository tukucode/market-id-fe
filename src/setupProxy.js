const { createProxyMiddleware } = require('http-proxy-middleware');

const proxyBaseUrl = {
  target: ['production'].includes(process.env.NODE_ENV) ? process.env.REACT_APP_API_BASE_URL : process.env.REACT_APP_API_BASE_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api": "",
  },
}

const proxyWilayah = {
  target:  ['production'].includes(process.env.NODE_ENV) ? process.env.REACT_APP_API_WILAYAH : process.env.REACT_APP_API_WILAYAH,
  changeOrigin: true,
  pathRewrite: {
    "^/api-wilayah": "",
  },
}

module.exports = function(app) {
  app.use('/api', createProxyMiddleware(proxyBaseUrl))
  app.use('/api-wilayah', createProxyMiddleware(proxyWilayah))
};