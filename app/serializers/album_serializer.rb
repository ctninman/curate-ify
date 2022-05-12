class AlbumSerializer < ActiveModel::Serializer
 
  belongs_to :user
  
  attributes :id, :album_title, :artist, :spotify_artist_id, :rating, :spotify_album_id, :genres, :tags, :description, :in_collection, :spotify_uri, :shelf_level, :album_cover, :user_id, :artist_id, :release_date

  
end
