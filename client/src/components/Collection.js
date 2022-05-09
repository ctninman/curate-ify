import {useState} from 'react'
import AlbumInCollection from "./AlbumInCollection";
import CollectionFilter from "./CollectionFilter";


function Collection(props) {

  const [showCollectionAlbum, setShowCollectionAlbum] = useState(false)

  return (
    <div>
      <h1>Collection</h1>
      <CollectionFilter />
      <button onClick={() => setShowCollectionAlbum(!showCollectionAlbum)}>{showCollectionAlbum ? "Show Collection" : "Show Album"}</button>
      {showCollectionAlbum ? <AlbumInCollection /> : null}
    </div>
  );
}

export default Collection;