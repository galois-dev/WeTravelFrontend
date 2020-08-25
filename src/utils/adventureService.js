import store from "../store/index"
import axios from "axios"
import getAuthHeader from "./api";

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
