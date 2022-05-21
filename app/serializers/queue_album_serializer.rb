class QueueAlbumSerializer < ActiveModel::Serializer
  attributes :id, :album_title, :artist_name, :spotify_artist_id, :spotify_album_id, :spotify_uri, :album_cover, :user_id, :release_date
end
