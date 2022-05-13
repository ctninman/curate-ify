class AddQueueBooleanToAlbum < ActiveRecord::Migration[7.0]
  def change
    add_column :albums, :in_queue, :boolean
  end
end
