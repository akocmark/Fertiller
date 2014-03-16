var is_touchmove = false; 
var device_platform;
var device_version;

var touchevent_bug_version = ['3.0','3.1','3.2','4.0','4.0.1','4.0.2','4.0.3','4.0.4','4.4','4.4.1','4.4.2'];

var source = [
	'tubal_ligation',
	'vasectomy',
	'implantable_rod',
	'iud', 
	'injectibles',
	'mini_pill',
	'the_pill',
	'patch',
	'vaginal_ring',
	'diaphragm',
	'sponge',
	'cervical_cap',
	'male_condom',
	'female_condom',
	'spermicide'
];

var alias = new Array();
var efficiency = new Array();
var img = new Array();
var desc = new Array();
var ins = new Array();
var risks = new Array();

alias['spermicide'] = 'Spermicide';
efficiency['spermicide'] = 72;
img['spermicide'] = 'spermicide.png';
desc['spermicide'] = '<p><b>Spermicide</b> is a barrier method of birth control containing a sperm-killing product. Spermicides are available in foam, cream, jelly, film, suppository, or tablet form.</p><p><b>Foam</b> prevents pregnancy by bubbling within the vagina, blocking the entrance to the uterus and killing sperm. <b>Cream</b>, <b>Film</b>, <b>Jelly</b>, and <b>Suppositories</b> prevent pregnancy by melting in the vagina, blocking the entrance to the uterus and killing sperm.</p>';
ins['spermicide'] = '<p>The <b>spermicide</b> products are inserted deep into the vagina before intercourse. The instructions for each different form of spermicide must be read and followed before use, as the insertion requirements and techniques vary. For example, some products need to be in place for ten minutes before sexual intercourse begins.</p>';
risks['spermicide'] = '<ul><li>Spermicide must be used correctly (read the directions!) to be effective at pregnancy prevention.</li><li>Some spermicides may leak or be messy.</li><li>A particular spermicide may irritate the vagina or penis; however, changing brands may fix the problem.</li></ul>';

alias['female_condom'] = 'Female Condom';
efficiency['female_condom'] = 79;
img['female_condom'] = 'female_condom.png';
desc['female_condom'] = '<p>The <b>female condom</b> is a lubricated polyurethane sheath/pouch that has two ends. One end is closed and one is open, with flexible rings at each end. It protects against pregnancy by catching the sperm in the pouch and preventing it from entering the vagina.</p>';
ins['female_condom'] = '<p>The closed end of the condom is placed inside the vagina (the ring holds the pouch in place), while the open end stays outside the vaginal opening.</p><ul><li>Lubricate the closed end (part with the small ring).</li><li>Squeeze the sides of the ring at the closed end together and insert the pouch into the vagina like a tampon.</li><li>Insert the ring into the vagina until it can\'t go any farther (when it has reached the cervix).</li><li>Remove fingers from the vagina, allowing the large ring of the open end to hang outside of the vagina.</li><li>To remove the condom, squeeze the ring located outside of the vagina, twist and pull, ensuring that the semen remains inside of the pouch. Throw the condom away in the garbage (do not flush)</li></ul><p>Like the male condom, the female condom is intended for one-time use only.</p>';
risks['female_condom'] = '<ul><li>The condom may slip into the vagina during intercourse.</li><li>The outer ring may irritate the female\'s vagina/vulva.</li><li>The inner ring may irritate the male\'s penis.</li></li><li>Some argue that the feeling/pleasure from intercourse is reduced or that it is noisy, which means more lubrication is needed.</li></ul>';

alias['male_condom'] = 'Male Condom';
efficiency['male_condom'] = 82;
img['male_condom'] = 'male_condom.png';
desc['male_condom'] = '<p>A <b>male condom</b> is a thin sheath that covers the penis during intercourse and is made of one of the following materials:</p><ul><li>Rubber (latex)</li><li>Plastic (polyurethane): the best alternative for people allergic to latex</li><li>Lambskin</li></ul><p>Male condoms can vary greatly in color, size, and amount of lubrication and spermicide.The male condom protects against sexually transmitted infection (STI) and pregnancy by covering the penis and preventing direct contact between the penis and vagina, as well as collecting the semen and preventing it from entering the vagina.</p>';
ins['male_condom'] = '<p>The male condom is rolled over the erect or hardened penis and prevents against direct contact between the penis and vagina. The condom must be removed before the erection ends or the sperm can leak out. Use the condom once only, then throw it in the garbage. Do not flush it down the toilet.</p>';
risks['male_condom'] = '<ul><li>Some people are allergic to latex. Polyurethane condoms can be used as an alternative.</li><li>Some individuals argue that condoms reduce sensitivity and pleasure during intercourse.</li><li>Some people dislike interrupting sex to put it on.</li><li>Condoms may break if they are put on incorrectly.</li></ul>';

