class RelationshipsController < ApplicationController

  def show
    user = User.find_by(id: params[:id])
    if user
      render json: {followers: user.followers, following: user.followees}, status: :ok
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
      relation = Relationship.find_by(follower_id: params[:follower_id])
      user_id = session[:user_id]
      # list_id_for_update = list_album[:list_id]
      if user_id == relation[:follower_id]
        relation.destroy
        render json: {message: "Friendship removed."}
      else
        render json: {error: "Not authorized"}, status: :not_found
      end
    end
  
    private
  
    def relationship_params
      params.permit(:follower_id, :followee_id)
    end
  end

