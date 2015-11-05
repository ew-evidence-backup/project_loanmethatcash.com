/**
 * 
 */

$('#feedbackBtn').click(function(){
	$('#myModal').foundation('reveal', 'open');	
});

$('a.close-reveal-modal').click(function(){
	$('#myModal').foundation('reveal', 'close');	
});