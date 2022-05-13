class AlbumsController < ApplicationController

  def create
    new_album = Album.create!(album_params)
    if new_album.valid?
      render json: {album: new_album}, status: :created
    else
      render json: {errors: new_album.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    album = Album.find_by(id: params[:id])
    album_user = User.find_by(id: params[:user_id])
    if album
      album.update(album_params)
      render json: {album: album, user: album_user}, status: :ok
    else
      render json: {errors: album.errors}, status: :not_found
    end
  end

  def destroy
    album_to_delete = Album.find_by(id: params[:id])
    album_to_delete_user = User.find_by(id: params[:user_id])
    if album_to_delete && session[:user_id] == album_to_delete_user.id
      album_to_delete.destroy
      render json: {message: "Album removed from your collection."}
    else
      render json: {error: "Album not found"}, status: :not_found
    end
  end

  private

  def album_params
    params.permit(:album_title, :artist, :spotify_artist_id, :spotify_album_id, :rating, :description, :in_collection, :in_queue, :spotify_uri, :shelf_level, :album_cover, :user_id, :artist_id, :release_date, genres: [], tags: [])
  end

end
