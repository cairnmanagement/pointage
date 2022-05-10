<template>
    <div class="accordion-item">
        <h2 class="accordion-header" :id="'flush-heading-' + id">
            <button class="accordion-button collapsed fs-3" type="button" data-bs-toggle="collapse" :data-bs-target="'#flush-collapse'+id" aria-expanded="false" aria-controls="flush-collapseOne">
                <i class="bi bi-lock-fill text-danger me-2" v-if="dayLock"></i>
                <i class="bi bi-bookmark-check-fill text-success me-2" v-else-if="!dayLock && pointages.length > 0"></i>
                <i class="bi bi-bookmark-plus-fill text-primary me-2" v-else></i>
                {{title}}
            </button>
        </h2>

        <div :id="'flush-collapse' + id" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">
                <div v-if="pointages" >
                    <SummaryItem v-for="pointage in pointages" :key="'pointage' + pointage.id" :data="pointage"/>
                </div>

                <div class="d-flex justify-content-center" v-if="!dayLock">
                    <button type="button" class="btn btn-outline-primary" @click="$emit('add-pointage')">
                        <i class="bi bi-plus-circle"></i>
                        Enregistrer un pointage
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SummaryItem from "@/components/SummaryItem.vue";

export default {
    props: {
        title: String,
        day: String,
        id: String
    },
    data() {
        return {
            pointages: [
                {
                    'id' : 8,
                    'projet' : '19_177 - Mur écran "anti-bruit"', 
                    'poste' : "dev Frontend", // string
                    'commentaire' : null, //string
                    'dd' : "2022-05-09 8:00:00", // datetime
                    'df' : "2022-05-09 11:00:00", // datetime
                    'dpd' : "2022-05-09 9:30:00", // dateTime
                    'duree' : 30,
                    'dfp' : "2022-05-09 10:00:00", // dateTime
                    'information' : null,
                    'valider' : 'NON'
                },
                {
                    'id' : 6,
                    'projet' : '19_177 - Mur écran "anti-bruit"',
                    'poste' : "dev Frontend", // string
                    'commentaire' : null, //string
                    'dd' : "2022-05-09 12:30:00", // datetime
                    'df' : "2022-05-09 16:00:00", // datetime
                    'dpd' : "2022-05-09 14:30:00", // dateTime
                    'duree' : 30,
                    'dfp' : "2022-05-09 15:00:00", // dateTime
                    'information' : null,
                    'valider' : 'NON'
                },
                {
                    'id' : 2,
                    'projet': '19_177 - Mur écran "anti-bruit"', // String
                    'poste' :"dev Backend", // string
                    'commentaire' : null, //string
                    'dd' : "2022-05-09 20:00:00", // datetime
                    'df' : "2022-05-09 23:00:00", // datetime
                    'dpd' : "2022-05-09 21:30:00", // dateTime
                    'duree' : 30,
                    'dfp' : "2022-05-09 22:00:00", // dateTime
                    'information' : null,
                    'valider' : 'NON'
                }
            ],
            dayLock : false,
        }
    },
    components: { 
        SummaryItem 
    },
    methods: {

    },
    beforeMount() {
        if(this.pointages.length > 0) {
            for(let pointage in this.pointages) {
                if(this.pointages[pointage].valider == 'OUI') {
                    this.dayLock = true;
                    break;
                }
            }
        }
    }
}
</script>