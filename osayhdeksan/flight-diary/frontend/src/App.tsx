import { useEffect, useState } from 'react'
import { createEntry, getAllEntries } from './services/entries'
import {
  type Entry,
  type NewEntry,
  Visibility,
  Weather,
} from './components/types'

function App() {
  const [entries, setEntries] = useState<Entry[]>([])
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

  const handleSubmit = () => {
    console.log(newDiaryEntry)
    createEntry(newDiaryEntry)
  }

  return (
    <>
      <div>
        <h1>Add new entry</h1>
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
