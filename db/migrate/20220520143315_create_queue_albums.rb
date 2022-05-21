class CreateQueueAlbums < ActiveRecord::Migration[7.0]
  def change
    create_table :queue_albums do |t|
      t.string :album_title
      t.string :artist_name
      t.string :spotify_artist_id
      t.string :spotify_album_id
      t.string :spotify_uri
      t.string :album_cover
      t.integer :user_id
      t.string :release_date

      t.timestamps
    end
  end
end
