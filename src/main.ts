import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/router';
import PrimeVue from 'primevue/config';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import './styles/reset.scss';
import 'primevue/resources/themes/lara-light-teal/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.mount('#app');
