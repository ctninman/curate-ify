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
    setAlbumMatchArray(spotifyIDsFromAlbums)
  }, [matchUserAlbums] ) 

  function findMatchingUsers () {
    fetch(`/users/match/${albumMatchArray}`, {method: "GET" })
    .then(res => res.json())
    .then(data => {
      if ('users' in data && data.users.length > 1 ) {
        setMatchingUsers(data.users)
      } else {
        setNoUserMessage('No Users Found Matching Those Albums')
      }
    })
  }

  return (
    <div>  
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