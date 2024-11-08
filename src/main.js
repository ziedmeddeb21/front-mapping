import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import {Quasar} from 'quasar'
import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import {createPinia} from "pinia";

createApp(App)
    .use(Quasar, {
        plugins: {

        } // import Quasar plugins and add here
      })
    .use(Toast)
    .use(createPinia())
    .use(VueMonacoEditorPlugin,{
        languages: ['json'],
        features: ['coreCommands', 'find', 'format', 'suggest', 'quickCommand', 'quickOutline', 'quickOutlineBySymbol', 'quickCommand'],
        theme: 'vs-dark', // The recommended CDN config
         vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs'

    })
    .use(router)
    .mount('#app')
