class ListAlbumsController < ApplicationController

  def create
    full_list = List.find_by(id: params[:list_id])
    full_list_length = full_list.list_albums.length
    new_list_album = ListAlbum.create!(list_albums_params)
    if new_list_album.valid?
      new_list_album.update({list_order: full_list_length + 1})
      render json: {list: new_list_album, length: full_list_length + 1}, status: :created
    else
      render json: {errors: new_list.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    list_album = ListAlbum.find_by(id: params[:id])
    list_id_for_update = list_album[:list_id]
    if list_album
      list_album.destroy
      updated_list = List.find_by(id: list_id_for_update)
      render json: {message: "Album removed.", update_list: updated_list}
    else
      render json: {error: "Album not found"}, status: :not_found
    end
  end

  def order_update
    array_of_albums = params[:albums]
    array_of_albums.each do |album|
      chosen_album = ListAlbum.find_by(id: album[:id])
      chosen_album.update(list_order: album[:list_order])
    end
    render json: {message: 'made it'}
  end

  private 
  def list_albums_params
    params.permit(:id, :artist, :album_cover, :list_id, :list_order, :album_title, :spotify_url, :spotify_id)
  end

end