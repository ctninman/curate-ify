import { useContext, useState } from 'react'
import { AppContext } from './AppContext'

function SearchArtists() {

  const { user } =  useContext(AppContext)

  const [artistSearch, setArtistSearch] = useState('')
  const [artistSearchResults, setArtistSearchResults] = useState(null)

  function handleArtistSearch (event) {

    event.preventDefault()
    if (artistSearch != "") {
      fetch(`https://api.spotify.com/v1/search?type=artist&q=${artistSearch}`, {
        method: "GET",
        headers: { Authorization: "Bearer " + user.spotify_access_token}
      })
      .then(res => res.json())
      .then(data => {
        setArtistSearchResults(data.artists.items)
        setArtistSearch('')
      })
    } else {
      return
    }
  }

  return (
    <div>

      <form onSubmit={handleArtistSearch}>
        <div>
          <label htmlFor="artist-name">Album Title:</label>
          <input
            type="text"
            id="artist-name"
            value={artistSearch}
            onChange={(e) => setArtistSearch(e.target.value)}
          />
        </div>
  
        <button type="submit">SEARCH</button>
      </form>
      {artistSearchResults 
        ?
        artistSearchResults.map((artist) => (
          <div>
          <span>{artist.name}</span>
          </div>
        ))
          :
          null

      }
    </div>
  );
}

export default SearchArtists;