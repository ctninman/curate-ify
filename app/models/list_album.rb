class ListAlbum < ApplicationRecord

  validates :album_title, presence: true
  validates :artist, presence: true
  validates :album_cover, presence: true
  # validates :list_order, presence: true
  validates :spotify_url, presence: true
  validates :spotify_id, presence: true

  belongs_to :list
end
