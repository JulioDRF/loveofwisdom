<template>
  <div id="the-footer">
    <b-container fluid>
      <b-row>
        <b-col>
          <ul>
            <li>
              <b-link to="/">Home</b-link>
            </li>
            <li>
              <b-link to="/about">About</b-link>
            </li>
            <li>
              <b-link to="/about">Contact</b-link>
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TheFooter',
  computed: {
    ...mapState([
      'darkModeEnabled'
    ])
  },
  methods: {
  }
}
</script>

<style>
  #the-footer {
    background: var(--bg-color-secondary);
    color: var(--text-color);
  }
</style>
