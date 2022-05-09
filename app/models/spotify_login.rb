

class SpotifyLogin < ApplicationRecord

  # require 'base64'
  # include HTTParty

  client_id = '37edc2f56dc84f5794fd58181f66403a'
  client_secret = '055b7f9b6e4a4d8a929df8a2ce832040'

  def return_id
    puts 'hid'
  end

  # @@base64_encoded_id = Base64.encode64(client_id) + ":" + Base64.encode64(client_secret)

  # def puts_encode
  #   puts @@base64_encoded_id
  # end

  # puts_encode

#   TOKEN_URL = 'https://accounts.spotify.com/api/token'
#   TOKEN_HEADERS = ''
#   method: 'POST',
#   headers: {
#     "Content-Type": "application/x-www-form-urlencoded",
#     "Authorization" : "Basic " + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
#   },
#   form: {
#     grant_type: "authorization_code"
#   },
#   json: true

#   options = {
#   headers: {
#     "Content-Type": "application/x-www-form-urlencoded",
#     "Authorization" : "Basic " + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
#   },
#   query: { data: true },
#   body: { token: their_token }.to_json
#   # I just added .to_json      ^^^^^^^
# }

#   def request_access_token
#     HTTParty.post(TOKEN_URL, options)
#   end

end
