<template>
    <div id="btn-container">
        <p id="btn-label">{{ label }}</p>
    </div>
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
    #btn-container {
        width: 100%;
        height: 100%;
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        #btn-label {
            color: white;
            -webkit-user-select: none; /* Safari */
            -ms-user-select: none; /* IE 10 and IE 11 */
            user-select: none; /* Standard syntax */
        }
    }
</style>