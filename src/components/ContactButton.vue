<template>
    <div class="contactButton-box" @mouseover="hoverIn" @mouseleave="hoverOut">
       <div class="cornerLeft">
           <img src="../assets/icons/large_corner.svg" alt="" ref="angleLeft">
       </div>
       <button class="contactButton">Contactez nous</button>
       <div class="cornerRight">
           <img src="../assets/icons/large_corner.svg" alt="" ref="angleRight">
       </div>
    </div>
   </template>
   
   <script>
   import { gsap } from 'gsap';
   export default {
     name: 'ContactButton',
     mounted() {
       this.animations = [
         gsap.to(this.$refs.angleLeft, {
           scale: 0.7,
           duration: 0.5,
           y: -12,
           x: -12,
           paused: true, // Pause l'animation initialement
         }),
         gsap.to(this.$refs.angleRight, {
           scale: 0.7,
           duration: 0.5,
           y: -12,
           x: -12,
           paused: true, // Pause l'animation initialement
         }),
       ];
     },
     methods: {
       hoverIn() {
         this.animations.forEach((animation) => animation.play()); // Joue l'animation
       },
       hoverOut() {
         this.animations.forEach((animation) => animation.reverse()); // Inverse l'animation
       },
     },
   }
   </script>
   
   
   

<style lang="scss" scoped>
    .contactButton-box {
        display: flex;
        justify-content: space-between;
        height: 40px;
        width: 215px;
    }
    .contactButton {
        
        font-weight: bold;
    }
    .cornerRight, .cornerLeft {
        position: relative;
        width: 20px;
        height: 20px;
        will-change: transform;
    }
    .cornerRight {
        transform: rotate(180deg);
        align-self: flex-end;
        & img {
            top: 0;
            left: 0;
        }
    }
    .cornerLeft {
        & img{
            top: 0;
            left: 0;
        }

    }
</style>