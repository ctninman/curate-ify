import {useState, useContext} from 'react'
import { AppContext } from './AppContext'
import ListSearchThumbnail from './ListSearchThumbnail'
import LoadScreen from './LoadScreen'

function SearchLists({listSearchResults, setListSearchResults}) {

  const { isLoading, setIsLoading } =  useContext(AppContext)

  const [listTitleSearch, setListTitleSearch] = useState('')

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

    <div style={{margin: '20px', marginTop: '5px'}} className='flex-column-center'>
      <form onSubmit={handleListSearch}>
        <div className='flex-column-center'>
          <input
            type="text"
            id="list-title"
            value={listTitleSearch}
            onChange={(e) => setListTitleSearch(e.target.value)}
          />
        </div>
        <div className='flex-row-center'>
        <span className='back-button-outer'><button className='back-button' type="submit">ENTER</button></span>
        </div>
      </form>
      {listSearchResults 
        ?
      <div className='flex-row-center wrap'>  
        {listSearchResults.map((list) => (
          <ListSearchThumbnail componentProp='list' setListSearchResults={setListSearchResults} list={list} key={list.id} />
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