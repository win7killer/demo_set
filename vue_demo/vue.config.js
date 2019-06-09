module.exports = {
    configureWebpack: {
        devtool: false
    },
    // baseUrl: '//win7killer.github.io/demo_set/vue_demo/dist/',
    baseUrl: '/',
    indexPath: '../index.html',
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        disableHostCheck: true,
        port: 80,
    }
};
