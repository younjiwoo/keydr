class AddGameReferenceToGameplays < ActiveRecord::Migration[5.1]
  def change
    add_reference :gameplays, :game, foreign_key: true
  end
end
