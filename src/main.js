import { createApp } from 'vue'
import Site from './Site.vue'

import "../node_modules/json-ld-browser/dist/style.css";
import "../node_modules/json-ld-browser/src/assets/main.css";
// import '@json-ld-browser/dist/style.css'

import './assets/main.css'

createApp(Site).mount('#site')
