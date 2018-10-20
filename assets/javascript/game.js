function Challenge( singer, imgUrl, songName, songUrl ) {
    // properties
    this.singer = singer;
    this.imgUrl = imgUrl;
    this.songName = songName;
    this.songUrl = songUrl;
  }

  var hangman =
  {
      challenges : [
          new Challenge("Aerosmith", "assets/images/aerosmith.jpg", "Sweet Emotion", "https://upload.wikimedia.org/wikipedia/en/d/d1/Aerosmith_-_Sweet_Emotion.ogg"),
          new Challenge("Beatles", "assets/images/beatles.jpg", "Strawberry Fields Forever", "https://upload.wikimedia.org/wikipedia/en/d/dc/Strawberry_Fields_Forever_%28Beatles_song_-_sample%29.ogg"),
          new Challenge("Madonna", "assets/images/madonna.jpg", "La Isla Bonita", "https://upload.wikimedia.org/wikipedia/en/0/07/Madonna_-_la_isla_bonita.ogg"),
          new Challenge("Queen", "assets/images/queen.jpg", "Bicycle Race", "https://upload.wikimedia.org/wikipedia/en/8/8f/Queen_-_Bicycle_Race.ogg"),
          new Challenge("GunsNRoses", "assets/images/gunsNRoses.jpg", "Sweet Child O'Mine", "https://upload.wikimedia.org/wikipedia/en/4/42/Sweet_Child_O%27_Mine.ogg"),
          new Challenge("Genesis", "assets/images/genesis.jpg", "Invisible Touch", "https://upload.wikimedia.org/wikipedia/en/a/ae/Genesis_-_Invisible_Touch.ogg"),
          new Challenge("MichaelJackson", "assets/images/jackson.jpg", "Billie Jean", "https://upload.wikimedia.org/wikipedia/en/2/2e/Michael_Jackson_-_Billie_Jean.ogg"),
          new Challenge("RollingStones", "assets/images/rollingStones.jpg", "Paint It, Black", "https://upload.wikimedia.org/wikipedia/en/1/1e/The_Rolling_Stones_-_Paint_It_Black.ogg"),
          new Challenge("Blondie", "assets/images/blondie.jpg", "Call me", "https://upload.wikimedia.org/wikipedia/en/5/5a/BlondieCallMe.ogg"),
          new Challenge("ModernTalking", "assets/images/modernTalking.jpg", "Shooting Star", "https://upload.wikimedia.org/wikipedia/en/c/ca/Shooting_Star.ogg")
      ],
      attemptsLeft : 10,
      wins : 0,
      word : [],
      letters : [],
      currentChallenge : -1,

      guessedLetters : function() {
        return this.letters.join(", ");
      },

      isWordGuessed : function() {
        return !this.word.includes("_");
      },

      isGameLost : function() {
        return this.attemptsLeft === 0;
      },

      isGameWin : function() {
        return this.challenges.length === 0;
      },

      newGame : function() {

          // removes previous chalange record from database
          if (this.currentChallenge != -1) {
              this.challenges.splice(this.currentChallenge, 1);
          }

          if (this.isGameWin()) {
              return;
          }

          do {
              this.currentChallenge = Math.floor(Math.random() * this.challenges.length);
          }
          while (this.currentChallenge === this.challenges.length);

          this.word = [];
          for(i = 0; i < this.challenges[this.currentChallenge].singer.length; ++ i)
          {
            this.word[i] = "_";
          }
          
          this.attemptsLeft = 15;
          this.letters = [];
          this.songUrl = this.challenges[this.currentChallenge].songUrl;
      },

      currentWordReveal : function() {
          return this.word.join(" ");
      },

      currentImageSrc : function() {
          return this.challenges[this.currentChallenge].imgUrl;
      },

      currentSongSrc : function() {
       //   return "https://www.youtube.com/embed/KXvvK0CcJZQ?controls=0";
           return this.challenges[this.currentChallenge].songUrl;
      },

      currentSongName : function() {
          return this.challenges[this.currentChallenge].songName + " By " + this.challenges[this.currentChallenge].singer;
      },

      makeGuess : function(letter) {
          var typedLetterUppercase = letter.toUpperCase();
          if (this.letters.includes(typedLetterUppercase)) {
              // Ignore
              return;
          }

          var typedLetterLowercase = letter.toLowerCase();
          if (this.word.includes(typedLetterLowercase)) {
            // Ignore
            return;
          }

          -- this.attemptsLeft;
          
          var guess = false;
          var singer = this.challenges[this.currentChallenge].singer;
          for(var i = 0; i < singer.length; ++ i) {
              var currLetterLowercase = singer[i].toLowerCase();
              if (currLetterLowercase === typedLetterLowercase) {
                  this.word[i] = currLetterLowercase;
                  guess = true;
              }
          }

          if (!guess) {
            this.letters[this.letters.length] = typedLetterUppercase;
          }
      }
  }
