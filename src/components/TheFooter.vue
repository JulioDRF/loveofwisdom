<template>
  <footer
    id="the-footer"
    class="d-none d-sm-block"
  >
    <b-navbar
      :type="navBarType"
      :variant="navBarType"
    >
      <b-navbar-nav class="w-100">
        <b-container fluid>
          <b-row
            align="center"
            class="w-100"
          >
            <b-col md="2">
              <b-nav-item to="/">
                Home
              </b-nav-item>
            </b-col>
            <b-col md="2">
              <b-nav-item to="/about">
                About
              </b-nav-item>
            </b-col>
            <b-col md="2">
              <b-nav-item to="/contact">
                Contact
              </b-nav-item>
            </b-col>
            <b-col md="1">
              <b-nav-item
                target="_blank"
                href="https://github.com/JulioDRF"
              >
                <img src="../assets/svg/github.svg">
              </b-nav-item>
            </b-col>
            <b-col md="1">
              <b-nav-item
                target="_blank"
                href="https://linkedin.com/in/JulioDRF"
              >
                <img src="../assets/svg/linkedin.svg">
              </b-nav-item>
            </b-col>
            <b-col md="1">
              <b-nav-item href="mailto:juliodrangelfarell@gmail.com">
                <b-icon icon="envelope" />
              </b-nav-item>
            </b-col>
            <b-col md="3">
              <b-nav-text>
                Icons made by <a
                  href="https://www.flaticon.com/authors/pixel-perfect"
                  title="Pixel perfect"
                >Pixel perfect</a> from <a
                  href="https://www.flaticon.com/"
                  title="Flaticon"
                > www.flaticon.com</a>
              </b-nav-text>
            </b-col>
          </b-row>
        </b-container>
      </b-navbar-nav>
    </b-navbar>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TheFooter',
  computed: {
    ...mapGetters([
      'navBarType'
    ])
  }
}
</script>
