import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'
import constants from './constants.js'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    entries: api.getEntries().sort((a, b) => a.entryName.localeCompare(b.entryName)),
    categories: api.getCategories().sort((a, b) => a.categoryName.localeCompare(b.categoryName)),
    darkModeEnabled: false
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 1 }),
        removeItem: (key) => Cookies.remove(key)
      },
      paths: ['darkModeEnabled']
    })
  ],
  mutations: {
    TOGGLE_DARK_MODE (state) {
      state.darkModeEnabled = !state.darkModeEnabled
    }
  },
  actions: {
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
