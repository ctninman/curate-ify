class List < ApplicationRecord
  belongs_to :user
  has_many :list_albums, dependent: :destroy

  def number_of_songs
    self.list_albums.length
  end
end
