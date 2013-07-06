var cnotas = {0:'green',1:'red',2:'yellow',3:'blue',4:'orange'};
var clicked_n = {'green':false,'red':false,'yellow':false,'blue':false,'orange':false};
var pontos = {acertos:0,notas:0};
var notas = new Array();
var to_play = new Array('1','2','3','GO!');
var notas_c = {"green":new Array(),"red":new Array(),"yellow":new Array(),"blue":new Array(),"orange":new Array()};
var snd;
var music = "";
var act_next = false;
var music_time;
var temp = 0;
var intial;

function getColor(e){
	var carac = String.fromCharCode(e.which);
	if (carac == 'A'){
		return "green";
	}else if (carac == 'S'){
		return "red";
	}else if (carac == 'J'){
		return "yellow";
	}else if (carac == 'K'){
		return "blue";
	}else if (carac == 'L'){
		return "orange";
	}else{
		return null;
	}
}

function startGame(){
	var go_to_play = window.setInterval(function(){
		document.getElementById("mensage").style.display="block";
		document.getElementById("mensage").innerHTML=to_play[temp];
		temp++;
		if(temp-1 == to_play.length){
			clearInterval(go_to_play);
			window.setTimeout( end ,music_time + 3000);
			intial = new Date().getTime();
			snd.volume = 1;
			snd.play();
			for(var i=0; i < notas.length; i++){
				notas_c[notas[i].color][i] = notas[i].time;
				notas[i].goNota(intial);
			}
			document.getElementById("mensage").style.display="none";
		}

	},1000);
}

function start(m){
	music = m;
	document.getElementById("arm").id="arm-r";
	
	json("../Music/"+music+"/tab.json",
		function(d){
			snd = new Audio("../Music/"+music+"/"+d.Properties.MusicFileName);
			snd.autobuffer = true;
			snd.load();
			music_time = d.Properties.Length * 1000;
			document.getElementById("music").innerHTML = d.Properties.Title+" - "+d.Properties.Artist;
			notas = new Array(d.Data.Note.length);
			for(var i=0; i < d.Data.Note.length; i++){
				notas[i] = new Nota(i , d.Data.Note[i].attributes.time*1000 , cnotas[d.Data.Note[i].attributes.track] , d.Data.Note[i].attributes.track);
			}
			startGame();
		}
		);
}

function json(link,func){
	var xmlhttp;
	if (window.XMLHttpRequest){
		xmlhttp=new XMLHttpRequest();
	}else{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			func(JSON.parse(xmlhttp.responseText));
		}
	}
	xmlhttp.open("GET",link,true);
	xmlhttp.overrideMimeType('application/json');
	xmlhttp.send();
}

function end(){
	document.getElementById("mensage").style.display="block";
	document.getElementById("mensage").innerHTML="Congratulations!<br>You hit "+pontos.acertos+" of "+pontos.notas+" notes.<br><a href='selectMusic'>Go to Select Music</a>";
}

function updateScore(){
	document.getElementById("pointer").style.width = (pontos.acertos*100/pontos.notas)+"%";
	document.getElementById("pointer").innerHTML = ((pontos.acertos*100/pontos.notas).toFixed(2))+"%";
}
