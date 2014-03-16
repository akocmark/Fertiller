
var current_date = new Date();
$('#input_year').val(current_date.getFullYear());
$('#input_month').val(current_date.getMonth());
$('#input_day').val(current_date.getDate());

var months = [
	'Jan', 
	'Feb', 
	'Mar', 
	'Apr', 
	'May', 
	'Jun', 
	'Jul', 
	'Aug', 
	'Sep', 
	'Oct', 
	'Nov', 
	'Dec', 
];

var stat_is_regular;
var stat_cycle_ave;
var stat_period_ave;
var stat_current_period;
var stat_next_period;

var elem = document.getElementById('slider');
window.mySwipe = Swipe(elem, {
	continuous: false,
	callback: function(index, element) {
		if (index == 2) {
			$("#min_period").removeAttr("disabled"); 
			$("#max_period").removeAttr("disabled");
		} else { 
			$("#min_period").attr("disabled", "disabled");
			$("#max_period").attr("disabled", "disabled");
		}
	},
	// startSlide: 4,
	// auto: 3000,
	// continuous: true,
	// disableScroll: true,
	// stopPropagation: true,
	// transitionEnd: function(index, element) {}
});

document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
function onDeviceReady() {   
	document.addEventListener("touchmove", function(){
		$("input").blur();
	}); 

	//Bind events
	$('#back_button').on('touchstart', function(){ 
		if (mySwipe.getPos() == 0) { 
		    history.go(-1);
		    navigator.app.backHistory();   
		} else {
			mySwipe.prev();
		}
	}); 

	$('#next_button').on('touchstart', function(){ 
		if (mySwipe.getPos()+1 == mySwipe.getNumSlides()) {
			var hasErrors = validateForm(); 
			if (!hasErrors) {
				var db = window.openDatabase("xBirth", "1.0", "xBirth", 200000);
			    db.transaction(populateCycleDB, errorCB, successCB); 
		    }
		} else {
			mySwipe.next();
		}
	});

	$('#birth_controls_link').on('touchstart', function(e){
		window.location.replace('birth_controls.html');
	}); 

	var year = new Date().getFullYear(); 
	for (var i=2014; i<=2019; i++) {
		var option = '<option value="' + i + '"> ' + i + ' </option>';
		$('#input_year').append(option);
	} 


	document.addEventListener("backbutton", onBackKeyDown, false);

}

function validateForm() {
	var is_blank = false;
	var err = new Array();
	var min_cycle = $('#min_cycle').val();
	var max_cycle = $('#max_cycle').val();
	var min_period = $('#min_period').val();
	var max_period = $('#max_period').val();

	if (!validateDate($('#input_year').val(), $('#input_month').val(), $('#input_day').val())) {
		err.push(0);
		alert('Sorry but you selected an invalid date.');
	}
	if (min_cycle == "" || max_cycle == "") { 
		err.push(1); 
		is_blank = true;
	}
	if (min_period == "" || max_period == "") { 
		err.push(2); 
		is_blank = true; 
	}

	if (is_blank) { 
		alert("Kindly review all the fields.");
	}

	mySwipe.slide(err[0], 400);
		 
	if (err.length > 0) {
		return true;
	}

	return false;
}

function validateDate(year, month, date_param) {
	var date = new Date(parseInt(year), parseInt(month), 1);

	var monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
	var monthEnd = new Date(date.getFullYear(), date.getMonth()+1, 1); 
	var days_in_month = (monthEnd - monthStart) / (1000 * 60 * 60 * 24)

	if (date_param > days_in_month) {
		return false;
	} 
	return true;
}

