var USER_EVENTS_URL = '/register-event';

function registerUserEvent(source, type, data)
{
	if(!data) {
		data = '';
	}

	var origin = top.location.href;
	var time = Math.round((new Date()).getTime() / 1000);

	var params  = 'source=' + encodeURIComponent(source);
	params += '&type=' + encodeURIComponent(type);
	params += '&data=' + encodeURIComponent(data);
	params += '&time=' + encodeURIComponent(time);
	params += '&origin=' + encodeURIComponent(origin);

	var url = USER_EVENTS_URL + '?' + params;
	//console.log(url);

	(new Image()).src = url;
}
