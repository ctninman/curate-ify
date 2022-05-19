class CreateArtists < ActiveRecord::Migration[7.0]
  def change
    create_table :artists do |t|
      t.string :spotify_artist_id
      t.integer :albums_in_collection
      t.boolean :top_artist
      t.string :artist_name

      t.timestamps
    end
  end
end
