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