<template>
    <FormWrapper title="Commentaire"
        @submit="stepAction('submit')"
        @cancel="stepAction('cancel')">

        <div class="mb-3">
            <label for="commentaire" class="form-label" hidden></label>
            <textarea class="form-control" id="commentaire" rows="3" v-model="pointage.commentaire"></textarea>
        </div>
    </FormWrapper>
</template>



<script>

import FormWrapper from "@/components/FormWrapper.vue"

export default {

    props: {
        data: Object
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
            return this.$emit('step', options)
        }
    },

    beforeMount() {
        this.pointage = this.data;
    }
}

</script>