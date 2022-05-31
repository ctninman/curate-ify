# require 'uri'
# require 'base64'
# require 'json'
# # require 'faraday'

# class SpotifyController < ApplicationController
#   # include HTTParty
#   # include Faraday

#   def redirect_to_home
#     redirect_to "http://localhost:4000", allow_other_host: true
#   end
  
#   def spotify_request
#     # url = "https://accounts.spotify.com/authorize"
#     # query_params = {
#     #   client_id: ENV['client_id'],
#     #   response_type: 'code',
#     #   redirect_uri: 'http://localhost:3000/access-token',
#     #   scope: "user-library-read
#     #   streaming
#     #   playlist-read-collaborative
#     #   playlist-modify-private
#     #   user-modify-playback-state
#     #   user-read-private
#     #   user-top-read
#     #   playlist-modify-public",
#     #  show_dialog: true
#     # }
#     redirect_to spotify_uri, allow_other_host: true
#     # render json: {spotify_code: params[:code]}
#   end


#   def receive_access_token

#     # byebug
    
#     body = {
#       'code' => params[:code],
#       'grant_type' => 'authorization_code',
#       'redirect_uri' => 'http://localhost:4000/signup',
#       'client_id' => ENV['SPOTIFY_CLIENT_ID'],
#       'client_secret' => ENV['SPOTIFY_SECRET']
#     }

#     # byebug

#     auth_response = RestClient.post('https://accounts.spotify.com/api/token', body)

#     # byebug 

#     auth_params = JSON.parse(auth_response.body)

#     # byebug

#     header = {
#       Authorization: "Bearer #{auth_params["access_token"]}"
#     }

#     # byebug

#     user_response = RestClient.get('https://api.spotify.com/v1/me', header)

#     # byebug

#     user_params = JSON.parse(user_response.body)

#     # byebug

#     spotify_user = User.find_by(id: session[:user_id])

#     # byebug

#     # user_spotify_access_token = auth_params["access_token"]
#     # user_spotify_refresh_token = auth_params["refresh_token"]
#     # user_spotify_expires_in =  auth_params["expires_in"]
#     user_spotify_profile_image = user_params["images"].length > 0 ? user_params["images"][0]["url"] : 'https://i.pinimg.com/736x/b6/2a/6c/b62a6cd76abc74602ef54c1697c740f1.jpg'
#     user_spotify_username = user_params["display_name"] ? user_params["display_name"] : 'no spotify username'
#     user_spotify_url = user_params["external_urls"]['spotify'] ? user_params["external_urls"]['spotify'] : 'no url for this user'
  
#     # byebug
#     spotify_user.update({
#       spotify_access_token: auth_params["access_token"],
#       spotify_refresh_token: auth_params["refresh_token"],
#       spotify_expires_in: auth_params["expires_in"],
#       spotify_profile_image: user_spotify_profile_image,
#       spotify_username: user_spotify_username,
#       spotify_url: user_spotify_url,
#       connected_to_spotify: true
#   })

#     # spotify_user.update()
#     # new_releases = JSON.parse(RestClient.get('https://api.spotify.com/v1/browse/new-releases', header))

#     # my_link = user_params['external_urls']['spotify']

#     # nickname = user_params['id']

#     # meridian = RestClient.get("https://api.spotify.com/v1/search?q=desesperanza&type=album", header)

#       render json: {spotify_response: auth_params, user_params: user_params, spotify_user: spotify_user}

#   end

#   def refresh_access_token 
#     current_user = User.find_by(id: session[:user_id])
#     if current_user.access_token_expired?
#       body = {
#         grant_type: 'refresh_token',
#         refresh_token: current_user.spotify_refresh_token,
#         client_id: ENV['SPOTIFY_CLIENT_ID'],
#         client_secret: ENV['SPOTIFY_SECRET']
#       }
    
#       auth_response = RestClient.post('https://accounts.spotify.com/api/token', body)
#       auth_params = JSON.parse(auth_response)
#       # byebug
#       current_user.update({
#         spotify_access_token: auth_params['access_token'], 
#       })
#       render json: {user: current_user, refreshed_token: current_user.spotify_access_token}
#     else
#       render json: {message: "Access Token is still valid"}
#     end

#   end

#   private

