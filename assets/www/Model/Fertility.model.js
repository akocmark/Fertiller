var date;
var cycle_days = new Array();  
var mens_days = new Array(); 
var fertile_days = new Array();
var month_today;
var year_today;
var month_today_plus_one;

var month_start;
var month_end;
var this_month_daycount;

var d1;
var d2; 

// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() { 
	if(window.localStorage.getItem('url_year')==null || window.localStorage.getItem('url_month')==null){
		date = new Date();
		date = new Date(date.getFullYear(), date.getMonth(), 1);
		window.localStorage.setItem('url_year', date.getFullYear()) 
		window.localStorage.setItem('url_month', date.getMonth()) 
	}else {  
		date = new Date(window.localStorage.getItem('url_year'), window.localStorage.getItem('url_month'), 1);
	} 

	month_today = date.getMonth();
	year_today = date.getFullYear();
	month_today_plus_one = date.getMonth()+1;
	month_start = new Date(year_today, month_today, 1);
	month_end = new Date(year_today, month_today + 1, 1);
	this_month_daycount = (month_end - month_start) / (1000 * 60 * 60 * 24);

	d1 = new Date(year_today, month_today, 1, 0, 0, 0).getTime();
	d2 = new Date(year_today, month_today, this_month_daycount, 23, 59, 59).getTime(); 

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
    var prev_month = new Date(date);
    var next_month = new Date(date);
    prev_month.setMonth(date.getMonth()-1);
    next_month.setMonth(date.getMonth()+1);

    $('#current_month').html(months[date.getMonth()] + ' ' + date.getFullYear());
    $('#prev_month').html(months[prev_month.getMonth()]);
    $('#next_month').html(months[next_month.getMonth()]);

    $('#prev_month').on('touchstart', function(e){ 
		window.localStorage.setItem('url_year', prev_month.getFullYear()) 
		window.localStorage.setItem('url_month', prev_month.getMonth()) 
		window.location.replace('fertility.html');
	});
    $('#next_month').on('touchstart', function(e){ 
		window.localStorage.setItem('url_year', next_month.getFullYear()) 
		window.localStorage.setItem('url_month', next_month.getMonth()) 
		window.location.replace('fertility.html');
	});

    var db = window.openDatabase("xBirth", "1.0", "xBirth", 200000);
    db.transaction(getFerileDays, errorCB);



	$('#birth_controls_link').on('touchstart', function(e){
		window.location.replace('birth_controls.html');
	});




	document.addEventListener("backbutton", onBackKeyDown, false);

}

// Get predictions from the database
function getFerileDays(tx) {
    tx.executeSql("SELECT * FROM CYCLE_INFO_PREDICTION WHERE is_fertile = 'YES' AND cycle_date_unix BETWEEN "+d1+" AND "+d2, [], getFerileDays_success, errorCB);
}

// getFerileDays success callback
function getFerileDays_success(tx, results) { 
    var tmp;  
    var len = results.rows.length;

    for (var i=0; i<len; i++){  
    	//alert('day: ' + results.rows.item(i).cycle_day + ' \n date: ' + results.rows.item(i).cycle_date);
    	//get fertile days' date and convert the dateformt from 2014-1-31 to 31
    	tmp = results.rows.item(i).cycle_date
    	tmp = tmp.split('-');
    	fertile_days.push(tmp[2]); 
    }  

	db = null;

    var db = window.openDatabase("xBirth", "1.0", "xBirth", 200000);
    db.transaction(getMensDays, errorCB);
}

// Get predictions from the database
function getMensDays(tx) {
    tx.executeSql("SELECT * FROM CYCLE_INFO_PREDICTION WHERE is_mens = 'YES' AND cycle_date_unix BETWEEN "+d1+" AND "+d2, [], getMensDays_success, errorCB);
}

// getMensDays success callback
function getMensDays_success(tx, results) { 
    var tmp;  
    var len = results.rows.length;

    for (var i=0; i<len; i++){  
    	//alert('day: ' + results.rows.item(i).cycle_day + ' \n date: ' + results.rows.item(i).cycle_date);
    	//get fertile days' date and convert the dateformt from 2014-1-31 to 31
    	tmp = results.rows.item(i).cycle_date
    	tmp = tmp.split('-');
    	mens_days.push(tmp[2]); 
    } 

	db = null; 

    var db = window.openDatabase("xBirth", "1.0", "xBirth", 200000);
    db.transaction(getCycleDays, errorCB);
}

// Get predictions from the database
function getCycleDays(tx) {
    tx.executeSql("SELECT * FROM CYCLE_INFO_PREDICTION WHERE cycle_date_unix BETWEEN "+d1+" AND "+d2, [], getCycleDays_success, errorCB);
}

