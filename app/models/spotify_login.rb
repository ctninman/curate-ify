

class SpotifyLogin < ApplicationRecord

  # require 'base64'
  # include HTTParty

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
