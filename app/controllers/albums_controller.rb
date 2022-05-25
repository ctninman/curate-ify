class AlbumsController < ApplicationController

  def create
    user_artist = Artist.find_by(spotify_artist_id: params[:spotify_artist_id])
    artist_id = nil
    incoming_artist = nil
    if user_artist
      artist_id = user_artist.id
      # new_album.update(artist_id: artist_id)
    else
      incoming_artist = Artist.create({artist_name: params[:artist_name], spotify_artist_id: params[:spotify_artist_id], top_artist: false, artist_photo: params[:artist_photo]})
      artist_id = incoming_artist.id
    end
    # byebug
    incoming_album = Album.create!(album_params)
    # byebug
    incoming_album.update(artist_id: artist_id)
    # byebug
    if incoming_album.valid?
      # spotify_artist = album_params[:spotify_artist_id]
      
      # t.string "spotify_artist_id"
      # t.integer "albums_in_collection"
      # t.boolean "top_artist"
      # t.string "artist_name"


   

      render json: {album: incoming_album}, status: :created
    else
      render json: {errors: incoming_album.errors.full_messages}, status: :unprocessable_entity
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
    params.permit(:album_title, :artist_name, :spotify_artist_id, :spotify_album_id, :rating, :description, :spotify_uri, :album_cover, :user_id, :artist_id, :release_date, genres: [], tags: [])
  end

end
