class AddArtistPhotoToArtist < ActiveRecord::Migration[7.0]
  def change
    add_column :artists, :artist_photo, :string
  end
end
