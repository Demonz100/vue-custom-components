<template>
    <SelectComponent :data="data" v-model="selectedValue" :disabled="false" :multiple="false"></SelectComponent>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue';

const SelectComponent = defineAsyncComponent(() => import('@/components/SelectComponent/SelectComponent.vue'))

const selectedValue = ref('')
const data = reactive([
    { key: '1', value: 'Book' },
    { key: '2', value: 'Pen' },
    { key: '3', value: 'Marker' },
    { key: '4', value: 'Pencil' },
    { key: '5', value: 'Bag' },
])

</script>