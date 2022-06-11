import chalk from 'chalk'

export const logger = {
  // modeled after https://github.com/klaussinani/signale (without excess bits)

  /** @param {Error} err} */
  error(err) {
    console.error(chalk.red(`× ${err}`))
    if (!err.stack) return

    console.error(
      chalk.dim(
        err.stack
          .split(/\n/)
          .slice(1)
          .map((s) => `  ${s.trim()}`)
          .join('\n')
      ),
      '\n'
    )
  },

  /** @param {string[]} msgs} */
  warn(...msgs) {
    console.warn(chalk.yellow('▲'), chalk.dim.apply(null, msgs))
  },

  /** @param {string[]} msgs} */
  info(...msgs) {
    console.info(chalk.blue('●'), chalk.dim.apply(null, msgs))
  },

  /** @param {{ [key: string]: unknown }} object} */
  object(object) {
    console.dir(object, { depth: null })
  },

  /** @param {string[]} msgs} */
  success(...msgs) {
    console.info(chalk.green('✔︎'), chalk.dim.apply(null, msgs))
  },

  /** @param {string[]} msgs} */
  wait(...msgs) {
    console.info(chalk.blue('⋯'), ...msgs)
  },
}
