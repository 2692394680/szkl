import {createRouter, createWebHashHistory, createWebHistory,RouteRecordRaw} from "vue-router"


const routes:Array<RouteRecordRaw> = [
    { path: "/",redirect: '/test' },

    { path: "/test",name:"Test", component: ()=>import("../views/test.vue") },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router