import Vue from 'vue'
import {
  BIconEnvelope,
  BIconArrowLeft,
  CardPlugin,
  ButtonPlugin,
  FormInputPlugin,
  FormCheckboxPlugin,
  LayoutPlugin,
  LinkPlugin,
  NavbarPlugin,
  PaginationPlugin
} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('BIconEnvelope', BIconEnvelope)
Vue.component('BIconArrowLeft', BIconArrowLeft)

Vue.use(ButtonPlugin)
Vue.use(CardPlugin)
Vue.use(FormInputPlugin)
Vue.use(FormCheckboxPlugin)
Vue.use(LayoutPlugin)
Vue.use(LinkPlugin)
Vue.use(NavbarPlugin)
Vue.use(PaginationPlugin)