alias['cervical_cap'] = 'Cervical Cap';
efficiency['cervical_cap'] = 83;
img['cervical_cap'] = 'cervical_cap.png';
desc['cervical_cap'] = '<p>A <b>cervical cap</b> is a soft rubber cap with a round rim that fits around your cervix. The only cervical cap available in the United States is the FemCap, a non-hormonal latex-free contraceptive device made of silicone rubber, a non-allergenic easy to clean material.</p>';
ins['cervical_cap'] = '<p>The cap is placed inside the vagina to cover the cervix. It is recommended that spermicide be added in the rim of the FemCap to increase the effectiveness of this method.</p><p>The cervical cap acts by blocking the entrance to the uterus; the spermicide acts by killing and immobilizing the sperm, preventing it from fertilizing the egg.</p><p>The cervical cap must be left in place for at least six hours after last intercourse before removing.</p>';
risks['cervical_cap'] = '<ul><li>The cervical cap is more difficult for women to learn to insert and remove than the diaphragm.<li>If worn for more than two days (48 hours) you run the risk of:<ul><li>Toxic Shock Syndrome (TSS)</li><li>Unpleasant vaginal odor</li><li>Unpleasant vaginal discharge</li></ul></li><li>Mild allergic reactions to the rubber or spermicide occasionally occur</li></ul>';

alias['sponge'] = 'Sponge';
efficiency['sponge'] = 88;
img['sponge'] = 'sponge.png';
desc['sponge'] = '<p>The <b>sponge</b> is a donut-shaped polyurethane device containing spermicide and a woven polyester loop that hangs down into the vagina for removal.</p>';
ins['sponge'] = '<p>The <b>sponge</b> is inserted into the vagina and covers the cervix. The sponge can be left in place for 24 hours and multiple acts of intercourse; however, it must be left in the vagina for 6 hours after the last act of intercourse.</p>';
risks['sponge'] = '<ul><li>The sponge must not be left in the vagina for more than 30 hours or you run the risk of Toxic Shock Syndrome (TSS).</li></ul>';

alias['diaphragm'] = 'Diaphragm';
efficiency['diaphragm'] = 88;
img['diaphragm'] = 'diaphragm.png';
desc['diaphragm'] = '<p>A <b>diaphragm</b> is a shallow, dome-shaped rubber disk with a flexible rim that fits within the vagina and covers the cervix so sperm cannot reach the uterus.</p>';
ins['diaphragm'] = '<ul><li>The diaphragm must be covered with spermicide and placed within the vagina to cover the cervix.</li><li>The diaphragm acts by blocking the cervix and preventing the sperm from entering the uterus. The spermicide acts by immobilizing and killing the sperm, making it unable to fertilize an egg.</li><li>The diaphragm may be left in place for 24 hours, but more spermicide must be inserted every two hours, or every time sexual intercourse is repeated.</li><li>The diaphragm must be left in place for six hours after sexual intercourse before you can take it out.</li></ul>';
risks['diaphragm'] = '<ul><li>If the diaphragm is left inside the vagina for more than one day (24 hours), the female runs the risk of toxic shock syndrome (TSS), a serious bacterial infection (as with tampons).</li><li>Mild allergic reactions to the rubber or spermicide occasionally occur.</li></ul>';

