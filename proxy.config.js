const proxy = [
    {
      context: '/api',
      target: 'https://localhost:5001',
      secure: true,
      //changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {'^/api' : ''}
    }
  ];
  module.exports = proxy;