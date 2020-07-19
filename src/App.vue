<template>
  <div id="app" :style="injectedStyle">
    <TheNavBar/>
    <router-view class="router-content"/>
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

html, body, #app {
  min-height: 100%;
}

.router-content {
  min-height: 100vh;
}

#app {
  color: var(--text-color);
  background: var(--bg-color);
  transition-duration: 0.25s;
  transition-timing-function: ease-in;
  font-family: Roboto, Arial, Helvetica, sans-serif;
}

.router-content {
  padding-top: 5rem;
  padding-bottom: 5rem;
}
</style>
