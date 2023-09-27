<template>
  <section class="contact-form">
    <div class="contact__left bloc">
      <div class="contact__left__head">
        <h1>{{ jsonData.title }}</h1>
        <p v-for="item in jsonData.subTitle" :key="item">
          {{ item }}
        </p>
      </div>
      <form @submit.prevent="sendEmail">
        <div class="name">
          <div>
            <input type="text" v-model="form.firstName" placeholder="Prénom" />
          </div>
          <div>
            <input type="text" v-model="form.lastName" placeholder="Nom" />
          </div>
        </div>
        <div class="mailPhone">
          <div>
            <input
              type="email"
              v-model="form.email"
              @input="validateField('email', 'email')"
              placeholder="Adresse mail"
            />
          </div>
          <div class="tel">
            <input
              type="tel"
              v-model="form.phone"
              @input="validateField('phone', 'phone')"
              placeholder="N° de téléphone"
            />
          </div>
        </div>

        <div class="objet">
          <span>Votre demande concerne : </span>
          <div>
            <select v-model="form.subject">
              <option value="" disabled selected>
                Choisissez une catégorie
              </option>
              <option
  v-for="service in services"
  :key="service.id"
  :value="service.id"
>
  {{ service.id === 'autres' ? 'Autres' : `Vidéos ${service.id}` }}
</option>

            </select>
          </div>
        </div>
        <div class="textAreaBox">
          <textarea
            v-model="form.message"
            placeholder="Décrivez brièvement votre projet "
          ></textarea>
        </div>

        <div class="privacy-policy">
          <input
            type="checkbox"
            id="acceptPrivacyPolicy"
            name="acceptPrivacyPolicy"
            required
          />
          <label for="acceptPrivacyPolicy"
            >Je reconnais avoir pris connaissance de la
            <a
            @click="showPolitique = true"
              >politique de confidentialité</a
            >
            et je l’accepte.</label
          >
          <div v-if="showPolitique" class="modal">
      <PolitiqueConfidentialite @close="showPolitique = false" />
    </div>
        </div>

        <div class="fileBloc">
          <span>Ajouter une pièce jointe :</span>
          <input
            type="file"
            accept="image/*,application/pdf"
            v-on:change="handleFileChange"
            @change="checkFileSize"
            placeholder="Pièce jointe"
          />
        </div>

        <button type="submit" :disabled="!isFormValid">Envoyer</button>
      </form>
      <div v-if="emailSent" class="confirmationMessage">
        <img
          @click="exitButton"
          class="confirmationMessage_exit"
          src="../assets/icons/cross.svg"
          alt=""
        />
        <p>Votre demande a bien été envoyé.</p>
        <p>
          Notre équipe prendra contact avec vous dans les plus brefs délais.
        </p>
        <span>Merci pour votre confiance !</span>
        <img src="../assets/logo/logo_complet_noir.svg" alt="" />
        <i>Pensez à surveiller vos spams.</i>
      </div>
    </div>
    <div class="contact__right bloc">
      <div class="contact__right__txt">
        <h3>Loïc Jouenne</h3>
        <span>Fondateur</span>
      </div>
      <img src="../assets/logo/logo_titrage_blanc.svg" alt="" />
    </div>
  </section>
</template>

<script>
import jsonData from "../data/contact.json";
import servicesData from "../data/services.json";
import PolitiqueConfidentialite from "./PolitiqueConfidentialite.vue";

