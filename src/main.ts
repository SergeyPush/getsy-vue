import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from 'vue-query';
import App from './App.vue';
import router from './router/router';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import ConfirmationService from 'primevue/confirmationservice';
import './styles/reset.scss';

import 'font-awesome/css/font-awesome.min.css';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(ConfirmationService);
app.use(pinia);
app.use(VueQueryPlugin);
app.use(router);

app.mount('#app');
