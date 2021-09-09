import Vue from 'vue'
import App from './app.vue'
import { hello } from './noUse.js'
hello()
new Vue({
  render: h => h(App)
}).$mount('#app')
