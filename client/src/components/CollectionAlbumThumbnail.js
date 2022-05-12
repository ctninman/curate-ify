

function CollectionAlbumThumbnail({album}) {
  return (
    <div className='flex-row' style={{justifyContent: 'flex-start'}}>
      <div>
        <img className='small-margins' style={{height: '200px'}} src={album.album_cover} />
      </div>
      <div>
        <h2 className='small-margins'>{album.album_title}</h2>
        <h3 className='small-margins'>{album.artist}</h3>
        <h3 className='small-margins'>{album.release_date}</h3>
        {album.genres && album.genres.length > 0 
            ?
          <div className='flex-row-left'>
            {album.genres.map((genre) => (
            <h5 className='small-margins genres'>{genre}</h5>
            ))}
          </div>
            :
          null
        }
        {album.tags && album.tags.length > 0 
            ?
          <div className='flex-row-left'>
            {album.tags.map((tag) => (
            <h5 className='small-margins tags'>{tag}</h5>
            ))}
          </div>
            :
          null
        }
        <a href={album.spotify_uri}>Open in Spotify</a>
      </div>
    </div>
  );
}

export default CollectionAlbumThumbnail;