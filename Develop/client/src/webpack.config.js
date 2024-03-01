const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// Exporting a function that returns webpack configuration
module.exports = () => {
  return {
    // Setting mode to development for development environment
    mode: 'development',
    // Defining entry points for bundling
    entry: {
      main: './src/js/index.js',      // Entry point for main JavaScript file
      install: './src/js/install.js', // Entry point for install JavaScript file
      database: './src/js/database.js', // Entry point for database JavaScript file
      editor: './src/js/editor.js',   // Entry point for editor JavaScript file
      header: './src/js/header.js',   // Entry point for header JavaScript file
    },
    // Configuring output bundle
    output: {
      filename: '[name].bundle.js',    // Output bundle file names will be based on entry points
      path: path.resolve(__dirname, 'dist'), // Output directory for bundled files
    },
    // Adding plugins for additional webpack functionalities
    plugins: [
      // HtmlWebpackPlugin to generate HTML files
      new HtmlWebpackPlugin({
        template: './index.html',       // HTML template file
        title: 'JATE'                   // Title for HTML pages
      }),
      // InjectManifest to generate service worker code
      new InjectManifest({
        swSrc: './src-sw.js',           // Service worker source file
        swDest: 'src-sw.js',            // Service worker destination file
      }),
      // WebpackPwaManifest for generating web app manifest file
      new WebpackPwaManifest({
        fingerprints: false,            // Whether to add fingerprints to generated files
        inject: true,                   // Whether to inject meta tags into HTML
        name: 'Just Another Text Editor', // Name of the web app
        short_name: 'JATE',             // Short name of the web app
        description: 'Just another text editor', // Description of the web app
        background_color: '#225ca3',    // Background color of the web app
        theme_color: '#225ca3',         // Theme color of the web app
        start_url: '/',                 // Start URL of the web app
        publicPath: '/',                // Public path for manifest file
        // Array of icons for different sizes
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Path to the icon image file
            sizes: [96, 128, 192, 256, 384, 512],     // Sizes of the icon
            destination: path.join('assets', 'icons'), // Destination directory for icons
          },
        ],
      }),
    ],
    // Module configuration for webpack
    module: {
      // Rules for processing different types of files
      rules: [
        {
          test: /\.css$/i,              // Rule for CSS files
          use: ['style-loader', 'css-loader'], // Loaders for handling CSS files
        },
        {
          test: /\.m?js$/,              // Rule for JavaScript files
          exclude: /node_modules/,      // Exclude node_modules directory from processing
          use: {
            loader: 'babel-loader',     // Babel loader for transpiling JavaScript
            options: {
              presets: ['@babel/preset-env'], // Babel presets for environment compatibility
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'], // Babel plugins for additional features
            },
          },
        },
      ],
    },
  };
};