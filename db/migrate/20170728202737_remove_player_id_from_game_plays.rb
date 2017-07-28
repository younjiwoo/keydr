class RemovePlayerIdFromGamePlays < ActiveRecord::Migration[5.1]
  def change
    remove_column :game_plays, :player_id
  end
end
