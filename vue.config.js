const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  css: {
    extract: false, // Para evitar problemas com CSS ao usar a biblioteca
  },
  configureWebpack: {
    output: {
      libraryExport: 'default', // Exportar como padrão para facilitar o uso
    },
  },
})