function populateCycleDB(tx) { 
	var date_now = new Date();
	var month_now = date_now.getMonth()+1;
	var cycle_start_date = new Date( parseInt($('#input_year').val()), parseInt($('#input_month').val()), parseInt($('#input_day').val()) ); 
	var cycle_start_date_formatted = '';
	var cycle_end_date_formatted = '';
	var min_cycle = $('#min_cycle').val();
	var max_cycle = $('#max_cycle').val();
	var min_period = $('#min_period').val();
	var max_period = $('#max_period').val();
	var cycle_ave = (parseInt(min_cycle) + parseInt(max_cycle)) / 2;
	var period_ave = (parseInt(min_period) + parseInt(max_period)) / 2;



	//PREPARE STAT TABLE VALUES 
	var period_end_date = new Date(cycle_start_date);
	period_end_date.setDate((cycle_start_date.getDate()+period_ave)-1);
	var next_period = new Date(cycle_start_date);
	next_period.setDate(cycle_start_date.getDate()+cycle_ave);
	var next_period_end_date = new Date(next_period);
	next_period_end_date.setDate((next_period.getDate()+period_ave)-1); 

	stat_cycle_ave = cycle_ave;
	stat_period_ave = period_ave; 
	stat_current_period =  months[cycle_start_date.getMonth()]+' '+cycle_start_date.getDate()+' - '+months[period_end_date.getMonth()]+' '+period_end_date.getDate(); 
	stat_next_period = months[next_period.getMonth()]+' '+next_period.getDate()+' - '+months[next_period_end_date.getMonth()]+' '+next_period_end_date.getDate(); 
	//END PREPARE STAT TABLE VALUES 



	date_today = date_now.getFullYear() + '-' + month_now + '-' + date_now.getDate();
	cycle_start_date_formatted = $('#input_year').val() + "-" + parseInt($('#input_month').val())+1 + "-" + $('#input_day').val();  

	/*POPULATE CYCLE_INFO_PREDICTION TABLE*/
	var monthStart = new Date(cycle_start_date.getFullYear(), cycle_start_date.getMonth(), 1);
	var monthEnd = new Date(cycle_start_date.getFullYear(), cycle_start_date.getMonth()+1, 1);
	var days_in_month = (monthEnd - monthStart) / (1000 * 60 * 60 * 24)   


	var days_counter_this_month = (days_in_month - parseInt(cycle_start_date.getDate())) + 1;
	//IF days_counter_this_month is less than the average cycle length,
	if (days_counter_this_month < cycle_ave) { 
		var days_left_for_nxt_month = cycle_ave - days_counter_this_month;
		var duration = cycle_ave;
		cycle_end_date_formatted = cycle_start_date.getFullYear() + '-' + parseInt(cycle_start_date.getMonth())+2 + '-' + days_left_for_nxt_month; 

		tx.executeSql("INSERT INTO CYCLES_PREDICTION (id, title, start_date, end_date, duration, date_created) VALUES (NULL, 'Cycle-1', '" + cycle_start_date_formatted + "', '" + cycle_end_date_formatted + "', "+duration+", '" + date_today + "');", [], populateCycleInfoDB, errorCB);  

	} else { 
		var duration = cycle_ave;
		var y = cycle_start_date.getFullYear();
		var m = parseInt(cycle_start_date.getMonth())+1;
		var d = (parseInt(cycle_start_date.getDate()) + cycle_ave) - 1;
		cycle_end_date_formatted = y + '-' + m + '-' + d;  

		tx.executeSql("INSERT INTO CYCLES_PREDICTION (id, title, start_date, end_date, duration, date_created) VALUES (NULL, 'Cycle-1', '" + cycle_start_date_formatted + "', '" + cycle_end_date_formatted + "', "+duration+", '" + date_today + "');", [], populateCycleInfoDB, errorCB); 
	}  

}

