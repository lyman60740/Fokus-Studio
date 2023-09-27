<template>
  <div class="container" v-if="service">
    <h1>Vidéos {{ service.title }}</h1>
    <section class="bloc first">
      <h2 v-show="isMobileView">{{ service.firstBloc.title }}</h2>
      <div
        class="background-image"
        :style="{ 'background-image': `url(${images[service.id][0]})` }"
      ></div>
      <div class="content">
        <h2 v-show="!isMobileView">{{ service.firstBloc.title }}</h2>
        <p v-for="item in service.firstBloc.description" :key="item">
          {{ item }}
        </p>
      </div>
    </section>
    <section class="bloc second">
      <h2 v-show="isMobileView">{{ service.secondBloc.title }}</h2>
      <div
        class="background-image"
        :style="{ 'background-image': `url(${images[service.id][1]})` }"
      ></div>
      <div class="content">
        <h2 v-show="!isMobileView">{{ service.secondBloc.title }}</h2>
        <p v-for="item in service.secondBloc.description" :key="item">
          {{ item }}
        </p>
      </div>
    </section>
    <router-link to="/contact">
      <ContactButton />
    </router-link>
    <div class="otherServices">
      <div class="otherServices__bloc">
        <router-link
          v-for="item in filteredServices"
          :key="item.id"
          :to="`/services/${item.id}`"
          @click="topScroll"
        >
          <div class="otherServices__bloc__item__title">
            <h3>Vidéos {{ item.title }}</h3>
            <svg
              width="26"
              height="24"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 13.5L13 1.5M13 1.5V13.02M13 1.5H1.48"
                stroke="#1B1B1B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import jsonData from "../data/services.json";
import ContactButton from "./ContactButton.vue";
import corporateImage1 from "@/assets/images/corporate_1.png";
import corporateImage2 from "@/assets/images/corporate_2.png";
import culinairesImage1 from "@/assets/images/culinaires_1.png";
import culinairesImage2 from "@/assets/images/culinaires_2.png";
import immobilieresImage1 from "@/assets/images/immobilieres_1.png";
import immobilieresImage2 from "@/assets/images/immobilieres_2.png";
import sportivesImage1 from "@/assets/images/sportives_1.png";
import sportivesImage2 from "@/assets/images/sportives_2.png";
import { useRoute } from "vue-router";
import { computed, watch, ref } from "vue";
import { onMounted, onBeforeUnmount } from "vue";

export default {
  name: "ServiceView",
  setup() {
    const route = useRoute();
    const service = ref(null); // Déplacez la déclaration de service ici

    watch(
      route,
      () => {
        const serviceId = route.params.serviceId;
        service.value = jsonData.services.find((s) => s.id === serviceId);
      },
      { immediate: true }
    ); // L'option immediate garantit que le watch est exécuté lors de l'initialisation

    const filteredServices = computed(() => {
      return jsonData.services.filter(
        (item) => item.id !== route.params.serviceId
      );
    });

    const isTabletView = ref(window.innerWidth < 1250);
    const isMobileView = ref(window.innerWidth < 800);
    const handleResize = () => {
      isTabletView.value = window.innerWidth < 1250;
      isMobileView.value = window.innerWidth < 800;
    };
    onMounted(() => {
      window.scrollTo(0, 0);
      window.addEventListener("resize", handleResize);
      handleResize();
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleResize);
    });
    return {
      route,
      service,
      filteredServices,
      handleResize,
      isTabletView,
      isMobileView,
    };
  },
  components: {
    ContactButton,
  },
  data() {
    return {
      jsonData,
      images: {
        corporate: [corporateImage1, corporateImage2],
        culinaires: [culinairesImage1, culinairesImage2],
        immobilieres: [immobilieresImage1, immobilieresImage2],
        sportives: [sportivesImage1, sportivesImage2],
      },
    };
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    topScroll() {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../css/variables.scss";
@import "../css/global.scss";
.container {
  margin-top: 100px;
}
h1 {
  color: $secondary-color;
  font-size: $font-size-titleSection;
  font-weight: 700;
  margin-bottom: 100px;
  margin-top: 50px;
}

h2 {
  font-size: $font-size-subTitle;
  color: $secondary-color;
  font-weight: 600;
  margin-bottom: 20px;
}
p {
  font-size: $font-size-explainText;
}

.bloc {
  margin-bottom: 170px;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 10%;
  box-sizing: border-box;
}
.background-image {
  border-radius: 8px;
  width: 700px;
  height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
}
.second {
  flex-direction: row-reverse !important;
}
.content {
  max-width: 30vw;
  color: $light-black-font;
}
.otherServices {
  width: 100%;
  border-top: 1px solid $secondary-color;
  border-bottom: 1px solid $secondary-color;
  box-sizing: border-box;
  margin-top: 130px;
  margin-bottom: -70px;
  &__bloc {
    display: flex;
    justify-content: space-between;
    padding: 35px 75px;
    box-sizing: border-box;
    & h3 {
      text-transform: capitalize;
      margin-bottom: 0;
    }
    &__item {
      &__title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        & svg {
          margin-left: 50px;
          transition: transform 0.3s ease-in-out;
        }
        &:hover svg {
          transform: rotate(45deg);
        }
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .bloc {
    align-items: center !important;
    flex-direction: column !important;
    & .content {
      max-width: none !important;
      width: 700px;
    }
  }
  .background-image {
    margin-right: 0 !important;
  }
  h2 {
    margin-top: 20px;
  }
  
}
@media screen and (max-width: 1600px) {
  .background-image {
    margin-right: 50px;
    height: 400px;
  }
  .otherServices__bloc__item__title {
    width: 400px;
  }
}
@media screen and (max-width: 800px) {
  h1 {
    font-size: 26px !important;
    text-align: center;
  }
  h2 {
    font-size: 26px !important;
  }
  .background-image {
    margin-right: 0 !important;
  }
  .background-image {
    width: 100%;
    height: 300px;
    background-position: 50% 10%;
    margin-bottom: 20px;
  }
  h3 {
    font-size: $font-size-subTitle-mobile !important;
  }
  .otherServices__bloc a {
    width: 100%;
  }
  .content {
    width: inherit !important;
  }
  .otherServices__bloc__item__title {
    width: 100%;
    & svg {
      width: 20px !important;
      height: 20px !important;
      margin-left: 20px !important;
    }
  }
}
</style>
