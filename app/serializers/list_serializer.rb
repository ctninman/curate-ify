class ListSerializer < ActiveModel::Serializer

  has_many :list_albums

  attributes :id, :list_name, :is_public, :list_albums, :user_id, :list_albums
end
