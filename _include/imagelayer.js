// ���� ���̾�� �������� �ʾҴ�.
var trigger=0
// ���� Ȱ��ȭ�� ���̾�� ����.
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
		// ���콺�� ��ġ������ ��� �κ�
		if (document.layers) {var mousex=e.pageX; var mousey=e.pageY;fx=mousex;fy=mousey;}
		else if (document.all) {var mousex=event.x; var mousey=event.y+document.body.scrollTop;fx=mousex;fy=mousey}
				}		
function dopic(name,auto,picx,picy)
{
	if (vis == 0) // Ȱ��ȭ�� ���̾ ���ٸ�..
		{
			// �⺻��
			var oldpicx=100;
			var oldpicy=100;
			var rahmen='silver'
			var alttext="Ŭ���ϸ� ������ ������ϴ�."

				// ���̾ ���� ��
					if (trigger!=1)
						{
						trigger=1 // ���̾ ������ �ش�.
						// ������ ���̾ �����(Netscape)
							if(document.layers){
								document.layers['picarea'] = new Layer(1);
								document.layers['picarea'].left = oldpicx;
								document.layers['picarea'].top = oldpicy;
								document.layers['picarea'].height = 20;
								document.layers['picarea'].visibility = "hidden";
							}
						// ������ ���̾ �����(IE)
							else if (document.all){
								document.body.insertAdjacentHTML("BeforeEnd",'<DIV ID="picarea" STYLE="z-index:200;position:absolute;left:"+picx+";top:"+picy></DIV>');
							}
						}

				// ���࿡ ���̾ �ִٸ�, �����ش�.
					if (trigger != 0){
						if (document.layers){document.layers['picarea'].visibility="hide"} //Netscape
						if (document.all){picarea.style.visibility="hidden"}
					}
			// ���̾��� ������ �����ִ� �κ�
			content="<a href=\"javascript:clearpic()\" style=\"color:"+rahmen+"\"><img src=\"";
			content=content+name+"\" name=\"pic\" alt=\""+alttext+"\" border=1";
			content=content+"></A>";
			// ���̾� �ȿ� ������ ������ �ְ�, �����ִ� �κ�(Netscape)
					if (document.layers) {
					sprite=document.layers['picarea'].document;
  					sprite.open();
					sprite.write(content);
					sprite.close();
					// ��ġ�� �ڵ������� �������� ���� ��, ���̾ ó���� �����־��� �⺻ ��ġ�� ��ġ��Ų��.
					if (picx != null && auto == ''){ 
						document.layers['picarea'].left = picx;
						document.layers['picarea'].top = picy;
					}
					// ��ġ�� �ڵ������� �����ǰ� �Ǿ�������..
					if (auto != "")
						{ 
						// ������ ���� ���̸� ��ºκ�
						xw=document.layers['picarea'].document.images['pic'].width 
						yw=document.layers['picarea'].document.images['pic'].height
						// ������ �߽ɺκ��� ��ġ�� ���Ӱ� ���콺�� ��ġ�� �����Ѵ�.
						newpicx = fx - (xw/2)
						newpicy = fy - (yw/2)
							// �������� �ִٸ�, �װ͵� ���缭 ������ �ش�.
							if (picx) {newpicx=newpicx + picx}
							if (picy) {newpicy=newpicy + picy} 
						// ���̾��� ��ġ�� ������ �ش�.
						document.layers['picarea'].left = newpicx;
						document.layers['picarea'].top = newpicy;
						
						}
					// ���̾ �����ش�.
					document.layers['picarea'].visibility="show";
					// Ȱ��ȭ�� ���̾ �ִٰ� �ٲ��ش�.
					vis=1
				 }

			// ���̾� �ȿ� ������ ������ �ְ�, �����ִ� �κ�(IE)
				if (document.all) {
					document.all['picarea'].innerHTML = content;
					// ��ġ�� �ڵ������� �������� ���� ��, ���̾ ó���� �����־��� �⺻ ��ġ�� ��ġ��Ų��.
					if (picx != null && auto == ''){
						picarea.style.top=picy
						picarea.style.left=picx;
					}
					// ��ġ�� �ڵ������� �����ǰ� �Ǿ�������..
					if (auto != "")	{ 
						// get the picture width/height
						xw=document.all['pic'].width
						yw=document.all['pic'].height
						// ������ �߽ɺκ��� ��ġ�� ���Ӱ� ���콺�� ��ġ�� �����Ѵ�.
				      newpicx = fx - (xw/2)
				      newpicy = fy - (yw/2)
							// �������� �ִٸ�, �װ͵� ���缭 ������ �ش�.
							if (picx) {newpicx=newpicx + picx}
							if (picy) {newpicy=newpicy + picy} 
						// ���̾��� ��ġ�� ������ �ش�.
						picarea.style.top=newpicy;
						picarea.style.left=newpicx;
					}
					// ���̾ �����ش�.
					// ���࿡ �̸��� ������ �ִٸ�..
						if (name != "dummy") {
							picarea.style.visibility="visible";
							// Ȱ��ȭ�� ���̾ �ִٰ� �ٲ��ش�.
							vis=1
						}
	}
	else if (document.layers == null && document.all == null) {self.location=name};
	}
}
// Ŭ���ϸ� ���̾ �����ִ� �κ�
function clearpic()	{
	// ������ ���̾ ��Ȱ��ȭ ��Ű�� �κ�
		vis=0
		if (document.layers){document.layers['picarea'].visibility="hide"};
		if (document.all){picarea.style.visibility="hidden"};
}
	//-->