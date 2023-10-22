<template>
    <div>
      <v-select v-model="filterData" :options="options" :label="filter" :placeholder="placeholder" @update:modelValue="onInput"></v-select>
    </div>
  </template>
  
  <script>
  import { getEachFilterData } from '@/services/apiReq.js'
  import { onMounted, ref } from 'vue';
  export default {
    props: {
        filter: String,
        placeholder: String
    },
    setup(props, {emit}){
      const filterData = ref('')
      const options = ref([])
      
      const fetchData = async () => {
        try {
            if (props.filter !== 'situacion_actual'){
                const res = await getEachFilterData(props.filter)
                options.value = res.data.results.filter(result => result[props.filter]).map(result => result[props.filter])
            } else {
                options.value = ['ACTIVO', 'CONTROLADO', 'EXTINGUIDO']
            }
        } catch (error) {
            console.error('Error:', error)
        }
      }
      const onInput = () => {
        emit('selected', { 
          filterName: props.filter,
          filterData: filterData.value
        });
      }
      
      onMounted(()=> {
        fetchData()
        const savedFilters = JSON.parse(localStorage.getItem('filters'))
        if (savedFilters) {
          filterData.value = savedFilters[props.filter]
        }
      })

      return {
        filterData,
        options, 
        onInput
      }
    }
  };
  </script>
  