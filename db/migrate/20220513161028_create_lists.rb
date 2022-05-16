class CreateLists < ActiveRecord::Migration[7.0]
  def change
    create_table :lists do |t|
      t.string :list_name
      t.boolean :is_public
      t.text :list_albums, array:true, default: []
      t.integer :user_id

      t.timestamps
    end
  end
end
