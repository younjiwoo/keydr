class CreateGamePlays < ActiveRecord::Migration[5.1]
  def change
    create_table :game_plays do |t|
      t.integer :score
      t.integer :game_id
      t.integer :player_id

      t.timestamps
    end
  end
end
