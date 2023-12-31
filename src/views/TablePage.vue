<template>
    <div class="table-page">
        <div class="filters-container">
            <EachFilterValue :placeholder="'Provincia'" :filter="'provincia'" @selected="handleSelected"/>
            <EachFilterValue :placeholder="'Causa probable'" :filter="'causa_probable'" @selected="handleSelected"/>
            <EachFilterValue :placeholder="'Situación actual'" :filter="'situacion_actual'" @selected="handleSelected"/>
            <EachFilterValue :placeholder="'Nivel máximo alcanzado'" :filter="'nivel_maximo_alcanzado'" @selected="handleSelected"/>
        </div>
        <div class="table-container">
            <TableData :data="dataToShow"/>
        </div>
        <div class="pagination-container">
            <PaginationTable 
            :totalPages="totalPages"
            :perPage="10"
            :currentPage="currentPage"
            @pagechanged="onPageChange"
            />
        </div>
    </div>
</template>

<script>
import { getFilteredData, getAllData } from '@/services/apiReq.js';
import EachFilterValue from '@/components/EachFilterValue.vue';
import TableData from '@/components/Table.vue'
import { onMounted, ref } from 'vue';
import PaginationTable from '@/components/PaginationTable.vue';
export default {
    name: 'TablePage',
    components: {
    TableData,
    EachFilterValue,
    PaginationTable
    },
    setup() {
        const currentPage = ref(1);
        const totalPages = ref(1)
        const savedFilters = JSON.parse(localStorage.getItem('filters'))
        const filters = ref(savedFilters || {
            provincia: '',
            causa_probable: '',
            situacion_actual: '',
            nivel_maximo_alcanzado: ''
        })
        const dataToShow = ref([])

        const handleSelected = async (selectedItem) => {
            if (selectedItem) {
                filters.value =  {
                    ...filters.value,
                    [selectedItem.filterName]:selectedItem.filterData
                }
            }

            try {
                let query = ''
                const arrKeysFilters = Object.keys(filters.value)
                arrKeysFilters.forEach(key => {
                    if (filters.value[key]) {
                        if (query === '') {
                            query += `${key}%20like%20"${filters.value[key]}"`
                        } else {
                            query += `%20and%20${key}%20like%20"${filters.value[key]}"%20`
                        }
                    }
                }
                )
                    
                if (!query) { 
                    localStorage.removeItem('filters')
                    return await getAllDataReq()
                }

                localStorage.setItem('filters', JSON.stringify(filters.value))
                const res = await getFilteredData(query, currentPage.value - 1)
                dataToShow.value = res.data.results
                totalPages.value = res.data.total_count - 1
            } catch (error) {
                console.error('Error:', error)
            }
        }

        const getAllDataReq = async() => {
            try {
                const res = await getAllData(currentPage.value - 1)
                dataToShow.value = res.data.results
                totalPages.value = res.data.total_count - 1
            } catch (error) {
                console.error('Error:', error)
            }
        }

        onMounted(()=>{
            if(!savedFilters) {
                getAllDataReq() 
            } else {
                handleSelected()
            }
        })

        const onPageChange = (page) => {
            currentPage.value = page;
            handleSelected()
        };

        return {
            filters,
            handleSelected,
            dataToShow,
            onPageChange,
            totalPages,
            currentPage
        }
    }
}
</script>

<style scoped>
    .table-page {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 10px;
        padding: 16px;
    }

    .filters-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
        padding: 16px 0;

        @media (min-width: 481px) {
            flex-direction: row;
            flex-wrap: wrap;
        }

    }

    .table-container {
        overflow: scroll;
        width: 100%;
        height: 60vh;
        margin-left: 0.4rem;
    }

    .pagination-container {
        width: 100%;
    }
</style>