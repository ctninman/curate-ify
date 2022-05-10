class AddConnectedToSpotifyBoolean < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :connected_to_spotify, :boolean
  end
end