alias['vaginal_ring'] = 'Vaginal Ring';
efficiency['vaginal_ring'] = 91;
img['vaginal_ring'] = 'vaginal_ring.png';
desc['vaginal_ring'] = '<p><b>Vaginal rings</b> (also known as intravaginal rings, or V-Rings) are polymeric drug delivery devices designed to provide controlled release of drugs for intravaginal administration over extended periods of time. The ring is inserted into the vagina and provides contraception protection. Leaving the ring in for three weeks slowly releases hormones into the body, mainly vaginally administered estrogens and/or progestogens (a group of hormones including progesterone). These hormones stop ovulation and thicken the cervical mucus, creating a barrier preventing sperm from fertilizing an egg. Worn continuously for three weeks followed by a week off, each vaginal ring provides one month of birth control. Several vaginal ring products are currently available, including:</p><ul><li>Estring - a low-dose estradiol-releasing ring, manufactured from silicone elastomer, for the treatment of vaginal atrophy (atrophic vaginitis).</li><li>Femring - a low-dose estradiol-acetate releasing ring, manufactured from silicone elastomer, for the relief of hot flashes and vaginal atrophy associated with menopause.</li><li>NuvaRing - a low-dose contraceptive vaginal ring, manufactured from poly(ethylene-co-vinyl acetate), and releasing etonogestrel (a progestin) ethinyl estradiol (an estrogen).</li><li>Progering, containing progesterone as a sole ingredient, is available only in Chile and Peru.</li></ul><p>A number of vaginal ring products are also in development.</p>';
ins['vaginal_ring'] = '<p>General vaginal rings are easily inserted and removed. Vaginal walls hold them in place. Although their exact location within the vagina is not critical for clinical efficacy, rings commonly reside next to the cervix. Rings are typically left in place during intercourse, and most couples report no interference or discomfort. In many cases, neither partner feels the presence of the ring. [2] Rings can be removed prior to intercourse, but, in the case of the contraceptive Nuvaring, only for one to three hours to maintain efficacy of birth control.</p><ul><li>Estring - Estring is inserted into the vagina and left in place for three months, after which it is removed and replaced with a fresh ring.</li><li>Femring - Femring is inserted into the vagina and left in place for three months, after which it is removed and replaced with a fresh ring.</li><li>NuvaRing - NuvaRing is inserted into the vagina and left in place for three weeks, after which it is removed for a \'ring-free\' week to allow menstruation to occur.</li></ul>';
risks['vaginal_ring'] = '<p>Some risks of using vaginal rings are <b>headache</b>, <b>irritation</b>, <b>nausea</b>, <b>sore breasts</b> and <b>sweling of the vagina</b></p>';

alias['patch'] = 'Patch';
efficiency['patch'] = 91;
img['patch'] = 'patch.png';
desc['patch'] = '<p>The <b>patch</b> is a skin patch worn on the lower abdomen, buttocks, or upper body that releases the hormones progestin and estrogen into the bloodstream to prevent ovulation. This method is helpful for women who find it difficult to remember to take a daily birth control pill, but can remember to replace the patch weekly.</p>';
ins['patch'] = '<p>A new patch is applied once a week, on the same day of the week, for three weeks. On the fourth week, a placebo patch (one not containing the hormone) is applied to allow for a period to occur at that time. (This is similar to taking the placebo pills during the fourth week in birth control pills).</p>';
risks['patch'] = '<p>The risks associated with using the patch are similar to the risks associated with the birth control pill. Other risks and side effects include:</p><ul><li>Risk of blood clots in the legs or lungs.</li><li>Less effective in women weighing more than 198 pounds</li><li>Irregular bleeding</li><li>Weight gain</li><li>Breast tenderness</li><li>Less protection than for birth control pills against ectopic pregnancy, if pregnancy occurs while using the patch (an ectopic pregnancy occurs when a fertilized egg implants somewhere other than the uterus, usually in a fallopian tube. Such pregnancies carry risks to the mother and must be terminated properly.)</li></ul>';

alias['the_pill'] = 'The Pill';
efficiency['the_pill'] = 91;
img['the_pill'] = 'the_pill.png';
desc['the_pill'] = '<p>The <b>pill</> is a prescription method of birth control. It consists of a month-long series of pills containing synthetic hormones – progesterone with or without estrogen (without is the mini pill) – that are taken every day.</p>';
ins['the_pill'] = '<ul><li>A pill must be taken every day. Generally, the pills taken during the first three weeks of the month contain hormones, while the pills taken during the fourth week contain no hormones, allowing you to have a menstrual period.</li><li>For most effective use, it is best to take each pill at the same time of day, such as each morning when you wake up or before bed if you have a consistent bed time.</li></ul>';
risks['the_pill'] = '<ul><li>You must remember to take it every day without fail or it will not be effective.<li>Does not protect against STIs.</li><li>Has some health risks such as:<ul><li>Weight gain or loss</li><li>Spotting between periods.</li><li>Breast tenderness and/or growth</li><li>Nausea or vomiting</li><li>Depression</li><li>Decreased or increased sexual drive</li></ul></li></ul>';

