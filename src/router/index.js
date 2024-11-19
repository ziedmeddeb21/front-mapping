import {createRouter, createWebHistory} from 'vue-router'

import UserLayout from "@/layouts/UserLayout.vue";


const routes= [
    {path:'/user',name:'userLayout' ,component: UserLayout,
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

export default router;