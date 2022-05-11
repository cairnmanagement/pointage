<template>
    <div class="px-4">
        <h2 class="text-center py-2">Merci !</h2>
        <p class="text-center fs-3">Bonne journée </p>

        <button class="btn btn-outline-primary w-100" type="button" @click="$emit('new-pointage')"> 
            <i class="bi bi-plus-circle pe-2"></i>

            <span>Enregistrer un autre pointage</span>
        </button>
    </div>
</template>



<script>

export default {
    
}

</script>