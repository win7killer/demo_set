class MyWpPlugin {
    apply(compiler) {
        compiler.hooks.compile.tapAsync('afterEmit', (compilation, callback) => {
            console.log('my plugins go ');

            // 插件要做的事

            callback();
        });
    }
}
