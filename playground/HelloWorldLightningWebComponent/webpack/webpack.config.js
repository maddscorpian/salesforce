const path = require('path');

module.exports = {
    entry: './src/welcome-greeting.js', // Path to your Lit component
    output: {
        filename: 'welcome-greeting.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'WelcomeGreeting', // Name of the global variable
        libraryTarget: 'umd', // Use UMD format
        globalObject: 'this' // Ensure compatibility with different environments
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Use Babel to transpile ES6+ code
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};