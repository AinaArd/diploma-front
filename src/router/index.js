import Vue from 'vue'
import Router from 'vue-router'
import Registration from '@/components/Registration'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import UserApps from "@/components/UserApps";
import App from "@/components/App";
import Courses from "@/components/Courses";
import Admin from "@/components/Admin";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/signup',
            name: 'signup',
            component: Registration
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },
        {
            path: '/profile/apps',
            name: 'apps',
            component: UserApps
        },
        {
            path: '/app/:id',
            name: 'app',
            component: App
        },
        {
            path: '/courses',
            name: 'courses',
            component: Courses
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin
        }
    ]
});

export default router
