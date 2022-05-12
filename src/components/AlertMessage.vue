<template>
    <div class="alert text" :class="'alert-' + alertType" role="alert">
        {{alertMessage}}
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