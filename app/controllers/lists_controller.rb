

class ListsController < ApplicationController

  wrap_parameters format: []

  def show
    list = List.find_by(id: params[:id])
    if list
      render json: list, include: :user, status: :ok
    else
      render json: {errors: list.errors.full_messages}, status: :unauthorized
    end
  end

  def create
    new_list = List.new(list_params)
    if new_list.valid?
      new_list.save
      render json: {list: new_list}, status: :created
    else
      render json: {errors: new_list.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    list_addition = params[:list_albums]
    select_list = List.find_by(id: params[:id])
    if select_list
      current_list_albums = select_list.list_albums
      current_list_albums << list_addition
      select_list.update(:list_albums, current_list_albums)
      render json: select_list, status: :ok
    else
      render json: {errors: select_list.errors}, status: :not_found
    end
  end

  def destroy
    list = List.find_by(id: params[:id])
    if list
      list.destroy
      render json: {message: "List removed."}
    else
      render json: {error: "List not found"}, status: :not_found
    end
  end

  def search_lists
    found_lists = List.where("lower(list_name) LIKE ?", "%" + params[:search_term].downcase + "%")
    if found_lists.length > 0
      render json: {lists: found_lists}, include: [user: {only: [:username, :id, :spotify_profile_image]}]
    else
      render json: {message: "no matching lists found"}
    end
  end

  private 

  def list_params 
    params.permit(:list_name, :is_public, :user_id, list_albums: [:album_title, :album_cover, :artist, :spotify_album_id, :list_order, :spotify_album_url])
  end

end

# params.permit(users_to_employers: [{ :start_date, :end_date, employer: { :company_name }])