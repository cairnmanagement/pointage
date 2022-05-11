<template>
    <FormWrapper title="Heures de travail"
        @submit="stepAction('submit')"
        @cancel="stepAction('cancel')">

            <AlertMessage v-if="alertBox" alert-message="Veuillez remplir les champs avant de passer à la suite, merci" alert-type="danger"/>

			<div class="mb-3">
				<span>Début: </span>

				<div class="d-flex align-items-center">
					<div class="w-50">{{beginDateWork}} à</div><div class="w-50"><Datepicker v-model="hd" timePicker /></div>
				</div>
			</div>

			<div class="mb-3">
				<span>Fin:</span>

				<div class="d-flex align-items-center">
					<div class="w-50">{{endDateWork}} à</div><div class="w-50"><Datepicker v-model="hf" timePicker /></div>
				</div>
			</div>
    </FormWrapper>
</template>


<script>

import FormWrapper from "@/components/FormWrapper.vue"
import AlertMessage from "@/components/AlertMessage.vue";

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
            hf: null,
            beginDateWork : null,
            endDateWork : null,
            tmpDd: null,
            tmpDf: null,
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
            console.log(val);
            this.tmpDd.setHours(val.hours);
            this.tmpDd.setMinutes(val.minutes);
            this.tmpDd.setSeconds('00');

            console.log(this.tmpDd);

            this.pointage.dd = this.tmpDd.getSqlDate(true);

            console.log(this.pointage.dd);

            return val;
        },

        hf(val) {
            this.tmpDf.setHours(val.hours);
            this.tmpDf.setMinutes(val.minutes);

            this.pointage.df = this.tmpDf.getSqlDate(true);

            return val;
        },

    },

    methods: {
        /**
         * Permet d'envoyer au composant parent l'étape a suivre : cancel(retour) ou suivant(submit)
         * @param {String} options 
         */
        stepAction(options) {
            let refHd = {
                hours : '00:00',
                minutes : '00:00'
            }

            let refHf = {
                hours : '00:00',
                minutes : '00:00'
            }

            if(options == "submit") {
                if(this.hd != refHd && this.hf != refHf) {
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
        console.log('data in workdate',this.data);

        /** METTRE DANS UN AUTRE FICHIER  */
            let pad = function(num) { return ('00'+num).slice(-2) };
            Date.prototype.getSqlDate = function(time) {
                time = typeof time === 'undefined' ? false:true;

                let date = this.getFullYear()         + '-' +
                pad(this.getMonth() + 1)  + '-' +
                pad(this.getDate());
                
                if (time) {
                    date += ' '+
                        pad(this.getHours())      + ':' +
                        pad(this.getMinutes())    + ':' +
                        pad(this.getSeconds());
                }

                return date;
            };
        /*********** */


        let DisplayDate = {weekday: "long", month: "long", day: "numeric"};
        DisplayDate = {weekday:'long',day: "numeric", month: "long"};
        this.tmpDd = new Date();
        this.tmpDf = new Date();

        this.pointage = this.data;

        if(this.pointage.dd) {
            console.log('before date',this.tmpDd);
            this.tmpDd = new Date(this.pointage.dd);
            console.log('after date',this.tmpDd);
        }

        if(this.pointage.df) {
            this.tmpDf = new Date(this.pointage.df);
        }


        this.beginDateWork = this.tmpDd.toLocaleDateString('fr-FR', DisplayDate);
        this.endDateWork = this.tmpDf.toLocaleDateString('fr-FR', DisplayDate);
        
        this.hd = ref({
            hours : this.tmpDd.getHours(),
            minutes : this.tmpDd.getMinutes(),
        });

        this.hf = ref({
            hours : this.tmpDf.getHours(),
            minutes : this.tmpDf.getMinutes()
        });
    },

    unmounted() {
        console.log(this.data);
        console.log(this.pointage);
    }

}

</script>