class GameplaysController < ApplicationController

  def create
    if current_user
      @gameplay = Gameplay.create({score: params[:score],
                                   user_id: current_user[:id],
                                   game_id: params[:game_id] })
    end
    
    render :json => Gameplay.showTop3Scores(params[:game_id]).to_json(:include => :user)
  end

end
