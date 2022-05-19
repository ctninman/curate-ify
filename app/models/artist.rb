class Artist < ApplicationRecord
  has_many :albums
  has_many :users, through: :albums
end
