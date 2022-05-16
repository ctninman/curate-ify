class User < ApplicationRecord

  has_secure_password

  has_many :albums
  has_many :lists

  def access_token_expired?
    ( Time.now - self.updated_at ) > 3295
  end

  def user_genre_list
    all_user_genres = []
    self.albums.each do |album|
      album.genres.each do |genre|
        all_user_genres << genre
      end
    end
    all_user_genres.uniq
  end

  def user_tag_list
    all_user_tags = []
    self.albums.each do |album|
      album.tags.each do |tag|
        all_user_tags << tag
      end
    end
    all_user_tags.uniq
  end

  def user_lists
    self.lists
  end

end
