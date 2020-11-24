import Vue from 'vue'
import App from './App.vue'
import store from './store'
Vue.config.productionTip = false

import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from 'vuelidate'
import vSelect from 'vue-select'

Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css';

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
