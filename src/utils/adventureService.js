import store from "../store/index"
import axios from "axios"
import getAuthHeader from "./api";
/**
 * Travels views
 */
export async function getAdventuresByMode(mode) {
  if (!["planned", "dreams", "saved", "memories"].includes(mode)) {
    return console.error(
      "Incorrect mode setting for getAdventuresByMode(--> mode <--). Must be 'in' enum!");
  } else {
    const res = await axios.get((
      "travels/" + mode + "/"),
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
      }
    )
    return res
  }
}

export async function getCalendarSerialsedAdventure(pk) {
  if (!pk) {
    throw error("no pk provided")
  }
  const res = await axios.get(`/travels/${pk}/calendar`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    pk: pk
  })
  return res
}

export async function getTravelBookByAdventure(pk) {
  const res = await axios.get(`/travels/${pk}/travelbook/`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
  })
  return res
}

export async function updateTravelBookByAdventure(pk, tb) {
  return await axios.post(`/travels/${pk}/travelbook/`, {
    data: tb
  })
}
export async function getTravelsByUser(pk) {
  if (!pk) {
    throw error("no pk provided")
  }
  const config = {
    method: "get",
    url: `/travels/user/${pk}/`,
  }
  return await axios(config)
}

export async function uploadImagesToAdevnture(pk, files) { }

/**
 * Inspiration views
 */
export async function getTrips(filters, page = 0) {
  const results = await axios.get(
    `/inspiration/trips/`, {
    headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
    data: {
      filters,
      page
    },
  })
  return results
}

export async function getProfiles(filters, page = 0) {
  const results = await axios.get(
    `/inspiration/profiles/`, {
    headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
    data: {
      filters,
      page
    },
  })
  return results
}

export async function getRestaurants(filters, page = 0) {
  const results = await axios.get(
    `/inspiration/restaurannts/`, {
    headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
    data: {
      filters,
      page
    },
  })
  return results
}

export async function getActivities(filters, page = 0) {
  const results = await axios.get(
    `/inspiration/activities/`, {
    headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
    data: {
      filters,
      page
    },
  })
  return results
}