import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import PrimeVue from 'primevue/config';
import './styles/reset.scss';
import 'primevue/resources/themes/lara-light-teal/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.mount('#app');
