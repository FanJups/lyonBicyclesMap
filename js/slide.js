

/*

L'idée c'est de changer dynamiquement le textcontent et l'url du background image du header

*/


//Liste Objet image texte

var listeImagesTextes = [

	{
		texte:"Bienvenue à Lyon :) !",

		url:"url(../images/diapo/lyon3.jpeg)"
	},

	{
		texte:"Tu veux découvrir la ville ?",

		url:"url(../images/diapo/lyon1.jpg)"
	},

	{
		texte:"Des vélos pour toi :) !",

		url:"url(../images/diapo/lyon2.jpg)"
	},

	{
		texte:"Ta station en un clic :) ! ",

		url:"url(../images/diapo/lyon4.jpg)"
	},

	{
		texte:"Ta station  à droite :) !",

		url:"url(../images/diapo/lyon5.jpg)"
	},

	{
		texte:"Allez , vas y :) !",

		url:"url(../images/diapo/lyon6.jpg)"
	},

	{
		texte:"Bonne promenade :) !",

		url:"url(../images/diapo/lyon7.jpg)"
	}

	

];

var x=0;

var timeOutCommand ="";

function changeDiapo()
{
	$("#velov_diapo").css("background-image", listeImagesTextes[x].url);

	document.getElementById("velov_diapo").textContent = listeImagesTextes[x].texte;

	

	$("#velov_diapo").css("display", 'flex');

	$("#arrow_left").css("display", 'block');

	$("#arrow_right").css("display", 'block');

	x++;

	if(x>=listeImagesTextes.length)
	{
		x=0;
	}

	timeOutCommand=setTimeout(changeDiapo,10000);
}

function recule()
{
	
	console.log("Je recule");

	console.log("Valeur actuelle de x :"+x);

	clearTimeout(timeOutCommand);

	x--;

	if(x<0)
	{
		x=listeImagesTextes.length-1;
	}

	console.log("Valeur nouvelle de x :"+x);

	$("#velov_diapo").css("background-image", listeImagesTextes[x].url);

	document.getElementById("velov_diapo").textContent = listeImagesTextes[x].texte;

	timeOutCommand=setTimeout(changeDiapo,10000);



}

function avance()
{
	console.log("J'avance");

	console.log("Valeur actuelle de x :"+x);


	clearTimeout(timeOutCommand);

	x++;

	if(x>=listeImagesTextes.length)
	{
		x=0;
	}

	console.log("Valeur nouvelle de x :"+x);

	//timeOutCommand=setTimeout(changeDiapo,10000);

	$("#velov_diapo").css("background-image", listeImagesTextes[x].url);

	document.getElementById("velov_diapo").textContent = listeImagesTextes[x].texte;

	timeOutCommand=setTimeout(changeDiapo,10000);


}

changeDiapo();


$("#arrow_left").click(function(){

	recule();

});

$("#arrow_right").click(function(){

	avance();
	
});


$('body').keydown(function(e){


	

	//Flèche gauche

	if(e.keyCode==37)
	{
		console.log("gauche");

		recule();

	}

	//Flèche droite

	if(e.keyCode==39)
	{
		console.log("droite"); 

		avance();
	}


});

	

