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
  showCon();
  firstLaunch();
	  $$.ajax({
		url: 'http://vzier.u-host.cl/mensajes.php',
		method: 'GET',
		dataType: 'html',
		success: function(data){
			$$('#latabla').html(data);
			}
		});  
}
function firstLaunch(){
	var applaunchCount = window.localStorage.getItem('launchCount');
	if(applaunchCount){
	  console.log(window.localStorage.getItem('consultas'));
	   //This is a second time launch, and count = applaunchCount
	}else{
	  window.localStorage.setItem('consultas',25);
	  window.localStorage.setItem('launchCount',1);
	  showCon();
	}	
	
	
}

  
 function onBackKeyDown(){
	myApp.closeModal();
	navigator.notification.confirm("Desea salir de la APP?", cerrarAPP,"ADVERTENCIA!", ["Si","No"]);
 } 
 function cerrarAPP(e){
	 if(e==1){
		navigator.app.exitApp();
	 }else{
		 return;
	 }
	 
	 
 }
function revisa(){
	var cx=window.localStorage.getItem('consultas');
	var u= $("#url").val();
	var p= $("#puerto").val();
	if(p==""){p=80;}
	if(u=="#dev"){window.localStorage.setItem('consultas',p);
		myApp.alert("Usaste un codigo.", "Dev");
		showCon();
	}else{
if(cx>0){

	myApp.showPreloader('Cargando');

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
				console.log(data);
				if(data=="online"){
					window.localStorage.setItem('consultas',cx -1);
					showCon();
					myApp.hidePreloader();
					navigator.vibrate(150);
					myApp.alert("[ "+u + ":"+p+" ] Se encuentra ONLINE!", "Enhorabuena");
				}
				else if(data=="offline"){
					myApp.hidePreloader();
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
}else{
		navigator.vibrate([100, 50, 100, 50, 100, 50, 100]);
		myApp.alert("No quedan consultas disponibles!", "ERROR");
	}
}
}
function showCon(){
	$$('#KEDAN').html(window.localStorage.getItem('consultas'));
}
