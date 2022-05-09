class SpotifyLoginsController < ApplicationController

  def spotify_info
    render json: SpotifyLogin.return_id
  end

end
