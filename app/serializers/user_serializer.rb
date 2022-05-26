class UserSerializer < ActiveModel::Serializer

  attributes :id, :username, :email, :collection_public, :user_tags, :user_genre_list, :user_tag_list, :albums
  
  has_many :albums
  has_many :list_albums
  

  
end
