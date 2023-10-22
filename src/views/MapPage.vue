<template>
    <div class="map-page">
        <div class="container-filters-map">
            <h2>Filtrar por coordenadas:</h2>
            <form @submit.prevent="submitFilters">
                <div class="inputs-container">
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
                </div>
                <div class="buttons-container">
                    <button class="submit-filters" type="submit">Aplicar filtros</button>
                    <button class="reset-filters" @click="resetFilters">Limpiar filtros</button>
                </div>
            </form>
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

<style scoped>
.map-page {
    padding: 0 16px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;

}

.container-filters-map {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 16px;
    width: 80%;
}

h2 {
    color: #009879;
    margin: 0;
    @media (min-width: 769px) {
        padding: 13px;
    }
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;

    
}

form div {
    width: 100%;
}

.buttons-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    @media (min-width: 769px) {
        padding-top: 13px;
    }
}

.inputs-container {
    
    @media (min-width: 769px) {
        display: flex;
        gap: 16px;
    }
}

label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2px;
    width: 100%;
    color: rgba(60, 60, 60);;
}

input {
    width: 100%;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid rgba(60, 60, 60, .26);
    height: 24px;
}

button {
    padding: 5px 10px;
    border-radius: 4px;
    border: none;
    padding: 7px 16px;
    font-size: 16px;
    cursor: pointer;

}

button:active {
    transform: scale(0.99)
}
.submit-filters {
    background-color: #009879;
    color: white;
}

</style>