// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});


$$(document).on('deviceready', initapp);

function initapp(){
  console.log("dispositivo listo!!!");
  document.addEventListener("backbutton", onBackKeyDown, false);
  $$("#rev").on('click',revisa);
  $$("#logoc").on('click',playAudio);
  }
  
 function onBackKeyDown(){
			navigator.notification.confirm("Desea salir de la APP?", cerrarAPP,"ADVERTENCIA!", "Si,No");
 } 
 function cerrarAPP(e){
	 if(e==1){
	  navigator.app.exitApp();
	 }else{
		 return;
	 }
	 
	 
 }
function playAudio() {
    // Play the audio file at url
    var my_media = new Media('http://vzier.u-host.cl/macaco.mp3',
        // success callback
        function () {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function (err) {
            console.log("playAudio():Audio Error: " + err);
        }
    );
    // Play audio
    my_media.play();
}
function revisa(){
var u= $("#url").val();
var p= $("#puerto").val();


if(p==""){
	p=80;
}
var dataString="u="+u+"&p="+p;
if($.trim(u).length>0 & $.trim(p).length>0){
$.ajax({
type: "POST",
url: "https://vzier.000webhostapp.com/we.php",
data: dataString,
crossDomain: true,
cache: false,
success: function(data){
	myApp.hidePreloader();
	if(data=="online"){
		myApp.hidePreloader();
		console.log("ONNNNN !!");
		navigator.vibrate(150);
		myApp.alert("[ "+u + ":"+p+" ] Se encuentra ONLINE!", "Enhorabuena");
	}
	else if(data="offline"){
		myApp.hidePreloader();
		console.log("offfofofof !!");
		navigator.vibrate([100, 50, 100]);
		myApp.alert("[ "+u+":"+p+" ] No ha respondido.", "Error!");
	
	}
}

});
}else{
	myApp.hidePreloader();
	navigator.vibrate([100, 50, 100]);
	myApp.alert("Debes Ingresar una URL/IP y un puerto.", "ERROR");
	
};
};
