import { SortBy, type User } from '../types.d'

interface Props {
  handleDelete: (email: string) => void
  changeSorting: (sort: SortBy) => void
  showColors: boolean
  users: User[] | undefined
}

export function UsersList ({ showColors, users, handleDelete, changeSorting }: Props) {
  return (
        <table width="100%">
            <thead>
                <tr>
                    <th>Foto</th>
                    <th className='sorter' onClick={() => { changeSorting(SortBy.NAME) }}>Nombre</th>
                    <th className='sorter' onClick={() => { changeSorting(SortBy.LAST) }}>Apellido</th>
                    <th className='sorter' onClick={() => { changeSorting(SortBy.COUNTRY) }}>País</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {
                    users?.map((user, index) => {
                      const backgroundColor = index % 2 === 0 ? '#ced4da' : '#6c757d'
                      const color = showColors ? backgroundColor : '#495057'
                      const fontColor = showColors ? 'black' : 'white'
                      return (
                            <tr key={user.email} style={{ backgroundColor: color, color: fontColor }}>
                                <td><img src={user.picture.thumbnail} alt={user.name.first} /></td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.country}</td>
                                <td>
                                    <button onClick={() => { handleDelete(user.email) }}>Eliminar</button>
                                </td>
                            </tr>
                      )
                    })
                }
            </tbody>
        </table>
  )
}
