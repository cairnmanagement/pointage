<template>
    <FormWrapper 
    title="Avez-vous des informations complémentaires à déclarer?"
    success-label="Oui"
    success-class="btn-outline-primary"
    danger-label="Non"
    danger-class="btn-outline-secondary"
    
    @submit="stepAction('submit')" 
    @cancel="stepAction('cancel')" />
</template>



<script>

import FormWrapper from "@/components/FormWrapper.vue"

export default {

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
            return this.$emit('step', options)
        }
    }
}

</script>