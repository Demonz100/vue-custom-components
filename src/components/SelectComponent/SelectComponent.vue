<template>
    <select name="selectOption" id="selectOption" :disabled="props.disabled" :multiple="multiple" v-model="selectedValue">
        <option value="" disabled>Please select a value</option>
        <option v-for="(option, i) in data" :value="option.key" :key="i">{{ option.value }}</option>
    </select>
</template>

<script setup lang="ts">

const props = defineProps(['disabled', 'multiple', 'data'])
const selectedValue = defineModel()

</script>

<style scoped>
select {
    width: 300px;
    height: 30px;
}
option:hover {
  background-color: rgb(93, 22, 22);
}
</style>
