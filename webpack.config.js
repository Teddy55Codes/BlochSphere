const path = require('path');

module.exports = {
    entry: './InteractiveBlochSphere.js',
    output: {
        filename: 'interactive-bloch-sphere-packed.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'InteractiveBlochSphere',
        libraryTarget: 'umd', // Universal Module Definition (UMD) exposes the exports
    },
    mode: 'production',
};