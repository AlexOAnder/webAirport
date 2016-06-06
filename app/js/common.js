$(function(){
	var url  = "http://localhost:50012/";
	var statusController = "api/mainstatus/"

	$('#serverStatus').click(function(){
		$('.loader').removeClass('hidden');
		checkServerStatus();
	});

	function checkServerStatus(){
		$.get( url+statusController+"check" )
			  .done(function( data ) {
			    	console.log( "Data Loaded: " + data );
			    	$('#serverStatus').removeClass('redColor');
			  		$('#serverStatus').addClass('greenColor');
			  		if (!$('.blackfield').hasClass('hidden')){
			  			$('.blackfield').addClass('hidden');
			  		}
			  })
			  .error(function(data){
			  		//alert("Error");
			  		console.log("ERRORRRRR"+data);
			  		$('#serverStatus').addClass('redColor');
			  		$('#serverStatus').removeClass('greenColor');
			  		$('.blackfield').removeClass('hidden');
			  })
			  .always(function(){
			  		$('.loader').addClass('hidden');
			  });
	};

	function infoSectionBlock(){
		//$('.infoSection select').attr('disabled','disabled');
		$('.infoSection textarea ').attr('readonly','readonly');
		$('.infoSection .statusSelect ').attr('disabled','disabled');
		$('.updateStatusBtn').text("Update");
		$('.updateStatusBtn').removeClass("btn-primary");
		$('.canceltatusBtn').addClass("hide");
		$('.updateStatusBtn').addClass("btn-default");
	};

	function updateStatus(){
		//$('.infoSection select').removeAttr('disabled');
		$('.infoSection textarea').removeAttr('readonly');
		$('.infoSection .statusSelect ').removeAttr('disabled');
	}

	$('.canceltatusBtn').click(function() {
			infoSectionBlock()
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
			infoSectionBlock()
			
		}
	});



	$('#b403').click(function(){
		infoSectionBlock()
		$(".sectSelect").val(1);
	});
	$('#b204').click(function(){
		infoSectionBlock()
		$(".sectSelect").val(2);
	});
	$('#b102').click(function(){
		infoSectionBlock()
		$(".sectSelect").val(3);
	});
	$('#b202').click(function(){
		infoSectionBlock()
		$(".sectSelect").val(4);
	});
	$('#b008').click(function(){
		infoSectionBlock()
		$(".sectSelect").val(5);
	});
})