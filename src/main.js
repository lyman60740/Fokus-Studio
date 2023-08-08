import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createMetaManager } from 'vue-meta';

const app = createApp(App);

const metaManager = createMetaManager();
app.use(metaManager);
app.use(router);
app.mount('#app');
