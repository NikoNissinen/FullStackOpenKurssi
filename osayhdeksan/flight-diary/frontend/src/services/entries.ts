import axios from "axios"
import type { Entry } from "../components/types"

const baseUrl = "http://localhost:3000/api/diaries"

export const getAllEntries = () => {
  return axios.get<Entry[]>(baseUrl)
  .then(response => response.data)
}