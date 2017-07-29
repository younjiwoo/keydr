class Gameplay < ApplicationRecord
  belongs_to :game, optional: true
  belongs_to :user, optional: true

  def self.showTop3Scores(game_id)
    self.where(game_id: game_id).order('score DESC').limit(3)
  end
end
