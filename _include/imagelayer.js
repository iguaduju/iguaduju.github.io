// 아직 레이어는 생성되지 않았다.
var trigger=0
// 아직 활성화된 레이어는 없다.
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
		// 마우스의 위치정보를 얻는 부분
		if (document.layers) {var mousex=e.pageX; var mousey=e.pageY;fx=mousex;fy=mousey;}
		else if (document.all) {var mousex=event.x; var mousey=event.y+document.body.scrollTop;fx=mousex;fy=mousey}
				}		
function dopic(name,auto,picx,picy)
{
	if (vis == 0) // 활성화된 레이어가 없다면..
		{
			// 기본값
			var oldpicx=100;
			var oldpicy=100;
			var rahmen='silver'
			var alttext="클릭하면 사진이 사라집니다."

				// 레이어가 없을 때
					if (trigger!=1)
						{
						trigger=1 // 레이어를 생성해 준다.
						// 숨겨진 레이어를 만든다(Netscape)
							if(document.layers){
								document.layers['picarea'] = new Layer(1);
								document.layers['picarea'].left = oldpicx;
								document.layers['picarea'].top = oldpicy;
								document.layers['picarea'].height = 20;
								document.layers['picarea'].visibility = "hidden";
							}
						// 숨겨진 레이어를 만든다(IE)
							else if (document.all){
								document.body.insertAdjacentHTML("BeforeEnd",'<DIV ID="picarea" STYLE="z-index:200;position:absolute;left:"+picx+";top:"+picy></DIV>');
							}
						}

				// 만약에 레이어가 있다면, 숨겨준다.
					if (trigger != 0){
						if (document.layers){document.layers['picarea'].visibility="hide"} //Netscape
						if (document.all){picarea.style.visibility="hidden"}
					}
			// 레이어의 내용을 정해주는 부분
			content="<a href=\"javascript:clearpic()\" style=\"color:"+rahmen+"\"><img src=\"";
			content=content+name+"\" name=\"pic\" alt=\""+alttext+"\" border=1";
			content=content+"></A>";
			// 레이어 안에 정해준 내용을 넣고, 보여주는 부분(Netscape)
					if (document.layers) {
					sprite=document.layers['picarea'].document;
  					sprite.open();
					sprite.write(content);
					sprite.close();
					// 위치가 자동적으로 지정되지 않을 때, 레이어를 처음에 정해주었던 기본 위치에 위치시킨다.
					if (picx != null && auto == ''){ 
						document.layers['picarea'].left = picx;
						document.layers['picarea'].top = picy;
					}
					// 위치가 자동적으로 지정되게 되어있으면..
					if (auto != "")
						{ 
						// 사진의 폭과 높이를 얻는부분
						xw=document.layers['picarea'].document.images['pic'].width 
						yw=document.layers['picarea'].document.images['pic'].height
						// 사진의 중심부분의 위치를 새롭게 마우스의 위치로 설정한다.
						newpicx = fx - (xw/2)
						newpicy = fy - (yw/2)
							// 오프셋이 있다면, 그것도 맞춰서 설정해 준다.
							if (picx) {newpicx=newpicx + picx}
							if (picy) {newpicy=newpicy + picy} 
						// 레이어의 위치를 설정해 준다.
						document.layers['picarea'].left = newpicx;
						document.layers['picarea'].top = newpicy;
						
						}
					// 레이어를 보여준다.
					document.layers['picarea'].visibility="show";
					// 활성화된 레이어가 있다고 바꿔준다.
					vis=1
				 }

			// 레이어 안에 정해준 내용을 넣고, 보여주는 부분(IE)
				if (document.all) {
					document.all['picarea'].innerHTML = content;
					// 위치가 자동적으로 지정되지 않을 때, 레이어를 처음에 정해주었던 기본 위치에 위치시킨다.
					if (picx != null && auto == ''){
						picarea.style.top=picy
						picarea.style.left=picx;
					}
					// 위치가 자동적으로 지정되게 되어있으면..
					if (auto != "")	{ 
						// get the picture width/height
						xw=document.all['pic'].width
						yw=document.all['pic'].height
						// 사진의 중심부분의 위치를 새롭게 마우스의 위치로 설정한다.
				      newpicx = fx - (xw/2)
				      newpicy = fy - (yw/2)
							// 오프셋이 있다면, 그것도 맞춰서 설정해 준다.
							if (picx) {newpicx=newpicx + picx}
							if (picy) {newpicy=newpicy + picy} 
						// 레이어의 위치를 설정해 준다.
						picarea.style.top=newpicy;
						picarea.style.left=newpicx;
					}
					// 레이어를 보여준다.
					// 만약에 이름이 정해져 있다면..
						if (name != "dummy") {
							picarea.style.visibility="visible";
							// 활성화된 레이어가 있다고 바꿔준다.
							vis=1
						}
	}
	else if (document.layers == null && document.all == null) {self.location=name};
	}
}
// 클릭하면 레이어를 숨겨주는 부분
function clearpic()	{
	// 보여진 레이어를 비활성화 시키는 부분
		vis=0
		if (document.layers){document.layers['picarea'].visibility="hide"};
		if (document.all){picarea.style.visibility="hidden"};
}
	//-->