<template>
    <FormWrapper title="Récap"
        @submit="stepAction('submit')"
        @cancel="stepAction('cancel')">

        <summaryItem :data="data" title="Récap"/>
    </FormWrapper>
</template>



<script>

import FormWrapper from "@/components/FormWrapper.vue"
import SummaryItem from '@/components/SummaryItem.vue';

export default {

    props: {
        data: Object
    },

    components: {
        FormWrapper,
        SummaryItem
    },

    methods: {
        /**
         * Permet d'envoyer au composant parent l'étape a suivre : cancel(retour) ou suivant(submit)
         * @param {String} options 
         */
        stepAction(options) {
            //verif si les champs on été rempli avant de passer a l'étape suivant 
            return this.$emit('step', options)
        },
    },
}

</script>