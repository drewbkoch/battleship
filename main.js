console.log('main.js here...')


//define data structure
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




//combine all possible coordinates of player
//TODO: make function --> kind of unnecessary unless more than 2 players

var player1AllCoordinates = player1[0].piece.coordinates.concat(player1[1].piece.coordinates, player1[2].piece.coordinates,player1[3].piece.coordinates,player1[4].piece.coordinates);

//var player2AllCoordinates = player2[0].piece.coordinates.concat(player2[2].piece.coordinates, player2[2].piece.coordinates,player2[3].piece.coordinates,player2[4].piece.coordinates);

//add player 1 submit event handler
$('#playerOneSubmit button').on('click',function() {
  var submission = $('#playerOneSubmit input').val();
  checkArrayForHit(player1AllCoordinates,submission);
})

function checkArrayForHit(array,submission) {
  if (array.indexOf(submission) > -1) {
    //keep track of which coordinates are hit
    for (i=0; i<player1.length; i++) {
      //looping over main data array
      if (player1[i].piece.coordinates.indexOf(submission) > -1) {
        //add to hit array and alert user of hit
        player1[i].piece.hit.push(submission);
        alert('Hit! '+ player1[i].piece.name);
        //check if piece is sunk
        //TODO: doesn't handle case of player submitting same coordinate multiple times
        if (player1[i].piece.coordinates.length === player1[i].piece.hit.length) {
          player1[i].piece.sunk = true;
          alert("You sunk the other player's "+player1[i].piece.name);

          //check if last piece sunk. If so, player wins!!!
          var numberSunk = 0;
          for (s=0;s<player1.length;s++) {
            if (player1[s].piece.sunk == true) {
              numberSunk++;
              console.log(numberSunk)
            }
            if (numberSunk === player1.length) {
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









