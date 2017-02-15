require 'http'

class MainController < ApplicationController
  def home
  end

  def navigate
    h = params['h'].to_i
    j = params['j'].to_i
    k = params['k'].to_i
    l = params['l'].to_i

    directions = [h, j, k, l]


    HTTP.get('http://192.168.43.221:5000', {
               params: {
                 directions: directions.join(',')
               }
             })

    return 200
  end
end
