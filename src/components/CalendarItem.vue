<template>
    <div class="accordion-item">
        <h2 class="accordion-header" :id="'flush-heading-' + id">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#flush-collapse'+id" aria-expanded="false" aria-controls="flush-collapseOne">
                <i class="bi bi-lock-fill text-danger me-2" v-if="dayLock"></i>
                <i class="bi bi-bookmark-check-fill text-success me-2" v-else-if="!dayLock && pointages.length > 0"></i>
                <i class="bi bi-bookmark-plus-fill text-primary me-2" v-else></i>
                {{title}}
            </button>
        </h2>

        <div :id="'flush-collapse' + id" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body p-1">
                <AlertMessage v-if="dayLock" class="mt-2" message="Cette journée a été traitée, elle n'est pu modifiable." type="danger"/>

                <div v-if="pointages" >
                    <SummaryItem 
                        v-for="(pointage, index) in pointages" 
                        
                        :key="'pointage' + pointage.id" 
                        :data="pointage" 
                        :last-el="checkIfLastEl(index)"
                        
                        @edit-pointage="$emit('edit-pointage', pointage)"/>
                </div>

                <div class="d-flex justify-content-center my-2" v-if="!dayLock">
                    <button type="button" class="btn btn-outline-primary" @click="newPointage()">
                        <i class="bi bi-plus-circle pe-2"></i>
                        Enregistrer un pointage
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SummaryItem from "@/components/SummaryItem.vue";
import AlertMessage from "@/components/AlertMessage.vue";

export default {
    props: {
        title: String,
        day: String,
        id: String,
        pointageArray : Object
    },
    data() {
        return {
            pointages: [],
            dayLock : false,
        }
    },
    components: {
    SummaryItem,
    AlertMessage
},
    methods: {
        /**
         * Envoi au component true si le component est le dernier element du tableau ou que la journée est lock car validé 
         * @param {Number} index 
         * 
         * @returns {Boolen}
         */
        checkIfLastEl(index) {
            if(index == this.pointages.length - 1 && this.dayLock == true) {
                return true;
            }
        },

        /**
         * Affiche le component Pointage pour effectuer un nouveau pointage via un param id 0
         */
        newPointage() {
            this.$router.push({name : 'Pointage', params : {id : '0'}});
        }


    },
    beforeMount() {
        if(this.pointageArray.length > 0) {
            this.pointages = this.pointageArray;
        } else {
            if(typeof this.pointageArray.length == 'undefined') {
                this.pointages.push(this.pointageArray);
            }
        }

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