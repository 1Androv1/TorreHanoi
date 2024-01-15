function completo(){
	document.getElementById("stage2").style.display="none";
	document.getElementById("stage3").style.display="none";
	document.getElementById("screenpause").style.display="none"

	document.getElementById("start").onclick=function(event){
		event.preventDefault();
		var player=document.getElementById("username").value;
		$difficulty=document.getElementById("difficulty").value;
		localStorage.setItem("username", player);
		localStorage.setItem("difficulty", $difficulty);
		if (player.length>0 && difficulty.length>0) {
			document.getElementById("stage2").style.display="block";
			document.getElementById("stage1").style.display="none";
			loadDisks($difficulty);
			startCrono();
			allowMove();
		}else{
			alert('Por favor, llene los espacios, son requeridos..');
		}
	};
	/*------------------------------------------------------------------------------------------------*/
	document.getElementById("pause").onclick=function(){
		if(document.getElementById("pause").innerText=="PAUSE"){
			document.getElementById("tower1").style.display="none";
			document.getElementById("tower2").style.display="none";
			document.getElementById("tower3").style.display="none";
			document.getElementById("screenpause").style.display="block";
			document.getElementById("pause").innerHTML="RESUME";
			clearInterval(cronometro);
			$('#restart').attr('disabled', true);
		}else{
			document.getElementById("tower1").style.display="inline-block";
			document.getElementById("tower2").style.display="inline-block";
			document.getElementById("tower3").style.display="inline-block";
			document.getElementById("screenpause").style.display="none";
			document.getElementById("pause").innerHTML="PAUSE";
			startCrono();
			$('#restart').attr('disabled', false);
		}
	}
	document.getElementById("restart").onclick=function(){
		document.getElementById("stage2").style.display="none";
		document.getElementById("stage1").style.display="block";
		clearInterval(cronometro)
		conts=0
		document.getElementById("move").innerHTML=0;
		document.getElementById("time").innerHTML=0+"s";
		$('#username').val('')
		$('#difficulty').val('')
	}
	/*------------------------------------------------------------------------------------------------*/
	function loadDisks(nd){
		for (var tower=1; tower<=3; tower++){
			var content='';
			for (var disk=1; disk<=nd; disk++){
				if (tower==1){
					content +="<div id='box"+disk+"' class='boxes'><span id='d"+disk+"' class='disks'><em>"+disk+"</em></span></div>";
					document.getElementById("tower"+tower).innerHTML=content;
				}else{
					content+="<div id='box"+disk+"' class='boxes'></div>";
					document.getElementById("tower"+tower).innerHTML=content;
				}
			};
		};
		if (nd==3) {
			$('div.boxes').css({top:'168px'});
			document.getElementById("name1").innerHTML=localStorage.getItem("username");
			document.getElementById("level").innerHTML=localStorage.getItem("difficulty")+" Disks (Easy)";
			$i=0;
			document.getElementById("move").innerHTML=0;
		};
		if (nd==4) {
			$('div.boxes').css({top:'130px'});
			document.getElementById("name1").innerHTML=localStorage.getItem("username");
			document.getElementById("level").innerHTML=localStorage.getItem("difficulty")+" Disks (Medium)";
			$i=0;
			document.getElementById("move").innerHTML=0;			
		};
		if (nd==5) {
			$('div.boxes').css({top:'93px'});
			document.getElementById("name1").innerHTML=localStorage.getItem("username");
			document.getElementById("level").innerHTML=localStorage.getItem("difficulty")+" Disks (Hard)";
			$i=0;
			document.getElementById("move").innerHTML=0;			
		};		
	};
	/*------------------------------------------------------------------------------------------------*/
	function allowMove(){
		iniDrag($('span.disks'));
		stopDrag($('span.disks'));
		$('.towers').find('span.disks:first').draggable('enable');
		allowDrop();
	};
	function iniDrag(elm){
		elm.draggable({
			revert: 'invalid',
			containment:'#stage2',
			cursor:'move'
		});
	}
	function allowDrop(){
		$('.towers').droppable({
			accept: '.disks',
			tolerance: 'pointer',
			drop: function(e,ui){
				//detect drag-disk ($elm1), firt disk(elm2)
				var elm1=$(ui.draggable).attr('id');				
				elm1=elm1.substring(1,2);			
				var numdisks=$(this).find('span.disks').length;				
				if ($(this).find('span.disks').length>0){
					var elm2=$(this).find('span.disks').first().attr('id');					
					elm2=elm2.substring(1,2);					
				}else{
					elm2=$difficulty+1;		
				}
				//if first disk > drag-disk
				if (elm2>elm1){
					var evaluaswitch=$(this).find('span.disks').length				
					switch($(this).find('span.disks').length){
						case 0:
							$(this).children('div').last().append($(ui.draggable));
							break;
						case 1:
							$(this).children('div').last().prev().append($(ui.draggable));
							break;
						case 2:
							if ($difficulty==3){
								$(this).children('div').first().append($(ui.draggable));
							}
							if ($difficulty==4 ||$difficulty==5){
								$(this).children('div').last().prev().prev().append($(ui.draggable));
							}
							break;
						case 3:
							if ($difficulty==4){
								$(this).children('div').first().append($(ui.draggable));
							}
							if ($difficulty==5){
								$(this).children('div').first().next().append($(ui.draggable));
							}
							break;
						case 4:	
							$(this).children('div').first().append($(ui.draggable));
							break;
					}// close switch
					$(ui.draggable).css({left:'0px', top:'0px'});
				}else{
					$(ui.draggable).css({left:'0px', top:'0px'});
				}
				stopDrag($('span.disks'));
				$('.towers').find('span.disks:first').draggable('enable');
				$i++;
				document.getElementById('move').innerHTML=$i;
				gameOver($difficulty);
			}
		});
	}
	function stopDrag(elm){
		elm.draggable("disable");
	}
	var conts=0;
	function startCrono(){
		return cronometro=setInterval(function(){
			conts++;
			document.getElementById("time").innerHTML=conts+"s";
		},1000);
	};
	function gameOver(elm){
		var mej=0;
		for (var i=1; i<=elm; i++){
			var jem=$('#d'+i).parent().parent().attr('id');
			if (jem=="tower3"){
				mej++;
			}
			if (mej==elm){
				alert("GANASTE");
				clearInterval(cronometro);
				document.getElementById("pause").disabled="true"
				var datos={
					nombre: document.getElementById("name1").innerText,
					dificultad: document.getElementById("level").innerText,
					tiempo: document.getElementById("time").innerText,
					movimientos: document.getElementById("move").innerText
				}
				localStorage.setItem("data",JSON.stringify(datos));
				var user=JSON.parse(localStorage.getItem("data"));
				console.log(user);
			}//close if
		}// close for
	}
};