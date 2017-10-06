Rails.application.routes.draw do
  root 'welcome#index'
  get 'search/search', to: 'search#search'
  post 'send_contact_email', to: 'welcome#send_contact_email', as: :send_contact_email
  post '/calificacion' , to: 'calificacion#update'

end
