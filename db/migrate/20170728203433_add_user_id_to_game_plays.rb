class AddUserIdToGamePlays < ActiveRecord::Migration[5.1]
  def change
    add_column :game_plays, :user_id, :integer
  end
end
