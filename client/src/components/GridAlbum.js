import React from 'react';

function GridAlbum({album, matchUserAlbums, setMatchUserAlbums}) {

  function handleAddMatch () {
    if (matchUserAlbums.length < 5) {
      let newMatchArray = [...matchUserAlbums, album]
      setMatchUserAlbums(newMatchArray)
    } else {
      console.log('5 album limit')
    }
  }

  return (
    <div onClick={handleAddMatch} className='grid-album'>
      <img style={{width: '94%', margin: '3%'}} src={album.album_cover} />
    </div>
  );
}

export default GridAlbum;