alias['mini_pill'] = 'Mini Pill';
efficiency['mini_pill'] = 91;
img['mini_pill'] = 'mini_pill.png';
desc['mini_pill'] = '<p>Similar to the <b>pill</b>, the <b>mini pill</b> is a month-long series of progestin-only pills that must be taken every day (the regular pill has both progestin and estrogen).</p><p>The progestin-only pills prevent ovulation is taken for more than one cycle, and also provide pregnancy protection by thickening the cervical mucus – which prevents the sperm and egg from joining – and preventing the uterine lining from thickening – which makes it more difficult for a fertilized egg to implant in the uterus and develop.</p>';
ins['mini_pill'] = '<p>Like the regular pill, the mini pill is taken every day and is most effective when taken at the same time every day.</p><p>The mini pill must be taken at the same time every day. For increased effectiveness in the evening it should be taken in the late afternoon.</p><p>If a woman is three hours late taking the pill, she should use a backup method of birth control. There are no placebo or "inactive" pills to take during the month.</p>';
risks['mini_pill'] = '<ul><li>Menstrual cycle changes</li><li>Weight gain</li><li>Breast tenderness</li><li>Spotting, bleeding between periods</li><li>Depression can worsen</li></ul>';

alias['injectibles'] = 'Injectibles';
efficiency['injectibles'] = 94;
img['injectibles'] = 'injectibles.png';
desc['injectibles'] = '<p><b>Injectibles</b> containes hormone (progestin) that is injected by a health care professional into the woman\'s buttocks or arm muscle every three months (pregnancy prevention begins 24 hours after injection).</p>';
ins['injectibles'] = '<p>Injectibles prevents pregnancy in three ways:</p><ul><li>It inhibits ovulation.</li><li>It changes the cervical mucus to help prevent sperm from reaching the egg.</li><li>It changes the uterine lining to prevent the fertilized egg from implanting in the uterus.</li></ul>';
risks['injectibles'] = '<p>After a certain time period, you have to repeat the injection. If this time period lapses, you have to take a pregnancy test before getting a repeat injection.</p>';

alias['iud'] = 'IUD';
efficiency['iud'] = 99;
img['iud'] = 'iud.jpg';
desc['iud'] = '<p>An Intrauterine Device (IUD) is a T-shaped, plastic device inserted into the uterus by a health care professional. There are two types of IUDs available:</p><ul><li>Copper, which can remain in place for 10 to 12 years.</li><li>Progesterone (natural female sex hormone); two types:</li><li>Mirena, lasts five to seven years.</li><li>Other types, replace every year.</li></ul><p>IUDs prevent pregnancy by inhibiting fertilization of the egg. Although not entirely known, it is believed that the IUDs affect the way the sperm and egg move and/or affect the lining of the uterus to prevent implantation of the egg.</p><p>IUDs are recommended for women in long-term mutually monogamous relationships, such that the risk of getting a sexually transmitted infections (STIs) is low.</p>';
ins['iud'] = '<p>It is inserted into the uterine cavity by a health care provider, usually during menstruation when it is easier to insert. The string at the end of the IUD will hang down through the cervix a short distance into the vagina and should be checked periodically (especially after menstruation).</p><p>The IUD is inserted during an office visit. It is placed into the uterus through the cervix. The patient is placed on the table just like she is going to have a Pap smear. A speculum is inserted, like with a Pap smear.</p><p>The area that the brush touches when you have a pap smear is your cervix. The IUD is inserted in through the cervix up about 1 inch into your uterus. This is moderately painful, like bad cramping. </p><p>Patients are usually ask to take two Tylenol or ibuprofen before they come in for the procedure. After that, the string is cut and the speculum is removed.</p>';
risks['iud'] = '<ul><li>For copper IUDs:<ul><li>Menstrual cramps may increase.</li><li>Bleeding may occur between periods.</li><li>Periods may be heavier and last longer. This may cause anemia.</li><li>Increases risk of serious infection – such as Pelvic Inflammatory Disease (PID) – and sterility.</li><li>IUD may fall out.</li></ul></li><li>Pregnancy while using the IUD, although rare, may be dangerous and lead to infections or ectopic pregnancies.</li></ul>';

