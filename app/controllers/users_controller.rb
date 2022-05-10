class UsersController < ApplicationController

  def show
    user = User.find_by(id: params[:id])
    render json: { user: user}
  end

  def create
    new_user = User.create!(user_params)
    if new_user.valid?
      session[:user_id] = new_user.id
      render json: new_user, status: :created
    else
      render json: {errors: new_user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    user = User.find_by(id: params[:id])
    if user
      user.update(spotify_params)
      render json: user, status: :ok
    else
      render json: {errors: user.errors}, status: :not_found
    end
  end

  private 

  def user_params
    params.permit(:username, :password, :id, :password_confirmation, :user_tags, :connected_to_spotify, :spotify_expires_in, :spotify_access_token, :spotify_refresh_token, :spotify_profile_image, :spotify_url, :spotify_username, :collection_public, :email)
  end

  def spotify_params
    params.permit(:connected_to_spotify, :spotify_expires_in, :spotify_access_token, :spotify_refresh_token, :spotify_profile_image, :spotify_url, :spotify_username)
  end

end
