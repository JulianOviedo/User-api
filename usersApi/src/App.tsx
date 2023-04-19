import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types'
import { UsersList } from './components/UserList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res => await res.json())
      .then(data => { setUsers(data.results) })
      .catch(err => { console.log(err) })
  }, [])

  const sortedUsers = sortByCountry
    ? [...users].sort((a, b) => {
        return a.location.country.localeCompare(b.location.country)
      })
    : users

  return (
    <div className="App">
      <h1>PRUEBA TECNICA</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear Filas
        </button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? 'No ordenar por pais' : 'Ordernar por pais'}
        </button>
      </header>
      <main>
      <UsersList users={sortedUsers} showColors={showColors} />
      </main>
    </div>
  )
}

export default App
