<template>
    <div style="width: 100%; height: 400px;">
        <div>
            <h2>Filtrar por coordenadas:</h2>
            <form @submit.prevent="submitFilters">
                <label>
                    Distancia máxima (Km):
                    <input v-model="maxDistance" type="text" required pattern="[0-9]+"/>
                </label>
                <label>
                    Longitud:
                    <input v-model="longitude" type="text" required pattern="^-?\d+(?:.\d+)?$"/>
                </label>
                <label>
                    Latitud:
                    <input v-model="latitude" type="text" required pattern="^-?\d+(?:.\d+)?$"/>
                </label>
                <button type="submit">Aplicar filtros</button>
            </form>
            <button @click="resetFilters">Limpiar filtros</button>
        </div>
        <MapComponent :dataToShow="dataToShow" />
    </div>
</template>

<script>

import MapComponent from '@/components/MapComponent.vue'
import { getAllMapData } from '@/services/apiReq';
import { onMounted, ref } from 'vue';

export default {
    name: 'MapPage',
    components: {
        MapComponent
    },
    setup() {
        const allData = ref([])
        const dataToShow = ref([]);
        const maxDistance = ref("");
        const longitude = ref("");
        const latitude = ref("");

        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const earthRadio = 6371;

            const lat1Rad = (Math.PI / 180) * lat1;
            const lon1Rad = (Math.PI / 180) * lon1;
            const lat2Rad = (Math.PI / 180) * lat2;
            const lon2Rad = (Math.PI / 180) * lon2;

            const dLat = lat2Rad - lat1Rad;
            const dLon = lon2Rad - lon1Rad;

            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = earthRadio * c;

            return distance;
        }


        
        const submitFilters = () => {
            const nearbyCoordinates = allData.value.filter(el => {
                const distance = calculateDistance(
                    Number(latitude.value),
                    Number(longitude.value),
                    Number(el.posicion.lat),
                    Number(el.posicion.lon)
                );
    
                return distance <= maxDistance.value;
            });
            dataToShow.value = nearbyCoordinates
        }

        const resetFilters = () => {
            dataToShow.value = allData.value
        }

        onMounted(async() => {
            try {
            const res = await getAllMapData()
            allData.value = res.data.results
            dataToShow.value = res.data.results
            } catch (error) {
            console.error('Error:', error)
            }
        })

        return {
            dataToShow,
            maxDistance,
            longitude,
            latitude,
            submitFilters,
            resetFilters
        }
}}
</script>