module.exports = {
  publicPath: '',
  pluginOptions: {
    cordovaPath: 'src-cordova'
  },
  devServer: {
    proxy: 'http://localhost:8081'
  }
}
