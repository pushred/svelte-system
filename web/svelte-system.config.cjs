const { join } = require('path')

const config = {
  outputPath: join(__dirname, 'src', 'components'),
  theme: {
    space: {
      //0.5: '0.125rem',
      1: '0.25rem',
      //1.5: '0.375rem',
      2: '0.5rem',
    },
  },
}

module.exports = config
