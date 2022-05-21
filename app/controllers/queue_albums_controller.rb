class QueueAlbumsController < ApplicationController

  def create

    new_queue_album = QueueAlbum.create!(queue_albums_params)
    if new_queue_album.valid?
      render json: {queue_album: new_queue_album}, status: :created
    else
      render json: {errors: new_queue_album.errors.full_messages}, status: :unprocessable_entity
    end

  end


  private

  def queue_albums_params
    params.permit(:album_title, :artist_name, :spotify_artist_id, :spotify_album_id, :spotify_uri, :album_cover, :user_id, :release_date)
  end
end
