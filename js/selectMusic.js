function start(){
	for(var m in musics){
		json("../Music/" + musics[m].dir + "/tab.json" ,
			function(data){
				document.getElementById("musics").innerHTML +=
				"<a class='music' href='play.html#"+musics[m].dir+"'>"+
				"	<div class='front' style=\"background:url('../Music/"+musics[m].dir+"/cover.gif');background-size: 250px 250px;\"></div>"+
				"	<div class='back'><p class='title'>"+data.Properties.Title+"</p><p class='artist'>"+data.Properties.Artist+"</p></div>"+
				"</a>";
			});
	}
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