class CreateSpotifyLogins < ActiveRecord::Migration[7.0]
  def change
    create_table :spotify_logins do |t|

      t.timestamps
    end
  end
end
