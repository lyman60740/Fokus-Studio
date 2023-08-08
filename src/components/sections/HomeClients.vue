<template>
    <section class="clientsHome">
        <h2>{{ jsonData.clients.title }}</h2>
    </section>
  </template>
  
  <script>
// import { gsap } from 'gsap';
import microsoftLogo from '@/assets/logo/microsoft.svg';
import demoozLogo from '@/assets/logo/demooz.svg';
import axaLogo from '@/assets/logo/axa.svg';
import nestleLogo from '@/assets/logo/nestle.svg';
import warner_brosLogo from '@/assets/logo/warner_bros.svg';


import jsonData from '../../data/home.json';
  export default {
    name: 'HomeClients',
    data() {
    return {
      jsonData,
    };
    },
    methods: {
        getImage(item) {
      // Vous pouvez utiliser un switch ou des conditions pour retourner l'image correcte
      switch (item.title) {
        case 'Microsoft':
          return microsoftLogo;
        case 'Axa':
          return axaLogo;
          case 'Demooz':
          return demoozLogo;
        case 'Nestle Waters':
          return nestleLogo;
          case 'Warner Bros':
          return warner_brosLogo;
        // ... autres cas
        default:
          return null; // ou une image par défaut
      }
    },
    }
    
}
  </script>