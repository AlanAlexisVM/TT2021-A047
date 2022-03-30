module.exports = {
  devServer: {
    proxy: 'http://localhost:8081'
  },
  publicPath: '',
  pluginOptions: {
    cordovaPath: 'src-cordova'
  }
}
