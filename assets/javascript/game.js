function Challenge( singer, imgUrl, songName, songUrl ) {
    // properties
    this.singer = singer;
    this.imgUrl = imgUrl;
    this.songName = songName;
    this.songUrl = songUrl;

    // methods
    this.sayHey = function() {
     console.log( "Challenge : " + singer );
    };
  }

  var hangman =
  {
      challenges : [
          new Challenge("Aerosmith", "", ""),
          new Challenge("Beatles", "", ""),
          new Challenge("Madonna", "", ""),
          new Challenge("Queen", "", ""),
          new Challenge("GunsNRoses", "", ""),
          new Challenge("Scorpions", "", ""),
          new Challenge("Jackson", "", ""),
          new Challenge("RollingStones", "", ""),
          new Challenge("Blondie", "", ""),
          new Challenge("Yanni", "", "")
      ],
      attemptsLeft : 10,
      wins : 0,
      word : "",
      letters : [],
      currentChallenge : -1,

      guessedLetters : function() {
        return this.letters.join(", ");
      },

      isWordGuessed : function() {
        return !this.word.includes('-');
      },

      isGameOver : function() {
        return this.attemptsLeft == 0;
      },

      newGame : function() {
          if (this.currentChallenge != -1) {
              this.challenges.splice(this.currentChallenge, 1);
          }

          if (this.challenges.length == 0) {
              return;
          }

          do {
              this.currentChallenge = Math.floor(Math.random() * this.challenges.length);
          }
          while (this.currentChallenge === this.challenges.length);

          this.word = "-".repeat(this.challenges[this.currentChallenge].singer.length);
          this.attemptsLeft = 10;
          this.letters = [];
      },

      currentWordReveal : function() {
          return this.word;
      },

      makeGuess : function(letter) {
          if (this.letters.includes(letter)) {
              // Ignore
              return;
          }

          -- this.attemptsLeft;
          this.letters[this.letters.length] = letter;
          var singer = this.challenges[this.currentChallenge].singer;
          for(var i = 0; i < singer.length; ++ i) {
              if (singer[i] === letter) {
                  this.word[i] = letter;
              }
          }
      }
  }
