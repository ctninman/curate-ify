class User < ApplicationRecord

  has_secure_password

  has_many :albums

  def access_token_expired?
    ( Time.now - self.updated_at ) > 3295
  end

  def collection_albums
    self.albums
  end

end
