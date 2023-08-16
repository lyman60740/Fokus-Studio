<template>
    <div class="container">
        <div class="logo" >
            <img src="../assets/logo/logo_favicon_blanc.svg" alt=""  >
            <img src="../assets/logo/logo_titrage_blanc.svg" alt="">
        </div>
        <!-- <span>Un instant</span> -->
    </div>
  </template>
  
  <script>

  export default {
    name: 'LoaderView',
    components: {
      
    },
    methods: {
       
    },
    data() {
      return {
        
      };
    }
  };
  </script>
  
    <style lang="scss" scoped>
    @import '../css/variables.scss';

.container {
    width: 100%;
    height: 100vh;
    background-color: $secondary-color;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & span {
        margin-top: 20px;
        color:$primary-color;
    }
    & img {
        height: 50px;
    }
    & .logo {
        & img:nth-child(1) {
            margin-right: 20px;
            animation: rotateLogo 1s infinite ease-in-out;
        }
        
    }
}
@keyframes rotateLogo {
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(359deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
    </style>
    