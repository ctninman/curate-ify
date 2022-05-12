class UserSerializer < ActiveModel::Serializer
  has_many :albums
  
  attributes :id, :username, :password_digest, :email, :collection_public, :user_tags

  
end
