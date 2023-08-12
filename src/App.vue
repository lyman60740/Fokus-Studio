<template>
  <div>
    <NavBar />
    <router-view></router-view> <!-- Ceci rendra le composant correspondant à la route actuelle -->
    <FooterBloc />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import './css/global.scss'
import './css/variables.scss'
import './css/reset.scss'
import FooterBloc from './components/FooterBloc.vue'
import jsonData from './data/meta.json';

export default {
  name: 'App',
  components: {
    NavBar,
    FooterBloc
  },
  mounted() {
    document.title = jsonData.title;
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', jsonData.description);
  }
}
</script>

<style>



</style>
