<template>
    <table id="custom-table">
        <tr>
            <th v-if="showSelect">
                <input type="checkbox" :checked="isSelectPage" @click="onClickSelectPage" id="all"/>
            </th>
            <th v-if="showIndex">No</th>
            <th v-for="header in config.columns" :key="header.key" :class="classBinding(header)" :style="{width: columnWidth(header.size)}">
                {{ header.name }}
                <span :class="sortBy" @click="onClickSort(header.key)"></span>
            </th>
        </tr>
        <tr v-for="(row, index) in listClone" :key="`${row}`">
            <td v-if="showSelect">
                <input type="checkbox" v-model="selected" :value="row"/>
            </td>
            <td v-if="showIndex">
                {{ handleIndexing(index) + 1 }}
            </td>
            <slot name="row" :row="row"></slot>
        </tr>
    </table>

    <br>
    <Pagination v-if="showPagination" :totalPages="total" :perPage="pageSize" :currentPage="pageNumber" @pagechanged="[onPageChange($event), onClearSelect()]" />
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, toRefs, watch } from 'vue';
import type { ColumnHeader, KeyValue, TableConfig } from '@/components/TableComponent/TableComponent.type'

const Pagination = defineAsyncComponent(() => import('./PaginationComponent.vue'))

const props = defineProps<{
    config: TableConfig
}>()

const emit = defineEmits(['pageChange', 'selected'])

const { list, total, pageNumber, pageSize } = toRefs(props.config.data)
const listClone = ref(list.value)
watch(list, (updatedList) => {
    listClone.value = updatedList
})


//indexing ===============================================================================
const showIndex = ref(props.config.options.includes('index'))
const handleIndexing = (index: number): number => {
    return pageNumber.value * pageSize.value - pageSize.value + index
}

//pagination =============================================================================
const showPagination = ref(props.config.options.includes('pagination'))
const onPageChange = (pageNumber: number) => {
    emit('pageChange', pageNumber)
}

//selectable =============================================================================
const selected = ref<KeyValue[]>([])
const isSelectPage = ref(false)
const showSelect = ref(props.config.options.includes('selectable'))

//handle select page
const onClickSelectPage = (e: MouseEvent) => {

    isSelectPage.value = Boolean((e.target as HTMLInputElement).checked)
    
    if(isSelectPage.value) {
        //if select page clear previous value and push all row to select array
        selected.value = []
        listClone.value.forEach((row: KeyValue) => {
            selected.value.push(row)
        })
    } else {
        //if unselect page clear select array
        selected.value = []
    }
}

//handle clear selection
const onClearSelect = () => {
    selected.value = []
}

//handle if all the row is selected
watch(selected, (list) => {
    //break binding
    emit('selected', JSON.parse(JSON.stringify(list)))
    
    //if all the rows are selected, auto check selectPage.
    //else auto uncheck selectPage
    isSelectPage.value = list.length === props.config.data.list.length
})

//stylings ==============================================================================
const columnWidth = (size: number | undefined): string => {
    if(size) {
        return size + 'px';
    }
    return 'auto';
}

//sorting ===============================================================================
const classBinding = (header: ColumnHeader) => {
    return {
        sortable: header.sort
    }
}
const sortBy = ref('desc')
const onClickSort = (header: string) => {
    if(sortBy.value === 'desc') {
        sortBy.value = 'asc'
        handleSorting('asc', header)
    } else {
        sortBy.value = 'desc'
        handleSorting('desc', header)
    }
}
const handleSorting = (method: 'desc' | 'asc', header: string) => {
    //return same value if list is empty
    if(listClone.value.length > 0) {
        //check value type
        if(typeof list.value[0][header] === 'number') {
            listClone.value.sort((a, b) => (a[header] as any) - (b[header] as any));
        } else {
            listClone.value.sort((a, b) => {
                const nameA = a[header].toUpperCase(); // ignore upper and lowercase
                const nameB = b[header].toUpperCase(); // ignore upper and lowercase
                //check method desc or asc
                if (nameA > nameB) {
                    return method === 'desc' ? -1 : 1;
                }
                if (nameA < nameB) {
                    return method === 'desc' ? 1 : -1;
                }

                // names must be equal
                return 0;
            });
        }
    }
}
</script>

<style>
#custom-table { font-family: Arial, Helvetica, sans-serif; border-collapse: collapse; width: 100%; }

#custom-table td, #custom-table th { border: 1px solid #ddd; padding: 8px; }

#custom-table tr:nth-child(even) { background-color: #4a4747; }

#custom-table tr:hover { background-color: #dddddd20; }

#custom-table th { padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #04AA6D; color: white; }

#custom-table th span { display: none; cursor: pointer; }

#custom-table .sortable span { display: inline; }

#custom-table .sortable .desc::after { content: ' ▼' }

#custom-table .sortable .asc::after { content: ' ▲' }
</style>