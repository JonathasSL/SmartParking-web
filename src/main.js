// --- IMPORTS ---
// ~ Third party ~
// Bootstrap
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// GMaps
import * as VueGoogleMaps from 'vue2-google-maps'

// ~ Essentials ~
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import store from './store';

// Root component
import App from './App.vue';

// --- USES ---
Vue.use(BootstrapVue);
Vue.use(VueGoogleMaps, {
	load: {
		key: '',
		libraries: 'places',
		region: 'BR',
		language: 'pt-BR',
	}
});
Vue.use(VueAxios, axios);

// --- CONFIGS ---
// Prevent the production tip on Vue startup
Vue.config.productionTip = false;

const baseUrl = process.env.VUE_APP_API_URL;
if ( typeof baseUrl !== 'undefined')
	Vue.axios.defaults.baseURL = baseUrl;

// --- INITIALIZATION ---
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
