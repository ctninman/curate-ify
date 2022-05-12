class AlbumsController < ApplicationController

  def create
    new_album = Album.create!(album_params)
    if new_album.valid?
      render json: {album: new_album}, status: :created
    else
      render json: {errors: new_album.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private

  def album_params
    params.permit(:album_title, :artist, :spotify_artist_id, :spotify_album_id, :rating, :description, :in_collection, :spotify_uri, :shelf_level, :album_cover, :user_id, :artist_id, :release_date, genres: [], tags: [])
  end

end
