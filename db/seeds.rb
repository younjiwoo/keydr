# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
def pattern_maker(length, speed)
  pattern = {d: [], f: [], j: [], k: []}
  (length * 2 - 10).times do |i|
    if rand > speed
      pattern[:d] << i / 2.0
    end
    if rand > speed
      pattern[:f] << i / 2.0
    end
    if rand > speed
      pattern[:j] << i / 2.0
    end
    if rand > speed
      pattern[:k] << i / 2.0
    end
  end
  pattern
end
Game.delete_all
games = Game.create([
    {
      title: 'Location',
      artist: 'Khalid',
      level: 'Easy',
      file_path: '/assets/location.ogg',
      pattern: pattern_maker(222, 0.85)
    },
    {
      title: 'Wild Thoughts',
      artist: 'DJ Khaled & Rihanna',
      level: 'Medium',
      file_path: '/assets/wildThoughts.ogg',
      pattern: pattern_maker(215, 0.7)
    },
    {
      title: 'Stolen Dance',
      artist: 'Milky Chance',
      level: 'Hard',
      file_path: '/assets/stolenDance_milkyChance.ogg',
      pattern:  pattern_maker(286, 0.6)
    }
  ])
