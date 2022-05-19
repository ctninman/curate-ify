import { useContext, useState } from 'react'
import { AppContext } from './AppContext'
import SearchThumbnail from './SearchThumbnail'

function SearchAlbums() {

  const { user, accessToken } =  useContext(AppContext)

  const [albumTitleSearch, setAlbumTitleSearch] = useState('')
  const [albumSearchResults, setAlbumSearchResults] = useState(null)

  function handleAlbumSearch (event) {

    event.preventDefault()
    if (albumTitleSearch != "") {
      fetch(`https://api.spotify.com/v1/search?type=album&q=${albumTitleSearch}&limit=50`, {
        method: "GET",
        headers: { Authorization: "Bearer " + accessToken}
      })
      .then(res => res.json())
      .then(data => {
        setAlbumSearchResults(data.albums.items)
        setAlbumTitleSearch('')
      })
    } else {
      return
    }
  }

  return (
    <div className='flex-column-center'>
      <h1>Find an Album</h1>
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
      {albumSearchResults 
        ?
      <div className='flex-row-center wrap'>  
        {albumSearchResults.map((album) => (
          <SearchThumbnail album={album} key={album.id} />
          // <img src={album.images[2].url} />
        ))}
      </div>
          :
        null

      }
    </div>
  );
}

export default SearchAlbums;