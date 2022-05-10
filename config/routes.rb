Rails.application.routes.draw do
  resources :users
  resources :spotify_logins
  # get 'spotify/spotify_login'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
    # route to test your configuration
    get '/hello', to: 'application#hello_world'
  # Defines the root path route ("/")
  # root "articles#index"

    post '/signup', to: 'users#create'

    get '/spotify-login', to: 'spotify#spotify_request'

    get '/spotify-info', to: 'spotify_logins#spotify_info'

    post '/access-token', to: 'spotify#receive_access_token'

    # Default route (if not in rails routes, send to client)
    # get '#access_token',
    # to: 'fallback#index',
    # constraints: ->(req) { !req.xhr? && req.format.html? }

      # Default route (if not in rails routes, send to client)
  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }
end
