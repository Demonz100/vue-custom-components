<template>
    <div>
        <input type="text" v-model="displayValue" @blur="isInputActive = false" @focus="isInputActive = true" />
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
    modelValue: any;
    currency: 'USD' | 'KHR';
}>()

const emit = defineEmits(['update:modelValue'])

const isInputActive = ref(false)

const displayValue = computed({
    get: function () {
        if (isInputActive.value) {
            // Cursor is inside the input field. unformat display value for user
            return props.modelValue.toString()
        } else {
            // User is not modifying now. Format display value for user interface
            return formatter(props.modelValue, props.currency)
        }
    },
    set: function (modifiedValue) {
        // Recalculate value after ignoring "$" and "," in user input
        let newValue = parser(modifiedValue, props.currency)
        // Ensure that it is not NaN
        if (isNaN(newValue)) {
            newValue = 0
        }
        // Note: we cannot set this.value as it is a "prop". It needs to be passed to parent component
        // $emit the event so that parent component gets it
        emit('update:modelValue', newValue)
    }
})

// Formatter - Parser for currencies
const formatter = (value: any, currency: 'USD' | 'KHR') : string => {
    switch(currency){
        case 'USD':
            return value?.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
        case 'KHR':
            return value?.toFixed(0).replace(/(\d)(?=(\d{3})+$)/g, "$1,")

        //default format is USD
        default:
            return value?.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
    }
}

const parser = (value: any, currency: 'USD' | 'KHR') : number => {
    switch(currency){
        case 'USD':
            return parseFloat(value.replace(/[^\d.]/g, "").replace(/(\.\d{2})\d*/, "$1"))
        case 'KHR':
            return parseFloat(value.replace(/[^\d.]/g, "").replace(/\.\d*/, ""))

        //default parse is USD
        default:
            return parseFloat(value.replace(/[^\d.]/g, "").replace(/(\.\d{2})\d*/, "$1"))
    }
}

</script>

<style scoped>
input {
    border: 1px solid #888;
    font-size: 1.2rem;
    padding: 0.5rem;
}
</style>