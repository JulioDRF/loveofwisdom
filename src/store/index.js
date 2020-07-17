import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'
import constants from './constants.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    entries: [],
    categories: [],
    darkModeEnabled: false
  },
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
      commit(constants.SET_ENTRIES, api.getEntries())
    },
    fetchCategories ({ commit }) {
      commit(constants.SET_CATEGORIES, api.getCategories())
    },
    toggleDarkMode ({ commit }) {
      commit(constants.TOGGLE_DARK_MODE)
    }
  },
  modules: {
  },
  getters: {
    category: state => categoryId => {
      return state.categories.find(c => c.categoryId === categoryId)
    },
    entry: state => entryId => {
      return state.entries.find(e => e.entryId === entryId)
    },
    entriesByIds: state => entryIds => {
      return state.entries.filter(e => entryIds.includes(e.entryId)).sort((a, b) => a.entryName.localeCompare(b.entryName))
    },
    entriesByCategory: state => categoryId => {
      return state.entries.filter(e => e.categoryId === categoryId).sort((a, b) => a.entryName.localeCompare(b.entryName))
    },
    cardBackgroundVariant: state => {
      return state.darkModeEnabled ? 'dark' : 'light'
    },
    cardTextColor: state => {
      return state.darkModeEnabled ? 'white' : 'black'
    }
  }
})