alias['implantable_rod'] = 'Implantable Rod';
efficiency['implantable_rod'] = 99;
img['implantable_rod'] = 'implantable_rod.png';
desc['implantable_rod'] = '<p>Implantable rod is a hormone implant used for birth control. A hormone-carrying plastic rod, the size of a matchstick, is inserted under the skin of your arm.</p>';
ins['implantable_rod'] = '<p>Your doctor (or nurse) inserts the rod into your skin through the use of a needle. The needle is inserted into your arm at a slight angle, and when the needle is fully in your arm, the applicator with the rod is parallel to your skin.</p><p>The applicator releases the Implanon rod into your arm and the needle is removed. The rod remains in your arm for up to 3 years, but can be removed at any time.</p><p>The Implanon rod releases a steady dose of progestin into your body. Progestin is a synthetic (artificial) hormone that prevents ovulation (the ovary from releasing the egg) and thickens the mucus of the woman’s cervix. The thickened mucus prevents the sperm and egg from joining and fertilizing in case the egg is released.</p>';
risks['implantable_rod'] = '<ul><li>Implanon can cause irregular bleeding and spotting</li><li>Pain and scarring can be associated with the insertion and removal of Implanon</li><li>May not work for overweight or obese women</li><li>Increased health risks, such as:<ul><li>Blood clots (especially if you are a smoker)</li><li>Ovarian cysts</li><li>Headaches</li><li>Weight gain</li><li>Depression</li><li>Acne</li><li>Breast pain</li><li>Viral infections</li></ul></li></ul>';

alias['vasectomy'] = 'Vasectomy';
efficiency['vasectomy'] = 99;
img['vasectomy'] = 'vasectomy.png';
desc['vasectomy'] = '<p>Male sterilization is achieved through a surgical procedure, called a <b>vasectomy</b>, that is intended to be a permanent method of birth control (there is no guarantee that it can be reversed).</p>';
ins['vasectomy'] = '<p>A vasectomy is a quick, 30-minute surgical procedure performed in the physician\'s office in which the vas deferens (the tubes that carry sperm out of the penis) is cut or tied, and then the ends are cauterized (burned).</p><p>This prevents sperm from coming out in the ejaculate or getting into the vagina. Recovery from vasectomy usually requires only that the patient refrain from physical activity for approximately 48 hours.</p><p>Back-up contraception needs to be used until two follow-up semen tests show no sperm.</p>';
risks['vasectomy'] = '<p>Complications from a vasectomy are relatively rare but can involve infection, swelling of the scrotum, as well as the possibility of small, inflamed hard nodules at the end of the severed tube (these usually clear up on their own; however, in some cases additional surgery may be required).</p><p>Other possible complications includes:</p><ul><li>As with any surgery, bleeding (usually minimal), infection, scarring</li><li>Reaction to the anesthetic that is used</li><li>Mild to moderate pain</li><li>Swelling of testicles</li><li>Tenderness near the testicles</li></ul>';

alias['tubal_ligation'] = 'Tubal Ligation';
efficiency['tubal_ligation'] = 99;
img['tubal_ligation'] = 'tubal_ligation.png';
desc['tubal_ligation'] = '<p>Female sterilization is achieved through a surgical procedure, called a <b>tubal ligation</b>, that is intended to be a permanent method of birth control (there is no guarantee that it can be reversed).</p>';
ins['tubal_ligation'] = '<p><b>Tubal ligation</b> is a surgical procedure performed in a hospital, usually with no over night stay. It involves cutting the fallopian tubes and then tying and cauterizing the cut ends, so the egg does not get out of the tube into the uterus to be fertilized.</p>';
risks['tubal_ligation'] = '<ul><li>Sterilization is a permanent, surgical procedure and often cannot be reversed.</li><li>Sterilization requires that you take time off to have this done, as well as for recovery.</li><li>As with any surgery, bleeding (usually minimal), infection, scarring</li><li>Reaction to the anesthetic that is used</li><li>Mild to moderate pain</li></ul>';



// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
function onDeviceReady() { 
	$('#search-bar').hide();

	//Bind events
	$('#search-button').on('touchstart', function(e){ 
		$('.footer-label').hide();
		$('#search-bar').show();
		$('#filter_list').focus(); 
	}); 
	$('.cancel-button').on('touchstart', function(){
		$('.footer-label').show();
		$('#search-bar').hide();
		$('.pretty-list-item').show();
		$('#filter_list').val('');
	});
	$('#fertility_link').on('touchstart', function(){ 
	    var db = window.openDatabase("xBirth", "1.0", "xBirth", 200000);
	    db.transaction(queryMensDB, errorCB); 
	});


	$( "#filter_list" ).bind('input propertychange', search);

    var db = window.openDatabase("xBirth", "1.0", "xBirth", 200000);
	if(window.localStorage.getItem('runned')==null){ 
	    db.transaction(populateDB, errorCB, successCB);
		window.localStorage.setItem('runned','1') 
	}else {
    	db.transaction(queryDB, errorCB);
	}

 
	device_platform = device.platform;  
	device_version = device.version;   

	document.addEventListener("backbutton", onBackKeyDown, false);
	document.addEventListener("touchmove", function(){
		$("#filter_list").blur();
	});
}
// Populate the database
function populateDB(tx) {
	//CREATE BC_METHODS TABLE
    tx.executeSql('DROP TABLE IF EXISTS BC_METHODS');
	var sql = "CREATE TABLE IF NOT EXISTS BC_METHODS (" +
				"id INTEGER PRIMARY KEY AUTOINCREMENT," +
				"name VARCHAR(100) NOT NULL," +
				"image VARCHAR(100) NOT NULL," +
				"user VARCHAR(10) DEFAULT NULL," +
				"description MEDIUMTEXT," +
				"instruction MEDIUMTEXT," +
				"risks MEDIUMTEXT," +
				"efficiency INTEGER DEFAULT NULL," + 
				"is_anti_STD VARCHAR(10))";
    tx.executeSql(sql); 

    //CREATE CYCLES_PREDICTION TABLE
    tx.executeSql('DROP TABLE IF EXISTS CYCLES_PREDICTION');
	var sql = "CREATE TABLE IF NOT EXISTS CYCLES_PREDICTION (" +
				"id INTEGER PRIMARY KEY AUTOINCREMENT," +
				"title VARCHAR(100) NOT NULL," +
				"start_date DATE NOT NULL," +
				"end_date DATE DEFAULT NULL," +
				"duration INTEGER DEFAULT NULL," +  
				"date_created DATE DEFAULT NULL)";	
    tx.executeSql(sql);

    //CREATE CYCLES_PREDICTION TABLE
    tx.executeSql('DROP TABLE IF EXISTS STAT');
	var sql = "CREATE TABLE IF NOT EXISTS STAT (" +
				"id INTEGER PRIMARY KEY AUTOINCREMENT," +
				"cycle_count INTEGER DEFAULT NULL," +
				"is_regular VARCHAR(100) DEFAULT NULL," +
				"cycle_ave INTEGER DEFAULT NULL," +
				"period_ave INTEGER DEFAULT NULL," +
				"current_period VARCHAR(100) DEFAULT NULL," + 
				"next_period VARCHAR(100) DEFAULT NULL)";	
    tx.executeSql(sql);
    
    //CREATE CYCLE_INFO_PREDICTION TABLE
    tx.executeSql('DROP TABLE IF EXISTS CYCLE_INFO_PREDICTION');
	var sql = "CREATE TABLE IF NOT EXISTS CYCLE_INFO_PREDICTION (" +
				"id INTEGER PRIMARY KEY AUTOINCREMENT," +
				"cycle_id INTEGER NOT NULL," +
				"cycle_day INTEGER NOT NULL," +
				"mucus VARCHAR(100) DEFAULT NULL," +
				"mens VARCHAR(100) DEFAULT NULL," +
				"temperature INTEGER DEFAULT NULL," +
				"is_fertile VARCHAR(100) DEFAULT NULL," +  
				"is_mens VARCHAR(100) DEFAULT NULL," + 
				"cycle_date_unix INTEGER NOT NULL," +
				"cycle_date DATE DEFAULT NULL)";
    tx.executeSql(sql);

    tx.executeSql("INSERT INTO BC_METHODS VALUES (NULL, 'Tubal Ligation', 'tubal_ligation.png', 'Female', ?, ?, ?, 99, 'NO');", [desc['tubal_ligation'], ins['tubal_ligation'], risks['tubal_ligation']]);
    tx.executeSql("INSERT INTO BC_METHODS VALUES (NULL, 'Vasectomy', 'vasectomy.png', 'Male', ?, ?, ?, 99, 'NO');", [desc['vasectomy'], ins['vasectomy'], risks['vasectomy']]);
    tx.executeSql("INSERT INTO BC_METHODS VALUES (NULL, 'Implantable Rod', 'implantable_rod.png', 'Female', ?, ?, ?, 99, 'NO');", [desc['implantable_rod'], ins['implantable_rod'], risks['implantable_rod']]);
    tx.executeSql("INSERT INTO BC_METHODS VALUES (NULL, 'Iud', 'iud.jpg', 'Female', ?, ?, ?, 99, 'NO');", [desc['iud'], ins['iud'], risks['iud']]); 
    tx.executeSql("INSERT INTO BC_METHODS VALUES (NULL, 'Injectibles', 'injectibles.png', 'Female', ?, ?, ?, 94, 'NO');", [desc['injectibles'], ins['injectibles'], risks['injectibles']]);
    tx.executeSql("INSERT INTO BC_METHODS VALUES (NULL, 'Mini Pill', 'mini_pill.png', 'Female', ?, ?, ?, 91, 'NO');", [desc['mini_pill'], ins['mini_pill'], risks['mini_pill']]);
    tx.executeSql("INSERT INTO BC_METHODS VALUES (NULL, 'The Pill', 'the_pill.png', 'Female', ?, ?, ?, 91, 'NO');", [desc['the_pill'], ins['the_pill'], risks['the_pill']]);
    tx.executeSql("INSERT INTO BC_METHODS VALUES (NULL, 'Patch', 'patch.png', 'Female', ?, ?, ?, 91, 'NO');", [desc['patch'], ins['patch'], risks['patch']]);
    tx.executeSql("INSERT INTO BC_METHODS VALUES (NULL, 'Vaginal Ring', 'vaginal_ring.png', 'Female', ?, ?, ?, 91, 'NO');", [desc['vaginal_ring'], ins['vaginal_ring'], risks['vaginal_ring']]);
    tx.executeSql("INSERT INTO BC_METHODS VALUES (NULL, 'Diaphragm', 'diaphragm.png', 'Female', ?, ?, ?, 88, 'NO');", [desc['diaphragm'], ins['diaphragm'], risks['diaphragm']]);
    tx.executeSql("INSERT INTO BC_METHODS VALUES (NULL, 'Sponge', 'sponge.png', 'Female', ?, ?, ?, 88, 'NO');", [desc['sponge'], ins['sponge'], risks['sponge']]);
    tx.executeSql("INSERT INTO BC_METHODS VALUES (NULL, 'Cervical Cap', 'cervical_cap.png', 'Female', ?, ?, ?, 83, 'NO');", [desc['cervical_cap'], ins['cervical_cap'], risks['cervical_cap']]);
    tx.executeSql("INSERT INTO BC_METHODS VALUES (NULL, 'Male Condom', 'male_condom.png', 'Male', ?, ?, ?, 82, 'YES');", [desc['male_condom'], ins['male_condom'], risks['male_condom']]);
    tx.executeSql("INSERT INTO BC_METHODS VALUES (NULL, 'Female Condom', 'female_condom.png', 'Female', ?, ?, ?, 79, 'YES');", [desc['female_condom'], ins['female_condom'], risks['female_condom']]);
    tx.executeSql("INSERT INTO BC_METHODS VALUES (NULL, 'Spermicide', 'spermicide.png', 'Female', ?, ?, ?, 72, 'NO');", [desc['spermicide'], ins['spermicide'], ins['spermicide']]);

}

