<template>
    <ul class="pagination">
        <span style="padding-right: 1rem;">total: {{ totalPages }}</span>
        <li class="pagination-item">
            <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage">
                First
            </button>
        </li>

        <li class="pagination-item">
            <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage">
                Previous
            </button>
        </li>

        <!-- Visible Buttons Start -->

        <li v-for="page in pages" :key="page.name" class="pagination-item">
            <button type="button" @click="onClickPage(page.name)" :disabled="page.isDisabled">
                {{ page.name }}
            </button>
        </li>

        <!-- Visible Buttons End -->

        <li class="pagination-item">
            <button type="button" @click="onClickNextPage" :disabled="isInLastPage">
                Next
            </button>
        </li>

        <li class="pagination-item">
            <button type="button" @click="onClickLastPage" :disabled="isInLastPage">
                Last
            </button>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    maxVisibleButtons: {
        type: Number,
        required: false,
        default: 5
    },
    totalPages: {
        type: Number,
        required: true
    },
    perPage: {
        type: Number,
        required: true
    },
    currentPage: {
        type: Number,
        required: true
    }
})

const emit = defineEmits(['pagechanged'])

const startPage = computed(() => {
    // When on the first page
    if (props.currentPage === 1) {
        return 1;
    }

    // When on the last page
    if (props.currentPage === props.totalPages) {
        const start = props.totalPages - (props.maxVisibleButtons - 1);

        return start === 0 ? 1 : start
    }

    // When inbetween
    return props.currentPage - 1;
})
const pages = computed(() => {
    const range = [];
    
    for (let i = startPage.value; i <= Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages); i++) {
        range.push({
            name: i,
            isDisabled: i === props.currentPage
        });
    }
    return range;
})

const isInFirstPage = computed(() => {
    return props.currentPage === 1;
})

const isInLastPage = computed(() => {
    return props.currentPage === props.totalPages;
})

const onClickFirstPage = () => {
    emit('pagechanged', 1)
}

const onClickPreviousPage = () => {
    emit('pagechanged', props.currentPage - 1);
}
const onClickPage = (page: number) => {
    emit('pagechanged', page);
}
const onClickNextPage = () => {
    emit('pagechanged', props.currentPage + 1);
}
const onClickLastPage = () => {
    emit('pagechanged', props.totalPages);
}
</script>

<style scoped>
.pagination {
    list-style-type: none;
}

.pagination-item {
    display: inline-block;
}

.active {
    background-color: #4AAE9B;
    color: #ffffff;
}
</style>