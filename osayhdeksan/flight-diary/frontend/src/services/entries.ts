import axios from 'axios'
import type { Entry, NewEntry } from '../components/types'

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllEntries = () => {
  return axios.get<Entry[]>(baseUrl).then((response) => response.data)
}

export const createEntry = (newEntry: NewEntry) => {
  return axios
    .post<NewEntry>(baseUrl, newEntry)
    .then((response) => response.data)
}
