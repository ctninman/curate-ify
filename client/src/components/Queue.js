import { useState } from "react";
import QueueFilter from "./QueueFilter";
import AlbumInQueue from "./AlbumInQueue";

function Queue(props) {

  const [showQueueAlbum, setShowQueueAlbum] = useState(false)

  return (
    <div>
      <h1>Collection</h1>
      <QueueFilter />
      <button onClick={() => setShowQueueAlbum(!showQueueAlbum)}>{showQueueAlbum ? "Show Queue" : "Show Album"}</button>
      {showQueueAlbum ? <AlbumInQueue /> : null}
    </div>
  );
}


export default Queue;