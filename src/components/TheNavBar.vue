<template>
  <div id="the-nav-bar">
    <b-navbar
      :type="navBarType"
      :variant="navBarType"
      toggleable="md"
      fixed="top">
      <b-navbar-brand class="cursor-pointer" @click="goToHomePage">Love of Wisdom</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="pr-3">
          <b-nav-item to="/about">About</b-nav-item>
          <b-nav-item to="/contact">Contact</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto pr-3 mb-1">
          <b-nav-form>
            <b-form-checkbox
              switch
              size="md"
              @change="toggleDarkMode"
              :checked="darkModeEnabled">
              Dark Mode
            </b-form-checkbox>
          </b-nav-form>
        </b-navbar-nav>
        <b-navbar-nav class="min-w-25">
          <div class="w-100">
            <v-select
              class="nav-vselect"
              placeholder="Jump to an entry"
              label="entryName"
              selectOnTab
              :options="filteredEntries"
              @search="setCurrentSearch"
              @input="goToEntryPage"/>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Fuse from 'fuse.js'

export default {
  name: 'TheNavBar',
  computed: {
    ...mapState([
      'entries',
      'darkModeEnabled'
    ]),
    ...mapGetters([
      'navBarType'
    ]),
    fuse () {
      return new Fuse(this.entries, {
        keys: ['entryName'],
        shouldSort: true,
        threshold: 0.2,
        ignoreLocation: true
      })
    },
    filteredEntries () {
      const result = this.currentSearch.length
        ? this.fuse.search(this.currentSearch).map(({ item }) => item)
        : this.entries
      return result.slice(0, 10)
    }
  },
  data () {
    return {
      currentSearch: ''
    }
  },
  methods: {
    ...mapActions([
      'toggleDarkMode'
    ]),
    goToEntryPage (entry) {
      if (!entry) return
      return this.$router.push({ name: 'entry', params: { id: entry.entryId } })
    },
    goToHomePage () {
      if (this.$route.name === 'home') {
        setTimeout(() => window.scroll(0, 0))
      } else {
        this.$router.push('/')
      }
    },
    setCurrentSearch (search) {
      this.currentSearch = search
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .cursor-pointer {
    cursor: pointer;
  }

  .min-w-25 {
    min-width: 25%;
  }

  .nav-vselect .vs__search,
  .nav-vselect .vs__selected,
  .nav-vselect .vs__search::placeholder,
  .nav-vselect .vs__dropdown-toggle,
  .nav-vselect .vs__dropdown-menu {
    background: var(--bg-color);
    color: var(--text-color);
  }

  .nav-vselect .vs__dropdown-option {
    color: var(--text-color);
  }

  .nav-vselect .vs__clear{
    color: var(--text-color);
  }
</style>
