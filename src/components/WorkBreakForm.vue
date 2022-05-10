<template>
    <FormWrapper title="Pause"
        @submit="stepAction('submit')"
        @cancel="stepAction('cancel')">

        <div class="mb-3">
            <span>Heure de début:</span>

            <Datepicker v-model="hd" timePicker />
        </div>

        <div class="mb-3">
            <span>Durée:</span>
            
            <Datepicker v-model="duree" timePicker />
        </div>

    </FormWrapper>
</template>



<script>

import FormWrapper from "@/components/FormWrapper.vue"

import { ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';


export default {

    props: {
        data: Object
    },

    data() {
        return {
            pointage: {},
            hd: null,
            duree: null
        }
    },

    components: {
        Datepicker,
        FormWrapper
    },


    watch: {
        /**
         * Dès que l'heure de début ou de fin est modifiée, la valeur de hd doit être re-parsé de manière à être instantnément
         * modifiée sur pointage.dd et pointage.df
         */
        hd(val) {
            return val;
        },

        hf(val) {
            return val;
        }
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
        let tmpDpd = new Date();

        if(this.pointage.dpd) {
            tmpDpd = new Date(this.pointage.dpd);
        }


        this.hd = ref({
            hours : tmpDpd.getHours(),
            minutes : tmpDpd.getMinutes() 
        });

        this.duree = ref({
            hours : null,
            minutes : null
        });

    }   
}

</script>