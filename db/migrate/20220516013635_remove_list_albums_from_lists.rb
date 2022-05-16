class RemoveListAlbumsFromLists < ActiveRecord::Migration[7.0]
  def change
    remove_column :lists, :list_albums, :text
  end
end
