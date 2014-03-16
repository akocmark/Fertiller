
var current_cycle_id;
var predicted_end_date;
var cycle_day_count;
var cycle_duration;
var period_duration;

//STAT_TABLE VALUES
var stat_is_regular;
var stat_cycle_ave;
var stat_period_ave;
var stat_current_period;
var stat_next_period;

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

var single_view_date = window.localStorage.getItem('single_view_date');  
var date = new Date(single_view_date);
var next_date = new Date(date);
var prev_date = new Date(date);

next_date.setDate(date.getDate()+1);
prev_date.setDate(date.getDate()-1);

var next_date_month = next_date.getMonth()+1;
var prev_date_month = prev_date.getMonth()+1;
var next_date_formatted = next_date.getFullYear() + '-' + next_date_month + '-' + next_date.getDate();
var prev_date_formatted = prev_date.getFullYear() + '-' + prev_date_month + '-' + prev_date.getDate();



// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
function onDeviceReady() { 
	$('h3.single_view_date').html(months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear());


    var db = window.openDatabase("xBirth", "1.0", "xBirth", 200000);
    db.transaction(queryCyclePredictionDB); 


	$('.mens').on('touchend', function(e){
    	var html = '<label><input onClick="$(\'#mens_value\').val($(this).val());" type="radio" name="mens" value="None">None</label><br>';
		html += '<label><input onClick="$(\'#mens_value\').val($(this).val());" type="radio" name="mens" value="Heavy">Heavy</label><br>';
		html += '<label><input onClick="$(\'#mens_value\').val($(this).val());" type="radio" name="mens" value="Light">Light</label><br>';
		html += '<label><input onClick="$(\'#mens_value\').val($(this).val());" type="radio" name="mens" value="Spotting">Spotting'; 
		html += '<input type="hidden" id="mens_value">';


        bootbox.alert(html, function() {
        	if ($('#mens_value').val()) {
                input_mens($('#mens_value').val()); 
            }
        });
	});

	$('.temp').on('touchend', function(e){
		//alert('asd');
	});

	$('.mucus').on('touchend', function(e){
    	var html = '<label><input onClick="$(\'#mucus_value\').val($(this).val());" type="radio" name="mucus" value="None">None</label><br>';
		html += '<label><input onClick="$(\'#mucus_value\').val($(this).val());" type="radio" name="mucus" value="Dry-feel">Dry/Sticky/Tacky/White</label><br>';
		html += '<label><input onClick="$(\'#mucus_value\').val($(this).val());" type="radio" name="mucus" value="Moist">Moist/Cloudy/Yellow/Opaque</label><br>'; 
		html += '<label><input onClick="$(\'#mucus_value\').val($(this).val());" type="radio" name="mucus" value="Egg-white">Slippery/Thin/Stretchy/Clear'; 
		html += '<input type="hidden" id="mucus_value">';


        bootbox.alert(html, function() {
        	if ($('#mucus_value').val()) {
                input_mucus($('#mucus_value').val()); 
            }
        });
	});


	$('.prev_button').on('touchstart', function(e){  
		window.localStorage.setItem('single_view_date', prev_date_formatted);
		window.location.replace('fertility_single.html');
	});  

	$('.next_button').on('touchstart', function(e){  
		window.localStorage.setItem('single_view_date', next_date_formatted);
		window.location.replace('fertility_single.html');
	});  

		$('.home_button').on('touchstart', function(e){  
		window.location.replace('fertility.html');
	});   


    var db = window.openDatabase("xBirth", "1.0", "xBirth", 200000);
    db.transaction(getCycleInfo); 

	document.addEventListener("backbutton", onBackKeyDown, false);
}

function getCycleInfo(tx) {    

	var sql = "SELECT * FROM STAT";
	tx.executeSql(sql, [], getCycleInfo1, errorCB);
}

function getCycleInfo1(tx, results) { 
	cycle_duration = results.rows.item(0).cycle_ave;
	period_duration = results.rows.item(0).period_ave; 

	var db = window.openDatabase("xBirth", "1.0", "xBirth", 200000);
	db.transaction(getCycleEndDate); 
}

