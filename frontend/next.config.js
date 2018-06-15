module.exports = {
  webpack: (config,{dev}) => {
    if(dev){
      config.devtool='cheap-module-source-map'
    }
    config.node = {
      fs: 'empty'
    };
    return config
  }
}
