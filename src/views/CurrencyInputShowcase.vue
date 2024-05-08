<template>
    <h3>USD Input</h3>
    <CurrencyInputComponent v-model="amount.usd" currency="USD"/>
    <br>
    {{ amount.usd }}
    <br>
    <hr>
    <br>
    <h3>KHR Input</h3>
    <CurrencyInputComponent v-model="amount.khr" currency="KHR"/>
    <br>
    {{ amount.khr }}
</template>

<script setup lang="ts">
import CurrencyInputComponent from '@/components/InputComponent/CurrencyInputComponent.vue';
import { reactive } from 'vue';

const amount = reactive({
    usd: 0,
    khr: 0
})
</script>