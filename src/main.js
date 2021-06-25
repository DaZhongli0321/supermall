import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
import router from './router'
import store from './store/index.js'
import Toast from 'components/common/toast/index.js'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
FastClick.attach(document.body)
Vue.prototype.$bus = new Vue()
Vue.use(Toast)
Vue.use(VueLazyLoad)

new Vue({ render: h => h(App), router,store }).$mount('#app')