require 'uri'
require 'base64'
require 'json'
# require 'faraday'

class SpotifyController < ApplicationController
  include HTTParty
  # include Faraday

  
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
  end


  def receive_access_token

    # code_for_token = request.url.split('code=')[1]
    code_params = params[:code]
    
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

    body = {
      'code' => code_params,
      'grant_type' => 'authorization_code',
      'redirect_uri' => ENV['SPOTIFY_REDIRECT_URI'],
      'client_id' => ENV['SPOTIFY_CLIENT_ID'],
      'client_secret' => ENV['SPOTIFY_SECRET']
    }

    auth_response = RestClient.post('https://accounts.spotify.com/api/token', body)
    auth_params = JSON.parse(auth_response.body)


    header = {
      Authorization: "Bearer #{auth_params["access_token"]}"
    }

   

    access_token = auth_params['access_token']
    refresh_token = auth_params['refresh_token']
    token_type = auth_params['token_type']
    expiration = auth_params['expires_in']

    user_response = RestClient.get('https://api.spotify.com/v1/me', header)
    user_params = JSON.parse(user_response.body)

    new_releases = JSON.parse(RestClient.get('https://api.spotify.com/v1/browse/new-releases', header))

    my_link = user_params['external_urls']['spotify']

    nickname = user_params['id']

    meridian = RestClient.get("https://api.spotify.com/v1/search?q=desesperanza&type=album", header)


    byebug

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
      
      render json: {spotify_response: response}
      #  {
  #         headers: {
  #           'Content-Type' : 'application/x-www-form-urlencoded',
  #           'Authorization' : 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)      
  #         },
  #         data: 'grant_type=client_credentials',
  #         method: 'POST'
  #       })

  end

  private

    def spotify_uri
      url = "https://accounts.spotify.com/authorize"
      query_params = {
        client_id: ENV['client_id'],
        response_type: 'code',
        redirect_uri: 'http://localhost:3000/access-token',
        scope: "user-library-read
        streaming
        playlist-read-collaborative
        playlist-modify-private
        user-modify-playback-state
        user-read-private
        user-top-read
        playlist-modify-public",
       show_dialog: true,
      }
      return "#{url}?#{query_params.to_query}"
    end
  
  # def spotify_login
  #   render json: {message: "Time to Spotify"}
  # end
end
