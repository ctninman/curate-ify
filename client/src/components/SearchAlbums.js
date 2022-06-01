import { useContext, useState, useEffect } from 'react'
import { AppContext } from './AppContext'
import LoadScreen from './LoadScreen'
import SearchThumbnail from './SearchThumbnail'

function SearchAlbums() {

  const { user, setUser, accessToken, setAccessToken, isLoading, setIsLoading, refreshMe } =  useContext(AppContext)

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
            console.log('data=', data.user)
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
          {/* <label htmlFor="album-title" style={{fontWeight: 'bold'}}>Artist and/or Album:</label> */}
          <input
            type="text"
            id="album-title"
            value={albumTitleSearch}
            onChange={(e) => setAlbumTitleSearch(e.target.value)}
          />
        </div>
        <div className='flex-row-center'>
          <button style={{margin: '5px', fontSize: '15px'}} type="submit">ENTER</button>
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