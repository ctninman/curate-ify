class AddArtistIdAndReleaseDateToListAlbum < ActiveRecord::Migration[7.0]
  def change
    add_column :list_albums, :spotify_artist_id, :string
    add_column :list_albums, :release_date, :string
  end
end
