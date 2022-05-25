class RemoveUnusedDbColumns < ActiveRecord::Migration[7.0]
  def change
    remove_column :albums, :in_collection, :boolean
    remove_column :albums, :in_queue, :boolean
    remove_column :albums, :shelf_level, :string
    remove_column :artists, :albums_in_collection, :integer
  end
end
