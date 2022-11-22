<template>
  <div>
    <f-modal :show="showRouteModal" @close="showRouteModal = false">
      <div class="flex flex-col gap-y-5">
        <p class="text-center text-2xl dark:text-gray-200">Nueva Ruta</p>
        <form ref="formRef" @submit.prevent="onAddRoute" class="flex flex-col gap-y-3">
          <div class="flex gap-x-3">
            <label class="dark:text-gray-200 text-lg">Nombre de la Ruta</label>
            <input type="text" v-model="routeName" />
          </div>
          <div class="flex gap-x-3 justify-between flex-1">
            <label class="dark:text-gray-200 text-lg w-full">Vendedor</label>
            <select class="w-full" v-model="routeSellerId">
              <option v-for="seller in sellers" :value="seller.id" :key="seller.id">
                {{ seller.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col gap-3 justify-between flex-1">
            <header class="flex w-full justify-between align-center">
              <p class="dark:text-white text-lg font-semibold">Destinos</p>
              <f-button color="primary" type="button" @click="addDestination">Añadir Destino</f-button>
            </header>
            <div class="flex w-full flex-1" v-for="(destination, index) in destinations" :key="destination">
              <label class="dark:text-gray-200 text-lg w-full">Destino {{ index + 1 }}</label>
              <select v-model="destinations[index]" :name='`destino-${index}`' class="w-full">
                <option v-for="client in clients" :value="client.id" :key="client.id">
                  {{ client.name }}
                </option>
              </select>
              <f-button type="button" color="danger" @click="deleteDestination(index)">X</f-button>
            </div>
          </div>
          <f-button type="submit">Añadir Ruta</f-button>
        </form>
      </div>
    </f-modal>
    <f-modal :show="showEditRouteModal" @close="showEditRouteModal = false">
      <div class="flex flex-col gap-y-5">
        <p class="text-center text-2xl dark:text-gray-200">Editar Ruta</p>
        <div class="flex flex-col gap-y-3">
          <div class="flex gap-x-3">
            <label class="dark:text-gray-200 text-lg">Nombre de la Ruta</label>
            <input type="text" v-model="routeName" />
          </div>
          <div class="flex gap-x-3 justify-between">
            <label class="dark:text-gray-200 text-lg">Vendedor</label>
            <select v-model="routeSellerId">
              <option v-for="seller in sellers" :value="seller.id" :key="seller.id">
                {{ seller.name }}
              </option>
            </select>
          </div>
          <div class="flex gap-x-3 justify-between">
            <label class="dark:text-gray-200 text-lg">¿Completada?</label>
            <input type="checkbox" v-model="routeIsCompleted">
          </div>
        </div>
        <f-button @click.once="onUpdateRoute">Editar Ruta</f-button>
      </div>
    </f-modal>
    <header class="w-full relative flex gap-x-5 justify-center items-start">
      <nuxt-link to="/" class="absolute left-0">
        <arrow-left-icon class="w-10 h-w-10 dark:text-white" />
      </nuxt-link>
      <h1 class="text-3xl dark:text-gray-200 font-semibold text-center mb-5">Rutas</h1>
      <f-button @click="showRouteModal = true">Añadir Ruta</f-button>
      <f-button @click="onDeleteSelected" :disabled="selectedRoutes.length <= 0" color="danger">Eliminar
        Rutas</f-button>
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
            Vendedor
          </th>
          <th scope="col" class="py-3 px-6 text-center">
            ¿Completada?
          </th>
          <th scope="col" class="py-3 px-6 text-center">
            Acción
          </th>
        </tr>
      </f-thead>
      <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-for="route in routes" :key="route.id">
          <td class="p-4 w-4">
            <div class="flex items-center">
              <input @click="onAddSelected(route.id!)" id="checkbox-table-search-1" type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
            </div>
          </td>
          <td class="py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
            <div class="pl-3 w-full">
              <p class="text-center text-base font-semibold">{{ route.name }}</p>
            </div>
          </td>
          <td class="py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
            <div class="pl-3 w-full">
              <p class="text-center text-base font-semibold">{{ route.seller?.name }}</p>
            </div>
          </td>
          <td class="py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
            <div class="pl-3 w-full">
              <p class="text-center text-base font-semibold">{{ route.is_completed ? 'Si' : 'No' }}</p>
            </div>
          </td>
          <td class="py-4 px-6">
            <div class="flex items-center justify-around">
              <button @click="onBeforeUpdateRoute(route.id!)" class="h-7 w-7 text-yellow-500">
                <!-- Modal toggle -->
                <PencilIcon />
              </button>
              <nuxt-link :to='`/routes/${route.id}`' class="h-7 w-7 text-green-500">
                <MapIcon />
              </nuxt-link>
              <button @click="onDeleteRoute(route.id!)" class="h-7 w-7 text-red-500">
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
import { PencilIcon, TrashIcon, MapIcon, ArrowLeftIcon } from '@heroicons/vue/24/solid';
import IClient from '~~/interfaces/IClient';
import IRoute from '~~/interfaces/IRoute';
import ISeller from '~~/interfaces/ISeller';
import { getClients } from '~~/services/clients';
import { getRoutes, addRoute, deleteRoute, updateRoute } from '~~/services/routes'
import { addClientRoute } from '~~/services/clientRoute';
import { getSellers } from '~~/services/sellers';
useHead({
  title: 'Rutas'
})

const routes = ref<IRoute[]>()
const sellers = ref<ISeller[]>()
const selectedRoutes = ref<number[]>([])
const routeToEdit = ref<number>()
const showRouteModal = ref<boolean>(false)
const showEditRouteModal = ref<boolean>(false)
const routeName = ref<string>('')
const routeSellerId = ref<number>(0)
const routeIsCompleted = ref<boolean>(false)
const clients = ref<IClient[]>([])
const destinations = ref<number[]>([1])
const formRef = ref<HTMLFormElement>()

const onAddSelected = (routeId: number) => {
  if (selectedRoutes.value.includes(routeId)) {
    selectedRoutes.value = selectedRoutes.value.filter((id) => id !== routeId)
  } else {
    selectedRoutes.value.push(routeId)
  }
}

const onDeleteSelected = async () => {
  if (!confirm('¿Estás seguro de eliminar las rutas seleccionadas?')) return
  await Promise.all(selectedRoutes.value.map((id) => deleteRoute(id)))
  useToast({
    title: 'Rutas eliminadas',
    text: 'Las rutas seleccionadas han sido eliminadas',
    status: 'success',
    autotimeout: 5000,
    autoclose: true,
  })
  routes.value = routes.value?.filter((route) => !selectedRoutes.value.includes(route.id!))
  selectedRoutes.value = []
}

const onAddRoute = async (e: Event) => {

  console.log(destinations.value)

  const newRoute = await addRoute({ name: routeName.value, seller_id: routeSellerId.value })

  await Promise.all(destinations.value.map((destination, idx) => {
    return addClientRoute({ order: idx, client_id: destination, route_id: (newRoute.data as IRoute).id! })
  }))

  if (newRoute.error) {
    return useToast({
      title: 'Error',
      text: newRoute.error.message,
      status: 'error',
      autotimeout: 5000,
      autoclose: true,
    })
  }

  useToast({
    title: 'Ruta añadida',
    text: 'La ruta ha sido añadida correctamente',
    status: 'success',
    autotimeout: 5000,
    autoclose: true,
  })
  routes.value?.push(newRoute.data as IRoute)
  showRouteModal.value = false
  routeName.value = ''
  routeSellerId.value = 0
  destinations.value = [1]
}

const onBeforeUpdateRoute = (routeId: number) => {
  routeName.value = routes.value?.find((zone) => zone.id === routeId)?.name || ''
  routeSellerId.value = routes.value?.find((zone) => zone.id === routeId)?.seller_id || 0
  routeIsCompleted.value = routes.value?.find((zone) => zone.id === routeId)?.is_completed || false
  routeToEdit.value = routeId
  showEditRouteModal.value = true
}

const onUpdateRoute = async () => {
  const updatedRoute = await updateRoute(routeToEdit.value!, { name: routeName.value, seller_id: routeSellerId.value, is_completed: routeIsCompleted.value })
  if (updatedRoute.error) {
    return useToast({
      title: 'Error',
      text: updatedRoute.error.message,
      status: 'error',
      autotimeout: 5000,
      autoclose: true,
    })
  }
  useToast({
    title: 'Ruta actualizada',
    text: 'La ruta ha sido actualizada correctamente',
    status: 'success',
    autotimeout: 5000,
    autoclose: true,
  })
  routes.value = routes.value?.map((route: IRoute) => route.id === routeToEdit.value ? updatedRoute.data as IRoute : route)
  showEditRouteModal.value = false
  routeName.value = ''
  routeToEdit.value = 0
}

const onDeleteRoute = async (routeId: number) => {
  if (!confirm('¿Estás seguro de eliminar esta ruta?')) return
  const deletedRoute = await deleteRoute(routeId)
  if (deletedRoute.error) {
    return useToast({
      title: 'Error',
      text: deletedRoute.error.message,
      status: 'error',
      autotimeout: 5000,
      autoclose: true,
    })
  }
  useToast({
    title: 'Ruta eliminada',
    text: 'La ruta ha sido eliminada correctamente',
    status: 'success',
    autotimeout: 5000,
    autoclose: true,
  })
  routes.value = routes.value?.filter(zone => zone.id !== routeId)
}

const addDestination = () => {
  destinations.value.push(1)
}

const deleteDestination = (destinationIdx: number) => {
  console.log(destinationIdx)
  console.log(destinations.value)
  destinations.value = destinations.value.slice(0, destinationIdx).concat(destinations.value.slice(destinationIdx + 1))
  console.log(destinations.value)
}

onMounted(async () => {
  routes.value = await getRoutes().then((res) => res.data as IRoute[])
  sellers.value = await getSellers().then((res) => res.data as ISeller[])
  clients.value = await getClients().then((res) => res.data as IClient[])
})
</script>

<style scoped>

</style>