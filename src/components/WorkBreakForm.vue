<template>
    <FormWrapper title="Pause"
        @submit="stepAction('submit')"
        @cancel="stepAction('cancel')">

        <AlertMessage v-if="alertBox" alert-message="Veuillez remplir les champs avant de passer à la suite, merci" alert-type="danger"/>

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
import AlertMessage from "@/components/AlertMessage.vue"

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
            duree: null,
            tmpDpd: null,
            tmpDfp: null,
            alertBox : false
        }
    },

    components: {
        Datepicker,
        FormWrapper,
        AlertMessage
    },


    watch: {
        /**
         * Dès que l'heure de début ou de fin est modifiée, la valeur de hd doit être re-parsé de manière à être instantnément
         * modifiée sur pointage.dd et pointage.df
         */
        hd(val) {
            this.tmpDpd.setHours(val.hours);
            this.tmpDpd.setMinutes(val.minutes);
            this.tmpDpd.setSeconds('00');

            this.pointage.dpd= this.tmpDpd.getSqlDate(true);

            return val;
        },

        hf(val) {
            if(!this.pointage.dfp) {
                this.tmpDfp = this.pointage.dpd;
            }

            this.tmpDfp.setHours(this.getHours() + val.hours);
            this.tmpDfp.setMinutes(this.getMinutes() + val.minutes); 

            this.pointage.dfp = this.tmpDfp.getSqlDate(true);

            return val;
        }
    },

    methods: {
        /**
         * Permet d'envoyer au composant parent l'étape a suivre : cancel(retour) ou suivant(submit)
         * @param {String} options 
         */
        stepAction(options) {
            if(options == 'submit') {
                if(this.pointage.dpf != this.pointage.dfp){
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
        this.pointage = this.data;
        this.tmpDpd = new Date();

        if(this.pointage.dpd) {
            this.tmpDpd = new Date(this.pointage.dpd);
        }

        if(this.pointage.dfp) {
            this.tmpDfp = new Date(this.pointage.dfp);
        }


        this.hd = ref({
            hours : this.tmpDpd.getHours(),
            minutes : this.tmpDpd.getMinutes() 
        });

        this.duree = ref({
            hours : null,
            minutes : null
        });

    }   
}

</script>