class AddGenreAndTagArray < ActiveRecord::Migration[7.0]
  def change
    add_column :albums, :genres, :string, array:true, default: []
    add_column :albums, :tags, :string, array:true, default: []
  end
end
