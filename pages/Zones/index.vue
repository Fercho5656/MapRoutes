<template>
  <div>
    <f-modal :show="showZoneModal" @close="showZoneModal = false">
      <div class="flex flex-col gap-y-5">
        <p class="text-center text-2xl dark:text-gray-200">Nueva Zona</p>
        <div class="flex gap-x-3">
          <label class="dark:text-gray-200 text-lg">Nombre de la zona</label>
          <input @keyup.enter="onAddZone" type="text" v-model="zoneName" />
        </div>
        <f-button @click.once="onAddZone">Añadir Zona</f-button>
      </div>
    </f-modal>
    <f-modal :show="showEditZoneModal" @close="showEditZoneModal = false">
      <div class="flex flex-col gap-y-5">
        <p class="text-center text-2xl dark:text-gray-200">Editar Zona</p>
        <div class="flex gap-x-3">
          <label class="dark:text-gray-200 text-lg">Nombre de la zona</label>
          <input @keyup.enter="onUpdateZone" type="text" v-model="zoneName" />
        </div>
        <f-button @click="onUpdateZone">Editar Zona</f-button>
      </div>
    </f-modal>
    <header class="w-full relative flex gap-x-5 justify-center items-start">
      <nuxt-link to="/" class="absolute left-0">
        <arrow-left-icon class="w-10 h-w-10 dark:text-white" />
      </nuxt-link>
      <h1 class="text-3xl dark:text-gray-200 font-semibold text-center mb-5">Zonas</h1>
      <f-button @click="showZoneModal = true">Añadir Zona</f-button>
      <f-button @click="onDeleteSelected" :disabled="selectedZones.length <= 0" color="danger">Eliminar
        Zonas</f-button>
    </header>
    <f-table>
      <f-thead>
        <tr>
          <th scope="col" class="p-4 text-center">
            <div class="flex items-center">
              <input id="checkbox-all-search" type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="checkbox-all-search" class="sr-only">checkbox</label>
            </div>
          </th>
          <th scope="col" class="py-3 px-6 text-center">
            Nombre
          </th>
          <th scope="col" class="py-3 px-6 text-center">
            Acción
          </th>
        </tr>
      </f-thead>
      <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-for="zona in zones" :key="zona.id">
          <td class="p-4 w-4">
            <div class="flex items-center">
              <input @click="onAddSelected(zona.id!)" id="checkbox-table-search-1" type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
            </div>
          </td>
          <td scope="row" class="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
            <div class="pl-3 w-full">
              <p class="text-center text-base font-semibold">{{ zona.name }}</p>
            </div>
          </td>
          <td class="py-4 px-6">
            <div class="flex items-center justify-around">
              <button @click="onBeforeUpdateZone(zona.id!)" class="h-7 w-7 text-yellow-500">
                <!-- Modal toggle -->
                <PencilIcon />
              </button>
              <button @click="onDeleteZone(zona.id!)" class="h-7 w-7 text-red-500">
                <TrashIcon />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </f-table>
  </div>
</template>

<script setup lang="ts">
import { PencilIcon, TrashIcon, ArrowLeftIcon } from '@heroicons/vue/24/solid';
import IZone from '~~/interfaces/IZone';
import { getZones, addZone, deleteZone, updateZone } from '~~/services/zones'
useHead({
  title: 'Zonas'
})

const zones = ref<IZone[]>()
const selectedZones = ref<number[]>([])
const zoneToEdit = ref<number>()
const showZoneModal = ref<boolean>(false)
const showEditZoneModal = ref<boolean>(false)
const zoneName = ref('')

const onAddSelected = (zoneId: number) => {
  if (selectedZones.value.includes(zoneId)) {
    selectedZones.value = selectedZones.value.filter((id) => id !== zoneId)
  } else {
    selectedZones.value.push(zoneId)
  }
}

const onDeleteSelected = async () => {
  if (!confirm('¿Estás seguro de eliminar las zonas seleccionadas?')) return
  await Promise.all(selectedZones.value.map((id) => deleteZone(id)))
  useToast({
    title: 'Zonas eliminadas',
    text: 'Las zonas seleccionadas han sido eliminadas',
    status: 'success',
    autotimeout: 5000,
    autoclose: true,
  })
  zones.value = zones.value?.filter((zone) => !selectedZones.value.includes(zone.id!))
  selectedZones.value = []
}

const onAddZone = async () => {
  const newZone = await addZone({ name: zoneName.value })
  if (newZone.error) {
    return useToast({
      title: 'Error',
      text: newZone.error.message,
      status: 'error',
      autotimeout: 5000,
      autoclose: true,
    })
  }

  useToast({
    title: 'Zona añadida',
    text: 'La zona ha sido añadida correctamente',
    status: 'success',
    autotimeout: 5000,
    autoclose: true,
  })
  zones.value?.push(newZone.data as IZone)
  showZoneModal.value = false
  zoneName.value = ''
}

const onBeforeUpdateZone = (zoneId: number) => {
  zoneName.value = zones.value?.find((zone) => zone.id === zoneId)?.name || ''
  zoneToEdit.value = zoneId
  showEditZoneModal.value = true
}

const onUpdateZone = async () => {
  const updatedZone = await updateZone(zoneToEdit.value!, { name: zoneName.value })
  if (updatedZone.error) {
    return useToast({
      title: 'Error',
      text: updatedZone.error.message,
      status: 'error',
      autotimeout: 5000,
      autoclose: true,
    })
  }
  useToast({
    title: 'Zona actualizada',
    text: 'La zona ha sido actualizada correctamente',
    status: 'success',
    autotimeout: 5000,
    autoclose: true,
  })
  zones.value = zones.value?.map((zone: IZone) => zone.id === zoneToEdit.value ? updatedZone.data as IZone : zone)
  showEditZoneModal.value = false
  zoneName.value = ''
  zoneToEdit.value = 0
}

const onDeleteZone = async (zoneId: number) => {
  if (!confirm('¿Estás seguro de eliminar esta zona?')) return
  const deletedZone = await deleteZone(zoneId)
  if (deletedZone.error) {
    return useToast({
      title: 'Error',
      text: deletedZone.error.message,
      status: 'error',
      autotimeout: 5000,
      autoclose: true,
    })
  }
  useToast({
    title: 'Zona eliminada',
    text: 'La zona ha sido eliminada correctamente',
    status: 'success',
    autotimeout: 5000,
    autoclose: true,
  })
  zones.value = zones.value?.filter(zone => zone.id !== zoneId)
}

onMounted(async () => {
  zones.value = await getZones().then((res) => res.data as IZone[])
})
</script>

<style scoped>

</style>