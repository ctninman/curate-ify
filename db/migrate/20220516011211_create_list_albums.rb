class CreateListAlbums < ActiveRecord::Migration[7.0]
  def change
    create_table :list_albums do |t|
      t.string :album_title
      t.string :artist
      t.string :album_cover
      t.integer :list_id
      t.integer :list_order
      t.string :spotify_id
      t.string :spotify_url

      t.timestamps
    end
  end
end
