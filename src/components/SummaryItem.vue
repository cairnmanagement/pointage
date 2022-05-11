<template>
    <div class="border-dark border-2 pb-2 my-2" :class="{'border-bottom': !lastEl}">
        <ul class="list-group list-group-flush">
            <li class="list-group-item text-success text-end" v-if="data.valider == 'NON'" @click="$emit('edit-pointage', data)">
                <i class="bi bi-pencil-square fs-4" title="modifier"></i>
                <!-- <button type="button" class="btn btn-outline-success">
                    <i class="bi bi-pencil-square pe-2"></i> Modifier                
                </button> -->
            </li>

            <li class="list-group-item" :class="{'list-group-item-success' : data.valider == 'OUI', 'list-group-item-light' : data.valider == 'NON'}">
                <div class="d-flex">
                    <span class="pe-2">Horaires:</span> 
                    <span :class="{'badge summary_badge text-primary': data.valider == 'NON'}">
                        {{workHours('start', data.dd)}} <i class="bi bi-chevron-right"></i> {{workHours('end', data.df)}}
                    </span>
                </div>
            </li>
    
            <li class="list-group-item" :class="{'list-group-item-success' : data.valider == 'OUI', 'list-group-item-light' : data.valider == 'NON'}" v-if="data.dpd">
                <div class="d-flex">
                    <span class="pe-2">Pause:</span> 
                    <span :class="{'badge  summary_badge text-primary': data.valider == 'NON'}">
                        {{workHours('start', data.dpd)}} <i class="bi bi-chevron-right"></i> {{workHours('end', data.dfp)}}
                    </span>
                </div>
            </li>
    
            <li class="list-group-item" :class="{'list-group-item-success' : data.valider == 'OUI', 'list-group-item-light' : data.valider == 'NON'}">
                <div class="d-flex">
                    <span class="pe-2">Projet: </span>
                    <span :class="{'badge  summary_badge text-primary': data.valider == 'NON'}">{{data.projet}}</span>
                </div>
            </li>
    
            <li class="list-group-item" :class="{'list-group-item-success' : data.valider == 'OUI', 'list-group-item-light' : data.valider == 'NON'}">
                <div class="d-flex">
                    <span class="pe-2">Poste:</span>
                    <span :class="{'badge  summary_badge text-primary': data.valider == 'NON'}">{{data.poste}}</span>
                </div>
            </li>

            <!-- <li class="list-group-item" v-if="data.valider == 'NON'" >
                <div class="d-flex justify-content-center mb-2">
                    <button type="button" class="btn btn-outline-success" @click="$emit('add-pointage')">
                        <i class="bi bi-pencil-fill pe-2"></i>
                        Modifier
                    </button>
                </div>
            </li> -->
        </ul>
    </div>
</template>



<script>

export default {

    props: {
        data: Object,
        lastEl: Boolean
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