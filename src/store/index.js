import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'
import constants from './constants.js'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    entries: [],
    categories: [],
    darkModeEnabled: false
  },
  plugins: [
    createPersistedState({
      paths: ['entries', 'categories', 'darkModeEnabled']
    })
  ],
  mutations: {
    SET_ENTRIES (state, payload) {
      state.entries = payload
    },
    SET_CATEGORIES (state, payload) {
      state.categories = payload
    },
    TOGGLE_DARK_MODE (state) {
      state.darkModeEnabled = !state.darkModeEnabled
    }
  },
  actions: {
    fetchEntries ({ commit }) {
      const entries = api.getEntries().sort((a, b) => a.entryName.localeCompare(b.entryName))
      commit(constants.SET_ENTRIES, entries)
    },
    fetchCategories ({ commit }) {
      const categories = api.getCategories().sort((a, b) => a.categoryName.localeCompare(b.categoryName))
      commit(constants.SET_CATEGORIES, categories)
    },
    toggleDarkMode ({ commit }) {
      commit(constants.TOGGLE_DARK_MODE)
    }
  },
  getters: {
    category: state => categoryId => {
      return state.categories.find(c => c.categoryId === categoryId)
    },
    entry: state => entryId => {
      return state.entries.find(e => e.entryId === entryId)
    },
    entriesByIds: state => entryIds => {
      return state.entries.filter(e => entryIds.includes(e.entryId))
    },
    entriesByCategory: state => categoryId => {
      return state.entries.filter(e => e.categoryId === categoryId)
    },
    cardBackgroundVariant: state => {
      return state.darkModeEnabled ? 'dark' : 'light'
    },
    cardTextColor: state => {
      return state.darkModeEnabled ? 'white' : 'black'
    },
    navBarType: state => {
      return state.darkModeEnabled ? 'dark' : 'light'
    }
  }
})
