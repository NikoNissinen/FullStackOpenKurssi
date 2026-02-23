import { useEffect, useState } from "react"
import { getAllEntries } from "./services/entries"
import type { Entry } from "./components/types"

function App() {
  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    getAllEntries().then(data => {
    setEntries(data)
    })
  }, [])

  return (
    <>
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
