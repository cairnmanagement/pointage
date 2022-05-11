<template>
    <FormWrapper title="Informations Générales"
        @submit="stepAction('submit')"
        @cancel="stepAction('cancel')">

        <AlertMessage v-if="alertBox" alert-message="Veuillez remplir les champs avant de passer à la suite, merci" alert-type="danger"/>
        
        <div class="input-group mb-3">
            <select class="form-select" id="inputGroupSelect01" v-model="pointage.projet">
                <option disabled >Sélectionnez le Projet</option>
                <option v-for="projetInList in listProjets" :key="'projetInList-' + projetInList.id">{{projetInList.intitule}}</option>
            </select>
        </div>

        <div class="input-group mb-3">
            <select class="form-select" id="inputGroupSelect01" v-model="pointage.poste">
                <option  disabled >Sélectionnez votre Poste</option>
                <option v-for="posteInList in listPostes" :key="'posteInList-' + posteInList.id">{{posteInList.nom}}</option>
            </select>
        </div>

    </FormWrapper>
</template>

<script>

import FormWrapper from "@/components/FormWrapper.vue"
import AlertMessage from "@/components/AlertMessage.vue";

export default {
    props: {
        data: Object,
        listProjets: Object,
        listPostes: Object
    },

    data() {
        return {
            pointage: {},
            alertBox: false,
        }
    },

    components: {
        FormWrapper,
        AlertMessage
    },

    methods: {
        /**
         * Permet d'envoyer au composant parent l'étape a suivre : cancel(retour) ou suivant(submit)
         * @param {String} options 
         */
        stepAction(options) {
            if(options == "submit") {
                if(this.data.projet && this.data.poste) {
                    return this.$emit('step', options);
                } else {
                    this.alertBox = true;
                }
            } else {
                return this.$emit('step', options);
            }
        }
    },

    beforeMount() {
        console.log(this.data);
        this.pointage = this.data;
    }
}
</script>