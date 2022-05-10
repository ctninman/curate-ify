class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :email
      t.boolean :collection_public
      t.string :user_tags, array: true, default: []
      t.string :spotify_username
      t.string :spotify_url
      t.text :spotify_profile_image

      t.timestamps
    end
  end
end
