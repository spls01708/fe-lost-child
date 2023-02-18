module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/admin'
    : '/',
    devServer: {
      host: '127.0.0.1',
      port: 8080,
      public: 'localhost:8080',
      https: true,
    },
}

