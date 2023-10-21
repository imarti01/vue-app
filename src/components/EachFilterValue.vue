<template>
    <div>
      <v-select v-model="filterData" :options="options" :label="filter" :placeholder="placeholder" @update:modelValue="onInput"></v-select>
    </div>
  </template>
  
  <script>
  import { getEachFilterData } from '@/services/apiReq.js'
  export default {
    props: {
        filter: String,
        placeholder: String
    },
    data() {
      return {
        filterData: '',
        options: []
      };
    },
    async created() {
        this.fetchData()
    },
    methods: {
      async fetchData() {
        try {
            if (this.filter !== 'situacion_actual'){
                const res = await getEachFilterData(this.filter)
                this.options = res.data.results.filter(result => result[this.filter]).map(result => result[this.filter])
            } else {
                this.options = ['ACTIVO', 'CONTROLADO', 'EXTINGUIDO']
            }
        } catch (error) {
            console.error('Error:', error)
        }
      },
      onInput() {
        this.$emit('selected', { 
            filterName: this.filter,
            filterData: this.filterData
        });
      }

    },
  };
  </script>
  