function getCycleEndDate(tx) {
	if (current_cycle_id) {
		var sql = "SELECT * FROM CYCLE_INFO_PREDICTION WHERE cycle_id = " + current_cycle_id + " ORDER BY id DESC LIMIT 1";
		tx.executeSql(sql, [], getCycleEndDate_success, errorCB);
	} else { 
		var sql = "SELECT * FROM CYCLE_INFO_PREDICTION ORDER BY id DESC LIMIT 1";
		tx.executeSql(sql, [], getCycleEndDate_success, errorCB);
	}
}

function getCycleEndDate_success(tx, results) {  
	predicted_end_date = results.rows.item(0).cycle_date_unix;
	current_cycle_id = results.rows.item(0).cycle_id;
	cycle_day_count = results.rows.item(0).cycle_day; 
}

/*QUERY THE BC_METHODS DATABASE*/ 
function queryCyclePredictionDB(tx) {
	var sql = "SELECT * FROM CYCLE_INFO_PREDICTION WHERE cycle_date = '"+single_view_date+"'";
	tx.executeSql(sql, [], queryCyclePredictionDB_success);
}

function queryCyclePredictionDB_success(tx, results) {  
    var prediction = "Infertile!";  

	$('#mens_input').val(results.rows.item(0).mens);
	$('.mens_label').html(results.rows.item(0).mens);


	$('#mucus_input').val(results.rows.item(0).mucus);
	$('.mucus_label').html(results.rows.item(0).mucus);

	$('#temp_input').val(results.rows.item(0).temperature);
	$('.temp_label').html(results.rows.item(0).temperature + '&deg;F');

	$('#cycle_day_input').val(results.rows.item(0).cycle_day);
	$('.cycle_day_label').html('Day '+results.rows.item(0).cycle_day);

	if (results.rows.item(0).is_fertile == "YES") {
		prediction = "Fertile!";
	}

	$('.prediction_label').html(prediction); 

	current_cycle_id = results.rows.item(0).cycle_id;


	db = null;

}


function input_mens(param) { 
	//1 day = 86400000

	$('#mens_input').val(param);
	$('.mens_label').html(param); 
	var cycle_day = $('#cycle_day_input').val();    
	var date_diff = (date.getTime() - predicted_end_date) / 86400000; 

	if (param != "None" && date.getTime() > predicted_end_date && (date_diff+cycle_duration) <= 37 ) {   
		var db = window.openDatabase("xBirth", "1.0", "xBirth", 200000); 
			db.transaction(addNewEntries, errorCB, start_new_cycle)

	} else if (cycle_day && cycle_day > 20 && param != "None" && date.getTime() <= predicted_end_date) {   
		var db = window.openDatabase("xBirth", "1.0", "xBirth", 200000); 
			db.transaction(deleteWrongEntries, errorCB, start_new_cycle) 

	} else if (cycle_day && cycle_day < 20 && param != "None" && date_diff > 0) {   
		var db = window.openDatabase("xBirth", "1.0", "xBirth", 200000); 
			db.transaction(updateMens, errorCB);

	} else if (!cycle_day && param != "None" && (date_diff+cycle_duration) > 36) {   
		var db = window.openDatabase("xBirth", "1.0", "xBirth", 200000); 
			db.transaction(start_new_cycle, errorCB) 

	} else { 
		alert('You dont need to go back in time.');
	}
}  

function updateMens(tx) { 
	var mens = $('#mens_input').val();
	//alert(mucus);
	var sql = "UPDATE CYCLE_INFO_PREDICTION SET mens = '"+mens+"' WHERE cycle_date = '"+single_view_date+"'";
    tx.executeSql(sql); 
}

function input_mucus(param) { 
	$('#mucus_input').val(param);
	$('.mucus_label').html(param);

	var db = window.openDatabase("xBirth", "1.0", "xBirth", 200000); 
	db.transaction(updateMucus, errorCB);
}

function updateMucus(tx) { 
	var mucus = $('#mucus_input').val();
	//alert(mucus);
	var sql = "UPDATE CYCLE_INFO_PREDICTION SET mucus = '"+mucus+"' WHERE cycle_date = '"+single_view_date+"'";
    tx.executeSql(sql); 
}


