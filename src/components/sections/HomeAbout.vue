
<template>
    <section class="aboutHome">
        <img src="../../assets/logo/logo_titrage_noir.svg" alt="">
        <div class="aboutHome__boxContent">
            <div class="aboutHome__boxContent__first">
                <h3></h3>
                <p></p>
                <p></p>
            </div>
        </div>
    </section>
  </template>
  
  <script>
  //TODO: ajouter les données dynamique du json de la section aboutet (boucler pour pouvoir ajouter des paragaphes)
  export default {
    name: 'HomeAbout',
    data() {
    return {
      
    };
    },
//     mounted() {
//     const element = document.querySelector('.aboutHome img');
//     this.$store.dispatch('animateElement', element);
//   },
    methods: {
       
    }
    
}
  </script>

<style lang="scss" >

  .aboutHome {
    & img {
        width: 300px;
    }
  }

</style>