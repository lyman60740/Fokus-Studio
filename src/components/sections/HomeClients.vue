<template>
    <section class="clientsHome">
        <h2>{{ jsonData.clients.title }}</h2>
        <div class="clientsHome__logoBox">
          <div class="clientsHome__logoBox__item" v-for="(item, index) in jsonData.clients.list" :key="index" :class="item">
                <img :src="getImage(item)" :alt="item" />
            </div>
        </div>
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
      switch (item) {
        case 'Microsoft':
          return microsoftLogo;
        case 'Axa':
          return axaLogo;
          case 'Demooz':
          return demoozLogo;
        case 'Nestlé Waters':
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

<style lang="scss" scoped>
  @import '../../css/variables.scss';
  @import '../../css/global.scss';

  .clientsHome {
    width: 100%;
    &__logoBox {
      width: 100%;
      background: rgba(46, 46, 46, 0.08);
      display: flex;
      justify-content: space-between;
      padding: 50px 10%;
      box-sizing: border-box;
      &__item {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      & img {
        height: 90px;
      }
      & .Microsoft img {
        height: 50px !important;
      }
      & .Demooz img {
        height: 50px !important;
      }
    }
  }
  

</style>