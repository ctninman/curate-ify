import { useState, useEffect } from "react";
import Grid from "./Grid";



function FindSimilarUsers({setSelectedOtherUser}) {

  const [matchUserAlbums, setMatchUserAlbums] = useState([])
  const [albumMatchArray, setAlbumMatchArray] = useState([])
  const [matchingUsers, setMatchingUsers] = useState(null)
  const [noUserMessage, setNoUserMessage] = useState(null)

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
      if ('users' in data && data.users.length > 1 ) {
        setMatchingUsers(data.users)
        console.log('findmatch', data.users)
      } else {
        setNoUserMessage('No Users Found Matching Those Albums')
        console.log('no users found')
      }
    })
  }

  return (
    <div>
      {/* <div>
        <button onClick={findMatchingUsers}>Find Users</button>
      </div> */}
 
  
      <Grid 
        matchingUsers={matchingUsers}
        setMatchingUsers={setMatchingUsers}
        matchUserAlbums={matchUserAlbums}
        setMatchUserAlbums={setMatchUserAlbums}
        albumMatchArray={albumMatchArray}
        setAlbumMatchArray={setAlbumMatchArray} 
        findMatchingUsers={findMatchingUsers} 
        setSelectedOtherUser={setSelectedOtherUser}
        noUserMessage={noUserMessage}
        setNoUserMessage={setNoUserMessage}
      />
    </div>
  );
}

export default FindSimilarUsers;