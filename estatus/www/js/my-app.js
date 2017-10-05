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
  $$("#rev").on('click',revisa);
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
		myApp.alert("[ "+u + ":"+p+" ] Se encuentra ONLINE!", "Enhorabuena");
	}
	else if(data="offline"){
		myApp.hidePreloader();
		console.log("offfofofof !!");
		myApp.alert("[ "+u+":"+p+" ] No ha respondido.", "Error!");
	
	}
}

});
}else{
	myApp.hidePreloader();
	myApp.alert("Debes Ingresar una URL/IP y un puerto.", "ERROR");
	
};
};
