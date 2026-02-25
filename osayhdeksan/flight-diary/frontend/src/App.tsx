import { useEffect, useState } from 'react'
import { createEntry, getAllEntries } from './services/entries'
import {
  type Entry,
  type NewEntry,
  Visibility,
  Weather,
} from './components/types'
import axios from 'axios'

function App() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [newDiaryEntry, setNewDiaryEntry] = useState<NewEntry>({
    date: '',
    visibility: Visibility.Good,
    weather: Weather.Sunny,
    comment: '',
  })

  useEffect(() => {
    getAllEntries().then((data) => {
      setEntries(data)
    })
  }, [])

  const handleSubmit = async () => {
    try {
      await createEntry(newDiaryEntry)
      setErrorMessage(null)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Axios Error')
        setErrorMessage(error.response?.data)
      } else {
        console.log('Unknown Error')
        console.log(error)
        setErrorMessage('Unknown Error')
      }
    }
  }

  return (
    <>
      <div>
        <h1>Add new entry</h1>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <p>
          Date:
          <input
            type="text"
            id="date"
            placeholder="YYYY-MM-DD"
            value={newDiaryEntry.date}
            onChange={(e) =>
              setNewDiaryEntry({ ...newDiaryEntry, date: e.target.value })
            }
          ></input>
        </p>
        <p>
          Visibility:
          <input
            type="text"
            id="visibilty"
            value={newDiaryEntry.visibility}
            onChange={(e) =>
              setNewDiaryEntry({
                ...newDiaryEntry,
                visibility: e.target.value as Visibility,
              })
            }
          ></input>
        </p>
        <p>
          Weather:
          <input
            type="text"
            id="weather"
            value={newDiaryEntry.weather}
            onChange={(e) =>
              setNewDiaryEntry({
                ...newDiaryEntry,
                weather: e.target.value as Weather,
              })
            }
          ></input>
        </p>
        <p>
          Comment:
          <input
            type="text"
            id="comment"
            value={newDiaryEntry.comment}
            onChange={(e) =>
              setNewDiaryEntry({ ...newDiaryEntry, comment: e.target.value })
            }
          ></input>
        </p>
        <button onClick={() => handleSubmit()}>Add</button>
      </div>

      <h1>Diary entries</h1>
      {entries.map((entry) => (
        <div key={entry.id}>
          <h2>{entry.date}</h2>
          <p>Weather: {entry.weather}</p>
          <p>Visibility: {entry.visibility}</p>
        </div>
      ))}
    </>
  )
}

export default App
