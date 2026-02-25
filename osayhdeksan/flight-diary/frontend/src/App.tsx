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
    visibility: '',
    weather: '',
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
      <h1>Add new entry</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div>
        Date:
        <input
          type="date"
          id="date"
          placeholder="YYYY-MM-DD"
          value={newDiaryEntry.date}
          onChange={(e) =>
            setNewDiaryEntry({ ...newDiaryEntry, date: e.target.value })
          }
        ></input>
      </div>

      <div>
        Visibility:
        {Object.values(Visibility).map((vis) => {
          return (
            <>
              <label key={vis}>{vis}</label>
              <input
                type="radio"
                id={vis}
                name={vis}
                value={vis}
                checked={newDiaryEntry.visibility === vis}
                onChange={(e) => {
                  setNewDiaryEntry({
                    ...newDiaryEntry,
                    visibility: e.target.value as Visibility,
                  })
                }}
              />
            </>
          )
        })}
      </div>

      <div>
        Weather:
        {Object.values(Weather).map((w) => {
          return (
            <>
              <label key={w}>{w}</label>
              <input
                type="radio"
                id={w}
                name={w}
                value={w}
                checked={newDiaryEntry.weather === w}
                onChange={(e) => {
                  setNewDiaryEntry({
                    ...newDiaryEntry,
                    weather: e.target.value as Weather,
                  })
                }}
              />
            </>
          )
        })}
      </div>

      <div>
        Comment:
        <input
          type="text"
          id="comment"
          value={newDiaryEntry.comment}
          onChange={(e) =>
            setNewDiaryEntry({ ...newDiaryEntry, comment: e.target.value })
          }
        ></input>
      </div>
      <button onClick={() => handleSubmit()}>Add</button>

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
