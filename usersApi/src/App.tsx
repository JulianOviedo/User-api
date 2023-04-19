import { useEffect, useRef, useState } from 'react'
import './App.css'
import { type User } from './types'
import { UsersList } from './components/UserList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter(user => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res => await res.json())
      .then(data => {
        setUsers(data.results)
        originalUsers.current = data.results
      })
      .catch(err => { console.log(err) })
  }, [])

  const filteredUsers =
    typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter(user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
      : users

  const sortedUsers = sortByCountry
    ? filteredUsers.sort((a, b) => {
      return a.location.country.localeCompare(b.location.country)
    })
    : filteredUsers

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
        <button onClick={handleReset}>Resetear Estado</button>
        <input placeholder="Buscar por pais" onChange={e => { setFilterCountry(e.target.value) }} type="text" />
      </header>
      <main>
      <UsersList users={sortedUsers} showColors={showColors} handleDelete={handleDelete} />
      </main>
    </div>
  )
}

export default App
