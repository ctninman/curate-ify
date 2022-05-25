class User < ApplicationRecord

  has_secure_password

  has_many :albums
  has_many :lists
  has_many :queue_albums
  has_many :artists, through: :albums

  has_many :followed_users, foreign_key: :follower_id, class_name: "Relationship"
  has_many :followees, through: :followed_users, :dependent => :delete_all

  has_many :following_users, foreign_key: :followee_id, class_name: "Relationship"
  has_many :followers, through: :following_users, :dependent => :delete_all

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

  def matching_album (artist)
    # all_user_albums = self.albums
    self.albums.any?{|album| album[:artist_name] == artist}
    # byebug
    # puts is_true
  end

  def all_matching_albums (arr_albums)
    # all_user_albums = self.albums
    found_albums = []
    arr_albums.each do |sp_id|

      if self.albums.any?{|album| album[:spotify_album_id] == sp_id}
        found_albums << "X"
      else
        break
      end
    end

    if found_albums.length == arr_albums.length
      return true
    else
      return false 
    end
    # byebug
    # puts is_true
  end


  # 7Ln81p86r5cCsesd3KBWIY
  # 3jXbdginoAtjcBqT7GcYRd

  # def self.all_matching_albums (arr_artists)
  #   match_array = []
  #   if arr_artists.length > 0
  #   # all_user_albums = self.albums
  #     arr_artists.each do |artist|
  #       is_true = self.albums.any?{|album| album[:artist_name] == artist}
  #     # byebug
  #       puts is_true
  #       if is_true == false
  #         puts "Nope"
  #         break
  #       else
  #         puts 'keep looping'
  #       end
  #       puts self
  #     end
  #   end
  # end

  def self.matched_all (arr_albums)
    array_users = []
    User.find_each do |u|
      yes_or_no = u.all_matching_albums(arr_albums)
      if yes_or_no
        array_users << {username: u.username, id: u.id}
      end
    end
    return array_users
  end

  def user_lists
    self.lists
  end

  # def self.find_matching_users
  #   User.where(self.albums[:artist_name] == "barney")
  # end

end
