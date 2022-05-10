<template>
    <div class="border my-2 " :class="{'border-success' : data.valider == 'OUI', 'border-primary' : data.valider == 'NON'}">
        <ul class="list-group list-group-flush">
            <li class="list-group-item" :class="{'list-group-item-success' : data.valider == 'OUI', 'list-group-item-light' : data.valider == 'NON'}">
                Heure de travail : <span :class="{'badge bg-info': data.valider == 'NON'}">{{workHours('start', data.dd)}}</span> - <span :class="{'badge bg-info': data.valider == 'NON'}">{{workHours('end', data.df)}}</span>
            </li>
    
            <li class="list-group-item" :class="{'list-group-item-success' : data.valider == 'OUI', 'list-group-item-light' : data.valider == 'NON'}" v-if="data.dpd">
                Pause : <span :class="{'badge  bg-info': data.valider == 'NON'}">{{workHours('start', data.dpd)}}</span> - <span :class="{'badge  bg-info': data.valider == 'NON'}">{{workHours('end', data.dfp)}}</span>
            </li>
    
            <li class="list-group-item" :class="{'list-group-item-success' : data.valider == 'OUI', 'list-group-item-light' : data.valider == 'NON'}">
                Projet : <span :class="{'badge  bg-info': data.valider == 'NON'}">{{data.projet}}</span>
            </li>
    
            <li class="list-group-item" :class="{'list-group-item-success' : data.valider == 'OUI', 'list-group-item-light' : data.valider == 'NON'}">
                Poste : <span :class="{'badge  bg-info': data.valider == 'NON'}">{{data.poste}}</span>
            </li>
            <li class="list-group-item" :class="{'list-group-item-success' : data.valider == 'OUI', 'list-group-item-light' : data.valider == 'NON'}">data item</li>
        </ul>
    </div>
</template>



<script>

export default {

    props: {
        data: Object,
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