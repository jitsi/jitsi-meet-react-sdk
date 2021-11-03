module.exports = {
  "env": {
    "test": {
      presets: [
        ['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-typescript',
      ],
      "plugins": ["transform-export-extensions"],
      "only": [
        "./**/*.js",
        "node_modules/jest-runtime"
      ]
    }
  }
};