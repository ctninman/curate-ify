class RelationshipsController < ApplicationController

  def show
    user = User.find_by(id: params[:id])
    if user

      render json: {followers: user.followers, following: user.followees},except: [:password_digest, :email, :created_at, :updated_at, :spotify_refresh_token, :spotify_access_token, :spotify_expires_in, :user_tags], status: :ok
    else
      render json: {errors: user.errors.full_messages}, status: :unauthorized
    end
  end

    def create
      new_relationship = Relationship.create!(relationship_params)
      if new_relationship.valid?
        now_following = User.find_by(id: params[:followee_id])
        render json: {new_relationship: new_relationship, now_following: now_following}
      else
        render json: {errors: new_relationship.errors.full_messages}, status: :unprocessable_entity
      end
    end
  
    def destroy
      relation = Relationship.find_by(follower_id: session[:user_id], followee_id: params[:id])
      user_id = session[:user_id]
      if user_id == relation[:follower_id]
        relation.destroy
        user = User.find_by(id: session[:user_id])
        render json: {message: "Friendship removed.", following: user.followees}
      else
        render json: {message: "Not authorized"}, status: :not_found
      end
    end
  
    private
  
    def relationship_params
      params.permit(:follower_id, :followee_id)
    end
  end

