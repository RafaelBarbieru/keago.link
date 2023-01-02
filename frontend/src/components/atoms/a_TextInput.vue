<template>
    <input type="text" :placeholder="placeholder" :disabled="locked ?? null" />
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    placeholder: {
        type: String,
        required: false
    },
    value: {
        type: String,
        required: false
    },
    locked: {
        type: Boolean,
        required: false,
        default: false
    }
})
</script>

<style lang="scss" scoped>
    input {
        background-color: white;
        color: black;
    }
</style>