/**
 * jQuery Validation Plugin 1.8.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2011 Alex Petroni
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *  
 *  Develop for the PdlUS 2 steps i-frame
 */

/**
  * Check that name contains only letters, point, hyphen or spaces.
  *
  *
  * @name jQuery.validator.methods.namecharacters
  * @type Boolean
  * @cat Plugins/Validate/Methods
  */
jQuery.validator.addMethod(
		"namecharacters", 
		function(value, element, param) {
			value = $.trim(value);
			return this.optional(element) || value.match(/^[a-z][-'a-z][-'a-z.\s]*$/i);
}, jQuery.validator.format("Letters, spaces or hyphen only please."));


jQuery.validator.addMethod("alphanumericwithbasicpunc", function(value, element) {
	value = $.trim(value);
	return this.optional(element) || /^\w+[-.,()'\"\s]*/i.test(value);
}, "Letters, numbers and basic punctuation only please");  


jQuery.validator.addMethod("positiveinteger", function(value, element) {
	value = $.trim(value);
	return this.optional(element) || /^[1-9]\d*$/.test(value);
}, "A number greather than 0 is required.");

jQuery.validator.addMethod("naturalnumber", function(value, element) {
	return this.optional(element) || /^(0|[1-9]\d*)$/.test(value);
}, "A number greater than or equal to 0 please");


jQuery.validator.addMethod(
	"phoneUS_10digits_anydelimiter", 
	function(phone_number, element) {
    phone_number = phone_number.replace(/[-\(\)\s]+/g, ""); 
	return this.optional(element) || (phone_number.length > 9 &&
		phone_number.match(/^\d{10}$/));
}, "Please specify a valid US phone number");



jQuery.validator.addMethod(
	"phoneUS_10digits_nodelimiter", 
	function(phone_number, element) {
    //phone_number = phone_number.replace(/[-\(\)\s]+/g, ""); 
	return this.optional(element) || (phone_number.length > 9 &&
		phone_number.match(/^\d{10}$/));
}, "Please specify a valid US phone number, digits only");

/**
  * Check that adress must start with street number followed by street name
  *
  *
  * @name jQuery.validator.methods.minAge
  * @type Boolean
  * @cat Plugins/Validate/Methods
  */
jQuery.validator.addMethod(
			"usAddress", 
			function(value, element) {
				value = $.trim(value);
			return this.optional(element) || value.match(/^\d+[\w\W]*\s+\w+[\w.#:-]+[\s\w\W]*$/i);
}, jQuery.validator.format("Address must start with street number followed by street name."));




/**
  * Check the validity for an US Postal code
  *
  *
  * @name jQuery.validator.methods.postalcode
  * @type Boolean
  * @cat Plugins/Validate/Methods
  */
jQuery.validator.addMethod(
	"postalcodeUS", 
	function(value, element) {
	value = $.trim(value);
	return this.optional(element) || value.match(/(^\d{5}(-\d{4})?$)$/);
}, "Please specify a valid US postal/zip code");





/**
  * Return true, if the value is a valid date, for a date in ISO format yyyy/mm/dd and the age at least the minAgeAllowed
  *
  *
  * @name jQuery.validator.methods.minAge
  * @type Boolean
  * @cat Plugins/Validate/Methods
  */
jQuery.validator.addMethod(
		"minAge", 
		function(value, element, param) {
		var check = false;
		var minAgeAllowed = param;
		var re = /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/;
		if( re.test(value)){
			var adata = value.split(/[-\/]/);
			var dd = parseInt(adata[2],10);
			var mm = parseInt(adata[1],10);
			var yyyy = parseInt(adata[0],10);
			var birthDate = new Date(yyyy,mm-1,dd);
			
			var nowDate = new Date();
			
				
			var age = nowDate.getFullYear() - birthDate.getFullYear() - (nowDate.getMonth() < birthDate.getMonth() || (nowDate.getMonth() == birthDate.getMonth() && nowDate.getDate() < birthDate.getDate()));
			
			if(age >= minAgeAllowed)
			{
				check = true;
			}
		}	
	return this.optional(element) || check;
}, jQuery.validator.format("You must have at least {0} years to be eligible."));



/**
  * Return true, if the value is a valid date, for a date in ISO format yyyy/mm/dd and the age at least the maxAgeAllowed
  *
  *
  * @name jQuery.validator.methods.minAge
  * @type Boolean
  * @cat Plugins/Validate/Methods
  */
jQuery.validator.addMethod(
		"maxAge", 
		function(value, element, param) {
		var check = false;
		var maxAgeAllowed = param;
		var re = /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/;
		if( re.test(value)){
			var adata = value.split(/[-\/]/);
			var dd = parseInt(adata[2],10);
			var mm = parseInt(adata[1],10);
			var yyyy = parseInt(adata[0],10);
			var birthDate = new Date(yyyy,mm-1,dd);
			
			var nowDate = new Date();
			
				
			var age = nowDate.getFullYear() - birthDate.getFullYear() - (nowDate.getMonth() < birthDate.getMonth() || (nowDate.getMonth() == birthDate.getMonth() && nowDate.getDate() < birthDate.getDate()));
			
			if(age <= maxAgeAllowed)
			{
				check = true;
			}
		}	
	return this.optional(element) || check;
}, jQuery.validator.format("You have to be younger as {0} years to be eligible."));






/**
  * Return true, if the value is a valid date, for a date in ISO format yyyy/mm/dd.
  *
  * @example jQuery.validator.methods.dateValidity("1900/01/01")
  * @result true
  *
  *
  * @example jQuery.validator.methods.dateValidity("1900-01-01")
  * @result true
  *
  * @example jQuery.validator.methods.dateValidity("1990/13/01")
  * @result false
  *
  * @example jQuery.validator.methods.dateValidity("1900/12/32")
  * @result false
  *
  * @example <input name="pippo" class="{dateValidity:true}" />
  * @desc Declares an optional input element whose value must be a valid date.
  *
  * @name jQuery.validator.methods.dateValidity
  * @type Boolean
  * @cat Plugins/Validate/Methods
  */
jQuery.validator.addMethod(
	"dateValidity",
	function(value, element) {
		var check = false;
		var re = /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/;
		if( re.test(value)){
			var adata = value.split(/[-\/]/);
			var dd = parseInt(adata[2],10);
			var mm = parseInt(adata[1],10);
			var yyyy = parseInt(adata[0],10);
			var xdata = new Date(yyyy,mm-1,dd);
			if ( ( xdata.getFullYear() == yyyy ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == dd ) )
			{
				check = true;
			}
			else
				check = false;
		} 
		
		return this.optional(element) || check;
	}, 
	"Please enter a valid date"
);





/**
  * Return true, if the value is a valid date, for a date in ISO format yyyy/mm/dd.
  *
  * @example jQuery.validator.methods.dateValidity("1900/01/01")
  * @result true
  *
  *
  * @example jQuery.validator.methods.dateValidity("1900-01-01")
  * @result true
  *
  * @example jQuery.validator.methods.dateValidity("1990/13/01")
  * @result false
  *
  * @example jQuery.validator.methods.dateValidity("1900/12/32")
  * @result false
  *
  * @example <input name="pippo" class="{dateValidity:true}" />
  * @desc Declares an optional input element whose value must be a valid date.
  *
  * @name jQuery.validator.methods.dateValidity
  * @type Boolean
  * @cat Plugins/Validate/Methods
  */
jQuery.validator.addMethod(
	"usDateValidity",
	function(value, element) {
		var check = false;
		var re = /^\d{1,2}[\/-]\d{1,2}[\/-]\d{4}$/;
		if( re.test(value)){
			var adata = value.split(/[-\/]/);
		
			var mm = parseInt(adata[0],10);
			var dd = parseInt(adata[1],10);
			var yyyy = parseInt(adata[2],10);
			var xdata = new Date(yyyy,mm-1,dd);
			if ( ( xdata.getFullYear() == yyyy ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == dd ) )
			{
				check = true;
			}
			else
				check = false;
		} 
		
		return this.optional(element) || check;
	}, 
	"Please enter a valid date (mm/dd/yyyy)"
);


/**
  * Return true, if the value is a valid date, for a date in ISO format yyyy/mm/dd.
  *
  *
  * @example <input name="pippo" class="{usDateIsInFutureDays:90}" />
  * @desc Declares an optional input element whose value must be a valid date not far than 90 days from the present date.
  *
  * @name jQuery.validator.methods.dateValidity
  * @type Boolean
  * @cat Plugins/Validate/Methods
  */
jQuery.validator.addMethod(
	"usDateIsInFutureDays",
	function(value, element, param) {
		var check = false;
		var re = /^\d{1,2}[\/-]\d{1,2}[\/-]\d{4}$/;
		if( re.test(value)){
			var adata = value.split(/[-\/]/);
		
			var mm = parseInt(adata[0],10);
			var dd = parseInt(adata[1],10);
			var yyyy = parseInt(adata[2],10);			
			var xdata = new Date(yyyy,mm-1,dd);
			
			
			var limitData = new Date();
			limitData.setDate(limitData.getDate()+ parseInt(param));
			
			if ( xdata <= limitData)
			{
				check = true;
			}
			else
				check = false;
		} 
		
		return this.optional(element) || check;
	}, 
	"Date cannot be more than {0} days in future."
);


jQuery.validator.addMethod(
	"usDateIsNotInWeekend",
	function(value, element) {
		var check = false;
		var re = /^\d{1,2}[\/-]\d{1,2}[\/-]\d{4}$/;
		if( re.test(value)){
			var adata = value.split(/[-\/]/);			
			var mm = parseInt(adata[0],10);
			var dd = parseInt(adata[1],10);
			var yyyy = parseInt(adata[2],10);
			var xdata = new Date(yyyy,mm-1,dd);
			
			var day = xdata.getDay();
			if ( day == 0 ||   day == 6 )
			{
				check = false;
			}
			else
				check = true;
		} 
		return this.optional(element) || check;
	}, 
	"Date can't be on a weekend day"
);



jQuery.validator.addMethod(
	"usDateIsInFuture",
	function(value, element) {
		var check = false;
		var re = /^\d{1,2}[\/-]\d{1,2}[\/-]\d{4}$/;
		if( re.test(value)){
			var adata = value.split(/[-\/]/);			
			var mm = parseInt(adata[0],10);
			var dd = parseInt(adata[1],10);
			var yyyy = parseInt(adata[2],10);
			var xdata = new Date(yyyy,mm-1,dd);
			var nowdata  = new Date();
			nowdata.setHours(0,0,0,0);
			
			
			if ( xdata >= nowdata )
			{
				check = true;
			}
			else
				check = false;
		} 
		return this.optional(element) || check;
	}, 
	"Date cannot be in the past."
);


/**
  * Return true, if the value is one of the value specified
  *
  *
  * @name jQuery.validator.methods.acceptedValues
  * @type Boolean
  * @cat Plugins/Validate/Methods
  */
jQuery.validator.addMethod(
	"acceptedValues",
	function(value, element, param) {
		var check = false;
		
		return this.optional(element) || check;
	}, 
	"Please enter a valid date"
);




/**
  * Check the validity for an USA Bank ABA code
  *
  *
  * @name jQuery.validator.methods.USBankAbaCode
  * @type Boolean
  * @cat Plugins/Validate/Methods
  */
jQuery.validator.addMethod(
	"USBankAbaCode", 
	function(value, element) {
		value = $.trim(value);
	var check = false;
	var i, n, t;
    t = "";
	
    for (i = 0; i < value.length; i++){
      	c = parseInt(value.charAt(i), 10);
      	if (c >= 0 && c <= 9)t = t + c;
    }
    if (t.length == 9)
	{
		n = 0;
		for (i = 0; i < t.length; i += 3){
			n += parseInt(t.charAt(i),     10) * 3
			  +  parseInt(t.charAt(i + 1), 10) * 7
			  +  parseInt(t.charAt(i + 2), 10);
		}
		if(n != 0 && n % 10 == 0) 
		{
			check = true;
		}
	
	}
	
	return this.optional(element) || check;
}, "Please specify a valid USA Bank ABA code");




// set the witness to true after a succesfull validation

jQuery.validator.addMethod(
	"validation_witness", 
	function(value, element) {
		var check = true;
		if(this.errorList.length == 0)
		{
			$(element).val("true");
			check = true;
		}
	return this.optional(element) || check;
}, "");




/**
  * Return true, if the value is a valid date and is before the date specified date in field 'param'
  *
  *
  * @name jQuery.validator.methods.dateBefore
  * @type Boolean
  * @cat Plugins/Validate/Methods
  */
jQuery.validator.addMethod(
		"usDateAfter", 
		function(value, element, param) {
		var check = false;
		var dateToCompare = $(param).val();
		// if the date to compare is not set, do nothing
		if(dateToCompare == '')
		{
			return true;
		}
		
		var re = /^\d{1,2}[\/-]\d{1,2}[\/-]\d{4}$/;
		if( re.test(value) && re.test(dateToCompare)){
			var a_data = value.split(/[-\/]/);
			var a_dd = parseInt(a_data[1],10);
			var a_mm = parseInt(a_data[0],10);
			var a_yyyy = parseInt(a_data[2],10);
			
			var afterDate = new Date(a_yyyy,a_mm,a_dd);
			
			
			var b_data = dateToCompare.split(/[-\/]/);
			var b_dd = parseInt(b_data[1],10);
			var b_mm = parseInt(b_data[0],10);
			var b_yyyy = parseInt(b_data[2],10);
			
			var beforeDate = new Date(b_yyyy, b_mm, b_dd);
			
			
			if(beforeDate < afterDate)
			{
				
				check = true;
			}
		}	
	return this.optional(element) || check;
}, jQuery.validator.format("The date must be before {0}."));




/**
  * Return true, if the value is different as the value specified in field 'param'
  *
  *
  * @name jQuery.validator.methods.differentTo
  * @type Boolean
  * @cat Plugins/Validate/Methods
  */
jQuery.validator.addMethod(
		"differentTo", 
		function(value, element, param) {
		var check = false;
		
		var valueToCompare = $(param).val();
			
			if(value != valueToCompare)
			{
				
				check = true;
			}
			
	return this.optional(element) || check;
}, jQuery.validator.format("The element must be different as {0}."));

/**
  * Return true, if the date is specified in US style, mm-dd-yy
  *
  *
  * @name jQuery.validator.methods.usDate
  * @type Boolean
  * @cat Plugins/Validate/Methods
  */
jQuery.validator.addMethod(
		"usDate", 
		function(value, element) {
			
	return this.optional(element) || /^\d{1,2}[\/-]\d{1,2}[\/-]\d{4}$/.test(value);
	
}, jQuery.validator.format("Date must be formated as mm/dd/yyyy."));
		