class ArtistsController < ApplicationController

  def get_albums
    artist = Artist.find_by(id: params[:id])
    if artist
      artist_albums = Album.where("artist_id = ?", params[:id])
      render json: {artist_albums: artist_albums}
    else
      render json: {message: 'artist not found'}
    end
  end

end
