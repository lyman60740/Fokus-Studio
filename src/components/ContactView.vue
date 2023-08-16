<template>
  <section class="contact-form">
    <div class="contact__left bloc">
      <div class="contact__left__head">
        <h1>{{ jsonData.title }}</h1>
        <p
          v-for="item in jsonData.subTitle"
          :key="item"
        >
           {{ item }}
        </p>
      </div>
      <form @submit.prevent="sendEmail">
        <div class="name">
          <input type="text" v-model="form.firstName" placeholder="Prénom">
          <input type="text" v-model="form.lastName" placeholder="Nom">
        </div>
        <div class="mailPhone">
          <input type="email" v-model="form.email" placeholder="Adresse mail">
          <input type="tel" v-model="form.phone" placeholder="N° de téléphone">
        </div>
          
        <div class="objet">
    <span>Votre demande concerne : </span>
    <select v-model="form.subject">
      <option value="" disabled selected>Choisissez une catégorie</option>
        <option v-for="service in services" :key="service.id" :value="service.id">
            Vidéos {{ service.id }}
        </option>
    </select>
</div>

          
          <textarea v-model="form.message" placeholder="Décrivez brièvement votre projet "></textarea>
          <input type="file" v-on:change="form.attachment" placeholder="Pièce jointe">
          <button type="submit">Envoyer</button>
      </form>
    </div>
    <div class="contact__right bloc">
      <h3>Loïc Jouenne</h3>
      <span>Fondateur</span>
    </div>
      
  </section>
</template>

  
  <script>
//   import { gsap } from 'gsap';
  import jsonData from '../data/contact.json';
  import servicesData from '../data/services.json';
  
  export default {
    name: 'ContactView',
    data() {
    return {
        form: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            attachment: null,
        },
        jsonData,
        services: servicesData.services
    };
},
methods: {
    async sendEmail() {
        try {
            const formData = new FormData();
            for (const key in this.form) {
                formData.append(key, this.form[key]);
            }

            const response = await fetch('YOUR_BACKEND_ENDPOINT', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('E-mail envoyé avec succès !');
                this.form = {
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: '',
                    attachment: null
                };
            } else {
                alert('Erreur lors de l\'envoi de l\'e-mail.');
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        }
    }
}

}
  </script>
  
  
  
  <style lang="scss" scoped>
  @import '../css/variables.scss';

  section {
    margin-top: calc(91px + 90px);
    height: 70vh;
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
      background-image: url('../assets/images/loic_profil.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      height: 100%;
      width: 35%;
      border-radius: 8px;
      color: $primary-color;
      padding: 40px 40px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      
      & h3 {
        color: $primary-color;
        font-weight: 700;
        font-size: $font-size-explainText;
      }
      & span {
        font-size: $font-size-texte;
      }
    }
    .contact__left {
      width: 55%;
      max-width: 800px;
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
    }
    .name, .mailPhone {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      & input {
        width: 100%;
        &:nth-child(2){
          margin-left: 50px;
        }
      }
    }
    .objet {
      display: flex;
      flex-direction: column;
      & span {
        margin-bottom: 15px;
      }
    }
    input:not([type="file"]), textarea, select {
      background: $light-blue;
      border-radius: 8px;
      padding: 7px 16px;
      font-weight: 400;
      font-size: $font-size-texte;
      margin-bottom: 30px; 
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
  </style>
  