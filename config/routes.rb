Rails.application.routes.draw do
  get 'history', to: 'history#index'

  get 'history/update'
  post 'history/open'

  get 'ledger', to: 'ledger#index'
  post 'ledger/deposit'
  post 'ledger/withdraw'
  get 'ledger/update'
  get 'ledger/destroy'

  get 'trade', to: 'trade#index'

  post 'trade/create'
  post 'trade/update_post'

  get 'trade/update'

  post 'trade/close'
  get 'trade/destroy'

  devise_for :users, controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
  }

  get 'application', to: 'application#index'
  get 'application/refresh'
  get 'application/ticker'

  root 'application#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
