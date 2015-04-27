console.log('main.js here...')


//define data structure
var player1 = [
  {"piece": {
    "name": "aircraftCarrier",
    "length": 5,
    "coordinates": ["A1","A2","A3","A4","A5"],
    "hit": []
  }},
  {"piece": {
    "name": "battleship",
    "length": 4,
    "coordinates": ["B1","B2","B3","B4"],
    "hit": []
  }},
  {"piece": {
    "name": "submarine",
    "length": 3,
    "coordinates": ["C1","C2","C3"],
    "hit": []
  }},
  {"piece": {
    "name": "destroyer",
    "length": 3,
    "coordinates": ["D1","D2","D3"],
    "hit": []
  }},
  {"piece": {
    "name": "patrolBoat",
    "length": 2,
    "coordinates": ["E1","E2"],
    "hit": []
  }}
]

var player2 = {
  "aircraftCarrier": {
    "length": 5,
    "coordinates": ["A1","A2","A3","A4","A5"],
    "hit": []
  },
  "battleship": {
    "length": 4,
    "coordinates": ["B1","B2","B3","B4"],
    "hit": []
  },
  "submarine": {
    "length": 3,
    "coordinates": ["C1","C2","C3"],
    "hit": []
  },
  "destroyer": {
    "length": 3,
    "coordinates": ["D1","D2","D3"],
    "hit": []
  },
  "patrolBoat": {
    "length": 2,
    "coordinates": ["E1","E2"],
    "hit": []
  }
}

//combine all possible coordinates of player
//TODO: make function --> kind of unnecessary unless more than 2 players

var player1AllCoordinates = player1[0].piece.coordinates.concat(player1[1].piece.coordinates, player1[2].piece.coordinates,player1[3].piece.coordinates,player1[4].piece.coordinates);

var player2AllCoordinates = player2[0].piece.coordinates.concat(player2[2].piece.coordinates, player2[2].piece.coordinates,player2[3].piece.coordinates,player2[4].piece.coordinates);

//add player 1 submit event handler
$('#playerOneSubmit button').on('click',function() {
  var submission = $('#playerOneSubmit input').val();
  checkArrayForHit(player1AllCoordinates,submission);
})

function checkArrayForHit(array,submission) {
  if (array.indexOf(submission) > -1) {
    alert("HIT!")

    //keep track of which coordinates are hit

  } else {
    alert("MISS")
  }
}




