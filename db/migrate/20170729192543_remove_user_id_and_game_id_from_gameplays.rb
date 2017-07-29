class RemoveUserIdAndGameIdFromGameplays < ActiveRecord::Migration[5.1]
  def change
    remove_column :gameplays, :user_id
    remove_column :gameplays, :game_id
  end
end
