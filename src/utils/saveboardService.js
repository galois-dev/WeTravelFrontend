import Axios from "axios"

export async function getAllSaveboards() {
  const res = await Axios.get("/saved/", {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }).catch(e => {
    return e
  })
  return res
}

export async function createSaveboard(name) {
  assert(typeof name === "string")
  const res = await Axios.post(
    "/saved/",
    {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      name
    }
  ).catch(e => {
    return e
  })
  return res
}

export async function deleteSaveboard(pk) {
  assert(typeof pk === "number")
  const res = await Axios.delete(
    "/saved/", {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    pk
  }
  ).catch(e => {
    return e
  })
  return res
}

export async function getDetailSaveboard(pk) {
  assert(typeof pk === "number")
  const res = await Axios.get(
    `/saved/${pk}/`,
    {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }
  )
}

export async function saveExperienceToSaveboard(exp_type, exp_pk, b_pk) {
  assert(typeof exp_type === "string")
  assert(typeof exp_pk === "number")
  assert(typeof b_pk === "number")
  const res = await Axios.post(`/saved/${b_pk}/`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    exp_type: exp_pk,
  }).catch(e => {
    return e
  })
  return res
}

export async function deleteExpFromSaveboard(exp_type, exp_pk, b_pk) {
  assert(typeof exp_type === "string")
  assert(typeof exp_pk === "number")
  assert(typeof b_pk === "number")
  const res = await Axios.delete(`/saved/${b_pk}`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    exp_type: exp_pk,
  }).catch(e => {
    return e
  })
  return res
}