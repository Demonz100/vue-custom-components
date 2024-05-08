<template>
    <TableComponent :config="tableConfig" @pageChange="handlePageChange" @selected="handleSelectedRow">
        <template v-slot:row="{ row }">
            <td>{{ row.name }}</td>
            <td>{{ row.url }}</td>
            <td><button @click="viewRow(row)">Edit</button></td>
        </template>
    </TableComponent>
    <br><hr><br>
    <pre>{{ selectList }}</pre>
</template>

<script setup lang="ts">
import type { KeyValue, TableConfig } from '@/components/TableComponent/TableComponent.type';
import { computed, defineAsyncComponent, reactive, ref } from 'vue';

const TableComponent = defineAsyncComponent(() => import('@/components/TableComponent/TableComponent.vue'))

const tableConfig = reactive<TableConfig>({
    data: {
        list: [],
        pageNumber: 1,
        pageSize: 10,
        total: 0
    },
    options: ['index', 'pagination', 'selectable'], 
    columns: [
        {
            name: 'Pokemon Name',
            key: 'name',
            size: 200,
            sort: true
        },
        {
            name: 'Pokemon Detail Url',
            key: 'url',
            size: 500,
            sort: true
        },
        {
            name: 'Options',
            key: 'option'
        }
    ]
})

//fetch data
const url = 'https://pokeapi.co/api/v2/pokemon/'

const offset = computed(() => {
    return (tableConfig.data.pageNumber * tableConfig.data.pageSize) - 1
})

const fetchData = async (perPage: number, offset: number): Promise<any> => {
    return await fetch(`${url}?limit=${perPage}&offset=${offset}`).then((response) => {
        return response.json()
    }).catch((error) => {
        console.log(error)
    });
}

const mapForTable = async (pageSize: number, offset: number) => {
    const res = await fetchData(pageSize, offset)
    if (res) {
        tableConfig.data.list = res.results.map((data: any) => {
            return {
                name: data.name,
                url: data.url
            }
        });
        tableConfig.data.total = res.count
    }
}
mapForTable(tableConfig.data.pageSize, offset.value)

//table events
const viewRow = (row: KeyValue) => {
    console.log(row);
}
const handlePageChange = async (newPage: number) => {
    tableConfig.data.pageNumber = newPage;
    await mapForTable(tableConfig.data.pageSize, offset.value)
}

const selectList = ref<KeyValue[]>([])
const handleSelectedRow = (list: KeyValue[]) => {
    selectList.value = list
}
</script>