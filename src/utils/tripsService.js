import axios from "axios"

async function getTrips(filters, page = 0) {
  const { results } = await axios.get(
    `/inspiration/trips/`, {
    headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
    data: {
      filters,
      page
    },
  })
  return results
}

async function getProfiles(filters, page = 0) {
  const { results } = await axios.get(
    `/inspiration/profiles/`, {
    headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
    data: {
      filters,
      page
    },
  })
  return results
}

async function getRestaurants(filters, page = 0) {
  const { results } = await axios.get(
    `/inspiration/restaurannts/`, {
    headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
    data: {
      filters,
      page
    },
  })
  return results
}

async function getActivities(filters, page = 0) {
  const { results } = await axios.get(
    `/inspiration/activities/`, {
    headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
    data: {
      filters,
      page
    },
  })
  return results
}