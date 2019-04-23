/*

Remarques générales : 

1- Les coordonées fournies par google maps sont plus précises

2- Il y'a une légère différence entre les coordonnées de la station et du marqueur pour le même point.

les lng des stations ont 6 chiffres après la virgule alors que la map c'est 15 !

pour les lat , pareil 6 chiffres après la virgule

3- Par conséquent, == et === ne fonctionneront jamais

4- Arrondir pourrait faire l'affaire ?

Oui toFixed(6) :) !

Never give up !

Comment distinguer l'utilisateur qui vient pour la première fois de celui dont la

réservation a expiré



*/

var map;

function initMap()

    {
        var lyon = {lat: 45.75, lng: 4.85};
            
        map = new google.maps.Map(document.getElementById("velov_map"),{
        
            center: lyon,
        
            zoom: 15
                
        });

        
    }


/*

if you want to remove trailing zeros and also remove the decimal point if the value is a whole number, you could do this:

*/


function formatDecimal(number,precision)
{
    return number.toFixed(precision).replace(/[\.]?0+$/, '');
}


// Time converter

function timeConverter (UNIX_timestamp)
{
    var a = new Date(UNIX_timestamp);

    var months = ['Jan','Fev','Mar','Avr','Mai','Juin','Juil','Aut','Sep','Oct','Nov','Dec'];

    var year = a.getFullYear();

    var month = months[a.getMonth()];

    var date = a.getDate();

    var hour = a.getHours();

    var min = a.getMinutes();

    var sec = a.getSeconds();

    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;

    return time;
}

// Status converter

function statusConverter (status)
{
    if(status === "OPEN")
    {
        status = "OUVERTE";
    }
    else
    {
        status = "FERMÉE";
    }

    return status;
}

// Banking converter

function bankingConverter (banking)
{
    if(banking === true)
    {
        banking = "OUI";
    }
    else
    {
        banking = "NON";
    }

    return banking;
}

// Bonus converter

function bonusConverter (bonus)
{
    if(bonus === true)
    {
        bonus = "OUI";
    }
    else
    {
        bonus = "NON";
    }

    return bonus;
}



// Disparition bouton réserver

function disparitionBoutonRéservation ()
{
    document.getElementById("velov_bouton_reservation").style.display = "none";


}


// Détection du sessionStorage

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}


//Compte à rebours

function compteARebours()
{
    if(sessionStorage.getItem('date_expiration'))
    {
        var dateActuelle = new Date();

        var dateActuelleMilli = dateActuelle.getTime();

        var expi = Number(sessionStorage.getItem('date_expiration'));

        var to_convert = Math.floor((expi - dateActuelleMilli) / 1000);

        if(to_convert <0)
        {
            alert("Réservation expirée");

            $("#velov_reservations").css("display", 'none');

            $("#velov_infos").css("display", 'none');

            sessionStorage.removeItem('date_expiration');

            sessionStorage.removeItem('nom_station');
        }
        else
        {
            var min = Math.floor(to_convert / 60);

            var sec = to_convert % 60 ;

            if(sec < 10)
            {
                sec = '0'+sec;
            }

            if(min < 10 )
            {
                min = '0'+min;
            }

            var res = min +" MIN "+ sec+" S";

            var text = " 1 VÉLO RÉSERVÉ À LA STATION "+sessionStorage.getItem('nom_station')+" POUR "+res;

            document.getElementById("velov_infos").textContent = text;

            $("#velov_reservations").css("display", 'flex');

            $("#velov_infos").css("display", 'flex');
        }


    }

    setTimeout(compteARebours,1000); 
}




if(storageAvailable('sessionStorage'))
{
    compteARebours();
}
else
{
    alert("sessionStorage indisponible");  
}





