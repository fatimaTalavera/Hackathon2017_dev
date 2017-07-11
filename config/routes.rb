Rails.application.routes.draw do
  root 'welcome#index'
  post 'search/map', to: 'search#map'
  post 'search/progress', to: 'search#progress'
  post 'search/progress_paid', to: 'search#progress_paid'

end
