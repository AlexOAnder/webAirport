
var url  = "http://localhost:50012/";
var statusController = "api/mainstatus/"
// functions
//AJAX Block 
	//GET AJAX
	function getSomething(fullurl,funcOk,funcError,funcName){
		$('.loader').removeClass('hidden');
		$.get(fullurl)
			.done(function(data){
				funcOk(data);
			})
			.error(function(ex){
				console.log(ex);
				alert("Error in"+funcName);
				console.log("Error in"+funcName);
				if (funcError!=null) funcError();
			})
			.always(function(){
				$('.loader').addClass('hidden');
			});
	};

	//POST AJAX
	function postSomething(fullurl,postData,funcOk,funcError,funcName){
		$('.loader').removeClass('hidden');
		$.post(fullurl,postData)
			.done(function(data){
				if(funcOk!=null)
					funcOk(data);
			})
			.error(function(ex){
				console.log(ex);
				alert("Error in"+funcName);
				console.log("Error in"+funcName);
				if (funcError!=null) funcError();
			})
			.always(function(){
				$('.loader').addClass('hidden');
			});
	}

// END AJAX BLOCK

	function checkServerStatus(){
		var newUrl = url+statusController+"check";
		getSomething(newUrl,
			function( data ) {
		    	console.log( "Data Loaded: " + data );
		    	$('#serverStatus').removeClass('redColor');
		  		$('#serverStatus').addClass('greenColor');
		  		if (!$('.blackfield').hasClass('hidden')){
		  			$('.blackfield').addClass('hidden');
		  		}
		  	},
	  		function(data){
		  		//alert("Error");
		  		$('#serverStatus').addClass('redColor');
		  		$('#serverStatus').removeClass('greenColor');
		  		$('.blackfield').removeClass('hidden');
		  	},
			"CheckServerStatus");
	};

	function getButtonClassByStatus(statusId)
	{
		switch(statusId)
		{
			case -1:return ["disabled","Not defined"];break;
			case 1:return ["btn-success","All fine"];break;
			case 2:return ["btn-info","Check Info"];break;
			case 3:return ["btn-warning","Warning"];break;
			case 4:return ["btn-danger","Danger"];break;
		}
	}


	function getSectionLastEvent(sectionId)
	{
		var newUrl = url+statusController+"section?sectionId="+sectionId;
		getSomething(newUrl,function(data){
			console.log(data)
			$('.infoSection textarea').val(data.Description);
			$('.infoSection .statusSelect').val(data.StatusId);
			$('#eventId').text(data.EventId);
		},null,"getSectionLastEvent");
	}

	function getSections()	{
		var newUrl = url+statusController;
		getSomething(newUrl,function(data){
			console.log(data)

			var idArr = ["b403","b204","b102","b202","b008"];
			// start to load data in DOM
			for( i=0;i<=data.length-1;i++)
			{
				$('#'+idArr[i]+" button").removeClass();
				var newStr = getButtonClassByStatus(data[i].StatusId);
				//$('#'+idArr[i]).hide();
				$('#'+idArr[i]+" button").addClass("btn "+newStr[0]);
				$('#'+idArr[i]+" button").text(newStr[1]);
				$('#'+idArr[i]).next().text(data[i].SectionName);
			}
			
			
		},null,"GetSections");
	};

	function blockInfoSection(){
		$('.infoSection textarea ').attr('readonly','readonly');
		$('.infoSection .statusSelect ').attr('disabled','disabled');
		$('.updateStatusBtn').text("Click to Update");
		$('.updateStatusBtn').removeClass("btn-primary");
		$('.canceltatusBtn').addClass("hide");
		$('.updateStatusBtn').addClass("btn-default");
	};

	function updateStatus(){
		$('.infoSection textarea').removeAttr('readonly');
		$('.infoSection .statusSelect ').removeAttr('disabled');
	}



