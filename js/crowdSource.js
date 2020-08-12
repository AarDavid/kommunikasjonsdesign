var database;
var a,b,c;
var arrayList = [];

var myCheck1 = document.getElementById("input1");
var myCheck2 = document.getElementById("input2");
var myCheck3 = document.getElementById("input3");

var canvas = document.getElementById('test');
var data = {
    labels: ["Grupperom", "Kantine", "Forelesere"],
    datasets: [
        {
            label: "Happy",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: [],
            backgroundColor:[
						'#e74c3c',
						'#f1c40f',
						'#3498db'
					]
        }
    ]
};	

var option = {
	showLines: true
};
var myLineChart = Chart.Doughnut(canvas,{
	data:data,
  options:option
});

window.onload = setup();

function setup() {
  var config = {
    apiKey: "AIzaSyAn0bM34sgNaddcEKH6bIM-LIT46aw1DiQ",
    authDomain: "komdesign-ea571.firebaseapp.com",
    databaseURL: "https://komdesign-ea571.firebaseio.com",
    projectId: "komdesign-ea571",
    storageBucket: "komdesign-ea571.appspot.com",
    messagingSenderId: "344966707197"
  };
  firebase.initializeApp(config);
  database = firebase.database();

  var ref = database.ref('scores');
  ref.on('value', gotData, errData);



}

function gotData(data) {
	var scores = data.val();
	var keys = Object.keys(scores);
	
	for (var i = 0; i < keys.length; i++) {
		var k = keys[i];
		var score = scores[k].score;
		//console.log(score);
		

		arrayList.push(score);
		}
		console.log();
		 loadData();
  }

function loadData() {
	for (var i = 0; i < arrayList.length; i++ ){
  		if (i == 0) {
  			myLineChart.data.datasets[0].data[0] = arrayList[0];
  		}
  		else if (i == 1) {
  			myLineChart.data.datasets[0].data[1] = arrayList[1];
  		}
  		else if (i == 2) {
  			myLineChart.data.datasets[0].data[2] = arrayList[2];
  		}
  		myLineChart.update();
  	}
  }

function errData(err) {
  	console.log("test");
  }

function getValues() {
		a = parseInt(document.getElementById("input1").value);
		b = parseInt(document.getElementById("input2").value);
		c = parseInt(document.getElementById("input3").value);
	}	


function updateOption1() {
	var ref = database.ref('scores').child("score1").child("score");
			ref.transaction(function(score) {
		  // If node/clicks has never been set, currentRank will be `null`.
		  return (score || 0) + 1;
		});
}

function updateOption2() {
	var ref = database.ref('scores').child("score2").child("score");
			ref.transaction(function(score) {
		  // If node/clicks has never been set, currentRank will be `null`.
		  return (score || 0) + 1;
		});
}

function updateOption3() {
	var ref = database.ref('scores').child("score3").child("score");
			ref.transaction(function(score) {
		  // If node/clicks has never been set, currentRank will be `null`.
		  return (score || 0) + 1;
		});
}

function updateChart() {
	if (myCheck1.checked === true && myCheck2.checked === true && myCheck3.checked === true) {
		updateOption1();
		arrayList.splice(0, 3);
		updateOption2();
		arrayList.splice(0, 3);
		updateOption3();
			
	}
	else if (myCheck1.checked === true && myCheck2.checked === true) {
		updateOption1();
		arrayList.splice(0, 3);
		updateOption2();
			
	}
	else if (myCheck1.checked === true && myCheck3.checked === true) {
		updateOption1();
		arrayList.splice(0, 3);
		updateOption3();
			
	}
	else if (myCheck2.checked === true && myCheck3.checked === true) {
		updateOption2();
		arrayList.splice(0, 3);	
		updateOption3();
			
	}
	else if (myCheck1.checked === true) {
		updateOption1();
	}

	else if (myCheck2.checked === true) {
		updateOption2();	
	}

	else if (myCheck3.checked === true) {
		updateOption3();
		}

	else {
		alert("Du må velge en eller fler!");
	}
	arrayList.splice(0, 3);
	loadData();
	console.log(arrayList);

}