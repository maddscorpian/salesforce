const path = require('path');

module.exports = {
    entry: './src/welcome-greeting.js',       // Entry point
    output: {
        filename: 'welcome-greeting.bundle.js', // Output file name
        path: path.resolve(__dirname, 'dist'),  // Output directory
        library: 'WelcomeGreeting',             // Expose as library
        libraryTarget: 'umd',                   // Universal Module Definition
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    },
    mode: 'production',                         // Set to 'production' or 'development'
};