function deleteWrongEntries(tx) {  
    tx.executeSql("DELETE FROM CYCLE_INFO_PREDICTION WHERE cycle_date_unix > ?", [date.getTime()]); 
}

function addNewEntries(tx) {   
	var cycle_id = current_cycle_id; 
	var cycle_start_date = new Date(predicted_end_date); 
		cycle_start_date.setDate(cycle_start_date.getDate()+1);
	var cycle_start_date_month = cycle_start_date.getMonth()+1;
	var cycle_end_date = new Date(single_view_date);  
	var days_counter_to_add = ((cycle_end_date.getTime() - predicted_end_date) / 86400000)-1;
	alert(days_counter_to_add);

	var cycle_ave = cycle_duration;
	var period_ave = period_duration;  

	var cycle_start_date_formatted = cycle_start_date.getFullYear() + "-" + cycle_start_date_month + "-" + cycle_start_date.getDate(); 


	/*POPULATE CYCLE_INFO_PREDICTION TABLE*/
	var monthStart = new Date(cycle_start_date.getFullYear(), cycle_start_date.getMonth(), 1);
	var monthEnd = new Date(cycle_start_date.getFullYear(), cycle_start_date.getMonth()+1, 1);
	var days_in_month = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
	var last_day_this_month = new Date(cycle_start_date.getFullYear(), cycle_start_date.getMonth(), days_in_month);
	var cycle_day_counter = cycle_day_count;
	var counter = 0;

	alert(last_day_this_month);
	alert(cycle_start_date.getDate());

	var days_available_this_month = (last_day_this_month.getTime() - predicted_end_date) / 86400000;
	alert(days_available_this_month);
	if (days_counter_to_add > 1) {
		//IF CURRENT MONTH IS NOT SUFFICIENT TO HOLD YOUR MENSTRUAL CYCLE
		if (days_counter_to_add > days_available_this_month) {   
			alert('if');
			var sql = "INSERT INTO CYCLE_INFO_PREDICTION ";
			for (var i=cycle_start_date.getDate(); i<=days_in_month; i++) {
				counter++;
				cycle_day_counter++; 

				var mucus = "Dry-feel";
				var mens = "None";
				var temp = 0;
				var is_fertile = "NO";
				var is_mens = "NO";
				var cycle_date = new Date(cycle_start_date.getFullYear(), cycle_start_date.getMonth(), i);
				var cycle_date_unix = cycle_date.getTime();
				var month = cycle_date.getMonth()+1;
				cycle_date = cycle_date.getFullYear() + '-' + month + '-' + cycle_date.getDate(); 

				if (counter == 1) {
					sql += "SELECT NULL AS id, "+cycle_id+" AS cycle_id, "+cycle_day_counter+" AS cycle_day, '"+mucus+"' AS mucus, '"+mens+"' AS mens, '"+temp+"' AS temperature, '"+is_fertile+"' AS is_fertile, '"+is_mens+"' AS is_mens, "+cycle_date_unix+" AS cycle_date_unix, '"+cycle_date+"' AS cycle_date ";
				} else {
					sql += "UNION SELECT NULL, "+cycle_id+", "+cycle_day_counter+", '"+mucus+"', '"+mens+"', '"+temp+"', '"+is_fertile+"', '"+is_mens+"', "+cycle_date_unix+", '"+cycle_date+"' ";
				}
			}
			
			var cycle_days_left = days_counter_to_add - days_available_this_month;
			if (cycle_days_left > 0) {
				for (var i=1; i<=cycle_days_left; i++) {
					cycle_day_counter++; 

					
					var mucus = "Dry-feel";
					var mens = "None";
					var temp = 0;
					var is_fertile = "NO";
					var is_mens = "NO";
					var cycle_date = new Date(cycle_start_date.getFullYear(), cycle_start_date.getMonth()+1, i);
					var cycle_date_unix = cycle_date.getTime();
					var month = cycle_date.getMonth()+1;
					cycle_date = cycle_date.getFullYear() + '-' + month + '-' + cycle_date.getDate(); 

					sql += "UNION ALL SELECT NULL, "+cycle_id+", "+cycle_day_counter+", '"+mucus+"', '"+mens+"', '"+temp+"', '"+is_fertile+"', '"+is_mens+"', "+cycle_date_unix+", '"+cycle_date+"'"; 

				}
			} 
			tx.executeSql(sql);

		//CURRENT MONTH IS SUFFICIENT TO HOLD YOUR MENSTRUAL CYCLE
		} else {     
			alert('else');
			var d = cycle_end_date.getDate();

			var sql = "INSERT INTO CYCLE_INFO_PREDICTION ";
			for (var i=cycle_start_date.getDate(); i<d; i++) {
				counter++;
				cycle_day_counter++;

				var mucus = "Dry-feel";
				var mens = "None";
				var temp = 0;
				var is_fertile = "NO";
				var is_mens = "NO";
				var cycle_date = new Date(cycle_start_date.getFullYear(), cycle_start_date.getMonth(), i);
				var cycle_date_unix = cycle_date.getTime();
				var month = cycle_date.getMonth()+1;
				cycle_date = cycle_date.getFullYear() + '-' + month + '-' + cycle_date.getDate(); 
				 
				if (counter == 1) {
					sql += "SELECT NULL AS id, "+cycle_id+" AS cycle_id, "+cycle_day_counter+" AS cycle_day, '"+mucus+"' AS mucus, '"+mens+"' AS mens, '"+temp+"' AS temperature, '"+is_fertile+"' AS is_fertile, '"+is_mens+"' AS is_mens, "+cycle_date_unix+" AS cycle_date_unix, '"+cycle_date+"' AS cycle_date ";
				} else {
					sql += "UNION SELECT NULL, "+cycle_id+", "+cycle_day_counter+", '"+mucus+"', '"+mens+"', '"+temp+"', '"+is_fertile+"', '"+is_mens+"', "+cycle_date_unix+", '"+cycle_date+"' ";
				}
			}

			tx.executeSql(sql);

		}  
	}
	
}

