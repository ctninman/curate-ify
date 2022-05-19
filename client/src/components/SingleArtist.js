

function SingleArtist({album, singleArtist, singleArtistAlbums}) {
  return (
    <div style={{width: '20%', margin: '2%'}}>
      <img style={{width: '100%'}}src={album.album_cover} />
      <h3 className='small-margins'>{album.album_title}</h3>
      <a href={album.spotify_uri} target='_blank'>🎧</a>
    </div>
  );
}

export default SingleArtist;