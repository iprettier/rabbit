const { defineConfig } = require('@vue/cli-service')
const { options } = require('less')

const path = require('path')
const { config } = require('process')
// const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/assets/style/variables'),
        path.join(__dirname, './src/assets/style/mixins.less')
      ]
    }
  },
  lintOnSave: false,
})
