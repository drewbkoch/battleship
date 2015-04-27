console.log('main.js here...')


//define data structure
//TODO: let data be created by players
var player1 = [
  {"piece": {
    "name": "Aircraft Carrier",
    "length": 5,
    "coordinates": ["A1","A2","A3","A4","A5"],
    "hit": [],
    "sunk": false
  }},
  {"piece": {
    "name": "Battleship",
    "length": 4,
    "coordinates": ["B1","B2","B3","B4"],
    "hit": [],
    "sunk": false
  }},
  {"piece": {
    "name": "Submarine",
    "length": 3,
    "coordinates": ["C1","C2","C3"],
    "hit": [],
    "sunk": false
  }},
  {"piece": {
    "name": "Destroyer",
    "length": 3,
    "coordinates": ["D1","D2","D3"],
    "hit": [],
    "sunk": false
  }},
  {"piece": {
    "name": "Patrol Boat",
    "length": 2,
    "coordinates": ["E1","E2"],
    "hit": [],
    "sunk": false
  }}
]

var player2 = [
  {"piece": {
    "name": "Aircraft Carrier",
    "length": 5,
    "coordinates": ["A1","A2","A3","A4","A5"],
    "hit": [],
    "sunk": false
  }},
  {"piece": {
    "name": "Battleship",
    "length": 4,
    "coordinates": ["B1","B2","B3","B4"],
    "hit": [],
    "sunk": false
  }},
  {"piece": {
    "name": "Submarine",
    "length": 3,
    "coordinates": ["C1","C2","C3"],
    "hit": [],
    "sunk": false
  }},
  {"piece": {
    "name": "Destroyer",
    "length": 3,
    "coordinates": ["D1","D2","D3"],
    "hit": [],
    "sunk": false
  }},
  {"piece": {
    "name": "Patrol Boat",
    "length": 2,
    "coordinates": ["E1","E2"],
    "hit": [],
    "sunk": false
  }}
]




//combine all possible coordinates of player
//TODO: make function --> kind of unnecessary unless more than 2 players

var player1AllCoordinates = player1[0].piece.coordinates.concat(player1[1].piece.coordinates, player1[2].piece.coordinates,player1[3].piece.coordinates,player1[4].piece.coordinates);

var player2AllCoordinates = player2[0].piece.coordinates.concat(player2[2].piece.coordinates, player2[2].piece.coordinates,player2[3].piece.coordinates,player2[4].piece.coordinates);

//add player 1 submit event handler
$('.move-submitter button').on('click',function() {
  var submission = $(this).siblings('input').val();

  //set which player is the other player
  var otherPlayerNumber = $(this).parents('.move-submitter').attr('data-other-player');
  var otherPlayer = "player"+otherPlayerNumber
  var coordinateArray = eval(otherPlayer+"AllCoordinates");
  var otherPlayer = eval(otherPlayer);
  checkArrayForHit(coordinateArray, otherPlayer, submission);
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