function start_new_cycle() {  
	var db = window.openDatabase("xBirth", "1.0", "xBirth", 200000);
    db.transaction(populateCycleDB, errorCB, successCB); 
}

function populateCycleDB(tx) { 
	var date_now = new Date(single_view_date);
	var month_now = date_now.getMonth()+1;
	var cycle_start_date = new Date(single_view_date); 
	var cycle_start_date_formatted = '';
	var cycle_end_date_formatted = ''; 
	var cycle_ave = cycle_duration;
	var period_ave = period_duration;  


	//PREPARE STAT TABLE VALUES 
	var period_end_date = new Date(cycle_start_date);
	period_end_date.setDate((cycle_start_date.getDate()+period_ave)-1);
	var next_period = new Date(cycle_start_date);
	next_period.setDate(cycle_start_date.getDate()+cycle_ave);
	var next_period_end_date = new Date(next_period);
	next_period_end_date.setDate((next_period.getDate()+period_ave)-1); 

	stat_period_ave = period_ave; 
	stat_current_period =  months[cycle_start_date.getMonth()]+' '+cycle_start_date.getDate()+' - '+months[period_end_date.getMonth()]+' '+period_end_date.getDate(); 
	stat_next_period = months[next_period.getMonth()]+' '+next_period.getDate()+' - '+months[next_period_end_date.getMonth()]+' '+next_period_end_date.getDate(); 

	alert(stat_current_period);
	alert(stat_next_period);
	//END PREPARE STAT TABLE VALUES 

	date_today = date_now.getFullYear() + '-' + month_now + '-' + date_now.getDate();
	cycle_start_date_formatted = single_view_date;  

	/*POPULATE CYCLE_INFO_PREDICTION TABLE*/
	var monthStart = new Date(cycle_start_date.getFullYear(), cycle_start_date.getMonth(), 1);
	var monthEnd = new Date(cycle_start_date.getFullYear(), cycle_start_date.getMonth()+1, 1);
	var days_in_month = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);


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

	//var date_now = new Date(single_view_date);
	//var month_now = date_now.getMonth()+1;
	var cycle_start_date = new Date(single_view_date); 
	var cycle_start_date_formatted = '';
	var cycle_end_date_formatted = ''; 
	var cycle_ave = cycle_duration;
	var period_ave = period_duration;  

	//date_today = date_now.getFullYear() + '-' + month_now + '-' + date_now.getDate();
	cycle_start_date_formatted = single_view_date;


	/*POPULATE CYCLE_INFO_PREDICTION TABLE*/
	var monthStart = new Date(cycle_start_date.getFullYear(), cycle_start_date.getMonth(), 1);
	var monthEnd = new Date(cycle_start_date.getFullYear(), cycle_start_date.getMonth()+1, 1);
	var days_in_month = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);  
	var cycle_day_counter = 0;


	var days_counter_this_month = (days_in_month - parseInt(cycle_start_date.getDate())) + 1;
	//IF CURRENT MONTH IS NOT SUFFICIENT TO HOLD YOUR MENSTRUAL CYCLE
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
				mucus = "Moist";
			} else if (cycle_day_counter > (period_ave+7) && cycle_day_counter <= (period_ave+11)) {
				mucus = "Egg-white";
			} else if (cycle_day_counter > (period_ave+11) && cycle_day_counter <= (period_ave+14)) {
				mucus = "Moist";
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
				var is_mens = "NO";
				var cycle_date = new Date(cycle_start_date.getFullYear(), cycle_start_date.getMonth()+1, i);
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
					mucus = "Moist";
				} else if (cycle_day_counter > (period_ave+7) && cycle_day_counter <= (period_ave+11)) {
					mucus = "Egg-white";
				} else if (cycle_day_counter > (period_ave+11) && cycle_day_counter <= (period_ave+14)) {
					mucus = "Moist";
				} else if (cycle_day_counter > (period_ave+14)) {
					mucus = "Dry-feel";
				}

				sql += "UNION ALL SELECT NULL, "+cycle_id+", "+cycle_day_counter+", '"+mucus+"', '"+mens+"', '"+temp+"', '"+is_fertile+"', '"+is_mens+"', "+cycle_date_unix+", '"+cycle_date+"'"; 

			}
		} 
		tx.executeSql(sql, [], prepareStatDB, errorCB);

	//CURRENT MONTH IS SUFFICIENT TO HOLD YOUR MENSTRUAL CYCLE
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
				mucus = "Moist";
			} else if (cycle_day_counter > (period_ave+7) && cycle_day_counter <= (period_ave+11)) {
				mucus = "Egg-white";
			} else if (cycle_day_counter > (period_ave+11) && cycle_day_counter <= (period_ave+14)) {
				mucus = "Moist";
			} else if (cycle_day_counter > (period_ave+14)) {
				mucus = "Dry-feel";
			}

			if (cycle_day_counter == 1) {
				sql += "SELECT NULL AS id, "+cycle_id+" AS cycle_id, "+cycle_day_counter+" AS cycle_day, '"+mucus+"' AS mucus, '"+mens+"' AS mens, '"+temp+"' AS temperature, '"+is_fertile+"' AS is_fertile, '"+is_mens+"' AS is_mens, "+cycle_date_unix+" AS cycle_date_unix, '"+cycle_date+"' AS cycle_date ";
			} else {
				sql += "UNION SELECT NULL, "+cycle_id+", "+cycle_day_counter+", '"+mucus+"', '"+mens+"', '"+temp+"', '"+is_fertile+"', '"+is_mens+"', "+cycle_date_unix+", '"+cycle_date+"' ";
			}
		}

		tx.executeSql(sql, [], prepareStatDB, errorCB);

	} 
}

function prepareStatDB(tx, results) { 
    tx.executeSql("SELECT * FROM CYCLES_PREDICTION", [], updateStatDB);
}

function updateStatDB(tx, results) {
	var record_count = results.rows.length;
	var duration_tresh = 0;
	for (var i=0; i<record_count; i++) {
		duration_tresh += results.rows.item(i).duration;
	}

	stat_cycle_ave = duration_tresh / record_count;

	var sql = "INSERT INTO STAT (id, cycle_count, is_regular, cycle_ave, period_ave, current_period, next_period) VALUES (NULL, "+ record_count +", 'YES', "+ stat_cycle_ave +", "+ stat_period_ave +", '"+ stat_current_period +"', '"+ stat_next_period +"');";

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
    history.go(-1);
    navigator.app.backHistory();  
}