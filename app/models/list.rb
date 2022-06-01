class List < ApplicationRecord
  belongs_to :user
  has_many :list_albums, dependent: :destroy

  validates :list_name, presence: true
  validates :list_name, length: { minimum: 3 }
  validates :list_name, length: { maximum: 20 }

  def number_of_songs
    self.list_albums.length
  end
end