#     def spotify_uri
#       url = "https://accounts.spotify.com/authorize"
#       query_params = {
#         client_id: ENV['SPOTIFY_CLIENT_ID'],
#         response_type: 'code',
#         redirect_uri: 'http://localhost:4000/signup',
#         scope: "user-library-read
#         streaming
#         user-read-email
#         user-library-modify
#         playlist-read-collaborative
#         playlist-modify-private
#         user-modify-playback-state
#         user-read-private
#         user-top-read
#         user-read-playback-state
#         playlist-modify-public",
#        show_dialog: true,
#       }
#       return "#{url}?#{query_params.to_query}"
#     end
  
#   # def spotify_login
#   #   render json: {message: "Time to Spotify"}
#   # end
# end

# // *** HEROKU SETUP *** //

require 'uri'
require 'base64'
require 'json'
# require 'faraday'

class SpotifyController < ApplicationController
  # include HTTParty
  # include Faraday

  # def redirect_to_home
  #   redirect_to "http://localhost:4000", allow_other_host: true
  # end
  
  def spotify_request
    # url = "https://accounts.spotify.com/authorize"
    # query_params = {
    #   client_id: ENV['client_id'],
    #   response_type: 'code',
    #   redirect_uri: 'http://localhost:3000/access-token',
    #   scope: "user-library-read
    #   streaming
    #   playlist-read-collaborative
    #   playlist-modify-private
    #   user-modify-playback-state
    #   user-read-private
    #   user-top-read
    #   playlist-modify-public",
    #  show_dialog: true
    # }
    redirect_to spotify_uri, allow_other_host: true
    # render json: {spotify_code: params[:code]}
  end


  def receive_access_token

    # byebug
    
    body = {
      'code' => params[:code],
      'grant_type' => 'authorization_code',
      'redirect_uri' => 'https://curate-ify.herokuapp.com/signup',
      'client_id' => ENV['SPOTIFY_CLIENT_ID'],
      'client_secret' => ENV['SPOTIFY_SECRET']
    }

    # byebug

    auth_response = RestClient.post('https://accounts.spotify.com/api/token', body)

    # byebug 

    auth_params = JSON.parse(auth_response.body)

    # byebug

    header = {
      Authorization: "Bearer #{auth_params["access_token"]}"
    }

    # byebug

    user_response = RestClient.get('https://api.spotify.com/v1/me', header)

    # byebug

    user_params = JSON.parse(user_response.body)

    # byebug

    spotify_user = User.find_by(id: session[:user_id])

    # byebug

    # user_spotify_access_token = auth_params["access_token"]
    # user_spotify_refresh_token = auth_params["refresh_token"]
    # user_spotify_expires_in =  auth_params["expires_in"]
    user_spotify_profile_image = user_params["images"].length > 0 ? user_params["images"][0]["url"] : 'https://i.pinimg.com/736x/b6/2a/6c/b62a6cd76abc74602ef54c1697c740f1.jpg'
    user_spotify_username = user_params["display_name"] ? user_params["display_name"] : 'no spotify username'
    user_spotify_url = user_params["external_urls"]['spotify'] ? user_params["external_urls"]['spotify'] : 'no url for this user'
  
    # byebug
    spotify_user.update({
      spotify_access_token: auth_params["access_token"],
      spotify_refresh_token: auth_params["refresh_token"],
      spotify_expires_in: auth_params["expires_in"],
      spotify_profile_image: user_spotify_profile_image,
      spotify_username: user_spotify_username,
      spotify_url: user_spotify_url,
      connected_to_spotify: true
  })

    # spotify_user.update()
    # new_releases = JSON.parse(RestClient.get('https://api.spotify.com/v1/browse/new-releases', header))

    # my_link = user_params['external_urls']['spotify']

    # nickname = user_params['id']

    # meridian = RestClient.get("https://api.spotify.com/v1/search?q=desesperanza&type=album", header)

      render json: {spotify_response: auth_params, user_params: user_params, spotify_user: spotify_user}

  end

  def refresh_access_token 
    current_user = User.find_by(id: session[:user_id])
    if current_user.access_token_expired?
      body = {
        grant_type: 'refresh_token',
        refresh_token: current_user.spotify_refresh_token,
        client_id: ENV['SPOTIFY_CLIENT_ID'],
        client_secret: ENV['SPOTIFY_SECRET']
      }
    
      auth_response = RestClient.post('https://accounts.spotify.com/api/token', body)
      auth_params = JSON.parse(auth_response)
      # byebug
      current_user.update({
        spotify_access_token: auth_params['access_token'], 
      })
      render json: {user: current_user, refreshed_token: current_user.spotify_access_token}
    else
      render json: {message: "Access Token is still valid"}
    end

  end

  private

    def spotify_uri
      url = "https://accounts.spotify.com/authorize"
      query_params = {
        client_id: ENV['SPOTIFY_CLIENT_ID'],
        response_type: 'code',
        redirect_uri: 'https://curate-ify.herokuapp.com/signup',
        scope: "user-library-read
        streaming
        user-read-email
        user-library-modify
        playlist-read-collaborative
        playlist-modify-private
        user-modify-playback-state
        user-read-private
        user-top-read
        user-read-playback-state
        playlist-modify-public",
       show_dialog: true,
      }
      return "#{url}?#{query_params.to_query}"
    end
  
  # def spotify_login
  #   render json: {message: "Time to Spotify"}
  # end
