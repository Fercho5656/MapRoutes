<template>
  <div ref="div" class="h-screen"></div>
</template>

<script setup lang="ts">
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

const config = useRuntimeConfig()
const currentLocation = ref<GeolocationCoordinates>()
const div = ref<HTMLElement>()
const map = ref<mapboxgl.Map>()

onMounted(() => {
  navigator.geolocation.getCurrentPosition(onSuccess, onError, {
    enableHighAccuracy: true
  })
  mapboxgl.accessToken = config.public.MAPBOX_PUBLIC_TOKEN
  map.value = new mapboxgl.Map({
    container: div.value!,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: { lat: 0, lng: 0 },
    zoom: 10
  })
  map.value.addControl(new mapboxgl.NavigationControl())
})

const onSuccess = (pos: GeolocationPosition) => {
  // save coords in store
  currentLocation.value = pos.coords
  map.value?.setCenter({ lat: currentLocation.value.latitude, lng: currentLocation.value.longitude })
}

const onError = (err: GeolocationPositionError) => {
  // show error notify and ask for permission again
  alert(err.message)
}
</script>

<style scoped>

</style>