class CreateAlbums < ActiveRecord::Migration[7.0]
  def change
    create_table :albums do |t|
      t.string :album_title
      t.string :artist
      t.string :spotify_artist_id
      t.integer :rating
      t.string :spotify_album_id
      t.string :genres
      t.string :tags
      t.text :description
      t.boolean :in_collection
      t.text :spotify_uri
      t.string :shelf_level
      t.text :album_cover
      t.integer :user_id
      t.integer :artist_id
      t.string :release_date

      t.timestamps
    end
  end
end
