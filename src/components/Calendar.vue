<template>
    <div>
        <h2 class="text-center">Bonjour {{local_user}}</h2>
        <div class="d-flex justify-content-center py-2">
            <select class="form-select" v-model="year_selected">
                <option v-for="year in years" :key="year">{{year}}</option>
            </select>

            <select class="form-select" v-model="month_selected">
                <option v-for="month in months" :key="month">{{month}}</option>
            </select>
        </div>


        <div class="d-flex justify-content-evenly pb-2">
            <i class="bi bi-arrow-left-square fs-2"></i>

            <h2>Semaine 18</h2>

            <i class="bi bi-arrow-right-square fs-2"></i>
        </div>

        <div class="accordion accordion-flush" id="accordionFlushExample">
            <CalendarItem  
                v-for="(day, index) in week" 
                
                :key="day" 
                :title="index" 
                :id="day"

                :pointage-array="getAllPointageOfDay(day)"
                
                @add-pointage="$emit('add-pointage', day)"
                @edit-pointage="editPointage"/>
        </div>
    </div>
</template>

<script>

import CalendarItem from "@/components/CalendarItem.vue"

export default {
    props: {
        data: Object
    },
    data() {
        return {
            pointages:[
                {
                    'id' : 56,
                    'projet' : 'Pointage',
                    'poste' : 'Dev Frontend',
                    'dd' : '2022-05-02 8:00:00',
                    'df' : '2022-05-02 19:00:00',
                    'dpd' : '2022-05-02 12:00:00',
                    'dfp' : '2022-05-02 13:00:00',
                    'duree' : '01:00:00',
                    'information' : null,
                    'valider' : 'OUI'
                },
                {
                    'id' : 56,
                    'projet' : 'Pointage',
                    'poste' : 'Dev Frontend',
                    'dd' : '2022-05-03 8:00:00',
                    'df' : '2022-05-03 19:00:00',
                    'dpd' : '2022-05-03 12:00:00',
                    'dfp' : '2022-05-03 13:00:00',
                    'duree' : '01:00:00',
                    'information' : null,
                    'valider' : 'OUI'
                },
                {
                    'id' : 56,
                    'projet' : 'Pointage',
                    'poste' : 'Dev Frontend',
                    'dd' : '2022-05-04 8:00:00',
                    'df' : '2022-05-04 19:00:00',
                    'dpd' : '2022-05-04 12:00:00',
                    'dfp' : '2022-05-04 13:00:00',
                    'duree' : '01:00:00',
                    'information' : null,
                    'valider' : 'NON'
                },
                {
                    'id' : 56,
                    'projet' : 'Pointage',
                    'poste' : 'Dev Frontend',
                    'dd' : '2022-05-05 8:00:00',
                    'df' : '2022-05-05 19:00:00',
                    'dpd' : '2022-05-05 12:00:00',
                    'dfp' : '2022-05-05 13:00:00',
                    'duree' : '01:00:00',
                    'information' : null,
                    'valider' : 'NON'
                },
            ],
            years: [
                '2022',
                '2021',
                '2020',
                '2019',
                '2018'
            ],
            year_selected : null,
            months : [
                'Janvier',
                'Fevrier',
                'Mars',
                'Avril',
                'Mai',
                'Juin',
                'Juillet',
                'Août',
                'Septembre',
                'Octobre',
                'Novembre',
                'Décembre'
            ],
            month_selected : null,
            week : {
                'Lundi 02' : '2022-05-02',
                'Mardi 03' : '2022-05-03',
                'Mercredi 04' : '2022-05-04',
                'Jeudi 05' : '2022-05-05',
                'Vendredi 06' : '2022-05-06',
                'Samedi 07' : '2022-05-07',
                'Dimanche 08' : '2022-05-08'
            },
            today: null,
            local_user : null
        }
    },
    components: {
        CalendarItem
    },
    methods: {
        editPointage(payload) {
            this.$emit('edit-pointage', payload);
        }, 

        getAllPointageOfDay(day) {
            let dayDate = new Date(day);
            
            for(let p in this.pointages) {
                let pointageDate  = new Date(this.pointages[p].dd);

                if(dayDate.getSqlDate() == pointageDate.getSqlDate()) {
                    return this.pointages[p];
                } 
            }
            
            return [];
        }
    },
    beforeMount() {
        this.local_user = this.$store.state.login.pseudo;
        /***FOR THE DEMO */
        this.local_user = 'John'


        this.pointage = this.data;
        this.today = new Date();

        this.year_selected = this.today.getFullYear();
        this.month_selected = this.months[this.today.getMonth()];





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
    }
}
</script>