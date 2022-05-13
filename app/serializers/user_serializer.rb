class UserSerializer < ActiveModel::Serializer

  has_many :albums
  
  attributes :id, :username, :email, :collection_public, :user_tags, :user_genre_list, :user_tag_list

  
end
