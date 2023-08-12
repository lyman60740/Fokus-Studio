import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '@/components/HomeView';
import ServiceView from '@/components/ServiceView';
import ContactView from '@/components/ContactView';

const routes = [
  { path: '/', component: HomeComponent },
  { path: '/services/:serviceId', component: ServiceView },
  { path: '/contact', component: ContactView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;