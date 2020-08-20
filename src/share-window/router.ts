import VueRouter from "vue-router";
import Auth from "@/share-window/components/auth/auth.vue";
import Share from "@/share-window/components/share/share.vue";

export const router = new VueRouter({
    routes: [
        {path: '/auth', component: Auth},
        {path: '/share', component: Share}
    ] // short for `routes: routes`
});