import Vue from 'vue'
import App from './App'
import router from './router'
import 'vue-datetime/dist/vue-datetime.css'
import {Datetime} from 'vue-datetime'
import {EagleModal} from 'vue-eagle-modal'
import VueCookie from 'vue-cookie'
import LoadScript from 'vue-plugin-load-script';
import 'bootstrap'

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.component('datetime', Datetime);
Vue.use(EagleModal);
Vue.use(VueCookie);
Vue.use(LoadScript);

App.$cookie = VueCookie;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    router,
    render: h => h(App),
}).$mount('#app');