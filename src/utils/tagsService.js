import axios from "axios";

export async function getTravels() {
  const res = await axios.get("/traveltags/");
  if (res.data) return res.data
}

export async function getInterests() {
  const res = await axios.get("/interests/");
  if (res.data) return res.data
}

export async function getTastes() {
  const res = await axios.get("/tastes/");
  if (res.data) return res.data
}