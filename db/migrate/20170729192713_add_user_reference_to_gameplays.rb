class AddUserReferenceToGameplays < ActiveRecord::Migration[5.1]
  def change
    add_reference :gameplays, :user, foreign_key: true
  end
end
