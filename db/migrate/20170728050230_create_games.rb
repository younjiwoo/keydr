class CreateGames < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.string :title
      t.string :artist
      t.string :level
      t.string :file_path
      t.json :pattern

      t.timestamps
    end
  end
end
