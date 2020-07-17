const api = {
  getCategories () {
    return require('./data/categories.json')
  },

  getEntries () {
    return require('./data/entries.json')
  }
}

export default api
