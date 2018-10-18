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
          new Challenge("Aerosmith", "assets/images/aerosmith.jpg", "Pink", "https://www.youtube.com/watch?v=KXvvK0CcJZQ"),
          new Challenge("Beatles", "assets/images/beatles.jpg", "Strawberry Fields Forever", "https://www.youtube.com/watch?v=B32dBS_1vMc"),
          new Challenge("Madonna", "assets/images/madonna.jpg", "La Isla Bonita", "https://www.youtube.com/watch?v=JZZWHnK6piM"),
          new Challenge("Queen", "assets/images/queen.jpg", "Bicycle Race", "https://www.youtube.com/watch?v=f_uvlq8xsy4"),
          new Challenge("GunsNRoses", "assets/images/gunsNRoses.jpg", "Sweet Child O'Mine", "https://www.youtube.com/watch?v=nnJUiWahYhg"),
          new Challenge("Scorpions", "assets/images/scorpions.jpg", "House Of Cards", "https://www.youtube.com/watch?v=JJSsuP_5Ld4"),
          new Challenge("Jackson", "assets/images/jackson.jpg", "Billie Jean", "https://www.youtube.com/watch?v=oUlXIRYtetg"),
          new Challenge("RollingStones", "assets/images/rollingStones.jpg", "Paint It, Black", "https://www.youtube.com/watch?v=-YJIvuTWGQw"),
          new Challenge("Blondie", "assets/images/blondie.jpg", "Call me", "https://www.youtube.com/watch?v=y6QBaZHltJw"),
          new Challenge("ModernTalking", "assets/images/modernTalking.jpg", "You're My Heart", "https://www.youtube.com/watch?v=Agiasy89pLo")
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

      isGameOver : function() {
        return this.attemptsLeft == 0;
      },

      newGame : function() {

          // removes previous chalange record from database
          if (this.currentChallenge != -1) {
              this.challenges.splice(this.currentChallenge, 1);
          }

          if (this.challenges.length === 0) {
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
          song.src = hangman.currentSongSrc();
      },

      currentWordReveal : function() {
          return this.word.join(" ");
      },

      currentImageSrc : function() {
          return this.challenges[this.currentChallenge].imgUrl;
      },

      currentSongSrc : function() {
          return this.challenges[this.currentChallenge].songUrl;
      },

      currentSongName : function() {
          return this.challenges[this.currentChallenge].songName + " By " + this.challenges[this.currentChallenge].singer;
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
