class DropGamePlays < ActiveRecord::Migration[5.1]
  def change
    drop_table :game_plays
  end
end
