class AddAccessTokenUpdatedAt < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :token_updated_at, :datetime, null: false
  end
end
