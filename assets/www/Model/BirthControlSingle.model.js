$('img.main_pic').attr('src', $('img.main_pic').attr('src') + window.localStorage.getItem('var_img'))
$('.name').html(window.localStorage.getItem('var_name'));
$('.efficiency').html(window.localStorage.getItem('var_efficiency'));
$('.description').html(window.localStorage.getItem('var_desc'));
$('.instruction').html(window.localStorage.getItem('var_ins'));
$('.risks').html(window.localStorage.getItem('var_risks'));

accordion_init();

// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
function onDeviceReady() { 
	$('.home_button').on('touchstart', function(e){  
		window.location.replace('birth_controls.html');
	});   

    //var db = window.openDatabase("xBirth", "1.0", "xBirth", 200000);
    //db.transaction(queryMethodsDB, errorCB); 
    
	document.addEventListener("backbutton", onBackKeyDown, false);
}

/*QUERY THE BC_METHODS DATABASE*/ 
function queryMethodsDB(tx) { 
	var sql = "SELECT * FROM BC_METHODS WHERE name = '" + single_method + "'";
	tx.executeSql(sql, [], queryMethodsDB_success);
}

function queryMethodsDB_success(tx, results) {  
	$('.description').html(results.rows.item(0).description);
	$('.instruction').html(results.rows.item(0).instruction);
	$('.risks').html(results.rows.item(0).risks); 
	db = null;

	accordion_init();
}

// Transaction error callback
function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function accordion_init() {
	$('.accordion').each(function(index){
		var dom_height = $(this).height();  

		if (dom_height > 100) {
			$(this).attr('data-height', dom_height);
			$(this).css('min-height', '90px');
			$(this).css('max-height', '90px');

			$(this).after('<div class="col-xs-12 toggle-button" style="border-bottom: 1px solid #888; padding: 3px 15px;"><div class="pull-right"><span class="icomatic" style="color: #333">arrowdown</span></div></div>');
		} else {
			$(this).css('border-bottom', '1px solid #888');
		}
	}); 

	$('.toggle-button').each(function(index){
		$(this).click(function(){ 
			var stored_height = $(this).prev().attr('data-height'); 
			var height = $(this).prev().height();

			if (stored_height == height) { 
				$(this).html('<div class="pull-right"><span class="icomatic" style="color: #333">arrowdown</span></div></div>');
				$(this).prev().css('min-height', '90px');
				$(this).prev().css('max-height', '90px');
			} else { 
				$(this).html('<d<div class="pull-right"><span class="icomatic" style="color: #333">arrowup</span></div></div>');
				$(this).prev().css('min-height', stored_height + 'px');
				$(this).prev().css('max-height', stored_height + 'px');
			} 
		}); 
	});

} 


function onBackKeyDown() {  
    history.go(-1);
    navigator.app.backHistory();  
}

