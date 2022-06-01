class QueueAlbum < ApplicationRecord

  validates :album_title, presence: true
  validates :artist_name, presence: true
  validates :spotify_artist_id, presence: true
  validates :spotify_album_id, presence: true
  validates :spotify_uri, presence: true
  validates :album_cover, presence: true

  belongs_to :user
end
