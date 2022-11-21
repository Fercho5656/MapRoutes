import { getRoute } from "~~/services/routes"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { id } = to.params

  const route = await getRoute(Number(id))
  if (route.error) {
    return navigateTo('/routes')
  }
  if (!route.data) {
    return navigateTo('/routes')
  }

  return
})