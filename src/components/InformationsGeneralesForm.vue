<template>
    <FormWrapper title="Informations Générales"
        @submit="stepAction('submit')"
        @cancel="stepAction('cancel')">
        
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

export default {
    props: {
        data: Object,
        listProjets: Object,
        listPostes: Object
    },

    data() {
        return {
            pointage: {}
        }
    },

    components: {
        FormWrapper
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
                }
            } else {
                return this.$emit('step', options);
            }
        }
    },

    beforeMount() {
        this.pointage = this.data;
    }
}
</script>