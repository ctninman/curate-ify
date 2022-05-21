import { useContext, useState } from 'react'
import { AppContext } from './AppContext'
import LoadScreen from './LoadScreen'
import SearchThumbnail from './SearchThumbnail'

function SearchAlbums() {

  const { user, accessToken, isLoading, setIsLoading } =  useContext(AppContext)

  const [albumTitleSearch, setAlbumTitleSearch] = useState('')
  const [albumSearchResults, setAlbumSearchResults] = useState(null)
  const [searchHeader, setSearchHeader] = useState('')

  function handleAlbumSearch (event) {

    event.preventDefault()
    if (albumTitleSearch != "") {
      setIsLoading(true)
      fetch(`https://api.spotify.com/v1/search?type=album&q=${albumTitleSearch}&limit=50`, {
        method: "GET",
        headers: { Authorization: "Bearer " + accessToken}
      })
      .then(res => res.json())
      .then(data => {
        setAlbumSearchResults(data.albums.items)
        setAlbumTitleSearch('')
        setIsLoading(false)
      })
    } else {
      return
    }
  }

  return !isLoading ? (
    <div style={{margin: '20px'}}className='flex-column-center'>
      <form onSubmit={handleAlbumSearch}>
        <div className='flex-column-center'>
          <label htmlFor="album-title" style={{fontWeight: 'bold'}}>Artist and/or Album:</label>
          <input
            type="text"
            id="album-title"
            value={albumTitleSearch}
            onChange={(e) => setAlbumTitleSearch(e.target.value)}
          />
        </div>
        <div className='flex-row-center'>
          <button style={{margin: '5px', fontSize: '15px'}} type="submit">Search</button>
        </div>
      </form>
      {searchHeader != '' ? <h1 className='small-margins'>{searchHeader}</h1> : null}
      {albumSearchResults 
        ?
      <div className='flex-row-center wrap'>  
        {albumSearchResults.map((album) => (
          <SearchThumbnail 
            album={album} 
            key={album.id} 
            setAlbumSearchResults={setAlbumSearchResults}
            searchHeader={searchHeader}
            setSearchHeader={setSearchHeader}
          />
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

export default SearchAlbums;