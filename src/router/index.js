import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '@/components/HomeView';
import ServiceView from '@/components/ServiceView';
import ContactView from '@/components/ContactView';

const routes = [
  { path: '/', name: 'HomeView',component: HomeComponent },
  { path: '/services/:serviceId', component: ServiceView },
  { path: '/contact', component: ContactView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash }
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 }
    }
  }
});



export default router;