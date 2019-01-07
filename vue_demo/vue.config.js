module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
    baseUrl: '//win7killer.github.io/demo_set/vue_demo/dist/',
    indexPath: '../index.html',
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        disableHostCheck: true,
        port: 80,
    }
};
