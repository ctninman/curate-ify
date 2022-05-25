import { useState, useEffect } from "react";
import Grid from "./Grid";



function FindSimilarUsers({setSelectedOtherUser}) {

  const [matchUserAlbums, setMatchUserAlbums] = useState([])
  const [albumMatchArray, setAlbumMatchArray] = useState([])
  const [matchingUsers, setMatchingUsers] = useState(null)

  useEffect (() => {
    let spotifyIDsFromAlbums = []
    matchUserAlbums.map(album => (
      spotifyIDsFromAlbums.push(album.spotify_album_id)
    ))
    console.log('spot', spotifyIDsFromAlbums)
    setAlbumMatchArray(spotifyIDsFromAlbums)
  }, [matchUserAlbums] ) 

  function findMatchingUsers () {
    fetch(`/users/match/${albumMatchArray}`, {method: "GET" })
    .then(res => res.json())
    .then(data => {
      if ('users' in data) {
        setMatchingUsers(data.users)
      }
    })
  }

  return (
    <div>
      {/* <div>
        <button onClick={findMatchingUsers}>Find Users</button>
      </div> */}
      <div>
        <h2 style={{textAlign: 'center'}}>Find other users that have albums in your collection</h2>
      </div>
  
      <Grid 
        matchingUsers={matchingUsers}
        setMatchingUsers={setMatchingUsers}
        matchUserAlbums={matchUserAlbums}
        setMatchUserAlbums={setMatchUserAlbums}
        albumMatchArray={albumMatchArray}
        setAlbumMatchArray={setAlbumMatchArray} 
        findMatchingUsers={findMatchingUsers} 
        setSelectedOtherUser={setSelectedOtherUser}
      />
    </div>
  );
}

export default FindSimilarUsers;