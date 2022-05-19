class ArtistSerializer < ActiveModel::Serializer
  attributes :id, :spotify_artist_id, :albums_in_collection, :top_artist, :artist_name
end
