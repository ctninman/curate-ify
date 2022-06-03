import React from 'react';
import { useContext } from 'react';
import { AppContext } from './AppContext';
import GridAlbum from './GridAlbum';
import GridMatch from './GridMatch';
import UserMatch from './UserMatch';


function Grid({matchingUsers, setMatchingUsers, findMatchingUsers, matchUserAlbums, setMatchUserAlbums, setAlbumMatchArray, setSelectedOtherUser, noUserMessage, setNoUserMessage}) {

  const {user} = useContext(AppContext)

  function clearGrid () {
    setMatchingUsers(null)
    setMatchUserAlbums([])
    setAlbumMatchArray(null)
    setNoUserMessage(null)
  }

  return (
    <>
      <div className='flex-row-center'>
        <div className='flex-row-center match-box'>
        {matchUserAlbums.length > 0 ?
          matchUserAlbums.map(album => (
            <GridMatch 
              value={album.id} 
              key={album.id}
              album={album} 
              className='grid-album'
              matchUserAlbums={matchUserAlbums}
              setMatchUserAlbums={setMatchUserAlbums}  
            />
          ))  
        : 
        <div className='flex-column-center'>
          <h2 className='small-margins' style={{height: '40px', overflow: 'scroll', textAlign: 'center'}}>Select up to 5 albums</h2>
          <h3 className='small-margins' style={{height: '40px', overflow: 'scroll', textAlign: 'center'}}>Find Other Curate-ify Users Whose Collections Contain Them As Well</h3>
        </div>
        }
      </div>  
    </div >
    {!matchingUsers ?
      <div className='flex-row-center'>
        <div className='flex-column-center match-grid-buttons'>
          <button onClick={clearGrid}>CLEAR</button>
          <button onClick={findMatchingUsers}>FIND USERS</button>
        </div>
      </div>
        : 
      <div className='flex-row-center'><button onClick={clearGrid}>CLEAR</button></div>
    }
    <div className='flex-column-center'>
      {matchingUsers 
          ?
        <h1 style={{textDecoration: 'underline', margin: '8px'}}>Matched Users</h1>
          : 
        null
      }
      {matchingUsers 
          ?
        matchingUsers.filter(u => u.id != user.id).map(match => (
          <UserMatch setSelectedOtherUser={setSelectedOtherUser} matched_user={match} key={match.id} />
        )) 
          : 
        null
      }
      {noUserMessage ? <h1>{noUserMessage}</h1> : null}    
      </div>
      <div style={{maxHeight: '500px', overflow: 'scroll'}} className='flex-row-center wrap'>
        {user.albums.map(album => (
          <GridAlbum 
            album={album} 
            key={album.id} 
            matchUserAlbums={matchUserAlbums}
            setMatchUserAlbums={setMatchUserAlbums}/>
        ))}
      </div>
    </>
  );
}

export default Grid;