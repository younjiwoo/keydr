# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Game.delete_all
games = Game.create([
    {
      title: '30 seconds song',
      artist: 'Dont know',
      level: 'Easy',
      file_path: '/assets/30sec.ogg',
      pattern: {
        'd': [9, 11, 13, 17, 18, 19, 27, 37, 38],
        'f': [8, 10, 12, 19, 26, 27, 34, 37],
        'j': [0, 1, 2, 5, 7, 13, 23, 28, 32, 35, 36],
        'k': [0, 2, 2.5, 3, 3.5, 4, 22, 25, 28, 29, 30, 31, 32, 39, 40, 42, 43]
      }
    },
    {
      title: 'Wild Thoughts',
      artist: 'DJ Khaled & Rihanna',
      level: 'Medium',
      file_path: '../assets/wildThoughts.ogg',
      pattern: {
        'd': [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 13, 14, 37, 38],
        'f': [2, 3, 4, 5, 7, 12, 19, 26, 27, 34, 37],
        'j': [0, 1, 2, 5, 7, 13, 23, 28, 32, 35, 36],
        'k': [0, 2, 2.5, 3, 3.5, 4, 22, 25, 28, 29, 30, 31, 32, 39, 40, 42, 43]
      }
    },
    {
      title: 'Location',
      artist: 'Khalid',
      level: 'Hard',
      file_path: 'assets/Khalid_Location.ogg',
      pattern: {
        'd': [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 13, 14, 37, 38],
        'f': [2, 3, 4, 5, 7, 12, 19, 26, 27, 34, 37],
        'j': [0, 1, 2, 5, 7, 13, 23, 28, 32, 35, 36],
        'k': [0, 2, 2.5, 3, 3.5, 4, 22, 25, 28, 29, 30, 31, 32, 39, 40, 42, 43]
      }
    }
  ])
