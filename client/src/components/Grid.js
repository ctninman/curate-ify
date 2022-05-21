import React from 'react';
import { useContext, useState } from 'react';
import { AppContext } from './AppContext';
import GridAlbum from './GridAlbum';
import GridMatch from './GridMatch';


function Grid(props) {

  const {user} = useContext(AppContext)

  const [matchUserAlbums, setMatchUserAlbums] = useState([])

  // function removeFromMatch (event) {

  //   let itemRemoved = matchUserAlbums.filter(alb => alb.id != event.target.value)
  //   console.log('r',event.target.value)


  // }

  return (
    <>

      <div style={{border: '5px solid white', marginBottom: '20px'}} className='flex-row-center'>
        {matchUserAlbums.length > 0 ?
          matchUserAlbums.map(album => (
            <GridMatch 
              value={album.id} 
              album={album} 
              className='grid-album'
              matchUserAlbums={matchUserAlbums}
              setMatchUserAlbums={setMatchUserAlbums}  
            />
            //  <img style={{width: '100%'}} src={album.album_cover} />
          ))
      
        : <h1 style={{height: '40px'}}>Select up to 5 albums</h1>
        }
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