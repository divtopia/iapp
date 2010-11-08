var jQT = new $.jQTouch({
   icon: 'jqtouch.png',
   addGlossToIcon: true,
   startupScreen: 'jqt_startup.png',
   statusBar: 'black',
   preloadImages: [	
	'assets/js/jqtouch/themes/jqt/img/back_button.png',
	'assets/js/jqtouch/themes/jqt/img/chevron_circle.png',
	'assets/js/jqtouch/themes/jqt/img/toggle.png',
	'assets/js/jqtouch/themes/jqt/img/back_button_clicked.png',
	'assets/js/jqtouch/themes/jqt/img/grayButton.png',
	'assets/js/jqtouch/themes/jqt/img/toggleOn.png',
	'assets/js/jqtouch/themes/jqt/img/button.png',
	'assets/js/jqtouch/themes/jqt/img/loading.gif',
	'assets/js/jqtouch/themes/jqt/img/toolbar.png',
	'assets/js/jqtouch/themes/jqt/img/button_clicked.png',
	'assets/js/jqtouch/themes/jqt/img/on_off.png',
	'assets/js/jqtouch/themes/jqt/img/whiteButton.png',
	'assets/js/jqtouch/themes/jqt/img/chevron.png',
	'assets/js/jqtouch/themes/jqt/img/rowhead.png'
	]
});

$(function(){
	DataKeeping();
});

function DataKeeping(){
	// init a new lawnchair db
	var workouts = new Lawnchair('workouts');
	if(workouts) {
		workouts.nuke();
	}

	var currKey = '';

	// new date
	var d = new Date();
	var currday = d.getDate()
	var currmon = d.getMonth();
	var curryr = d.getFullYear();
	var currhr = d.getHours() >= 10 ? d.getHours(): 0 + '' + d.getHours();
	var currmin =d.getMinutes() >= 10 ? d.getMinutes() : 0 + '' + d.getMinutes();
	// Get a human readable date
	var currdate = curryr + '' + ((currmon >= 10) ? currmon : (0 + ''+currmon)) +''+ ((currday>=10) ? currday : (0 + ''+currday)) +''+ currhr + '' + currmin; 
	console.log(currdate);

	var currStat = {
		key: currdate,
		usr: {
			name:'JadfasdfaP',
			email:'jugasdgasdfga2asdf3@gmail.com'
		},
		workoutstats: {
			exerciseset:1,
			weights:{
				squats:45,
				bench:45,
				reverse:0
			},
			succeededall: 1
		}
	};
	// save currstat
	workouts.save(currStat);
	// return all works saved as an object
	workouts.all('console.log(r)');
	var username = GetUserName(workouts, currdate);
	console.log(username);
	// return bench weight -- '45'
	workouts.find('r.workoutstats.date == "7102010"', 'console.log(r.workoutstats.weights.bench)');
	// store key in a variable
	workouts.find('r.workoutstats.date == "7102010"', 'currKey = r.key');
	// use key variable -- 'FB54E444-7156-4CDF-A71C-ABD9A8790A2E'
	console.log(currKey);
	
	
}

var NewWorkout = function( currentdate ){
	var previousdate = GetPrevDate();
	return {key: currentdate};
}

var GetPrevDate = function( workout ) {
	// get key of the previous object
}

var GetUserName = function ( workouts, currdate ) {
	// returns name -- 'JP'
	var username = '';
	workouts.find(function(r) {
		if(r.key == currdate){
			username = r.usr.name;
		}
	});
	return username;
}