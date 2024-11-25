import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import { Dialog, Quasar } from 'quasar';
import 'quasar/dist/quasar.css';
import '@quasar/extras/material-icons/material-icons.css';
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor';
import Toast from 'vue-toastification';

import keycloak from './keycloak.js';

import 'vue-toastification/dist/index.css';
import { createPinia } from 'pinia';

keycloak.init({ onLoad: 'login-required',
    checkLoginIframe: false,
    pkceMethod: 'S256',
}).then((authenticated) => {
    if (!authenticated) {
        console.error('Failed to authenticate');
        window.location.reload();
    } else {
        setInterval(() => {
            keycloak.updateToken(30).catch(() => {
                console.error('Failed to refresh token');
                keycloak.login();
            });
        }, 10000);

        const app = createApp(App);
        app.use(Quasar, {
            plugins: {
                Dialog,
            },
        });
        app.use(Toast);
        app.use(createPinia());
        app.use(VueMonacoEditorPlugin, {
            languages: ['json'],
            features: [
                'coreCommands',
                'find',
                'format',
                'suggest',
                'quickCommand',
                'quickOutline',
                'quickOutlineBySymbol',
                'quickCommand',
            ],
            theme: 'vs-dark',
            vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs',
        });
        app.use(router);
        app.mount('#app');
    }
}).catch((error) => {
    console.error('Failed to initialize Keycloak', error);
});