function addNewNotification(){
	//collect all info from fields 
	var sectionId = $('.newTicketForm select').val();
	var descr = $('.newTicketForm textarea').val();
	var statusId = $('.newTicketForm .radioBlock input[type=radio]:checked').val();
	if (sectionId==undefined || descr==''||statusId==undefined)
		alert('Fill add form with data!');
	var newUrl = url+statusController+"addEvent";
	postSomething(newUrl,{"Description":descr,"SectionId":sectionId,"StatusId":statusId},
		function(){
			$('.newTicketForm select').val(1);
			$('.newTicketForm textarea').val('');
			$('.newTicketForm .radioBlock input[type=radio]:checked').val('');
			$('.newTicketForm').hide();
			//alert('Notify added to the system!');
		}
		,null,"AddNewNotification");
};

// end functions

$(function(){
	getSections(); // init sections
// Jqury selectors 
// header zone

	$('#allowAddNotify').click(function(){
		$('.newTicketForm').show();
        var destination = $('.buttonBlock').offset().top;
        $('body').animate({ scrollTop: destination }, 1100); //prokrutka so skorost'. 1100

        return false;
	})

	$('#addNotify').click(function(){
		addNewNotification();
	});
	
	$('#cancelNotify').click(function(){
		$('.newTicketForm').hide();
        $('body').animate({ scrollTop: 0 }, 1100); //prokrutka so skorost'. 1100
        return false;
	});

	$('#serverStatus').click(function(){
		$('.loader').removeClass('hidden');
		checkServerStatus();
	});

	$('#moveOnMe').mousedown(function(){
		getSections();
	});
//end header zone


	$('.canceltatusBtn').click(function() {
			blockInfoSection();
			$('.updateStatusBtn').text("Click to Update");
			$('.updateStatusBtn').removeClass("btn-primary");
			$('.updateStatusBtn').addClass("btn-default");
			$('.canceltatusBtn').addClass("hide");
			$('.infoSection textarea ').val('');
	});
	// update3 status
	$('.updateStatusBtn').click(function(){
		
		var isOk =  $(this).hasClass("btn-primary")
		if (!isOk){
			$(this).text("OK");
			$(this).removeClass("btn-default");
			$(this).addClass("btn-primary");

			$('.canceltatusBtn').removeClass("hide");
			updateStatus();
		}
		else{
			//alert('Update sended to server');

			var updEventId = $('#eventId').text();
			var updSectionId = $('.infoSection .sectSelect').val();
			var updDescr = $('.infoSection textarea').val();
			var updStatusId = $('.infoSection .statusSelect').val();

			var newUrl = url+statusController+"updateEvent";
			postSomething(newUrl,{"EventId":updEventId,
								"Description":updDescr,
								"SectionId":updSectionId,
								"StatusId":updStatusId
							},
			function(){ getSections();}
			,null,"UpdateEvent");

			// send New Data to server
			blockInfoSection();
			
		}
	});



	$('#b403 button').click(function(){
		if ($(this).hasClass('disabled')) return;
		blockInfoSection();
		
		$(".sectSelect").val(1);
		getSectionLastEvent(1);
	});
	$('#b204 button').click(function(){
		if ($(this).hasClass('disabled')) return;
		blockInfoSection();

		$(".sectSelect").val(2);
		getSectionLastEvent(2);
	});
	$('#b102 button').click(function(){
		if ($(this).hasClass('disabled')) return;
		blockInfoSection();
		$(".sectSelect").val(3);
		getSectionLastEvent(3);
	});
	$('#b202 button').click(function(){
		if ($(this).hasClass('disabled')) return;
		blockInfoSection();
		$(".sectSelect").val(4);
		getSectionLastEvent(4);
	});
	$('#b008 button').click(function(){
		if ($(this).hasClass('disabled')) return;
		blockInfoSection();
		$(".sectSelect").val(5);
		getSectionLastEvent(5);
	});
})