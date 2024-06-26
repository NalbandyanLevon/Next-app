module.exports = {
  // compress: true,
  images: {
      remotePatterns: [{
        protocol: "https",
        hostname: 'fakestoreapi.com'
      }]
    }, 
    webpack: (config, { isServer }) => {
        config.module.rules.push({
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'static/images',
                publicPath: '/_next/static/images',
              },
            },
          ],
        }, {
            test: /\.css#/i,
            use: ['style-loader', 'css-loader']
        }, 
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['next/babel'],
            }
          }
        }
);
    
        return config;
      },
}