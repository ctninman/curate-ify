class AddSpotifyTokensToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :spotify_access_token, :text
    add_column :users, :spotify_refresh_token, :text
    add_column :users, :spotify_expires_in, :integer
  end
end
