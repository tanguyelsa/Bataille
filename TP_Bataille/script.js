let deckID;
let carteTiree_J1;
let carteTiree_J2;
let tableauValeur =["2","3","4","5","6","7","8","9","10","JACK","QUEEN","KING","ACE"];
let pointJ1 = 0;
let pointJ2 = 0;

jQuery(document).ready(//équivalent du main, ne s'execute que lorsque le document est chargé
    function ($) {
        $("#recommencer").hide()
    }


)

function actionBouton(){
    if($("#bouton").text()=="Que le jeu commence ..."){
        melanger();
        $("#bouton").text("Combat")
    }else{
        tirerCarte();
    }
}

function melanger(){
    $.ajax(
        {
            url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
            method: 'GET'
        })
        .done(

            (donnees) => {
                deckID = donnees.deck_id;
            }
        )
}

function tirerCarte(){

    let url = "https://deckofcardsapi.com/api/deck/"+deckID+"/draw/?count=2";
    $.ajax(
        {
            url: url,
            method: 'GET'
        })
        .done(

            (donnees) => {

                carteTiree_J1 = donnees.cards[0].value;
                carteTiree_J2 = donnees.cards[1].value;

                if(tableauValeur.findIndex((element) => element == carteTiree_J1)>tableauValeur.findIndex((element) => element == carteTiree_J2)){
                    pointJ1 ++;
                }else if(tableauValeur.findIndex((element) => element == carteTiree_J1)<tableauValeur.findIndex((element) => element == carteTiree_J2)){
                    pointJ2 ++;
                }

                $("#pts_J1").text(pointJ1);
                $("#pts_J2").text(pointJ2);

                $("#carte1").attr('src',donnees.cards[0].image);
                $("#carte2").attr('src',donnees.cards[1].image);

                let cartesRestantes = donnees.remaining;
                $("#carteRestantes").text("Cartes restantes : "+cartesRestantes)

                if(cartesRestantes==0){

                    if (pointJ1>pointJ2) {
                        $("#gagnant").text("Joueur 1 gagne");
                    }
                    else if (pointJ1<pointJ2) {
                        $("#gagnant").text("Joueur 2 gagne");
                    }else {
                        $("#gagnant").text("Ex eaquo");
                    }
                    $("#recommencer").show();

                }

            }
        )
}

function relancer(){
    location.reload();
}