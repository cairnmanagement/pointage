<template>
    <FormWrapper title="Heures de travail"
        @submit="stepAction('submit')"
        @cancel="stepAction('cancel')">

            <AlertMessage v-if="alertBox" alert-message="Veuillez remplir correctement les champs pour passer à la suite, merci" alert-type="danger"/>

			<div class="mb-3 border-start border-4 ps-2" style="border-color: #A87EFC!important;">
				<span>Début: </span>

				<div class="d-flex align-items-center">
					<div class="w-50">{{beginDateWork}} à</div><div class="w-50"><Datepicker v-model="hd" timePicker /></div>
				</div>
			</div>

			<div class="mb-3  border-start border-4 ps-2" style="border-color: #469BD6!important;">
				<span>Fin:</span>

				<div class="d-flex align-items-center">
					<div class="w-50">
                        <select class="form-select">
                            <option>{{endDateWork}}</option>
                            <option>{{endDateWorkOneMoreDay}}</option>
                        </select>
                    </div>
                    <div class="px-2">
                        à
                    </div>
                    <div class="w-50">
                        <Datepicker v-model="hf" timePicker />
                    </div>
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
            endDateWorkOneMoreDay : null,
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
            this.tmpDd.setHours(val.hours);
            this.tmpDd.setMinutes(val.minutes);
            this.tmpDd.setSeconds('00');

            this.pointage.dd = this.tmpDd.getSqlDate(true);

            return val;
        },

        hf(val) {
            this.tmpDf.setHours(val.hours);
            this.tmpDf.setMinutes(val.minutes);
            this.tmpDf.setSeconds('00');

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
            if(options == "submit" && this.pointage.dd >= this.pointage.df) {
                this.alertBox = true;
                return 0;
            }
            this.$emit('step', options);
        }
    },

    beforeMount() {

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
        
        this.tmpDd = new Date();
        this.tmpDf = new Date();

        this.pointage = this.data;

        if(this.pointage.dd) {
            this.tmpDd = new Date(this.pointage.dd);
        }

        if(this.pointage.df) {
            this.tmpDf = new Date(this.pointage.df);
        } else {
            this.tmpDf = new Date(this.pointage.dd);
        }


        this.beginDateWork = this.tmpDd.toLocaleDateString('fr-FR', DisplayDate);
        this.endDateWork = this.tmpDf.toLocaleDateString('fr-FR', DisplayDate);

        this.endDateWorkOneMoreDay = this.tmpDf;
        this.endDateWorkOneMoreDay.setDate(this.tmpDf.getDate()+1);
        this.endDateWorkOneMoreDay = this.endDateWorkOneMoreDay.toLocaleDateString('fr-FR', DisplayDate);

        console.log(this.endDateWork);
        console.log(this.endDateWorkOneMoreDay);
        
        this.hd = ref({
            hours : null,
            minutes : null,
        });

        this.hf = ref({
            hours : null,
            minutes : null
        });
    }
}

</script>