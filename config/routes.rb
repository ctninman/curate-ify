Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
    # route to test your configuration
    get '/hello', to: 'application#hello_world'
  # Defines the root path route ("/")
  # root "articles#index"
end
