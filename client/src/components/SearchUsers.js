import {useState, useContext} from 'react'
import { AppContext } from './AppContext'
import LoadScreen from './LoadScreen'
import UserSearchThumbnail from './UserSearchThumbnail'

function SearchUsers(props) {

  const { isLoading, setIsLoading } =  useContext(AppContext)

  const [userTitleSearch, setUserTitleSearch] = useState('')
  const [userSearchResults, setUserSearchResults] = useState(null)

  function handleUserSearch (event) {

    event.preventDefault()
    if (userTitleSearch != "") {
      setIsLoading(true)
      fetch(`/users/search/${userTitleSearch}`, {method: "GET"})
      .then(res => res.json())
      .then((data)  =>  {
        console.log(data)
        setUserSearchResults(data.users)
        setUserTitleSearch('')
        setIsLoading(false)
      })
    } else {
      return
    }
  }

  return !isLoading ? (

    <div style={{margin: '20px'}} className='flex-column-center'>
      <form onSubmit={handleUserSearch}>
        <div className='flex-column-center'>
          <label htmlFor="user-title" style={{fontWeight: 'bold'}}>User:</label>
          <input
            type="text"
            id="user-title"
            value={userTitleSearch}
            onChange={(e) => setUserTitleSearch(e.target.value)}
          />
        </div>
        <div className='flex-row-center'>
          <button style={{margin: '5px', fontSize: '15px'}} type="submit">Search</button>
        </div>
      </form>
      {userSearchResults 
        ?
      <div className='flex-row-center wrap'>  
        {userSearchResults.map((user) => (
          
          <UserSearchThumbnail user={user} key={user.id} />
          // <img src={album.images[2].url} />
        ))}
      </div>
          :
        null

      }
    </div>

  )
      :
  <LoadScreen />
}

export default SearchUsers;