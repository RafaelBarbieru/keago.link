<template>
    <h1>{{ label }}</h1>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    label: {
        type: String,
        required: true
    }
})
</script>

<style lang="scss" scoped>
h1 {
    font-size: large;
    color: black;
}
</style>