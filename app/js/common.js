
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
				console.log("Error in"+funcName);
				funcError();
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

	function getSections()	{
		var newUrl = url+statusController;
		getSomething(newUrl,function(data){console.log(data)},null,"GetSections");
	};

	function blockInfoSection(){
		$('.infoSection textarea ').attr('readonly','readonly');
		$('.infoSection .statusSelect ').attr('disabled','disabled');
		$('.updateStatusBtn').text("Update");
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
			alert('Notify added to the system!');
		}
		,null,"AddNewNotification");
};

// end functions

$(function(){
	
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
			$('.updateStatusBtn').text("Update");
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
			alert('Update sended to server');
			// send New Data to server
			blockInfoSection();
			
		}
	});



	$('#b403').click(function(){
		blockInfoSection();
		$(".sectSelect").val(1);
	});
	$('#b204').click(function(){
		blockInfoSection();
		$(".sectSelect").val(2);
	});
	$('#b102').click(function(){
		blockInfoSection();
		$(".sectSelect").val(3);
	});
	$('#b202').click(function(){
		blockInfoSection();
		$(".sectSelect").val(4);
	});
	$('#b008').click(function(){
		blockInfoSection();
		$(".sectSelect").val(5);
	});
})