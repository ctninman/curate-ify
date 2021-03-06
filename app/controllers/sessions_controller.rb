class SessionsController < ApplicationController

  def create
    
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
       session[:user_id] = user.id
       render json: {user: user}, include: [:albums, :lists], except: [:password_digest, :email, :created_at, :updated_at, :user_tags], status: :created
    else
       render json:{ error: "Invalid username or password" }, status: :unauthorized
    end
  end

  def destroy 
    user = User.find_by(id: session[:user_id])
    if user 
      session.delete :user_id
      head :no_content
    else
      render json: { error: "User not logged in" }, status: :unauthorized
    end
  end

end
