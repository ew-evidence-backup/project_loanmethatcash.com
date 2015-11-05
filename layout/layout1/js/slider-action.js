jQuery(document).ready(function($) {
	 $("#fpSlider").bind("slider:ready", function (event, data) { 
		 $('#sl_borrowAmount').text('$' + Math.round(data.value));	 
	 })
	
	$("#fpSlider").bind("slider:changed", function (event, data) {
		  // The currently selected value of the slider
		$('#sl_borrowAmount').text('$'+ Math.round(data.value));
		 // alert(data.value);

		  // The value as a ratio of the slider (between 0 and 1)
		//  alert(data.ratio);
		});
	 
	 $('#applyBtnFp').click(function(event){
		 event.preventDefault();
		 var path = $(this).attr('href');
		 window.location.href = path + '?amount=' + $("#fpSlider").val();
	 })

});