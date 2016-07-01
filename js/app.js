
$(document).on('ready', function() {
  console.log('JS is loaded!');

  //self-building player objects
  var playersArr = [];
  var boardLength = 7;//put input here
  var countPlayers = 3;//put input here
  var Nums = 0;

  // create players
  numPlayers(countPlayers);

  function numPlayers(num){
    var playerNum = 1;
    for(var s = 0; s < num; s++){
      //setting into an array, since you cannot directly alter a var
      playersArr[s] = new Player(randString(), randString(), playerNum, Nums);
      playerNum++;
    }
  }

  //reset keypress counter for each player (set marker back to start position)

  //generates random Avater, player image
  function randAvatar(input){
    //can hard code in playerbuild for loop
    //api to search spotify album covers for avater
  }

  //generates random token
  function randToken(){
    //can hard code in player for loop
  }

  //setting up random strings, to pass on as div identifiers and selectors
  function randString(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for( var i = 0; i < 5; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  //building the players automatically from the array
  function setUpGame(){
    for (var q = 0; q < countPlayers; q++){
      console.log(playersArr[q]);
      playmouth = playersArr[q].buildRow();
    }
    return playmouth;
  }

  //this is where it all starts!!!!
  setUpGame();

  function numSpaces(){
    var spaces = '';
    for( a = 0; a < boardLength; a++){
      spaces = spaces + '/';
    }
    return spaces;
  }

  function resetKeypress(nums){
    for(var z = 0; z < nums; z ++){
      playersArr[z].keyStroke(0);
      console.log(playersArr[z]);
    }
    console.log(playersArr);
  }

  //big constructor, to handle all functions per object/player
  function Player(color, letter, playerPos, lpressNum) {
    this.playerColor = color;
    this.playerLetter = letter;
    this.buildRow = function (){
      $('#board').append('<div class="size '+this.playerColor+
      '"><img class="avatar" id="' + this.playerColor + '" src=https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/8/005/079/233/062b1d4.jpg> ' +
      playerPos + '</div>');
      this.buildString();
      this.keyStroke(0);
    };//buildRow
    this.buildString = function (){
      for(var t = 0; t < boardLength; t++){
        $('.'+this.playerColor).append('<div class="inline clear ' +
        this.playerLetter + '" id="' + letter + t + '">_______</div>');
      }//for
      //finish line
      $('.'+this.playerColor).append('<div class="inline">|</div>');
    };//buildString

    //building the keypress automatiaclly
    this.keyStroke = function key(pressNum){
      $(window).on("keyup", function handleKeypress(event) {
        if(event.keyCode === (48 + playerPos)){
          if(pressNum === (boardLength-1)){
            $('#' + letter + pressNum).text(".");
            $('#' + letter + (pressNum-1)).text("_______");
            console.log(pressNum);
            alert('player' + playerPos + ' has won!');
            $('.clear').text("_______");
            //I could not get the board to reset properly
            pressNum = 0;
            window.location.reload();
          }else{
            $('#' + letter + pressNum).append("<img class=avatar src=http://i.imgur.com/mRGbsfa.jpg>");
            $('#' + letter + (pressNum-1)).text("_______");
            console.log('#' + letter + pressNum);
            pressNum++;
          }
        }//if key code
      });//keypress
    };

    this.avatar = function() {
      $('#search-form').on("submit", function handleSubmit(event){
        event.preventDefault();
        //see the serialized info
        console.log("form serialized", $('#search-form').serialize());

        $.ajax({
          method: 'GET',
          url: 'https://api.spotify.com/v1/search',
          data: $('#search-form').serialize(),
          success: handleSuccessCallback,
          error: handleErrorCallback
        });

        function handleSuccessCallback(json){

          //json.tracks.items.forEach(function(event){
          //var trackName = event.name;
          var albumUrl = json.tracks.items[0].event.album.images[0].url;
          //console.log(json.tracks.items[0].album.images[0].url);
          //var resultsHtml = ;

          var source = $('#track-result-item').html();
          var template = Handlebars.compile(source);
          var resultsHtml = template({
            trackName: trackName,
            albumUrl: albumUrl
          });
          //$('#results').text("results coming soon");
          $('img#'+this.playerColor).attr(src, albumUrl);
          console.log(albumUrl);


          //});//forEach
        }
        function handleErrorCallback(){

        }
      }); //handleCallback
    };//movement
  }//Player


}); //doc ready
