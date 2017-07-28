class CreateGameplays < ActiveRecord::Migration[5.1]
  def change
    create_table :gameplays do |t|
      t.integer :game_id
      t.integer :user_id
      t.integer :score

      t.timestamps
    end
  end
end
