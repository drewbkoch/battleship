console.log('main.js here...')


//define data structure
//TODO: let data be created by players
var player1 = [
  {"piece": {
    "name": "Aircraft Carrier",
    "length": 5,
    "coordinates": [],
    "hit": [],
    "sunk": false
  }},
  {"piece": {
    "name": "Battleship",
    "length": 4,
    "coordinates": [],
    "hit": [],
    "sunk": false
  }},
  {"piece": {
    "name": "Submarine",
    "length": 3,
    "coordinates": [],
    "hit": [],
    "sunk": false
  }},
  {"piece": {
    "name": "Destroyer",
    "length": 3,
    "coordinates": [],
    "hit": [],
    "sunk": false
  }},
  {"piece": {
    "name": "Patrol Boat",
    "length": 2,
    "coordinates": [],
    "hit": [],
    "sunk": false
  }}
]

var player2 = [
  {"piece": {
    "name": "Aircraft Carrier",
    "length": 5,
    "coordinates": [],
    "hit": [],
    "sunk": false
  }},
  {"piece": {
    "name": "Battleship",
    "length": 4,
    "coordinates": [],
    "hit": [],
    "sunk": false
  }},
  {"piece": {
    "name": "Submarine",
    "length": 3,
    "coordinates": [],
    "hit": [],
    "sunk": false
  }},
  {"piece": {
    "name": "Destroyer",
    "length": 3,
    "coordinates": [],
    "hit": [],
    "sunk": false
  }},
  {"piece": {
    "name": "Patrol Boat",
    "length": 2,
    "coordinates": [],
    "hit": [],
    "sunk": false
  }}
]


//combine all possible coordinates of player
//TODO: make function --> kind of unnecessary unless more than 2 players
//TODO: don't concat until data is completely finished being set up

var player1AllCoordinates = player1[0].piece.coordinates.concat(player1[1].piece.coordinates, player1[2].piece.coordinates,player1[3].piece.coordinates,player1[4].piece.coordinates);

var player2AllCoordinates = player2[0].piece.coordinates.concat(player2[2].piece.coordinates, player2[2].piece.coordinates,player2[3].piece.coordinates,player2[4].piece.coordinates);

//player submit event handler
$('.move-submitter button').on('click',function() {
  var submission = $(this).siblings('input').val();
  //clear input
  $(this).siblings('input').val("")

  var parent = $(this).parents('.move-submitter');

  //set which player is the other player
  var otherPlayerNumber = $(this).parents('.move-submitter').attr('data-other-player');
  var otherPlayer = "player"+otherPlayerNumber
  var coordinateArray = eval(otherPlayer+"AllCoordinates");
  var otherPlayer = eval(otherPlayer);
  checkArrayForHit(coordinateArray, otherPlayer, submission);

  //next player's turn
  $('.move-submitter').not(parent).each(function(){
    $(this).show();
  });

  parent.hide();

  if ($('#player-1-board').css('display') == 'table') {
    $('#player-1-board').hide();
    $('#player-2-board').show();
  } else {
    $('#player-1-board').show();
    $('#player-2-board').hide();
  }


})

function checkArrayForHit(array, player, submission) {
  if (array.indexOf(submission) > -1) {
    //keep track of which coordinates are hit
    for (i=0; i<player.length; i++) {
      //looping over main data array
      if (player[i].piece.coordinates.indexOf(submission) > -1) {
        //add to hit array and alert user of hit
        player[i].piece.hit.push(submission);
        alert('Hit! '+ player[i].piece.name);
        //check if piece is sunk
        //TODO: doesn't handle case of player submitting same coordinate multiple times
        if (player[i].piece.coordinates.length === player[i].piece.hit.length) {
          player[i].piece.sunk = true;
          alert("You sunk the other player's "+player[i].piece.name);

          //check if last piece sunk. If so, player wins!!!
          var numberSunk = 0;
          for (s=0;s<player.length;s++) {
            if (player[s].piece.sunk == true) {
              numberSunk++;
              console.log(numberSunk)
            }
            if (numberSunk === player.length) {
              alert("WINNER");
            }
          }
        }
      }
    }

  } else {
    alert("MISS")
  }
}


