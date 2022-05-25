class QueueAlbumsController < ApplicationController

  def create

    new_queue_album = QueueAlbum.create!(queue_albums_params)
    if new_queue_album.valid?
      render json: {queue_album: new_queue_album}, status: :created
    else
      render json: {errors: new_queue_album.errors.full_messages}, status: :unprocessable_entity
    end

  end

  def destroy
    queue_album = QueueAlbum.find_by(id: params[:id])
    user_id = queue_album[:user_id]
    # list_id_for_update = list_album[:list_id]
    if queue_album
      queue_album.destroy
      updated_user = User.find_by(id: user_id)
      updated_queue = updated_user.queue_albums
      render json: {message: "Album removed.", updated_queue: updated_queue}
    else
      render json: {error: "Album not found"}, status: :not_found
    end
  end

  private

  def queue_albums_params
    params.permit(:album_title, :artist_name, :spotify_artist_id, :spotify_album_id, :spotify_uri, :album_cover, :user_id, :release_date)
  end
end
