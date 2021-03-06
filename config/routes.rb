Rails.application.routes.draw do
  resources :relationships, except: [:index, :update]
  resources :queue_albums, only: [:create, :destroy]
  resources :artists, except: [:index, :show, :create, :update, :destroy]
  resources :list_albums, only: [:create, :destroy]
  resources :lists, except: :index
  resources :albums, except: [:index, :show]
  resources :users, except: :index
  # resources :spotify_logins
  # get 'spotify/spotify_login'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
    # route to test your configuration
    get '/hello', to: 'application#hello_world'
  # Defines the root path route ("/")
  # root "articles#index"

    get '/me', to: 'users#show'

    post '/signup', to: 'users#create'

    get '/users/:id/genres', to: 'users#get_genres_and_tags'
    get '/users/:id/lists', to: 'users#get_lists'
    get '/users/:id/artists', to: 'users#get_artists'
    get '/users/:id/queue_albums', to: 'users#get_queue_albums'
    get '/users/search/:search_term', to: 'users#search_users'
    get '/users/match/:matching_albums_array', to: 'users#users_matching_albums'
    get '/users/other/:id', to: 'users#other_user_show'

    get '/artists/:id/albums', to: 'artists#get_albums'

    get '/lists/search/:search_term', to: 'lists#search_lists'

    patch '/update-list', to: 'list_albums#order_update'

    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'

    get '/spotify-login', to: 'spotify#spotify_request'

    get '/spotify-info', to: 'spotify_logins#spotify_info'

    post '/access-token', to: 'spotify#receive_access_token'
    get '/refresh-token', to: 'spotify#refresh_access_token'

    # Default route (if not in rails routes, send to client)
    # get '#access_token',
    # to: 'fallback#index',
    # constraints: ->(req) { !req.xhr? && req.format.html? }

      # Default route (if not in rails routes, send to client)
  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }
end