// Transaction success callback
function successCB() {
    var db = window.openDatabase("xBirth", "1.0", "xBirth", 200000);
    db.transaction(queryDB, errorCB);
} 


// Query the database
function queryDB(tx) {
    tx.executeSql('SELECT * FROM BC_METHODS', [], querySuccess, errorCB);
}

// Query the success callback
function querySuccess(tx, results) {  
    var len = results.rows.length; 
    for (var i=0; i<len; i++){  
    	var html = '<div class="col-xs-12 pretty-list-item custom_link" id="' + results.rows.item(i).name.replace(/\s+/g, '_').toLowerCase() + '">' +
					'<div class="col-xs-2" id="pretty-list-icon"><img src="../webroot/img/bc_methods/' + results.rows.item(i).image + '" height="39px" width="40"></div>' +
					'<div class="col-xs-8 pretty-list-label">' +
						'<b>' + results.rows.item(i).name + '</b><br/>' +
						'<span style="color: #444;">User: <b>' + results.rows.item(i).user + '</b></span><br/>' +
					'</div>' +
					'<div class="pretty-list-badge">' +
						'<span class="badge-title" style="font-size: 16px;">' + results.rows.item(i).efficiency + '%</span><br/>' +
						'<span class="badge-label" style="font-size: 11px;">Efficiency</span>' +
					'</div> '
				'</div>  '; 

    	$('#pretty-list').append(html);
    }

	var links = document.getElementsByClassName('custom_link'); 
	for(var k=0; k<links.length; k++){
		links[k].addEventListener('touchstart', function(e){   
			e.currentTarget.className = e.currentTarget.className + " pretty-list-item-on";

		});

		links[k].addEventListener('touchend', function(e){    

			e.currentTarget.className = e.currentTarget.className.replace( /(?:^|\s)pretty-list-item-on(?!\S)/ , '' ); 

			if (!inArray(device_version, touchevent_bug_version)) { 
				if (!is_touchmove) {  
					window.localStorage.setItem('var_name', alias[e.currentTarget.id]) 
					window.localStorage.setItem('var_efficiency', efficiency[e.currentTarget.id])  
					window.localStorage.setItem('var_img', img[e.currentTarget.id]) 
					window.localStorage.setItem('var_desc', desc[e.currentTarget.id])  
					window.localStorage.setItem('var_ins', ins[e.currentTarget.id])  
					window.localStorage.setItem('var_risks', risks[e.currentTarget.id])  
					window.location.replace('birth_control_single.html'); 
				} 
				is_touchmove = false; 
			} else { 
				window.localStorage.setItem('var_name', alias[e.currentTarget.id]) 
				window.localStorage.setItem('var_efficiency', efficiency[e.currentTarget.id])  
				window.localStorage.setItem('var_img', img[e.currentTarget.id]) 
				window.localStorage.setItem('var_desc', desc[e.currentTarget.id])  
				window.localStorage.setItem('var_ins', ins[e.currentTarget.id])  
				window.localStorage.setItem('var_risks', risks[e.currentTarget.id])  
				window.location.replace('birth_control_single.html'); 
			} 
		});

		links[k].addEventListener('touchmove', function(e){   
			if (!inArray(device_version, touchevent_bug_version)) { 
				is_touchmove = true;
			}
			e.currentTarget.className = e.currentTarget.className.replace( /(?:^|\s)pretty-list-item-on(?!\S)/ , '' ); 
		});
	} 
	db = null;
}  

// Transaction error callback
function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function search() {   
	$('.pretty-list .pretty-list-item').hide();  

	var query = $('#filter_list').val().trim();
	if (query == '') {
		$('.pretty-list .pretty-list-item').show();
		return;
	}
	
	query = query.replace(/ /gi,'_'); 
	var pattern = new RegExp(query, 'gi');

    $.each(source, function(index, data) { 
    	var res = data.match(pattern);
		if(res){ 
			$('#' + data).show();
			return;
		} 
    }) 
} 



/*CHECK IF USER HAS NO EXISTING RECORDS*/ 
function queryMensDB(tx) { 
	var sql = "SELECT * FROM CYCLES_PREDICTION";
	tx.executeSql(sql, [], queryMensDB_success);
}

function queryMensDB_success(tx, results) { 
    var len = results.rows.length;

    if (len > 0) {
		window.location.replace('fertility.html');
    } else {
		window.location.replace('no_records.html');
    }

	db = null;
}

function onBackKeyDown() {   
	navigator.app.exitApp();
}


function inArray(needle, haystack) {
	var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}
 