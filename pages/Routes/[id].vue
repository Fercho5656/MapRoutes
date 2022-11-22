<template>
  <nuxt-link to="/" class="absolute left-16 top-2 z-[9999] bg-gray-500/40 rounded-md flex items-center p-3">
    <arrow-left-icon class="w-10 h-w-10 text-gray-900" />
    <p class="font-semibold text-xl text-gray-900">Regresar a rutas</p>
  </nuxt-link>
  <div ref="mapRef" class="h-screen"></div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/24/solid';
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { getClientsByRoute } from '~~/services/clientRoute';
import { GeoJsonObject } from 'geojson';

definePageMeta({
  middleware: ['check-route'],
  layout: 'map',
})
const route = useRoute()
const { id } = route.params
const mapRef = ref<HTMLElement>()
const config = useRuntimeConfig()
const routeData = ref()

const fromWaypoint = [38.937165, -77.045590]; // latutude, longitude
const toWaypoint = [38.881152, -76.990693]; // latitude, longitude
const url = `https://api.geoapify.com/v1/routing?waypoints=${fromWaypoint.join(',')}|${toWaypoint.join(',')}&mode=drive&apiKey=${config.public.GEOAPIFY_API_KEY}`;

// routeData.value = await useFetch(url).then(res => res.data.value)
console.log(routeData.value)

onMounted(async () => {
  // get route waypoints in order
  const routeMap = await getClientsByRoute(Number(id))
  // iterate over waypoints and make api fetch
  const clientsCoords = routeMap.data?.map((route: any) => [Number(route.client?.lat), Number(route.client?.lng)])
  const url = `https://api.geoapify.com/v1/routing?waypoints=${clientsCoords!.join('|')}&mode=drive&apiKey=${config.public.GEOAPIFY_API_KEY}`;
  const routeData = await useFetch(url).then(res => res.data.value)
  // center map by first waypoint
  const map = L.map(mapRef.value!, {
    center: clientsCoords![0] as L.LatLngExpression,
    zoom: 15,
    zoomControl: true,
    attributionControl: false
  })

  // add mapbox tile
  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: config.public.MAPBOX_PUBLIC_TOKEN
  }).addTo(map)

  // generate route line
  L.geoJSON(routeData as GeoJsonObject, {
    style: (_) => {
      return {
        color: 'rgba(20, 137, 255, 0.7)',
        weight: 5
      }
    }
  }).bindPopup((layer) => {
    return `${layer.feature.properties.distance} ${layer.feature.properties.distance_units}, ${layer.feature.properties.time}`
  }).addTo(map)

  // add markers to map
  clientsCoords!.forEach((coords, index) => {
    L.marker(coords as L.LatLngExpression).addTo(map)
      .bindPopup(`Client ${index + 1}`)
  })
})
</script>

<style scoped>

</style>