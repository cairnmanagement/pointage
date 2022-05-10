<template>
    <FormWrapper title="Quoi"
        @cancel="stepAction('cancel')"

        :submit-button="false">
        <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="otherChoiceItem in listOtherChoice" :key="'otherchoicelist-' + otherChoiceItem.id" @click="stepAction('submit', otherChoiceItem)">{{otherChoiceItem.nom}}</li>
        </ul>
    </FormWrapper>
</template>



<script>

import FormWrapper from "@/components/FormWrapper.vue"

export default {

    props: {
        data: Object,
        listOtherChoice : Object
    },

    data() {
        return {
            pointage: {},
            selectedOtherChoice: null
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
        stepAction(options, choice) {
            //verif si les champs on été rempli avant de passer a l'étape suivant 
            this.pointage.information = choice;
            return this.$emit('step', options)
        }
    },

    beforeMount() {
        this.pointage = this.data;
    }
}


</script>

