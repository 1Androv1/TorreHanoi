function ocultar(){
	document.getElementById("stage2").style.display="none";
	document.getElementById("stage3").style.display="none";
}

function mostrar(){
	document.getElementById("stage2").style.display="block";
	document.getElementById("stage1").style.display="none";
}
function guardardatos(){
	var valor=document.getElementById("username");
	localStorage.setItem("nombre", valor.value);
	document.querySelector("#name1").innerHTML=localStorage.getItem("nombre");
	var data={
		select1: document.getElementById("opcion1").text,
		select2: document.getElementById("opcion2").text,
		select3: document.getElementById("opcion3").text
	}
	localStorage.setItem("level", JSON.stringify(data));
	var json=JSON.parse(localStorage.getItem("level"));
	console.log(json);
	var remo=document.getElementsByClassName("opcion");
	var cont=remo[0].id
	var hel=remo[1].id
	var usu=remo[2].id
	console.log(remo);
	console.log(cont, hel, usu);
	localStorage.clear();
}

function start(e){
	e.dataTransfer.effectAllowed = 'move'; 
	e.dataTransfer.setData("Text", e.target.id); 
	e.target.style.opacity='0.6';
};
function end(e){
	e.target.style.opacity=''; 
	e.dataTransfer.clearData("Data");
};
function enter(e){
	return true;
};
function over(e){
 	if ((e.target.className=='towers')||(e.target.id=='hanoi')) {
 		return false;
 	}else{
 		return true;
 	};
};
function drop(e){
	e.preventDefault(); 
	var elementoArrastrado=e.dataTransfer.getData("Text")
	e.target.appendChild(document.getElementById(elementoArrastrado)); 
};
/*function mostrardisk1(){
	var desaparecer=document.getElementById("opcion1")
	if (desaparecer.value==3) {
		document.getElementById("box4").style.display="none";
		document.getElementById("box5").style.display="none";
	}
}*/

