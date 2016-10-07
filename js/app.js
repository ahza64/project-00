//var player1, player2;
$(document).on('ready', function() {
  console.log('JS is loaded!');

  //self-building player objects
  var playersArr = [];
  var boardLength = 7;//put input here
  var countPlayers = 3;//put input here
  var Nums = 0;

  numPlayers(countPlayers);


  function numPlayers(num){
    var playerNum = 1;
    for(var s = 0; s < num; s++){
      //setting into an array, since you cannot directly alter a var
      playersArr[s] = new Player(randString(), randString(), playerNum, Nums, resetKeypress);
      playerNum++;
    }
    //console.log(playersArr);
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

  //truning the array of objects, into objects with different names
  // playersArr.forEach(function (element, index){
  //  var player+index = element;
  // });

  //sample hard coded player objects
  //player1 = new Player("blue", "a", "count", 1);
  //player2 = new Player("red", "b", "up", 2);
//playersArr[0].buildRow();
//playersArr[1].buildRow();
//playersArr[2].buildRow();
  //player1.buildString();
  //player2.buildString();
  function resetKeypress(nums){
    for(var z = 0; z < nums; z ++){
      playersArr[z].keyStroke(0);
      console.log(playersArr[z]);
    }
    console.log(playersArr);
  }

  //big constructor, to handle all functions per object/player
  function Player(color, letter, playerPos, lpressNum, resetK) {
    this.playerColor = color;
    this.playerLetter = letter;
    //this.pressNum = Nums;
    //building the board automatically
    this.buildRow = function (){
                          //for(r = 0; r < 2; r++){
                          $('#board').append('<div class="size '+this.playerColor+
                            '"><img class="avatar" id="' + this.playerColor + '" src=https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/8/005/079/233/062b1d4.jpg> ' +
                            playerPos + '</div>');
                          //}//for
                          this.buildString();
                          this.keyStroke(0);
                    };//buildRow
    this.buildString = function (){
                            for(var t = 0; t < boardLength; t++){
                              $('.'+this.playerColor).append('<div class="inline clear ' +
                                this.playerLetter + '" id="' + letter + t + '">_______</div>');
                                //<img id=a"'+letter+t+'" src="">');
                            }//for
                            //finish line
                            $('.'+this.playerColor).append('<div class="inline">|</div>');
                        };//buildString

    //building the keypress automatiaclly
    this.keyStroke = function key(pressNum, resetKeypress){
                        //console.log("The call is coming from inside the function!");
                        //var counter = 0;
                        //var not = keyPressNum;
                        //var n = 0;
                        //var pressNum = n;
                        $(window).on("keyup", function handleKeypress(event) {
                          if(event.keyCode === (47 + playerPos)){
                            if(pressNum === (boardLength-1)){
                              $('#' + letter + pressNum).text(".");
                              $('#' + letter + (pressNum-1)).text("_______");
                              console.log(pressNum);
                              alert('player' + playerPos + ' has won!');
                              //$('#board').remove();
                              //$('.inline').remove();
                              //resetKeypress(countPlayers);
                              //keyPressNum = 0;
                              $('.clear').text("_______");
//I could not get the board to reset properly
                              //$('#board').empty();
                              pressNum = 0;
                              //window.location.reload();
                              //key(0);
                              //setUpGame();
                              // console.log(pressNum);
                              // console.log(playersArr[1].pressNum);
                              resetKeypress(countPlayers);
                              //playersArr = [];
                              //letter = '';
                              //numPlayers(countPlayers);
                              //setUpGame();
                            }else{
                              //$('#a' + count).append("b");
                              //$('#' + this.playerLetter + (count - 1)).empty();
                              //$('#a' + letter + pressNum).attr(src, "http://i.imgur.com/mRGbsfa.jpg");
                              $('#' + letter + pressNum).append("<img class=avatar src=http://i.imgur.com/mRGbsfa.jpg>");
                              //$('#' + letter + pressNum).text('>');
                              $('#' + letter + (pressNum-1)).text("_______");
                              //$('#' + letter + counter - 1).text(" ");
                              console.log('#' + letter + pressNum);
                              pressNum++;
                            }
                            //pressNum = 0;
                          }//if key code
                        });//keypress
                      };

    this.avatar = function() {
                    $('#search-form').on("submit", function handleSubmit(event){
                      //console.log('form submitted');
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

  // var count = 0;
  // $(window).on("keypress", function handleKeypress(event) {
  //   if(event.keyCode === 32){
  //     //$('#a' + count).append("b");
  //     //$('#' + player1.playerLetter + (count - 1)).empty();
  //     $('#' + player1.playerLetter + count).append(player1.playerLetter);
  //     $('#' + player1.playerLetter + count - 1).text(" ");
  //     console.log('#' + player1.playerLetter + count);
  //     count++;
  //   }//if
  // });//keypress
  //
  // var up = 0;
  // $(window).on("keypress", function handleKeypress(event) {
  //   if(event.keyCode === 49){
  //     //$('#a' + up).append("b");
  //     //$('#' + letter + (up - 1)).empty();
  //     $('#' + player2.playerLetter + up).append(player2.playerLetter);
  //     console.log('#' + letter + up);
  //     up++;
  //   }//if
  // });//keypress





}); //doc ready
