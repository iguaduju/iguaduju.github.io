// ¾ÆÁ÷ ·¹ÀÌ¾î´Â »ý¼ºµÇÁö ¾Ê¾Ò´Ù.
var trigger=0
// ¾ÆÁ÷ È°¼ºÈ­µÈ ·¹ÀÌ¾î´Â ¾ø´Ù.
var vis=0
function initthumb()
	{
		document.onmousemove = sniff
		document.onmouseup = sniff
		document.onmousedown = sniff
		// Trigger Netscape Mouse Check
		if (document.layers){document.captureEvents(Event.MOUSEDOWN | Event.MOUSEMOVE | Event.MOUSEUP)}
		// Call dummy to help IE get width + height
		if (document.all)dopic('dummy','',1,1,1,1)
	}
function sniff(e){
		// ¸¶¿ì½ºÀÇ À§Ä¡Á¤º¸¸¦ ¾ò´Â ºÎºÐ
		if (document.layers) {var mousex=e.pageX; var mousey=e.pageY;fx=mousex;fy=mousey;}
		else if (document.all) {var mousex=event.x; var mousey=event.y+document.body.scrollTop;fx=mousex;fy=mousey}
				}		
function dopic(name,auto,picx,picy)
{
	if (vis == 0) // È°¼ºÈ­µÈ ·¹ÀÌ¾î°¡ ¾ø´Ù¸é..
		{
			// ±âº»°ª
			var oldpicx=100;
			var oldpicy=100;
			var rahmen='silver'
			var alttext="Å¬¸¯ÇÏ¸é »çÁøÀÌ »ç¶óÁý´Ï´Ù."

				// ·¹ÀÌ¾î°¡ ¾øÀ» ¶§
					if (trigger!=1)
						{
						trigger=1 // ·¹ÀÌ¾î¸¦ »ý¼ºÇØ ÁØ´Ù.
						// ¼û°ÜÁø ·¹ÀÌ¾î¸¦ ¸¸µç´Ù(Netscape)
							if(document.layers){
								document.layers['picarea'] = new Layer(1);
								document.layers['picarea'].left = oldpicx;
								document.layers['picarea'].top = oldpicy;
								document.layers['picarea'].height = 20;
								document.layers['picarea'].visibility = "hidden";
							}
						// ¼û°ÜÁø ·¹ÀÌ¾î¸¦ ¸¸µç´Ù(IE)
							else if (document.all){
								document.body.insertAdjacentHTML("BeforeEnd",'<DIV ID="picarea" STYLE="z-index:200;position:absolute;left:"+picx+";top:"+picy></DIV>');
							}
						}

				// ¸¸¾à¿¡ ·¹ÀÌ¾î°¡ ÀÖ´Ù¸é, ¼û°ÜÁØ´Ù.
					if (trigger != 0){
						if (document.layers){document.layers['picarea'].visibility="hide"} //Netscape
						if (document.all){picarea.style.visibility="hidden"}
					}
			// ·¹ÀÌ¾îÀÇ ³»¿ëÀ» Á¤ÇØÁÖ´Â ºÎºÐ
			content="<a href=\"javascript:clearpic()\" style=\"color:"+rahmen+"\"><img src=\"";
			content=content+name+"\" name=\"pic\" alt=\""+alttext+"\" border=1";
			content=content+"></A>";
			// ·¹ÀÌ¾î ¾È¿¡ Á¤ÇØÁØ ³»¿ëÀ» ³Ö°í, º¸¿©ÁÖ´Â ºÎºÐ(Netscape)
					if (document.layers) {
					sprite=document.layers['picarea'].document;
  					sprite.open();
					sprite.write(content);
					sprite.close();
					// À§Ä¡°¡ ÀÚµ¿ÀûÀ¸·Î ÁöÁ¤µÇÁö ¾ÊÀ» ¶§, ·¹ÀÌ¾î¸¦ Ã³À½¿¡ Á¤ÇØÁÖ¾ú´ø ±âº» À§Ä¡¿¡ À§Ä¡½ÃÅ²´Ù.
					if (picx != null && auto == ''){ 
						document.layers['picarea'].left = picx;
						document.layers['picarea'].top = picy;
					}
					// À§Ä¡°¡ ÀÚµ¿ÀûÀ¸·Î ÁöÁ¤µÇ°Ô µÇ¾îÀÖÀ¸¸é..
					if (auto != "")
						{ 
						// »çÁøÀÇ Æø°ú ³ôÀÌ¸¦ ¾ò´ÂºÎºÐ
						xw=document.layers['picarea'].document.images['pic'].width 
						yw=document.layers['picarea'].document.images['pic'].height
						// »çÁøÀÇ Áß½ÉºÎºÐÀÇ À§Ä¡¸¦ »õ·Ó°Ô ¸¶¿ì½ºÀÇ À§Ä¡·Î ¼³Á¤ÇÑ´Ù.
						newpicx = fx - (xw/2)
						newpicy = fy - (yw/2)
							// ¿ÀÇÁ¼ÂÀÌ ÀÖ´Ù¸é, ±×°Íµµ ¸ÂÃç¼­ ¼³Á¤ÇØ ÁØ´Ù.
							if (picx) {newpicx=newpicx + picx}
							if (picy) {newpicy=newpicy + picy} 
						// ·¹ÀÌ¾îÀÇ À§Ä¡¸¦ ¼³Á¤ÇØ ÁØ´Ù.
						document.layers['picarea'].left = newpicx;
						document.layers['picarea'].top = newpicy;
						
						}
					// ·¹ÀÌ¾î¸¦ º¸¿©ÁØ´Ù.
					document.layers['picarea'].visibility="show";
					// È°¼ºÈ­µÈ ·¹ÀÌ¾î°¡ ÀÖ´Ù°í ¹Ù²ãÁØ´Ù.
					vis=1
				 }

			// ·¹ÀÌ¾î ¾È¿¡ Á¤ÇØÁØ ³»¿ëÀ» ³Ö°í, º¸¿©ÁÖ´Â ºÎºÐ(IE)
				if (document.all) {
					document.all['picarea'].innerHTML = content;
					// À§Ä¡°¡ ÀÚµ¿ÀûÀ¸·Î ÁöÁ¤µÇÁö ¾ÊÀ» ¶§, ·¹ÀÌ¾î¸¦ Ã³À½¿¡ Á¤ÇØÁÖ¾ú´ø ±âº» À§Ä¡¿¡ À§Ä¡½ÃÅ²´Ù.
					if (picx != null && auto == ''){
						picarea.style.top=picy
						picarea.style.left=picx;
					}
					// À§Ä¡°¡ ÀÚµ¿ÀûÀ¸·Î ÁöÁ¤µÇ°Ô µÇ¾îÀÖÀ¸¸é..
					if (auto != "")	{ 
						// get the picture width/height
						xw=document.all['pic'].width
						yw=document.all['pic'].height
						// »çÁøÀÇ Áß½ÉºÎºÐÀÇ À§Ä¡¸¦ »õ·Ó°Ô ¸¶¿ì½ºÀÇ À§Ä¡·Î ¼³Á¤ÇÑ´Ù.
				      newpicx = fx - (xw/2)
				      newpicy = fy - (yw/2)
							// ¿ÀÇÁ¼ÂÀÌ ÀÖ´Ù¸é, ±×°Íµµ ¸ÂÃç¼­ ¼³Á¤ÇØ ÁØ´Ù.
							if (picx) {newpicx=newpicx + picx}
							if (picy) {newpicy=newpicy + picy} 
						// ·¹ÀÌ¾îÀÇ À§Ä¡¸¦ ¼³Á¤ÇØ ÁØ´Ù.
						picarea.style.top=newpicy;
						picarea.style.left=newpicx;
					}
					// ·¹ÀÌ¾î¸¦ º¸¿©ÁØ´Ù.
					// ¸¸¾à¿¡ ÀÌ¸§ÀÌ Á¤ÇØÁ® ÀÖ´Ù¸é..
						if (name != "dummy") {
							picarea.style.visibility="visible";
							// È°¼ºÈ­µÈ ·¹ÀÌ¾î°¡ ÀÖ´Ù°í ¹Ù²ãÁØ´Ù.
							vis=1
						}
	}
	else if (document.layers == null && document.all == null) {self.location=name};
	}
}
// Å¬¸¯ÇÏ¸é ·¹ÀÌ¾î¸¦ ¼û°ÜÁÖ´Â ºÎºÐ
function clearpic()	{
	// º¸¿©Áø ·¹ÀÌ¾î¸¦ ºñÈ°¼ºÈ­ ½ÃÅ°´Â ºÎºÐ
		vis=0
		if (document.layers){document.layers['picarea'].visibility="hide"};
		if (document.all){picarea.style.visibility="hidden"};
}
	//-->
