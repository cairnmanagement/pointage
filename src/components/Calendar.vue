<template>
    <div>
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
            <CalendarItem  v-for="day in week" :key="day" :title="day" :id="day" :day="getTheSpecialDay(day)" @add-pointage="$emit('add-pointage', getTheSpecialDay(day))"/>
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
            pointage:{},
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
            week : [
                'Lundi',
                'Mardi',
                'Mercredi',
                'Jeudi',
                'Vendredi',
                'Samedi',
                'dimanche'
            ],
            today: null
        }
    },
    components: {
        CalendarItem
    },
    methods: {
        getTheSpecialDay(day) {
            return day + ' ' + this.month_selected + ' ' + this.year_selected;
        }
    },
    beforeMount() {
        this.pointage = this.data;
        this.today = new Date();

        this.year_selected = this.today.getFullYear();
        this.month_selected = this.months[this.today.getMonth()];
    }
}
</script>