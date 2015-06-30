  var game = null;
  var initial_time = 10 * 60*4;

  function createGame() {
    game = new Game(initial_time, 'information', 'player1timer', 'player2timer');
    game.resetTimer();
  }

  //Format the time
  function formatTime(tenths) {
    var minutes = String(Math.floor(tenths/600));
    var seconds = String(Math.floor(tenths/10) % 60);
    if (seconds.length == 1) { seconds = '0' + seconds;}
    var decimal = String(tenths % 10);

    return (minutes != '0') ?
      (minutes + ':' + seconds) :
      (seconds + '.' + decimal);
  }
  
  //Set the player
  function Player(clock_id, initial_time, game) {
    this.clock = document.getElementById(clock_id);
    this.initial_time = initial_time;
    this.time = this.initial_time;
    this.game = game;
    this.opponent = null;
  }
  

  Player.prototype.play = function() {
    var opponent = this.opponent;
    var game = this.game;
    if (!game.game_over) {
      clearTimeout(game.timer_loop);
      game.timer_loop = setInterval(function(){
        opponent.time -= 1;
        if (opponent.time == 0) {
          clearTimeout(game.timer_loop);
          game.game_over = true;
          game.information.className = '';
          game.resetTimer();
          alert('Congratulations!!! ' + opponent.name + ' won the game. ');
        }
        game.displayTimers();
      }, 100);
      opponent.clock.className = 'now_playing';
      this.clock.className = '';
      game.information.className = 'hidden';
    }
  }

  //process the game
  function Game(initial_time, info_id, p1_clock_id, p2_clock_id) {
    this.information = document.getElementById(info_id);
    this.player1 = new Player(p1_clock_id, initial_time, this);
    this.player2 = new Player(p2_clock_id, initial_time, this);
    this.player1.opponent = this.player2;
    this.player1.opponent.name = 'Player1'
    this.player2.opponent = this.player1;
    this.player2.opponent.name = 'Player2'
    this.timer_loop = null;
    this.game_over = false;
  }

  //button handler
  Game.prototype.clickPlayer1 = function(e) {
    this.player1.play(); 
  }

  Game.prototype.clickPlayer2 = function(e) {
    this.player2.play(); 
  }
 
  // Show the time
  Game.prototype.displayTimers = function() {
    this.player1.clock.innerHTML = formatTime(this.player1.time);
    this.player2.clock.innerHTML = formatTime(this.player2.time);
  }
  // Reset the time
  Game.prototype.resetTimer = function() {
    clearTimeout(this.timer_loop);
    this.player1.clock.className = '';
    this.player2.clock.className = '';
    this.information.className = 'hidden';
    this.player1.time = this.player1.initial_time;
    this.player2.time = this.player2.initial_time;
    this.game_over = false;
    this.displayTimers();
  }

