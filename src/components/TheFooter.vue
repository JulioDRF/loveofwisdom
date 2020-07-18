<template>
  <div id="the-footer">
      <b-navbar
        :type="navBarType"
        :variant="navBarType"
        sticky>
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
      </b-navbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TheFooter',
  computed: {
    ...mapGetters([
      'navBarType'
    ])
  },
  methods: {
  }
}
</script>
