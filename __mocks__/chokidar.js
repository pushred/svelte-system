const chokidar = {
  on: jest.fn().mockImplementation(async (_event, callback) => {
    await callback()
    return this
  }),
  watch: jest.fn().mockReturnThis(),
}

module.exports = chokidar