function populateCycleInfoDB(tx, results) {
	var cycle_id = results.insertId;

	var date_now = new Date();
	var month_now = date_now.getMonth()+1;
	var cycle_start_date = new Date( parseInt($('#input_year').val()), parseInt($('#input_month').val()), parseInt($('#input_day').val()) ); 
	var cycle_start_date_formatted = '';
	var cycle_end_date_formatted = '';
	var min_cycle = $('#min_cycle').val();
	var max_cycle = $('#max_cycle').val();
	var min_period = $('#min_period').val();
	var max_period = $('#max_period').val();
	var cycle_ave = (parseInt(min_cycle) + parseInt(max_cycle)) / 2;
	var period_ave = (parseInt(min_period) + parseInt(max_period)) / 2;  

	date_today = date_now.getFullYear() + '-' + month_now + '-' + date_now.getDate();
	cycle_start_date_formatted = $('#input_year').val() + "-" + parseInt($('#input_month').val())+1 + "-" + $('#input_day').val();  


	/*POPULATE CYCLE_INFO_PREDICTION TABLE*/
	var monthStart = new Date(cycle_start_date.getFullYear(), cycle_start_date.getMonth(), 1);
	var monthEnd = new Date(cycle_start_date.getFullYear(), cycle_start_date.getMonth()+1, 1);
	var days_in_month = (monthEnd - monthStart) / (1000 * 60 * 60 * 24)  
	var cycle_day_counter = 0;


	var days_counter_this_month = (days_in_month - parseInt(cycle_start_date.getDate())) + 1;
	//IF days_counter_this_month is less than the average cycle length,
	if (days_counter_this_month < cycle_ave) {   
		var sql = "INSERT INTO CYCLE_INFO_PREDICTION ";
		for (var i=cycle_start_date.getDate(); i<=days_in_month; i++) {
			cycle_day_counter++;

			var mucus = "None";
			var mens = "None";
			var temp = 0;
			var is_fertile = "NO";
			var is_mens = "NO";
			var cycle_date = new Date(cycle_start_date.getFullYear(), cycle_start_date.getMonth(), i);
			var cycle_date_unix = cycle_date.getTime();
			var month = cycle_date.getMonth()+1;
			cycle_date = cycle_date.getFullYear() + '-' + month + '-' + cycle_date.getDate();

			if (cycle_day_counter >= 8 && cycle_day_counter <= 19) {
				is_fertile = "YES";
			}
			if (cycle_day_counter >= 1 && cycle_day_counter <= period_ave) {
				is_mens = "YES";

				if (cycle_day_counter == 4) {
					mens = "Light";
				} else {
					mens = "Heavy";
				}
			}

			if (cycle_day_counter > period_ave && cycle_day_counter <= (period_ave+5)) {
				mucus = "Dry-feel";
			} else if (cycle_day_counter > (period_ave+5) && cycle_day_counter <= (period_ave+7)) {
				mucus = "Moist/Cloudy";
			} else if (cycle_day_counter > (period_ave+7) && cycle_day_counter <= (period_ave+11)) {
				mucus = "Egg-white";
			} else if (cycle_day_counter > (period_ave+11) && cycle_day_counter <= (period_ave+14)) {
				mucus = "Moist/Cloudy";
			} else if (cycle_day_counter > (period_ave+14)) {
				mucus = "Dry-feel";
			}

			if (cycle_day_counter == 1) {
				sql += "SELECT NULL AS id, "+cycle_id+" AS cycle_id, "+cycle_day_counter+" AS cycle_day, '"+mucus+"' AS mucus, '"+mens+"' AS mens, '"+temp+"' AS temperature, '"+is_fertile+"' AS is_fertile, '"+is_mens+"' AS is_mens, "+cycle_date_unix+" AS cycle_date_unix, '"+cycle_date+"' AS cycle_date ";
			} else {
				sql += "UNION SELECT NULL, "+cycle_id+", "+cycle_day_counter+", '"+mucus+"', '"+mens+"', '"+temp+"', '"+is_fertile+"', '"+is_mens+"', "+cycle_date_unix+", '"+cycle_date+"' ";
			}
		}
		
		var cycle_days_left = cycle_ave - cycle_day_counter;
		if (cycle_days_left > 0) {
			for (var i=1; i<=cycle_days_left; i++) {
				cycle_day_counter++;

				var mucus = "None";
				var mens = "None";
				var temp = 0;
				var is_fertile = "NO";
				var cycle_date = new Date(cycle_start_date.getFullYear(), cycle_start_date.getMonth()+1, i);
				var cycle_date_unix = cycle_date.getTime();
				var month = cycle_date.getMonth()+1;
				cycle_date = cycle_date.getFullYear() + '-' + month + '-' + cycle_date.getDate();
					
					if (cycle_day_counter >= 8 && cycle_day_counter <= 19) {
					is_fertile = "YES";
				}

				if (cycle_day_counter > period_ave && cycle_day_counter <= (period_ave+5)) {
					mucus = "Dry-feel";
				} else if (cycle_day_counter > (period_ave+5) && cycle_day_counter <= (period_ave+7)) {
					mucus = "Moist/Cloudy";
				} else if (cycle_day_counter > (period_ave+7) && cycle_day_counter <= (period_ave+11)) {
					mucus = "Egg-white";
				} else if (cycle_day_counter > (period_ave+11) && cycle_day_counter <= (period_ave+14)) {
					mucus = "Moist/Cloudy";
				} else if (cycle_day_counter > (period_ave+14)) {
					mucus = "Dry-feel";
				}

				sql += "UNION ALL SELECT NULL, "+cycle_id+", "+cycle_day_counter+", '"+mucus+"', '"+mens+"', '"+temp+"', '"+is_fertile+"', '"+is_mens+"', "+cycle_date_unix+", '"+cycle_date+"'"; 

			}
		}

		tx.executeSql(sql, [], populateStatDB, errorCB);

	} else {    
		var d = (parseInt(cycle_start_date.getDate()) + cycle_ave) - 1;

		var sql = "INSERT INTO CYCLE_INFO_PREDICTION ";
		for (var i=cycle_start_date.getDate(); i<=d; i++) {
			cycle_day_counter++;

			var mucus = "None";
			var mens = "None";
			var temp = 0;
			var is_fertile = "NO";
			var is_mens = "NO";
			var cycle_date = new Date(cycle_start_date.getFullYear(), cycle_start_date.getMonth(), i);
			var cycle_date_unix = cycle_date.getTime();
			var month = cycle_date.getMonth()+1;
			cycle_date = cycle_date.getFullYear() + '-' + month + '-' + cycle_date.getDate();

			if (cycle_day_counter >= 8 && cycle_day_counter <= 19) {
				is_fertile = "YES";
			}

			if (cycle_day_counter >= 1 && cycle_day_counter <= period_ave) {
				is_mens = "YES";

				if (cycle_day_counter == 4) {
					mens = "Light";
				} else {
					mens = "Heavy";
				}
			}

			if (cycle_day_counter > period_ave && cycle_day_counter <= (period_ave+5)) {
				mucus = "Dry-feel";
			} else if (cycle_day_counter > (period_ave+5) && cycle_day_counter <= (period_ave+7)) {
				mucus = "Moist/Cloudy";
			} else if (cycle_day_counter > (period_ave+7) && cycle_day_counter <= (period_ave+11)) {
				mucus = "Egg-white";
			} else if (cycle_day_counter > (period_ave+11) && cycle_day_counter <= (period_ave+14)) {
				mucus = "Moist/Cloudy";
			} else if (cycle_day_counter > (period_ave+14)) {
				mucus = "Dry-feel";
			}

			if (cycle_day_counter == 1) {
				sql += "SELECT NULL AS id, "+cycle_id+" AS cycle_id, "+cycle_day_counter+" AS cycle_day, '"+mucus+"' AS mucus, '"+mens+"' AS mens, '"+temp+"' AS temperature, '"+is_fertile+"' AS is_fertile, '"+is_mens+"' AS is_mens, "+cycle_date_unix+" AS cycle_date_unix, '"+cycle_date+"' AS cycle_date ";
			} else {
				sql += "UNION SELECT NULL, "+cycle_id+", "+cycle_day_counter+", '"+mucus+"', '"+mens+"', '"+temp+"', '"+is_fertile+"', '"+is_mens+"', "+cycle_date_unix+", '"+cycle_date+"' ";
			}
		}

		tx.executeSql(sql, [], populateStatDB, errorCB);

	} 
}

function populateStatDB(tx, results) { 
	var sql = "INSERT INTO STAT (id, cycle_count, is_regular, cycle_ave, period_ave, current_period, next_period) VALUES (NULL, 1, 'YES', "+ stat_cycle_ave +", "+ stat_period_ave +", '"+ stat_current_period +"', '"+ stat_next_period +"');";

	tx.executeSql(sql);
}

function successCB() {
	window.location.replace('fertility.html');
} 

// Transaction error callback
function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function onBackKeyDown() {  
	if (mySwipe.getPos() == 0) { 
	    history.go(-1);
	    navigator.app.backHistory();   
	} else {
		mySwipe.prev();
	}
}