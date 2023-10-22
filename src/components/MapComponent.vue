<template>
    <ol-map
      ref="map"
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 700px"
    >
      <ol-view
        ref="view"
        :center="center"
        :rotation="rotation"
        :zoom="zoom"
        :projection="projection"
      />
  
      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>
  
      <ol-interaction-clusterselect
        @select="featureSelected"
        :pointRadius="20"
        :featureStyle="featureStyle"
      >
        <!-- style of the marked selected from the cluster items after first click on the cluster itself -->
        <ol-style>
          <ol-style-icon :src="markerIcon" :scale="0.05"></ol-style-icon>
        </ol-style>
      </ol-interaction-clusterselect>
  
      <ol-animated-clusterlayer :animationDuration="500" :distance="40">
        <ol-source-vector ref="vectorsource">
          <ol-feature v-for="(item, index) in dataToShow" :key="index">
            <ol-geom-point
              :coordinates="[
                item.posicion.lon,
                item.posicion.lat,
              ]"
            ></ol-geom-point>
          </ol-feature>
        </ol-source-vector>
  
        <ol-style :overrideStyleFunction="overrideStyleFunction">
          <ol-style-stroke color="red" :width="2"></ol-style-stroke>
          <ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>
  
          <ol-style-circle :radius="20">
            <ol-style-stroke
              color="black"
              :width="15"
              :lineDash="[]"
              lineCap="butt"
            ></ol-style-stroke>
            <ol-style-fill color="black"></ol-style-fill>
          </ol-style-circle>
  
          <ol-style-text>
            <ol-style-fill color="white"></ol-style-fill>
          </ol-style-text>
        </ol-style>
      </ol-animated-clusterlayer>
    </ol-map>
    <div id="popup" style="display: none;">
      <div v-for="(item, idx) in dataDetail" :key="idx">
        <p>Fecha Inicio: <span>{{ item.fecha_inicio }}</span></p>
        <p>Situación Actual: <span>{{ item.situacion_actual }}</span></p>
        <p>Coordenadas: <span>Lon:{{ item.posicion?.lon || '-' }} / Lat:{{ item.posicion?.lat || '-' }}</span></p>
      </div>
    </div>
  </template>
  
<script setup>
  import { defineProps } from 'vue';
  const props = defineProps({
    dataToShow: Array
  });

  import { ref } from "vue";
  import { Style, Stroke, Circle, Fill } from "ol/style";
  import markerIcon from "@/assets/marker.png";
  
  const center = ref([-4.7245,  41.6520]);
  const projection = ref("EPSG:4326");
  const zoom = ref(7);
  const rotation = ref(0);
  const dataDetail = ref([])
  
  // style of the "artificial" item markers and lines connected to the cluster base after first click on the cluster -->
  const featureStyle = () => {
    return [
      new Style({
        stroke: new Stroke({
          color: "#ab34c4",
          width: 2,
          lineDash: [5, 5],
        }),
        image: new Circle({
          radius: 5,
          stroke: new Stroke({
            color: "#ab34c4",
            width: 1,
          }),
          fill: new Fill({
            color: "#ab34c444",
          }),
        }),
      }),
    ];
  };
  
  const overrideStyleFunction = (feature, style) => {
    const clusteredFeatures = feature.get("features");
    const size = clusteredFeatures.length;
  
    const color = size > 20 ? "192,0,0" : size > 8 ? "255,128,0" : "0,128,0";
    const radius = Math.max(8, Math.min(size, 20));
    const dash = (2 * Math.PI * radius) / 6;
    const calculatedDash = [0, dash, dash, dash, dash, dash, dash];
  
    style.getImage().getStroke().setLineDash(dash);
    style
      .getImage()
      .getStroke()
      .setColor("rgba(" + color + ",0.5)");
    style.getImage().getStroke().setLineDash(calculatedDash);
    style
      .getImage()
      .getFill()
      .setColor("rgba(" + color + ",1)");
  
    style.getImage().setRadius(radius);
  
    style.getText().setText(size.toString());
  };

  
  
  const featureSelected = (event) => {
    const selectedFeature = event.target.getFeatures().getArray()[0]; 
  if (selectedFeature) {
    const coordinates = selectedFeature.getGeometry().getCoordinates(); 
    const popup = document.getElementById('popup');
    const resultsDataDetail = props.dataToShow.filter(el => el.posicion.lon === coordinates[0] && el.posicion.lat === coordinates[1])
    dataDetail.value = resultsDataDetail
    if(resultsDataDetail.length > 0) popup.style.display = 'block'; 
  }
  };
  </script>