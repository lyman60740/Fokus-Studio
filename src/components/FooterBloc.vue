<template>
    <footer class="footer">
      <div class="footer__content">
        <div class="footer__content__left">
          <div class="footer__content__left__logo">
            <img src="../assets/logo/logo_favicon_blanc.svg" alt="">
            <img src="../assets/logo/logo_titrage_blanc.svg" alt="">
          </div>
          <h3 class="footer__content__left__slogan">
            {{ jsonData.slogan  }}
          </h3>
        </div>
        <div class="footer__content__right">
          <ul class="footer__content__right__infos" >
            <li>{{ jsonData.ville }}</li>
            <li>{{ jsonData.region }}</li>
            <li>{{ jsonData.pays }} <img src="../assets/icons/france_flag.svg" alt=""></li>
            <li> <a :href="'mailto:' + jsonData.email"><u>{{ jsonData.email }}</u></a></li>
            <li> <u>{{ jsonData.phone }}</u> </li>
          </ul>
          <ul class="footer__content__right__reseaux" >
            <li>Suivez-nous</li>
            <li>
              <a href="#" target="_blank">
                <span>Instagram</span>
                <img src="../assets/icons/arrow_diag.svg" alt="">
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                <span>Facebook</span>
                <img src="../assets/icons/arrow_diag.svg" alt="">
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                <span>Linkedin</span>
                <img src="../assets/icons/arrow_diag.svg" alt="">
              </a>
            </li>
          </ul>
          <ul class="footer__content__right__nav" >
            <li> <a href="">Nos services</a></li>
            <li> <a href="">L'agence</a> </li>
            <li> <a href="">Contactez-nous</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__credits">
        <span>Fokus Studio 2023. Tous droits réservés <a href=""> <u>Politique de confidentialité</u> </a></span>
        <span>Design et Développement par <a href=""> <u>Lyman Abid</u> </a></span>
      </div>
    </footer>
  </template>
  
  <script>
//   import { gsap } from 'gsap';
import jsonData from '../data/footer.json';

  export default {
    name: 'FooterBloc',
    data() {
      return {
        jsonData
      };
    },
}

  </script>

  <style lang="scss" scoped>
  @import '../css/variables.scss';
  @import '../css/global.scss';
  
  .footer {
    margin-top: 200px !important;
    background: $secondary-color;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    color: $primary-color;
    padding: 70px 70px 35px 70px;
    &__content {
      display: flex;
      &__left {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &__logo{
          & img {
            height: 57px;
          }
        }
        &__slogan {
          color: $primary-color !important;
          margin-bottom: 0;
          font-weight: 400;
        }
      }
      &__right {
        width: 50%;
        display:flex;
        justify-content: space-between;
        &__reseaux {
          & a {
            display: flex;
            align-items: center;
            width: 135px;
            justify-content: space-between;
          }
        }
      }
    }
    &__credits {
      margin-top: 60px;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
  li {
    font-size: $font-size-texte;
    display: flex;
    align-items: center;
  }
  li:not(:last-child) {
    margin-bottom: 15px;
  }
  </style>
  