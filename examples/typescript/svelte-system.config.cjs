const { join } = require('node:path')

const config = {
  componentsPath: join(__dirname, 'src', 'components'),
  projectPath: join(__dirname, 'src'),
  stylesheetPath: join(__dirname, 'src', 'system.css'),
  theme: {
    colors: {
      primary: '#ff3e00',
    },
  },
}

module.exports = config
