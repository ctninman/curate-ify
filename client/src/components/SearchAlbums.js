import { useContext, useState, useEffect } from 'react'
import { AppContext } from './AppContext'
import LoadScreen from './LoadScreen'
import SearchThumbnail from './SearchThumbnail'

function SearchAlbums() {

  const { setUser, accessToken, setAccessToken, isLoading, setIsLoading } =  useContext(AppContext)

  const [albumTitleSearch, setAlbumTitleSearch] = useState('')
  const [albumSearchResults, setAlbumSearchResults] = useState(null)
  const [searchHeader, setSearchHeader] = useState('')

  useEffect (() => {
    setIsLoading(true)
    fetch("/refresh-token", {method: "GET"})
        .then((res) => res.json())
        .then((data) => {
          if (data.hasOwnProperty('user')) {
            setUser(data.user)
            setAccessToken(data.user.spotify_access_token)
          } else if (data.hasOwnProperty('message')){
            console.log("Still Good")
          }
          setIsLoading(false)
        })
  }, [] )

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
    <div style={{margin: '20px', marginTop: '5px'}}className='flex-column-center'>
      <form onSubmit={handleAlbumSearch}>
        <div className='flex-column-center'>
          <input
            type="text"
            id="album-title"
            value={albumTitleSearch}
            onChange={(e) => setAlbumTitleSearch(e.target.value)}
          />
        </div>
        <div className='flex-row-center'>
        <span className='back-button-outer'><button className='back-button' type="submit">ENTER</button></span>
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