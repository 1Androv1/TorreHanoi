$(document).ready(function(){
	$sittp=undefined;

	if(localStorage.length>0){
		$('#stage1, #stage3').hide();
		$cont      =localStorage.getItem('cont');
		$difficulty=localStorage.getItem('diff');
		$countmoves=localStorage.getItem('countm');
		resumeGame($('#resume'));
		pauseGame($('#pause'));
		/*--------------------------------------*/
		$('#nplayer').text(localStorage.getItem('nplayer'));
		$('#dplayer').text(localStorage.getItem('dplayer'));
		$('#tplayer').text(localStorage.getItem('tplayer'));
		$('#mplayer').text(localStorage.getItem('countm'));
	}else{
		$cont=0;
		$difficulty=undefined;
		$countmoves=0;
		$('#stage2, #stage3').hide();
		$('#screenpause').hide();
	}

	$('#game').on('click','#start', function(event){
		event.preventDefault();
		$player=$('#username').val();
		$difficulty=$('#difficulty').val();
		if ($player.length > 0 && $difficulty.length > 0){
			localStorage.setItem('diff',$difficulty);
			$('#stage1').hide();
			$('#stage2').show();
			showDataPlayer();
			loadDisks($difficulty);
			allowMove();
			localStorage.setItem('actgame', $('#hanoi').html());
		}else{
			alert('please, fill all fields text, are required..')
		}
	});
	/*--------------------------------------------------------------------*/
	$('#stage2,#stage3').on('click', '#restart', function(event){
		event.preventDefault();
		removeDataPlayer();
		window.location.replace('index-original.html');
	});
	/*--------------------------------------------------------------------*/
	$('#stage2').on('click', '#pause', function(event){
		event.preventDefault();
		pauseGame($(this));
	});
	
	$('#stage2').on('click', '#resume', function(event){
		event.preventDefault();
		resumeGame($(this));
	});
	/*--------------------------------------------------------------------*/
	function pauseGame(elm){
		clearInterval($sittp)
		$('#hanoi figure').hide();
		$('#screenpause').show();
		elm.text('RESUME');
		elm.attr('id', 'resume');
	};
	function resumeGame(elm){
		timePlayer();
		//$('#hanoi figure').show();
		$('#hanoi').html(localStorage.getItem('actgame'));
		$('#screenpause').hide();
		elm.text('PAUSE');
		elm.attr('id', 'pause');
		allowMove();
	};
	function showDataPlayer(){
		if($difficulty==3){$difficulply='3 Disks (Easy)'};
		if($difficulty==4){$difficulply='4 Disks (Medium)'};
		if($difficulty==5){$difficulply='5 Disks (Hard)'};

		$('#player').text($player);
		$('#dplayer').text($difficulply);
		$('#tplayer').text('0s');
		$('#npplayer').text('0');
		/*--------------------------------------------------------------*/
		localStorage.setItem('nplayer', $('#player').text());
		localStorage.setItem('dplayer', $('#dplayer').text());
		localStorage.setItem('tplayer', $('#tplayer').text());
		localStorage.setItem('npplayer', $('#npplayer').text());
		/*--------------------------------------------------------------*/
		timePlayer();
	};
	function removeDataPlayer(){
		localStorage.removeItem('nplayer');
		localStorage.removeItem('dplayer');
		localStorage.removeItem('tplayer');
		localStorage.removeItem('npplayer');
		localStorage.removeItem('actgame');
		localStorage.clear();
	};
	function timePlayer(){
		$sittp=setInterval(function(){
			localStorage.setItem('cont', $cont++);
			$('#tplayer').text(localStorage.getItem('cont')+'s');
			localStorage.setItem('tplayer',$('#tplayer').text())
		},1000);
	};

	/*--------------------------------------------------------------------*/
	function loadDisks(nd){
		for ($tower=1; $tower<=3; $tower++) {
			$content='';
			for ($disk=1; $disk<=nd; $disk++) {
				if ($tower==1) {
					$content+="<div id='box"+$disk+"' class='boxes'><span id='d"+$disk+"' class='disks'><em>"+$disk+"</em></span></div>";
					$('#tower'+$tower).html($content);
				}else{
					$content+="<div id='box"+$disk+"' class='boxes'></div>";
					$('#tower'+$tower).html($content);
				};
			};
		};
		if (nd==3) {
			$('div.boxes').css({top:'168px'});
		};
		if (nd==4) {
			$('div.boxes').css({top:'130px'});
		};
		if (nd==5) {
			$('div.boxes').css({top:'93px'});
		};
	};
	/*--------------------------------------------------------------------*/
	function allowMove(){
		iniDrag($('span.disks'));
		stopDrag($('span.disks'));
		$('.towers').find('span.disks:first').draggable('enable');
		allowDrop();
	};
	function iniDrag(elm){
		elm.draggable({
			revert: 'invalid',
			contaiment:'#stage2',
			cursor:'move'
		});
	}
	function allowDrop(){
		$('.towers').droppable({
			accept: '.disks',
			tolerance: 'pointer',
			drop: function(e,ui){
				//detect drag-disk ($elm1), first disk(elm2)
				$elm1=$(ui.draggable).attr('id');				
				$elm1=$elm1.substring(1,2);			
				$numdisks=$(this).find('span.disks').length;				
				if ($(this).find('span.disks').length>0){
					$elm2=$(this).find('span.disks').first().attr('id');					
					$elm2=$elm2.substring(1,2);					
				}else{
					$elm2=$difficulty+1;		
				}
				//if first disk > drag-disk
				if ($elm2>$elm1){
					$evaluaswitch=$(this).find('span.disks').length				
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
					} // close switch
					$(ui.draggable).css({left:'0px', top:'0px'});
				}else{
					$(ui.draggable).css({left:'0px', top:'0px'});
				}
				allowMove();
				countMoves();
				localStorage.setItem('mplayer',$('#mplayer').text());
				localStorage.setItem('actgame',$('#hanoi').html());
				if ($('tower3').find('span.disks').length==$difficulty){
					alert("HAS GANADO...")
					stopDrag();
					clearInterval($sittp)
					$('stage2').hide();
					$('stage3').show();
					saveDataPlayer();
				}
			}
		});
	}
	function stopDrag(elm){
		elm.draggable("disable");
	}
	function countMoves(){
		$countmoves++;
		localStorage.setItem('countm',$countmoves);
		$('#npplayer').text($countmoves);
	}
	function saveDataPlayer(){
		$.get('modelo/save.php',
		{
			np:localStorage.getItem('nplayer'),
			dp:localStorage.getItem('dplayer'),
			tp:localStorage.getItem('tplayer'),
			mp:localStorage.getItem('dplayer')},	
		function(data){
			removeDataPlayer();
			$('#stage3').show();
			//$('#ranking')

		});
	}
}); 