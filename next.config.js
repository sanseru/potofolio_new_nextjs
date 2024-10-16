/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['lucide-react'],
    // webpack: (config) => {
    //     config.module.rules.push({
    //         test: /\.js$/,
    //         exclude: /node_modules\/react-dom\//, // Exclude react-dom
    //         use: {
    //             loader: 'babel-loader',
    //             options: {
    //                 presets: ['@babel/preset-env'],
    //             },
    //         },
    //     });

    //     return config;
    // },
}

module.exports = nextConfig
