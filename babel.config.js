module.exports = {
    presets: [
        [ '@babel/preset-env' ],
        '@babel/preset-react',
        '@babel/preset-typescript'
    ],
    'plugins': [ 'transform-export-extensions' ],
    'only': [
        './**/*.js',
        'node_modules/jest-runtime'
    ]
};
