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

// --- CONFIGS ---
// Prevent the production tip on Vue startup
Vue.config.productionTip = false;

// --- INITIALIZATION ---
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
