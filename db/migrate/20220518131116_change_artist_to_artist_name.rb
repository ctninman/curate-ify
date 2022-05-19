class ChangeArtistToArtistName < ActiveRecord::Migration[7.0]
  def change
    rename_column :albums, :artist, :artist_name
  end
end