export default {
  name: "ContactView",
  components: {
    PolitiqueConfidentialite,
  },
  mounted() {
    this.topScroll();
  },
  data() {
    return {
      showPolitique: false,
      emailSent: null,
      form: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        attachment: null,
      },
      regex: {
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        phone: /^[0-9+-.()/\s]*$/, // Permet des chiffres, +, -, ., (, ), / et des espaces. Ajustez selon vos besoins.
      },
      errors: {
        email: false,
        phone: false,
      },
      jsonData,
      services: servicesData.services,
    };
  },
  created() {
  this.services.push({
    id: "autres",
    // ajoutez d'autres propriétés si nécessaire
  });
},
  methods: {
    exitButton() {
      this.emailSent = false;
    },
    validateField(field, pattern) {
      this.errors[field] = !this.regex[pattern].test(this.form[field]);
    },
    checkFileSize(event) {
      const maxFileSize = 20 * 1024 * 1024; // 20MB
      const inputFile = event.target;

      if (inputFile.files && inputFile.files[0].size > maxFileSize) {
        alert(
          "Le fichier est trop volumineux Veuillez télécharger un fichier de moins de 20MB."
        );
        inputFile.value = ""; 
      }
    },
    handleFileChange(event) {
      this.form.attachment = event.target.files[0];
      this.checkFileSize(event);
    },
    async sendEmail() {
      try {
        const formData = new FormData();
        for (const key in this.form) {
          formData.append(key, this.form[key]);
        }

        const response = await fetch("http://localhost:3000/send-email", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          this.form = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
            attachment: null,
          };
          this.emailSent = true;
        } else {
          alert("Erreur lors de l'envoi de l'e-mail.");
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail:", error);
      }
    },
    topScroll() {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    },
  },
  computed: {
    isFormValid() {
      return (
        !Object.values(this.errors).includes(true) &&
        this.form.firstName &&
        this.form.lastName &&
        this.form.email &&
        this.form.subject &&
        this.form.message
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../css/variables.scss";

section {
  margin-top: calc(91px + 90px);
  padding: 0 10%;
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: space-between;
}
.contact-form {
  display: flex;
  flex-direction: row;
}
.bloc {
  box-sizing: border-box;
}
.contact__right {
  background-image: url("../assets/images/loic_profil.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 70vh;
  width: 35%;
  border-radius: 8px;
  color: $primary-color;
  padding: 40px 40px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  &__txt {
    height: 57px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  & h3 {
    color: $primary-color;
    font-weight: 700;
    font-size: $font-size-explainText;
  }
  & span {
    font-size: $font-size-texte;
  }
  & img {
    width: 157px;
    height: 57px;
  }
}
.contact__left {
  width: 55%;
  max-width: 800px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & h1 {
    font-size: $font-size-titleSection;
    font-weight: 700;
    margin-bottom: 30px;
  }
  & p {
    font-size: $font-size-texte;
    font-weight: 400;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 30px;
    }
  }
}
form {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.name,
.mailPhone {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & div {
    width: 100%;
    display: flex;
    position: relative;
    &:nth-child(2) {
      margin-left: 50px;
    }
    & input {
      width: 100%;
      box-sizing: border-box;
      height: max-content;
    }
    &:not(.tel)::after {
      content: "*";
      color: red;
      right: -8px;
      position: absolute;
    }
  }
}
.objet {
  margin-bottom: 30px;
  & div {
    display: flex;
    flex-direction: column;
    height: max-content;
    margin-top: 6px;
    position: relative;
    & select {
      margin-bottom: 0 !important;
    }
    &::after {
      content: "*";
      color: red;
      right: -8px;
      position: absolute;
    }
  }
}
.textAreaBox {
  position: relative;
  &::after {
    content: "*";
    color: red;
    right: -8px;
    position: absolute;
  }
}
input:not([type="file"]):not([type="checkbox"]),
textarea,
select {
  background: $light-blue;
  border-radius: 8px;
  padding: 7px 16px;
  font-weight: 400;
  font-size: $font-size-texte;
  margin-bottom: 30px;
}
textarea {
  height: 148px;
  width: 100%;
  resize: none;
  box-sizing: border-box;
}
select {
  & option:not(:first-child) {
    text-transform: capitalize;
  }
  border: none;
  &::placeholder {
    color: $light-black-font;
  }
}
.fileBloc {
  display: flex;
  flex-direction: column;
  & span {
    font-size: $font-size-texte;
    margin-bottom: 15px;
  }
}
button {
  background: $secondary-color;
  border-radius: 4px;
  padding: 7px 16px;
  font-weight: 400;
  font-size: $font-size-texte;
  color: $light-blue;
  align-self: center;
  margin-top: 30px;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    background: rgba(46, 46, 46, 0.18);
    color: rgba(46, 46, 46, 0.48);
    cursor: not-allowed;
  }
}
.privacy-policy {
  margin-bottom: 30px;
  & input[type="checkbox"] {
    margin-right: 25px;
    cursor: pointer;
  }
  & a {
    text-decoration: underline;
  }
}
.confirmationMessage {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  box-sizing: border-box;
  text-align: center;
  align-items: center;
  height: 50vh;
  min-height: 500px;
  width: 500px;
  background: $primary-color;
  border: 1px $secondary-color solid;
  border-radius: 8px;
  animation: appear 0.5s forwards ease-in-out;
  opacity: 0;
  & img {
    height: 100px;
  }
  & p {
    font-size: $font-size-explainText;
    font-weight: 500;
    margin-bottom: 50px !important;
    color: $secondary-color;
  }
  & span:not(:last-child) {
    font-size: $font-size-texte;
    font-weight: 600;
    margin-bottom: 30px;
  }
  & i {
    position: absolute;
    bottom: 20px;
  }
  &_exit {
    position: absolute;
    top: -20px;
    right: 20px;
    width: 25px;
    height: 25px;
    &:hover {
      cursor: pointer;
    }
  }
}
@keyframes appear {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
