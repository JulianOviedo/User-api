import { useEffect, useRef, useState } from 'react'
import './App.css'
import { type User } from './types'
import { UsersList } from './components/UserList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)

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
        <button onClick={handleReset}>Resetear Estado</button>
      </header>
      <main>
      <UsersList users={sortedUsers} showColors={showColors} handleDelete={handleDelete} />
      </main>
    </div>
  )
}

export default App
