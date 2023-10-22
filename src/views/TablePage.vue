<template>
    <div class="table-page">
        <div>
            <h4>Filtros:</h4>
            <EachFilterValue :placeholder="'Provincia'" :filter="'provincia'" @selected="handleSelected"/>
            <EachFilterValue :placeholder="'Causa probable'" :filter="'causa_probable'" @selected="handleSelected"/>
            <EachFilterValue :placeholder="'Situación actual'" :filter="'situacion_actual'" @selected="handleSelected"/>
            <EachFilterValue :placeholder="'Nivel máximo alcanzado'" :filter="'nivel_maximo_alcanzado'" @selected="handleSelected"/>
        </div>
        <TableData :data="dataToShow"/>
        <PaginationTable 
          :totalPages="totalPages"
          :perPage="10"
          :currentPage="currentPage"
          @pagechanged="onPageChange"
        />
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
                totalPages.value = res.data.total_count
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