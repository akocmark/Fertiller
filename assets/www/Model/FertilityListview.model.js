var months = [
	'January', 
	'February', 
	'March', 
	'April', 
	'May', 
	'June', 
	'July', 
	'August', 
	'September', 
	'October', 
	'November', 
	'December', 
];

var date1;
var date2;

// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);
 

// device APIs are available
function onDeviceReady() { 
	var date = new Date(window.localStorage.getItem('url_year'), window.localStorage.getItem('url_month'), 1);
	var month_today = date.getMonth();
	var year_today = date.getFullYear();
	var month_start = new Date(year_today, month_today, 1);
	var month_end = new Date(year_today, month_today + 1, 1);
	var this_month_daycount = (month_end - month_start) / (1000 * 60 * 60 * 24);

	date1 = new Date(year_today, month_today, 1, 0, 0, 0).getTime();
	date2 = new Date(year_today, month_today, this_month_daycount, 23, 59, 59).getTime(); 

    var db = window.openDatabase("xBirth", "1.0", "xBirth", 200000);
    db.transaction(queryCyclePrediction, errorCB); 


    $('.home_button').on('touchstart', function(e){  
		window.location.replace('fertility.html');
	}); 
	$('#calendar_view').on('touchstart', function(e){  
		window.location.replace('fertility.html');
	}); 
	$('#statistics').on('touchstart', function(e){   
	}); 
	$('#clear_record').on('touchstart', function(e){   
	}); 


    // Register the event listener
	document.addEventListener("backbutton", onBackKeyDown, false);  
}

/*QUERY THE BC_METHODS DATABASE*/ 
function queryCyclePrediction(tx) { 
	var sql = "SELECT * FROM CYCLE_INFO_PREDICTION WHERE cycle_date_unix BETWEEN "+date1+" AND "+date2;
	tx.executeSql(sql, [], queryCyclePrediction_success);
}

function queryCyclePrediction_success(tx, results) {   
	var len = results.rows.length;

	for (var i=0; i<len; i++) {
		var item_date = new Date(results.rows.item(i).cycle_date);
		var nice_date = months[item_date.getMonth()] + ' ' + item_date.getDate() + ', ' + item_date.getFullYear();

		var prediction = 'Infertile';
		if (results.rows.item(i).is_fertile == "YES") {
			prediction = 'Fertile';
		}

		var html =  '<div class="row" style="border-bottom: 1px solid #888; padding: 5px 0;">' +
						'<div class="col-xs-12">' +
							'<span class="pull-right"><b>Mens:</b> '+results.rows.item(i).mens+'</span>' +
							'<b>'+nice_date+' - Day'+results.rows.item(i).cycle_day+'</b>' +
						'</div>' +
						'<div class="col-xs-12">' +
							'<span><b>State:</b> '+prediction+'</span>' +
							'<span class="pull-right"><b>Mucus:</b> '+results.rows.item(i).mucus+'</span>' +
						'</div>' +
					'</div>';

		$('#content').append(html);
	}

	db = null; 
}

// Transaction error callback
function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}



function onBackKeyDown() {  
    history.go(-1);
    navigator.app.backHistory();  
}