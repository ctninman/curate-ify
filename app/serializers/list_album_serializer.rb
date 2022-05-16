class ListAlbumSerializer < ActiveModel::Serializer
  belongs_to :list

  attributes :id, :album_title, :artist, :album_cover, :list_id, :list_order, :spotify_id, :spotify_url

  
end
