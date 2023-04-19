import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UsersList } from './components/UserList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter(user => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
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

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter(user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    if (sorting === SortBy.COUNTRY) {
      return [...filteredUsers].sort((a, b) => a.location.country.localeCompare(b.location.country))
    }

    if (sorting === SortBy.NAME) {
      return [...filteredUsers].sort((a, b) => a.name.first.localeCompare(b.name.first))
    }

    if (sorting === SortBy.LAST) {
      return [...filteredUsers].sort((a, b) => a.name.last.localeCompare(b.name.last))
    }
  }
  , [filteredUsers, sorting])

  return (
    <div className="App">
      <h1>Users API</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear Filas
        </button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'No ordenar por pais' : 'Ordernar por pais'}
        </button>
        <button onClick={handleReset}>Resetear Estado</button>
        <input placeholder="Buscar por pais" onChange={e => { setFilterCountry(e.target.value) }} type="text" />
      </header>
      <main>
          <UsersList changeSorting={handleChangeSort} users={sortedUsers} showColors={showColors} handleDelete={handleDelete} />
      </main>
    </div>
  )
}

export default App
