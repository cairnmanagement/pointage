<template>
    <div class="border-dark border-2 pb-2 my-2" :class="{'border-bottom': !lastEl}">
        <ul class="list-group list-group-flush">
            <li class="list-group-item" :class="{'list-group-item-success' : data.valider == 'OUI', 'list-group-item-light' : data.valider == 'NON'}" @click="$emit('edit-pointage', data)">
                <div class="d-flex align-items-center">
                    <span class="pe-2">Horaires:</span> 
                    <span :class="{'badge summary_badge text-primary': data.valider == 'NON'}">
                        {{workHours('start', data.dd)}} <i class="bi bi-chevron-right"></i> {{workHours('end', data.df)}}
                    </span>
                    <i class="bi bi-pencil-fill text-secondary ms-auto" v-if="data.valider == 'NON'"></i>
                </div>
            </li>
    
            <li class="list-group-item" :class="{'list-group-item-success' : data.valider == 'OUI', 'list-group-item-light' : data.valider == 'NON'}" v-if="data.dpd" @click="$emit('edit-pointage', data)">
                <div class="d-flex align-items-center">
                    <span class="pe-2">Pause:</span> 
                    <span :class="{'badge  summary_badge text-primary': data.valider == 'NON'}">
                        {{workHours('start', data.dpd)}} <i class="bi bi-chevron-right"></i> {{workHours('end', data.dfp)}}
                    </span>
                    <i class="bi bi-pencil-fill text-secondary ms-auto" v-if="data.valider == 'NON'"></i>
                </div>
            </li>
    
            <li class="list-group-item" :class="{'list-group-item-success' : data.valider == 'OUI', 'list-group-item-light' : data.valider == 'NON'}" @click="$emit('edit-pointage', data)">
                <div class="d-flex align-items-center">
                    <span class="pe-2">Projet: </span>
                    <span :class="{'badge  summary_badge text-primary': data.valider == 'NON'}">{{data.projet}}</span>
                    <i class="bi bi-pencil-fill text-secondary ms-auto" v-if="data.valider == 'NON'"></i>
                </div>
            </li>
    
            <li class="list-group-item" :class="{'list-group-item-success' : data.valider == 'OUI', 'list-group-item-light' : data.valider == 'NON'}" @click="$emit('edit-pointage', data)">
                <div class="d-flex align-items-center">
                    <span class="pe-2">Poste:</span>
                    <span :class="{'badge  summary_badge text-primary': data.valider == 'NON'}">{{data.poste}}</span>
                    <i class="bi bi-pencil-fill text-secondary ms-auto" v-if="data.valider == 'NON'"></i>
                </div>
            </li>
        </ul>
    </div>
</template>



<script>

export default {

    props: {
        data: Object,
        lastEl: Boolean,
        canEdit: {
            type : Boolean,
            default : true
        }
    },
    methods: {
        /**
         * Get the timming of start and end from the date 
         * @param {String} periode 
         */
        workHours(periode, date) {
            let time = new Date(date);
            let minutes = time.getMinutes();


            if(minutes.toString().length == 1) {
                minutes = '0' + minutes;
            }

            return time.getHours() + ':' + minutes;
        }
    },
    beforeMount() {
    }
}

</script>