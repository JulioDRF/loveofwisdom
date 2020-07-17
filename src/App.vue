<template>
  <div id="app" :style="injectedStyle">
    <TheNavBar/>
    <router-view class="nav-padding"/>
    <TheFooter/>
  </div>
</template>

<script>
import TheFooter from '@/components/TheFooter.vue'
import TheNavBar from '@/components/TheNavBar.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    TheFooter,
    TheNavBar
  },
  computed: {
    injectedStyle () {
      const textColor = this.darkModeEnabled ? '#ffffff' : '#313d4f'
      const bgColor = this.darkModeEnabled ? '#222c3c' : '#ffffff'
      const bgColorSecondary = this.darkModeEnabled ? '#343a40' : '#f8f9fa'
      return {
        '--text-color': textColor,
        '--bg-color': bgColor,
        '--bg-color-secondary': bgColorSecondary
      }
    },
    ...mapState([
      'darkModeEnabled'
    ])
  },
  methods: {
    ...mapActions([
      'fetchCategories',
      'fetchEntries'
    ])
  },
  mounted () {
    this.fetchCategories()
    this.fetchEntries()
  }
}
</script>

<style>

html {
  scroll-behavior: smooth;
}

#app {
  color: var(--text-color);
  background: var(--bg-color);
  transition-duration: 0.25s;
  transition-timing-function: ease-in;
  font-family: Roboto, Arial, Helvetica, sans-serif;
}

.nav-padding {
  padding-top: 5rem;
}
</style>
