const { join } = require('path')

const config = {
  componentsPath: join(__dirname, 'src', 'components'),
  docsPath: join(__dirname, 'docs'),
  projectPath: join(__dirname, 'src'),
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
