<template>
    <div class="text-center">
        <img class="pebble_spinner" src="@/assets/pebble-logo.png" alt="logo pebble spinner"/>
    </div>
</template>

<style>
    pebble_spinner {
        width: 5%;
    }

    @keyframes rotating {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .pebble_spinner {
        animation: rotating 0.8s linear infinite;
    }
</style>