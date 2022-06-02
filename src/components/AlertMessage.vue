<template>
    <div class="alert text" :class="'alert-' + type" role="alert">
        {{message}}
    </div>
</template>

<script>

export default {
    props: {
        message: String,
        type : String
    }
}

</script>