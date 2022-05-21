import {useState, useContext} from 'react'
import { AppContext } from './AppContext'
import ListSearchThumbnail from './ListSearchThumbnail'
import LoadScreen from './LoadScreen'

function SearchLists(props) {

  const { isLoading, setIsLoading } =  useContext(AppContext)

  const [listTitleSearch, setListTitleSearch] = useState('')
  const [listSearchResults, setListSearchResults] = useState(null)

  function handleListSearch (event) {

    event.preventDefault()
    if (listTitleSearch != "") {
      setIsLoading(true)
      fetch(`/lists/search/${listTitleSearch}`, {method: "GET"})
      .then(res => res.json())
      .then((data)  =>  {
        console.log(data)
        setListSearchResults(data.lists)
        setListTitleSearch('')
        setIsLoading(false)
      })
    } else {
      return
    }
  }

  return !isLoading ? (

    <div style={{margin: '20px'}} className='flex-column-center'>
      <form onSubmit={handleListSearch}>
        <div className='flex-column-center'>
          <label htmlFor="list-title" style={{fontWeight: 'bold'}}>List:</label>
          <input
            type="text"
            id="list-title"
            value={listTitleSearch}
            onChange={(e) => setListTitleSearch(e.target.value)}
          />
        </div>
        <div className='flex-row-center'>
          <button style={{margin: '5px', fontSize: '15px'}} type="submit">Search</button>
        </div>
      </form>
      {listSearchResults 
        ?
      <div className='flex-row-center wrap'>  
        {listSearchResults.map((list) => (
          
          <ListSearchThumbnail setListSearchResults={setListSearchResults} list={list} key={list.id} />
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

export default SearchLists;