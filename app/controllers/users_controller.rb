class UsersController < ApplicationController

  def show
    if session[:user_id]
      user = User.find_by(id: session[:user_id])
      if user
        render json: { user: user}, include: :albums, except: [:password_digest, :email, :created_at, :updated_at, :user_tags]
      else
        render json: {errors: user.errors.full_messages}, status: :unauthorized
      end
    else
      render json: {errors: "You are not authorized"}, status: :unauthorized
    end
  end

  
  def create
    session.delete(:user_id)
    new_user = User.new(user_params)
    if new_user.valid?
      new_user.save
      session[:user_id] = new_user.id
      render json: {user: new_user}, include: :albums, except: [:password_digest, :email, :created_at, :updated_at, :user_tags],status: :created
    else
      render json: {errors: new_user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    user = User.find_by(id: params[:id])
    if user
      user.update(spotify_params)
      render json: user, include: :albums, except: [:password_digest, :email, :created_at, :updated_at, :user_tags], status: :ok
    else
      render json: {errors: user.errors}, status: :not_found
    end
  end

  def other_user_show
    user = User.find_by(id: params[:id])
    if user
      render json: { user: user}, include: [:albums, :lists], except: [:password_digest, :email, :created_at, :updated_at, :spotify_access_token, :user_tags]
    else
      render json: {errors: user.errors.full_messages}, status: :unauthorized
    end
  end

  def get_genres_and_tags
    user = User.find_by(id: params[:id])
    if user
      render json: {genres: user.user_genre_list, tags: user.user_tag_list}
    else
      render json: {errors: user.errors}, status: :not_found  
    end
  end

  def get_lists
    user = User.find_by(id: params[:id])
    if user
      render json: {lists: user.user_lists}
    else
      render json: {errors: user.errors}, status: :not_found  
    end
  end

def get_queue_albums
  user = User.find_by(id: params[:id])
  if user
    render json: {queue_albums: user.queue_albums}
  else
    render json: {errors: user.errors}, status: :not_found  
  end
end

  def get_artists
    user = User.find_by(id: params[:id])
    if user
      user_artists = user.artists.uniq { |a| a.id }
      render json: {artists: user_artists}
    else
      render json: {errors: user.errors}, status: :not_found 
    end
  end

  def search_users
    found_users = User.where("lower(username) LIKE ?", "%" + params[:search_term].downcase + "%")
    if found_users.length > 0
      render json: {users: found_users}, except: [:password_digest, :email, :created_at, :updated_at, :user_tags, :spotify_refresh_token, :spotify_access_token]
    else
      render json: {message: "no matching users found"}
    end
  end

  def users_matching_albums
    match_array = params[:matching_albums_array].split(',')

    matching_users = User.matched_all(match_array)
    if matching_users
      render json: {users: matching_users},except: [:password_digest, :email, :created_at, :updated_at, :user_tags, :spotify_refresh_token, :spotify_access_token]
    else
      render json: {message: 'no users found'}
    end
  end

  private 

  def user_params
    params.permit(:username, :password, :id, :password_confirmation, :user_tags, :connected_to_spotify, :spotify_expires_in, :spotify_access_token, :spotify_refresh_token, :spotify_profile_image, :spotify_url, :spotify_username, :collection_public, :email, :token_updated_at)
  end

  def spotify_params
    params.permit(:connected_to_spotify, :spotify_expires_in, :spotify_access_token, :spotify_refresh_token, :spotify_profile_image, :spotify_url, :spotify_username, :token_updated_at)
  end

end