//have player 1 set up aircraft carrier coordinates


//have these global vars change based on user and next piece
var player = eval("player1");
var hoverArray = [];
var pieceLengthArray = [5,4,3,3,2];
var pieceIndex = 0;

var player2PieceIndex = 0;


//when user hovers change all 5 cells to dark grey
$('#player-1-board td').on('mouseenter',function() {
  var column = this.cellIndex;
  var row = $(this).siblings('th').text();

  hoverArray.push($(this));

  for (i=0;i<pieceLengthArray[pieceIndex]-1;i++) {
    var next = hoverArray[i];
    next = next.next();
    hoverArray.push(next);

    if ( hoverArray.length === pieceLengthArray[pieceIndex] ) {
      for (i=0;i<hoverArray.length;i++) {
        hoverArray[i].addClass("hoveredOn")
      }
    }
  }
})

$('#player-1-board td').on('mouseleave',function() {
  for (i=0;i<hoverArray.length;i++) {
    hoverArray[i].removeClass("hoveredOn")
    if (i===hoverArray.length-1) {
      hoverArray = []; //reset array
    }
  }
})



//step 1: click on table and get coordinates
$('#player-1-board td').on('click',function() {
  var column = this.cellIndex;
  var row = $(this).siblings('th').text();

  //change selected area to a solid color
  for (i=0;i<hoverArray.length;i++) {
    hoverArray[i].addClass("selected")
  }

  //generate array that gets pushed to user's data array
  for (i=0;i<pieceLengthArray[pieceIndex];i++) {
    var cell = row+column;
    player1[pieceIndex].piece.coordinates.push(cell);
    column++;

    //after last data is pushed, change global vars and switch to next piece or user
    if (i===pieceLengthArray[pieceIndex]-1) {
      pieceIndex++;
      if (pieceIndex === 5) {
        //gone past player 1, switch to player 2
        pieceIndex = 0;
        player = eval("player2");
        $("#player-1-board").hide();
        $("#player-2-board").show();
      }
    }

  }


})

$('#player-2-board td').on('mouseenter',function() {
  var column = this.cellIndex;
  var row = $(this).siblings('th').text();

  hoverArray.push($(this));

  for (i=0;i<pieceLengthArray[player2PieceIndex]-1;i++) {
    var next = hoverArray[i];
    next = next.next();
    hoverArray.push(next);

    if ( hoverArray.length === pieceLengthArray[player2PieceIndex] ) {
      for (i=0;i<hoverArray.length;i++) {
        hoverArray[i].addClass("hoveredOn")
      }
    }
  }
})

$('#player-2-board td').on('mouseleave',function() {
  for (i=0;i<hoverArray.length;i++) {
    hoverArray[i].removeClass("hoveredOn")
    if (i===hoverArray.length-1) {
      hoverArray = []; //reset array
    }
  }
})


$('#player-2-board td').on('click',function() {
  var column = this.cellIndex;
  var row = $(this).siblings('th').text();

  //change selected area to a solid color
  for (i=0;i<hoverArray.length;i++) {
    hoverArray[i].addClass("selected")
  }

  //generate array that gets pushed to user's data array
  for (i=0;i<pieceLengthArray[player2PieceIndex];i++) {
    var cell = row+column;
    player2[player2PieceIndex].piece.coordinates.push(cell);
    column++;

    //after last data is pushed, change global vars and switch to next piece or user
    if (i===pieceLengthArray[player2PieceIndex]-1) {
      player2PieceIndex++;
      if (player2PieceIndex === 5) {
        //gone past player 1, switch to player 2
        alert("Time to play!")
        $("#player-1-board").show();
        $("#player-2-board").hide();
        $("#buttons").show();
        player1AllCoordinates = player1[0].piece.coordinates.concat(player1[1].piece.coordinates, player1[2].piece.coordinates,player1[3].piece.coordinates,player1[4].piece.coordinates);

        player2AllCoordinates = player2[0].piece.coordinates.concat(player2[2].piece.coordinates, player2[2].piece.coordinates,player2[3].piece.coordinates,player2[4].piece.coordinates);
      }
    }

  }


})
