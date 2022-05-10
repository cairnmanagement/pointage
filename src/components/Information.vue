<template>
    <FormWrapper :title="pointage.information.nom"
        @submit="stepAction('submit')"
        @cancel="stepAction('cancel')">

        <div class="alert alert-primary d-flex align-items-center" role="alert">
            <i class="bi bi-exclamation-triangle-fill px-2" v-if="icon == 1"></i>
            <div>
                {{this.pointage.information.textInformation}}
            </div>
        </div>
    </FormWrapper>
</template>



<script>

import FormWrapper from "@/components/FormWrapper.vue"

export default {

    props: {
        data: Object,
        icon : String
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
            //verif si les champs on été rempli avant de passer a l'étape suivant
            // ou que l"étape a été completée
            return this.$emit('step', options)
        }
    },

    beforeMount() {
        this.pointage = this.data;
    }
}

</script>