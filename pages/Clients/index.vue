<template>
  <div>
    <f-modal :show="showClientModal" @close="showClientModal = false">
      <div class="flex flex-col gap-y-5 items-stretch">
        <p class="text-center text-2xl dark:text-gray-200">Nuevo Cliente</p>
        <div class="flex gap-x-3 justify-between flex-1">
          <label class="dark:text-gray-200 text-lg w-full">Nombre del Cliente</label>
          <input class="w-full" @keyup.enter="onAddClient" type="text" v-model="clientName" />
        </div>
        <div class="flex gap-x-3 justify-between flex-1 w-full">
          <label class="dark:text-gray-200 text-lg w-full">Dirección</label>
          <div class="relative w-full" id="autocomplete" ref="autocomplete"> </div>
        </div>
        <div class="flex gap-x-3 justify-between flex-1 w-full">
          <label class="dark:text-gray-200 text-lg w-full">Zona</label>
          <select class="w-full" v-model="clientZoneId">
            <option v-for="zone in zones" :value="zone.id" :key="zone.id">
              {{ zone.name }}
            </option>
          </select>
        </div>
        <f-button @click="onAddClient">Añadir Cliente</f-button>
      </div>
    </f-modal>
    <f-modal :show="showEditClientModal" @close="showEditClientModal = false">
      <div class="flex flex-col gap-y-5">
        <p class="text-center text-2xl dark:text-gray-200">Editar Zona</p>
        <div class="flex gap-x-3">
          <label class="dark:text-gray-200 text-lg">Nombre de la zona</label>
          <input @keyup.enter="onUpdateClient" type="text" v-model="clientName" />
        </div>
        <f-button @click.once="onUpdateClient">Editar Zona</f-button>
      </div>
    </f-modal>
    <header class="w-full relative flex gap-x-5 justify-center items-start">
      <nuxt-link to="/" class="absolute left-0">
        <arrow-left-icon class="w-10 h-w-10 dark:text-white" />
      </nuxt-link>
      <h1 class="text-3xl dark:text-gray-200 font-semibold text-center mb-5">Clientes</h1>
      <f-button @click="showClientModal = true">Añadir Zona</f-button>
      <f-button @click="onDeleteSelected" :disabled="selectedClients.length <= 0" color="danger">Eliminar
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
            Dirección
          </th>
          <th scope="col" class="py-3 px-6 text-center">
            Zona
          </th>
          <th scope="col" class="py-3 px-6 text-center">
            Acción
          </th>
        </tr>
      </f-thead>
      <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-for="client in clients" :key="client.id">
          <td class="p-4 w-4">
            <div class="flex items-center">
              <input @click="onAddSelected(client.id!)" id="checkbox-table-search-1" type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
            </div>
          </td>
          <td class="p-4 w-4">
            <div class="pl-3 w-full">
              <p class="text-center text-base font-semibold">{{ client.name }}</p>
            </div>
          </td>
          <td class="p-4 w-4">
            <div class="pl-3 w-full">
              <p class="text-center text-base font-semibold">{{ client.address }}</p>
            </div>
          </td>
          <td class="p-4 w-4">
            <div class="pl-3 w-full">
              <p class="text-center text-base font-semibold">{{ client.zone?.name }}</p>
            </div>
          </td>
          <td class="p-4 w-4">
            <div class="flex items-center justify-around">
              <button @click="onBeforeUpdateClient(client.id!)" class="h-7 w-7 text-yellow-500">
                <!-- Modal toggle -->
                <PencilIcon />
              </button>
              <button @click="onDeleteClient(client.id!)" class="h-7 w-7 text-red-500">
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
import IClient from '~~/interfaces/IClient';
import { getClients, addClient, deleteClient, updateClient } from '~~/services/clients'
import { getZones } from '~~/services/zones';
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'
import IZone from '~~/interfaces/IZone';

useHead({
  title: 'Zonas'
})

