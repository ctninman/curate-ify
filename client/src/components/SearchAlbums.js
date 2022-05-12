import { useContext, useState } from 'react'
import { AppContext } from './AppContext'
import SearchThumbnail from './SearchThumbnail'

function SearchAlbums() {

  const { user } =  useContext(AppContext)

  const [albumTitleSearch, setAlbumTitleSearch] = useState('')
  const [albumSearchResults, setAlbumSearchResults] = useState(null)

  function handleAlbumSearch (event) {

    event.preventDefault()
    if (albumTitleSearch != "") {
      fetch(`https://api.spotify.com/v1/search?type=album&q=${albumTitleSearch}`, {
        method: "GET",
        headers: { Authorization: "Bearer " + user.spotify_access_token}
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
    <div>

      <form onSubmit={handleAlbumSearch}>
        <div style={{marginLeft: '20px'}}>
          <label htmlFor="album-title">Album Title:</label>
          <input
            type="text"
            id="album-title"
            value={albumTitleSearch}
            onChange={(e) => setAlbumTitleSearch(e.target.value)}
          />
        </div>
  
        <button style={{margin: '20px', fontSize: '15px'}} type="submit">Search</button>
      </form>
      {albumSearchResults 
        ?
        albumSearchResults.map((album) => (
          <SearchThumbnail album={album} key={album.id} />
          // <img src={album.images[2].url} />
        ))
          :
          null

      }
      <button onClick={() => console.log(albumSearchResults)}>Search Results</button>
    </div>
  );
}

export default SearchAlbums;