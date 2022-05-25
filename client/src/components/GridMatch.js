import React from 'react';


function GridMatch({album, matchUserAlbums, setMatchUserAlbums}) {

  function removeFromMatch () {
  
    let itemRemoved = matchUserAlbums.filter(alb => alb != album)
    setMatchUserAlbums(itemRemoved)
  }

  return (
    <div 
      value={album.id} 
      onClick={removeFromMatch} 
      style={{width: '12%'}}
      className='grid-album'
    >
      <img style={{width: '100%'}} src={album.album_cover} />
           
    </div>
  );
}

export default GridMatch;