// getCycleDays success callback
function getCycleDays_success(tx, results) { 
    var tmp;  
    var len = results.rows.length;

    for (var i=0; i<len; i++){  
    	//alert('day: ' + results.rows.item(i).cycle_day + ' \n date: ' + results.rows.item(i).cycle_date);
    	//get fertile days' date and convert the dateformt from 2014-1-31 to 31
    	tmp = results.rows.item(i).cycle_date
    	tmp = tmp.split('-');
    	cycle_days.push([tmp[2], results.rows.item(i).cycle_day]); 
    }  

	var content = draw_calendar(month_today, year_today, fertile_days, mens_days, cycle_days);
	$('#calendar').html(content);

	db = null; 
}

// Transaction error callback
function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function inArray(needle, haystack) {
	var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}	

function draw_calendar(month, year, fertile_days, mens_days, cycle_days){

	/*for (var i=0; i<cycle_days.length; i++) {  
		alert('feb ' + cycle_days[i][0] + ', day ' + cycle_days[i][1]);
	}

	for (var i=0; i<mens_days.length; i++) {  
		alert(mens_days[i] + ' = mens_days');
	}

	for (var i=0; i<fertile_days.length; i++) {  
		alert(fertile_days[i] + ' = fertile_days');
	}*/


	/* draw table */
	var calendar = '<table class="calendar" cellpadding="0" cellspacing="1">';

	/* table headings */
	var headings = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	calendar += '<tr class="calendar-row"><td class="calendar-day-head">' +headings.join('</td><td class="calendar-day-head">')+ '</td></tr>';

	/* days and weeks vars now ... */
	var running_day = new Date(year, month, 1).getDay();

	var monthStart = new Date(year, month, 1);
	var monthEnd = new Date(year, month + 1, 1);
	var days_in_month = (monthEnd - monthStart) / (1000 * 60 * 60 * 24)  

	var days_in_this_week = 1;
	var day_counter = 0;
	var dates_array = new Array();

	/* row for week one */
	calendar += '<tr class="calendar-row">';

	/* print "blank" days until the first of the current week */
	for(var x = 0; x < running_day; x++) {
		calendar += '<td class="calendar-day-np"> </td>';
		days_in_this_week++;
	}

	/* keep going with days.... */
	for(var list_day = 1; list_day <= days_in_month; list_day++) {
		var day_count = '&nbsp;';

		for (var i=0; i<cycle_days.length; i++) { 
			if (list_day == cycle_days[i][0]) {
				day_count = cycle_days[i][1];
			}
		}

		if (inArray(list_day, mens_days)) {
			var nice_month = month_today+1;
			var zxcasd = year_today + '-' + nice_month + '-' + list_day;
			calendar += '<td class="calendar-day mens" onclick="single_view(\''+zxcasd+'\')">';
				/* add in the day number */
				calendar += '<div class="day-number">' +list_day+ '</div><div class="day-count">'+day_count+'</div>';

				/** QUERY THE DATABASE FOR AN ENTRY FOR THIS DAY !!  IF MATCHES FOUND, PRINT THEM !! **/
				calendar += '<div class="mid-filler"></div><div class="day-info mens">Mens</div><div class="mid-filler"></div>';

		} else if(inArray(list_day, fertile_days)) {
			var nice_month = month_today+1;
			var zxcasd = year_today + '-' + nice_month + '-' + list_day;
			calendar += '<td class="calendar-day egg" onclick="single_view(\''+zxcasd+'\')">';
				/* add in the day number */
				calendar += '<div class="day-number">' +list_day+ '</div><div class="day-count">'+day_count+'</div>';

				/** QUERY THE DATABASE FOR AN ENTRY FOR THIS DAY !!  IF MATCHES FOUND, PRINT THEM !! **/
				calendar += '<div class="mid-filler"></div><div class="day-info egg">Egg</div><div class="mid-filler"></div>';

		} else {
			var nice_month = month_today+1;
			var zxcasd = year_today + '-' + nice_month + '-' + list_day;
			calendar += '<td class="calendar-day" onclick="single_view(\''+zxcasd+'\')">';
				/* add in the day number */
				calendar += '<div class="day-number">' +list_day+ '</div><div class="day-count">'+day_count+'</div>';

				/** QUERY THE DATABASE FOR AN ENTRY FOR THIS DAY !!  IF MATCHES FOUND, PRINT THEM !! **/
				calendar += '<div class="whole-filler"></div>';
		}
			
		calendar += '</td>';
		if(running_day == 6) {
			calendar += '</tr>';
			if((day_counter+1) != days_in_month){
				calendar += '<tr class="calendar-row">';
			}
			running_day = -1;
			days_in_this_week = 0;
		}
		days_in_this_week++; running_day++; day_counter++;
	}

	/* finish the rest of the days in the week */
	if(days_in_this_week < 8){
		for(var x = 1; x <= (8 - days_in_this_week); x++) {
			calendar += '<td class="calendar-day-np"> </td>';
		}
	}

	/* final row */
	calendar += '</tr>';

	/* end the table */
	calendar += '</table>';
	
	/* all done, return result */
	return calendar;
} 

function single_view(param) {
	window.localStorage.setItem('single_view_date', param);
	window.location.replace('fertility_single.html');
}

function onBackKeyDown() {  
	window.localStorage.removeItem("url_year");
	window.localStorage.removeItem("url_month");
	navigator.app.exitApp();
}