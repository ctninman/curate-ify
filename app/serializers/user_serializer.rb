class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :email, :collection_public, :user_tags
end
