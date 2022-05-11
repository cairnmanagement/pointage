<template>
    <div class="alert text" :class="'alert-' + alertType" role="alert">
        Veuillez remplir les champs avant de passer à la suite, merci
    </div>
</template>

<script>

export default {
    props: {
        alertMessage: String,
        alertType : String
    }
}

</script>