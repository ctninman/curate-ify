class ChangeGenresAndTagsToArrays < ActiveRecord::Migration[7.0]
  def change
    remove_column :albums, :genres, :string
    remove_column :albums, :tags, :string
  end
end
