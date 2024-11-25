import {createRouter, createWebHistory} from 'vue-router'

import UserLayout from "@/layouts/UserLayout.vue";
import keycloak from "@/keycloak.js";


const routes= [
    {path: '/auth', name: 'auth', component: () => import('../views/Auth.vue')},
    {path:'/',name:'userLayout' ,component: UserLayout,
        children:[
            {path:'mapper',name:'mapper',component:() => import('../views/Mapper.vue')},
            {path: 'mapping-rules', name: 'mappingRules', component: () => import('../views/MappingRules.vue')},



        ]
   },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (keycloak.authenticated) {
        if (to.path === '/') {
            next({ path: '/mapper' });
        } else {
            next();
        }
    } else {
        keycloak.login().then(r => {
            if (r) {
                next({ path: '/mapper' });
            }
        });
    }
});


export default router;