import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import UserLayout from "@/layouts/UserLayout.vue";

const routes= [
    {path:'/user',name:'userLayout' ,component: UserLayout,
        children:[
            {path:'',name:'home',component:Home},
        ]
   },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;