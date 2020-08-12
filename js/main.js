window.onload = runCharts; 

function runCharts() {
		setup();
		runChart();
		runChart2();
	}

var database;
var a,b,c;
var arrayList = [];
var sumArrayList = [];
var sumParticipant;

var myCheck1 = document.getElementById("input1");
var myCheck2 = document.getElementById("input2");
var myCheck3 = document.getElementById("input3");


/*
////////////////////////////////////////
			CHARTS BELOW
////////////////////////////////////////
*/


var canvas = document.getElementById('test');
var data = {
    labels: ["Grupperom", "Kantine", "Forelesere"],
    datasets: [
        {
            label: "Happy",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "#475d77",
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
						'#a73f8c',
						'#1692bd',
						'#2bc589'
					]
        }
    ]
};	

var option = {
	showLines: false,
	 legend: {
            labels: {
                // This more specific font property overrides the global property
                fontColor: 'white',
                fontSize: 20
            }
        }
};
var myLineChart = Chart.Doughnut(canvas,{
	data:data,
  options:option
});



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

  var ref2 = database.ref('sumParticipants');
  ref2.on('value', gotData2, errData2);



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

  function gotData2(data) {
  	var sumParticipants = data.val();
	var keys = Object.keys(sumParticipants);
	
	for (var i = 0; i < keys.length; i++) {
		var k = keys[i];
		var score = sumParticipants[k].score;
		//console.log(score);
		

		sumArrayList.push(score);
		}
		
		 loadParticipantData();
  }

  function errData2() {
  	alert("test");
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

function loadParticipantData() {
	for (var i = 0; i < sumArrayList.length; i++) {
  		if (i == 0) {
  			sumParticipant = sumArrayList[0];
  			document.getElementById("participantSum").innerHTML = sumParticipant;	
  		}
  		sumArrayList.splice(0);
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

function updateSumParticipants() {
	var ref = database.ref("sumParticipants").child("sum").child("score");
			ref.transaction(function(score) {
		  // If node/clicks has never been set, currentRank will be `null`.
		  return (score || 0) + 1;
		});
}

$(".button-sendFb").one('click', updateChart);

function updateChart() {
	if (myCheck1.checked === true && myCheck2.checked === true && myCheck3.checked === true) {
		updateOption1();
		arrayList.splice(0, 3);
		updateOption2();
		arrayList.splice(0, 3);
		updateOption3();

		updateSumParticipants();
		sumArrayList.splice(0);	
	}
	else if (myCheck1.checked === true && myCheck2.checked === true) {
		updateOption1();
		arrayList.splice(0, 3);
		updateOption2();

		updateSumParticipants();
		sumArrayList.splice(0);	
	}
	else if (myCheck1.checked === true && myCheck3.checked === true) {
		updateOption1();
		arrayList.splice(0, 3);
		updateOption3();
		
		updateSumParticipants();
		sumArrayList.splice(0);	
	}
	else if (myCheck2.checked === true && myCheck3.checked === true) {
		updateOption2();
		arrayList.splice(0, 3);	
		updateOption3();
		
		updateSumParticipants();
		sumArrayList.splice(0);	
	}
	else if (myCheck1.checked === true) {
		updateOption1();
		
		updateSumParticipants();
		sumArrayList.splice(0);	
	}

	else if (myCheck2.checked === true) {
		updateOption2();	
		
		updateSumParticipants();
		sumArrayList.splice(0);	
	}

	else if (myCheck3.checked === true) {
		updateOption3();
		
		updateSumParticipants();
		sumArrayList.splice(0);	
		}

	else {
		alert("Du må velge en eller fler!");
	}
	
	sumArrayList.splice(0);
	arrayList.splice(0, 3);
	loadData();

	
}

$('.button-sendFb').click(function() {
	if (myCheck1.checked === true || myCheck2.checked === true || myCheck3.checked === true) {
		 $('#crowdSourceDiv').toggle('slow', function() {
    // Animation complete.
    document.getElementById('thanksForParticipating').innerHTML = "Takk for ditt bidrag, du er deltager " + sumParticipant;
  });
	}
 
});

	function runChart() {
		let myChart = document.getElementById('myChart').getContext('2d');
		Chart.defaults.global.defaultFontFamily ='Lato';
		Chart.defaults.global.defaultFontSiz = 18;
		Chart.defaults.global.defaultFontColor ='#777';

		let massPopChart = new Chart(myChart, {
			type: 'bar',
			data:{
				labels:['2013-IT','2013-LU',  '2013-ØSS', '2014-IT','2014-LU', '2014-ØSS', '2015-IT', '2015-LU', '2015-ØSS', '2016-IT', '2016-LU', '2016-ØSS', '2017-IT', '2017-LU', '2017-ØSS','2018-IT', '2018-LU', '2018-ØSS'],
				datasets:[
				{
					label: 'Applicants',
					data:[
						214,
						643,
						638,
						217,
						611,
						630,
						217,
						678,
						755,
						268,
						623,
						786,
						298,
						609,
						732,
						364,
						632,
						808
					],
					backgroundColor:[
						'#e74c3c',
						'#f1c40f',
						'#3498db',
						'#e74c3c',
						'#f1c40f',
						'#3498db',
						'#e74c3c',
						'#f1c40f',
						'#3498db',
						'#e74c3c',
						'#f1c40f',
						'#3498db',
						'#e74c3c',
						'#f1c40f',
						'#3498db',
						'#e74c3c',
						'#f1c40f',
						'#3498db'
					],

					borderWidth:1,
					borderColor: '#777',
					hoverBorderWidth:3,
					hoverBorderColor: '#000'
					}
				]
			},
			options:{}
		})
	}


	function runChart2() {
		new Chart(document.getElementById("myChart2"), {
		  type: 'line',
		  data: {
		    labels: [2014,2015,2016,2017,2018],
		    datasets: [{ 
		        data: [200,235,230,260,300],
		        label: "Lecturers",
		        borderColor: "#3e95cd",
		        fill: false
		      }, { 
		        data: [100,145,170,195,225],
		        label: "Office space",
		        borderColor: "#8e5ea2",
		        fill: false
		      }
		    ]
		  },
		  options: {
		    title: {
		      display: true,
		      text: 'Employees vs Office space'
		    }
		  }
		});
	}




/*
////////////////////////////////////////
			OTHER JS BELOW
////////////////////////////////////////
*/

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}


(function(){
    // Vertical Timeline - by CodyHouse.co
	function VerticalTimeline( element ) {
		this.element = element;
		this.blocks = this.element.getElementsByClassName("js-cd-block");
		this.images = this.element.getElementsByClassName("js-cd-img");
		this.contents = this.element.getElementsByClassName("js-cd-content");
		this.offset = 0.8;
		this.hideBlocks();
	};

	VerticalTimeline.prototype.hideBlocks = function() {
		//hide timeline blocks which are outside the viewport
		if ( !"classList" in document.documentElement ) {
			return;
		}
		var self = this;
		for( var i = 0; i < this.blocks.length; i++) {
			(function(i){
				if( self.blocks[i].getBoundingClientRect().top > window.innerHeight*self.offset ) {
					self.images[i].classList.add("cd-is-hidden"); 
					self.contents[i].classList.add("cd-is-hidden"); 
				}
			})(i);
		}
	};

	VerticalTimeline.prototype.showBlocks = function() {
		if ( ! "classList" in document.documentElement ) {
			return;
		}
		var self = this;
		for( var i = 0; i < this.blocks.length; i++) {
			(function(i){
				if( self.contents[i].classList.contains("cd-is-hidden") && self.blocks[i].getBoundingClientRect().top <= window.innerHeight*self.offset ) {
					// add bounce-in animation
					self.images[i].classList.add("cd-timeline__img--bounce-in");
					self.contents[i].classList.add("cd-timeline__content--bounce-in");
					self.images[i].classList.remove("cd-is-hidden");
					self.contents[i].classList.remove("cd-is-hidden");
				}
			})(i);
		}
	};

	var verticalTimelines = document.getElementsByClassName("js-cd-timeline"),
		verticalTimelinesArray = [],
		scrolling = false;
	if( verticalTimelines.length > 0 ) {
		for( var i = 0; i < verticalTimelines.length; i++) {
			(function(i){
				verticalTimelinesArray.push(new VerticalTimeline(verticalTimelines[i]));
			})(i);
		}

		//show timeline blocks on scrolling
		window.addEventListener("scroll", function(event) {
			if( !scrolling ) {
				scrolling = true;
				(!window.requestAnimationFrame) ? setTimeout(checkTimelineScroll, 250) : window.requestAnimationFrame(checkTimelineScroll);
			}
		});
	}

	function checkTimelineScroll() {
		verticalTimelinesArray.forEach(function(timeline){
			timeline.showBlocks();
		});
		scrolling = false;
	};
})();


(function(){
    // Alternate Fixed & Scroll Backgrounds - by CodyHouse.co
	// toggle main navigation on mobile
	var mainNav = document.getElementsByClassName('js-main-nav')[0];
	if(mainNav) {
		mainNav.addEventListener('click', function(event){
			if( hasClass(event.target, 'js-main-nav') ){
				var navList = mainNav.getElementsByTagName('ul')[0];
				toggleClass(navList, 'cd-main-nav__list--is-visible', !hasClass(navList, 'cd-main-nav__list--is-visible'));
			} 
		});
	}
	
	//class manipulations - needed if classList is not supported
	function hasClass(el, className) {
	  	if (el.classList) return el.classList.contains(className);
	  	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}
	function addClass(el, className) {
		var classList = className.split(' ');
	 	if (el.classList) el.classList.add(classList[0]);
	 	else if (!hasClass(el, classList[0])) el.className += " " + classList[0];
	 	if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
	}
	function removeClass(el, className) {
		var classList = className.split(' ');
	  	if (el.classList) el.classList.remove(classList[0]);	
	  	else if(hasClass(el, classList[0])) {
	  		var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
	  		el.className=el.className.replace(reg, ' ');
	  	}
	  	if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
	}
	function toggleClass(el, className, bool) {
		if(bool) addClass(el, className);
		else removeClass(el, className);
	}
})();

var slideIndex = [1,1];
var slideId = ["mySlides1", "mySlides2"]
showSlides(1, 0);
showSlides(1, 1);

function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

function showSlides(n, no) {
  var i;
  var x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) {slideIndex[no] = 1}    
  if (n < 1) {slideIndex[no] = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[slideIndex[no]-1].style.display = "block";  
}

/*
///////////////////////////////////
IMAGE SLIDER
///////////////////////////////////
*/

jQuery(document).ready(function($){
    var dragging = false,
        scrolling = false,
        resizing = false;
    //cache jQuery objects
    var imageComparisonContainers = $('.cd-image-container');
    //check if the .cd-image-container is in the viewport 
    //if yes, animate it
    checkPosition(imageComparisonContainers);
    $(window).on('scroll', function(){
        if( !scrolling) {
            scrolling =  true;
            ( !window.requestAnimationFrame )
                ? setTimeout(function(){checkPosition(imageComparisonContainers);}, 100)
                : requestAnimationFrame(function(){checkPosition(imageComparisonContainers);});
        }
    });
    
    //make the .cd-handle element draggable and modify .cd-resize-img width according to its position
    imageComparisonContainers.each(function(){
        var actual = $(this);
        drags(actual.find('.cd-handle'), actual.find('.cd-resize-img'), actual, actual.find('.cd-image-label[data-type="original"]'), actual.find('.cd-image-label[data-type="modified"]'));
    });

    //upadate images label visibility
    $(window).on('resize', function(){
        if( !resizing) {
            resizing =  true;
            ( !window.requestAnimationFrame )
                ? setTimeout(function(){checkLabel(imageComparisonContainers);}, 100)
                : requestAnimationFrame(function(){checkLabel(imageComparisonContainers);});
        }
    });

    function checkPosition(container) {
        container.each(function(){
            var actualContainer = $(this);
            if( $(window).scrollTop() + $(window).height()*0.5 > actualContainer.offset().top) {
                actualContainer.addClass('is-visible');
            }
        });

        scrolling = false;
    }

    function checkLabel(container) {
        container.each(function(){
            var actual = $(this);
            updateLabel(actual.find('.cd-image-label[data-type="modified"]'), actual.find('.cd-resize-img'), 'left');
            updateLabel(actual.find('.cd-image-label[data-type="original"]'), actual.find('.cd-resize-img'), 'right');
        });

        resizing = false;
    }

    //draggable funtionality - credits to http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
    function drags(dragElement, resizeElement, container, labelContainer, labelResizeElement) {
        dragElement.on("mousedown vmousedown", function(e) {
            dragElement.addClass('draggable');
            resizeElement.addClass('resizable');

            var dragWidth = dragElement.outerWidth(),
                xPosition = dragElement.offset().left + dragWidth - e.pageX,
                containerOffset = container.offset().left,
                containerWidth = container.outerWidth(),
                minLeft = containerOffset + 10,
                maxLeft = containerOffset + containerWidth - dragWidth - 10;
            
            dragElement.parents().on("mousemove vmousemove", function(e) {
                if( !dragging) {
                    dragging =  true;
                    ( !window.requestAnimationFrame )
                        ? setTimeout(function(){animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement);}, 100)
                        : requestAnimationFrame(function(){animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement);});
                }
            }).on("mouseup vmouseup", function(e){
                dragElement.removeClass('draggable');
                resizeElement.removeClass('resizable');
            });
            e.preventDefault();
        }).on("mouseup vmouseup", function(e) {
            dragElement.removeClass('draggable');
            resizeElement.removeClass('resizable');
        });
    }

    function animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement) {
        var leftValue = e.pageX + xPosition - dragWidth;   
        //constrain the draggable element to move inside his container
        if(leftValue < minLeft ) {
            leftValue = minLeft;
        } else if ( leftValue > maxLeft) {
            leftValue = maxLeft;
        }

        var widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';
        
        $('.draggable').css('left', widthValue).on("mouseup vmouseup", function() {
            $(this).removeClass('draggable');
            resizeElement.removeClass('resizable');
        });

        $('.resizable').css('width', widthValue); 

        updateLabel(labelResizeElement, resizeElement, 'left');
        updateLabel(labelContainer, resizeElement, 'right');
        dragging =  false;
    }

    function updateLabel(label, resizeElement, position) {
        if(position == 'left') {
            ( label.offset().left + label.outerWidth() < resizeElement.offset().left + resizeElement.outerWidth() ) ? label.removeClass('is-hidden') : label.addClass('is-hidden') ;
        } else {
            ( label.offset().left > resizeElement.offset().left + resizeElement.outerWidth() ) ? label.removeClass('is-hidden') : label.addClass('is-hidden') ;
        }
    }
});


const body = document.body;
const btn = document.querySelectorAll('.button-sendFb')[0];

btn.addEventListener('mouseenter', () => {
	body.classList.add('show');
});

btn.addEventListener('mouseleave', () => {
	body.classList.remove('show');
});

setTimeout(function(){ 
			$( "#load_screen" ).fadeOut( "slow", function() {
  });			
  }, 3200);