// Récupération des stations de Lyon et affichage à l'aide marqueurs

ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=b4529f2225e9362b0192a7a7ea95e7c2b51c4588", function (reponse){
    
    
    // Transforme la réponse en un tableau
    
    var stations = JSON.parse(reponse); 


   
    // Set markers and add click events
    
    for (var i=0; i<stations.length;i++)

        {
            var latLng = new google.maps.LatLng(stations[i].position.lat,stations[i].position.lng);
            
            var marker = new google.maps.Marker({
                
                position: latLng,
                
                map: map

                //icon:
                
            });




            // Ajout d'un évènement lors d'un clic

            marker.addListener("click",function() {

                //console.log(this.getPosition().lat()+"  "+this.getPosition().lng());

                var lat = Number(this.getPosition().lat().toFixed(6));

                var lng = Number(this.getPosition().lng().toFixed(6));


                var indice=0; // Initialisation


                for(var j=0;j<stations.length;j++)

                {
                 

                    if(stations[j].position.lat === lat && stations[j].position.lng === lng)
                    {

                        indice =j;

                        break; // Je sors du if et du for dès que j'ai trouvé la station

                    }


                }

                
                //console.log("indice :"+indice);

                console.log("N° :"+stations[indice].number);

                console.log("Nom :"+stations[indice].name);

                console.log("Adresse :"+stations[indice].address);

                console.log("Statut :"+statusConverter(stations[indice].status));

                console.log("Nombre de places au total :"+stations[indice].bike_stands);

                console.log("Vélos disponibles :"+stations[indice].available_bikes);

                console.log("Places disponibles :"+stations[indice].available_bike_stands);

                console.log("Terminal de paiement :"+bankingConverter(stations[indice].banking));

                console.log("Station bonus :"+bonusConverter(stations[indice].bonus));

                console.log("Mis à jour :"+timeConverter(stations[indice].last_update));

                // Affichages des données de la station


                // J'affiche le bouton réserver s'il y a des vélos disponibles


                if(stations[indice].available_bikes <= 0)
                {
                    document.getElementById("velov_bouton_reservation").style.display = "none";
                }
                else
                {
                    /*
                    Si le bouton réserver a déjà été cliqué, il ne sera pas là quand

                    l'utilisateur aura cliqué sur un marqueur. Or, il faut qu'il soit là

                    peu importe s'il y'a une réservation ou non. Dès que l'utilisateur clique sur un marqueur,

                    il doit apparaître.

                    */

                    if(getComputedStyle(document.getElementById("velov_bouton_reservation")).display === "none")
                    {
                         $("#velov_bouton_reservation").css("display", 'flex');
                    }


                }
               


                $("#velov_etats").show(1000);

                $("#velov_etats").css("display", 'flex');

                $("#velov_etats").css("flex-direction", 'column');

                $("#velov_etats").css("justify-content", 'space-around');

                document.getElementById("velov_numero").textContent = "N° : "+stations[indice].number;

                document.getElementById("velov_nom").textContent = "Nom : "+stations[indice].name;

                document.getElementById("velov_adresse").textContent = "Adresse : "+stations[indice].address;

                document.getElementById("velov_statut").textContent = "Statut : "+statusConverter(stations[indice].status);

                document.getElementById("velov_places_total").textContent = "Nombre de places au total : "+stations[indice].bike_stands;

                document.getElementById("velov_velos_dispos").textContent = "Vélos disponibles : "+stations[indice].available_bikes;

                document.getElementById("velov_places_dispos").textContent = "Places disponibles : "+stations[indice].available_bike_stands;

                document.getElementById("velov_paiement").textContent = "Terminal de paiement : "+bankingConverter(stations[indice].banking);

                document.getElementById("velov_bonus").textContent = "Station bonus : "+bonusConverter(stations[indice].bonus);

                document.getElementById("velov_misajour").textContent = "Mis à jour : "+timeConverter(stations[indice].last_update);



                $("#velov_bouton_reservation").click(function(){



                    // Le bouton disparaît 5s après l'avoir cliqué

                    setTimeout(disparitionBoutonRéservation,5000);


                    // Quand on clique sur réserver je vide le canvas
                    
                    ctxCanvasLyon.clearRect(0, 0, canvasLyon.width, canvasLyon.height);
                                                              
                    ctxCanvasLyon.fillRect(0, 0, canvasLyon.width, canvasLyon.height);



                    $("#velov_reservations").css("display", 'flex');

                    $("#velov_signature").css("display", 'flex');

                    $("#velov_signature").css("justify-content", 'flex-end');

                    $("#velov_validation").click(function(){


                        if(getComputedStyle(document.getElementById("velov_infos")).display === "none")
                        {
                            $("#velov_infos").css("display", 'flex');

                            
                        }

                       

                        $("#velov_signature").hide(3000);


                        // Remplissage ou modif des données de réservation

                        // Utilisation du web storage

                        var dateReservation = new Date();

                        var dateReservationMilli = dateReservation.getTime();

                        var dateReservationMilliExpiration = dateReservationMilli + (20*60*1000); //20 min

                        sessionStorage.setItem('nom_station',stations[indice].name);

                        sessionStorage.setItem('date_expiration',dateReservationMilliExpiration);

                        compteARebours();


                    });

                });


            });

        
        }
         
    
});

