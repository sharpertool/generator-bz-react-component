import webpack from 'webpack'
import path from 'path'
import webpackMerge from 'webpack-merge'
import BundleTracker from 'webpack-bundle-tracker'

import baseConfig, { paths } from './base.js';
import * as partials from './partials';

export default env => {
    const strategy = {
        plugins: 'append',
        'output.filename': 'replace',
        'output.path': 'replace',
    };

    return webpackMerge.strategy(strategy)(
        baseConfig(env),
        {
            devtool: 'source-map',
            output: {
                path: path.resolve('dist.prod/js'),
                filename: '[name]-[chunkhash].js',
            },
            plugins: [
                // minifies your code
                //new webpack.optimize.UglifyJsPlugin({
                    //sourceMap: true,
                //}),
                // Creates a manifest file that is Django compatible and read by the Django modules
                new BundleTracker({
                    path: path.resolve('dist.prod'),
                    filename: 'webpack-stats.json',
                    logTime: true,
                    indent: 4,
                }),
            ],
        },
        partials.extractCSS({ use: 'css-loader'}),
        partials.loadSCSS({exclude:/node_modules/}),
    );
};
