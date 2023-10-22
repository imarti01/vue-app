<template>
  <table class="table">
      <thead>
        <tr>
          <th>Fecha del parte</th>
          <th>Hora del parte</th>
          <th>Provincia</th>
          <th>Causa probable</th>
          <th>Término municipal</th>
          <th>Nivel</th>
          <th>Fecha de inicio</th>
          <th>Hora de inicio</th>
          <th>Medios de extinción</th>
          <th>Situación actual</th>
          <th>Tipo y HAS de superfície afectada</th>
          <th>Fecha extinguido</th>
          <th>Hora extinguido</th>
          <th>Código municipio INE</th>
          <th>Nivel máximo alcanzado</th>
          <th>Posición</th>
        </tr>
      </thead>
      <tbody v-if="data.length > 0">
        <tr v-for="(item, idx) in data" :key="idx">
          <td>{{ item.fecha_del_parte }}</td>
          <td>{{ item.hora_del_parte }}</td>
          <td>{{ item.length > 1 ? `${item.provincia[0]}, ${item.provincia[1]}` : item.provincia[0] }}</td>
          <td>{{ item.causa_probable }}</td>
          <td>{{ item.termino_municipal }}</td>
          <td>{{ item.nivel }}</td>
          <td>{{ item.fecha_inicio }}</td>
          <td>{{ item.hora_inicio }}</td>
          <td>{{ item.medios_de_extincion }}</td>
          <td>{{ item.situacion_actual }}</td>
          <td>{{ item.tipo_y_has_de_superficie_afectada }}</td>
          <td>{{ item.fecha_extinguido }}</td>
          <td>{{ item.hora_extinguido }}</td>
          <td>{{ item.codigo_municipio_ine }}</td>
          <td>{{ item.nivel_maximo_alcanzado }}</td>
          <td>Lon:{{ item.posicion?.lon || '-' }} / Lat:{{ item.posicion?.lat || '-' }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="16" class="no-options">No hay datos para mostrar</td>
        </tr>
      </tbody>
    </table>
</template>

<script>
export default {
  name: 'TableData',
  props: {
    data: Array
  }
}
</script>

<style scoped>
.table {
    border-collapse: collapse;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
}

.table th, .table td {
    padding: 12px 15px;
}

.table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}

.no-options {
  width: 100%;
}
</style>
