
jQuery.fn.extend({
	dopic: function() {
		return this.each(function() {			
			$("body").append('<div id="fade" class="black_overlay"></div>');
			$(this).attr('href', 'javascript:void(0)');
			$(this).attr('onclick', "document.getElementById('light').style.display='block';document.getElementById('fade').style.display='block'");
			var url = $(this).children('img').attr('src');
			$(this).parent().append('<div id=\"light\" class=\"white_content\" onclick="document.getElementById(\'light\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'""><a href=\"javascript:void(0)\"><img src="'+url+'"></a></div>');
		});
	}
});