const clients = ref<IClient[]>()
const zones = ref<IZone[]>()
const selectedClients = ref<number[]>([])
const clientToEdit = ref<number>()
const showClientModal = ref<boolean>(false)
const showEditClientModal = ref<boolean>(false)
const clientName = ref('')
const clientAddress = ref('')
const clientLat = ref('')
const clientLng = ref('')
const clientZoneId = ref<number>(0)
const config = useRuntimeConfig()
const autocomplete = ref<HTMLElement | null>()
const autocompleter = ref<GeocoderAutocomplete>()

const onAddSelected = (clientId: number) => {
  if (selectedClients.value.includes(clientId)) {
    selectedClients.value = selectedClients.value.filter((id) => id !== clientId)
  } else {
    selectedClients.value.push(clientId)
  }
}

const onDeleteSelected = async () => {
  if (!confirm('¿Estás seguro de eliminar los clients seleccionados?')) return
  await Promise.all(selectedClients.value.map((id) => deleteClient(id)))
  useToast({
    title: 'Zonas eliminadas',
    text: 'Las zonas seleccionadas han sido eliminadas',
    status: 'success',
    autotimeout: 5000,
    autoclose: true,
  })
  clients.value = clients.value?.filter((zone) => !selectedClients.value.includes(zone.id!))
  selectedClients.value = []
}

const onAddClient = async () => {
  const newClient = await addClient({ name: clientName.value, address: clientAddress.value, lat: clientLat.value, lng: clientLng.value, zone_id: clientZoneId.value })
  if (newClient.error) {
    return useToast({
      title: 'Error',
      text: newClient.error.message,
      status: 'error',
      autotimeout: 5000,
      autoclose: true,
    })
  }

  useToast({
    title: 'Cliente añadido',
    text: 'El cliente ha sido añadido correctamente',
    status: 'success',
    autotimeout: 5000,
    autoclose: true,
  })
  console.log(newClient)
  clients.value?.push(newClient.data as IClient)
  showClientModal.value = false
  clientName.value = ''
  autocompleter.value?.setValue('')
}

const onBeforeUpdateClient = (clientId: number) => {
  clientName.value = clients.value?.find((client) => client.id === clientId)?.name || ''
  clientToEdit.value = clientId
  showEditClientModal.value = true
}

const onUpdateClient = async () => {
  const updatedClient = await addClient({ name: clientName.value, address: clientAddress.value, lat: clientLat.value, lng: clientLng.value, zone_id: clientZoneId.value })
  if (updatedClient.error) {
    return useToast({
      title: 'Error',
      text: updatedClient.error.message,
      status: 'error',
      autotimeout: 5000,
      autoclose: true,
    })
  }
  useToast({
    title: 'Cliente actualizado',
    text: 'El ciente ha sido actualizado correctamente',
    status: 'success',
    autotimeout: 5000,
    autoclose: true,
  })
  clients.value = clients.value?.map((client: IClient) => client.id === clientToEdit.value ? updatedClient.data as IClient : client)
  showEditClientModal.value = false
  clientName.value = ''
  clientToEdit.value = 0
}

const onDeleteClient = async (clientId: number) => {
  if (!confirm('¿Estás seguro de eliminar este cliente?')) return
  const deletedClient = await deleteClient(clientId)
  if (deletedClient.error) {
    return useToast({
      title: 'Error',
      text: deletedClient.error.message,
      status: 'error',
      autotimeout: 5000,
      autoclose: true,
    })
  }
  useToast({
    title: 'Cliente eliminado',
    text: 'El cliente ha sido eliminado correctamente',
    status: 'success',
    autotimeout: 5000,
    autoclose: true,
  })
  clients.value = clients.value?.filter(client => client.id !== clientId)
}


onMounted(async () => {
  clients.value = await getClients().then((res) => res.data as IClient[])
  zones.value = await getZones().then((res) => res.data as IZone[])

  autocompleter.value = new GeocoderAutocomplete(autocomplete.value!, config.public.GEOAPIFY_API_KEY)
  autocompleter.value.on('select', location => {
    console.log(location)
    clientAddress.value = location.properties.formatted
    clientLat.value = String(location.properties.lat)
    clientLng.value = String(location.properties.lon)
  })
})
</script>

<style scoped>

</style>