end




# def receive_access_token

  # code_for_token = request.url.split('code=')[1]
  # code_params = params[:code]
  
    # base64: Base64.encode64(ENV['client_id'] + ':' + ENV['client_secret'])}

  # authOptions = {
  #   headers: {
  #     "Content-Type" : "application/x-www-form-urlencoded",
  #     "Authorization" : 'Basic ' + Base64.encode64(ENV['client_id'] + ':' + ENV['client_secret'])
  #   },
  #   body: {
  #     code: code_for_token,
  #     grant_type: 'authorization_code',
  #     redirect_uri: 'http://localhost:3000/access-token'
  #   },
  #   json: true
  # };
#   options = {
#     headers: {
#       "Content-Type": "application/json",
#       authorization: "Bearer #{our_token}",
#     },
#     query: { data: true },
#     body: { token: their_token }.to_json
# }

    #  HTTParty.post('https://accounts.spotify.com/api/token', authOptions)


  # body = {
  #   grant_type: 'authorization_code',
  #   code: code_for_token,
  #   redirect_uri: "http://loca"
  # }

  # body = {
  #   'code' => code_params,
  #   'grant_type' => 'authorization_code',
  #   'redirect_uri' => ENV['SPOTIFY_REDIRECT_URI'],
  #   'client_id' => ENV['SPOTIFY_CLIENT_ID'],
  #   'client_secret' => ENV['SPOTIFY_SECRET']
  # }

  # auth_response = RestClient.post('https://accounts.spotify.com/api/token', body)
  # auth_params = JSON.parse(auth_response.body)


  # header = {
  #   Authorization: "Bearer #{auth_params["access_token"]}"
  # }

 

  # access_token = auth_params['access_token']
  # refresh_token = auth_params['refresh_token']
  # token_type = auth_params['token_type']
  # expiration = auth_params['expires_in']

  # user_response = RestClient.get('https://api.spotify.com/v1/me', header)
  # user_params = JSON.parse(user_response.body)

  # new_releases = JSON.parse(RestClient.get('https://api.spotify.com/v1/browse/new-releases', header))

  # my_link = user_params['external_urls']['spotify']

  # nickname = user_params['id']

  # meridian = RestClient.get("https://api.spotify.com/v1/search?q=desesperanza&type=album", header)


  # byebug

  # headers = {
  #   'Content-Type' => 'application/x-www-form-urlencoded',
  #   # 'Authorization' => 'Basic ' + Base64.strict_encode64(ENV['client_id'] + ':' + ENV['client_secret'])
  #   'Authorization' => 'Basic ' + 'MzdlZGMyZjU2ZGM4NGY1Nzk0ZmQ1ODE4MWY2NjQwM2E6IDA1NWI3ZjliNmU0YTRkOGE5MjlkZjhhMmNlODMyMDQw'
  # }



  #   response = HTTParty.post("https://accounts.spotify.com/api/token",
  #     :headers => headers,
  #     :body => data
  #   )
      # :form => body,
      # :headers => headers,
      # :json => true
      # :body => { 
      #   :code => code_for_token,
      #   :grant_type => 'authorization_code',
      #   :redirect_uri => 'http://localhost:3000/access-token'},
      # :headers => { 
      #   :'Content-Type' => 'application/x-www-form-urlencoded',
      #   :"Authorization" => 'Basic ' + Base64.strict_encode64(ENV['client_id'] + ':' + ENV['client_secret'])
      # }
    # )

    # json_response = response

    # byebug
    
    # render json: {spotify_response: auth_params, user_params: user_params}
    #  {
#         headers: {
#           'Content-Type' : 'application/x-www-form-urlencoded',
#           'Authorization' : 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)      
#         },
#         data: 'grant_type=client_credentials',
#         method: 'POST'
#       })

# end











