Rails.application.routes.draw do
  root to: 'main#home'
  get 'navigate', to: 'main#navigate', as: 'navigate'
end
