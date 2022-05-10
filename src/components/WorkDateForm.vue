<template>
    <FormWrapper title="Heures de travail"
        @submit="stepAction('submit')"
        @cancel="stepAction('cancel')">

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
            tmpDf: null
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
            console.log(val);
            this.tmpDd.setHours(val.hours);
            this.tmpDd.setMinutes(val.minutes);

            this.pointage.dd = this.tmpDd.toString().replace(',', '');

            return val;
        },

        hf(val) {
            this.tmpDf.setHours(val.hours);
            this.tmpDf.setMinutes(val.minutes);

            this.pointage.df = this.tmpDf.toLocaleString().replace(',', '');

            return val;
        },

    },

    methods: {
        /**
         * Permet d'envoyer au composant parent l'étape a suivre : cancel(retour) ou suivant(submit)
         * @param {String} options 
         */
        stepAction(options) {
            if(options == "submit") {
                if(this.hd && this.hf) {
                    let dhd = new Date(this.data.dd);
                    this.pointage.dd = dhd.setTime(this.hd);

                    let dhf = new Date(this.data.df);
                    this.pointage.df = dhf.setTime(this.hf);

                    return this.$emit('step', options);
                }
            } else {
                return this.$emit('step', options);
            }
        }
    },

    beforeMount() {
        let DisplayDate = {weekday: "long", month: "long", day: "numeric"};
        this.tmpDd = new Date();
        this.tmpDf = new Date();

        this.pointage = this.data;

        if(this.pointage.dd) {
            this.tmpDd = new Date(this.pointage.dd);
        }

        if(this.pointage.df) {
            this.tmpDf = new Date(this.pointage.df);
        }

        this.beginDateWork = this.tmpDd.toLocaleDateString('fr-FR', DisplayDate);
        this.endDateWork = this.tmpDf.toLocaleDateString('fr-FR', DisplayDate);
        
        this.hd = ref({
            hours : this.tmpDd.getHours(),
            minutes : this.tmpDd.getMinutes()
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