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
  $$("#reloadn").on('click',getNoticias);
  showCon();
  firstLaunch();  
  getNoticias();
  }
 function getNoticias(){
	 	$$.ajax({
			url: 'http://vzier.u-host.cl/mensajes.php',
			method: 'GET',
			dataType: 'JSON',
			success: function(data){
				var det =JSON.parse(data);
				var cont=0;
				while(det[cont]!=null){
				var html_text = "";
				html_text+='<div class="card demo-card-header-pic">';
				html_text+='<div style="background-image:url('+det[cont].imagen+')" valign="bottom" class="card-header color-white no-border"><b><p style="text-shadow: -2px -2px 1px #000, 2px 2px 1px #000, -2px 2px 1px #000, 2px -2px 1px #000; font-family: impact;font-size: 25px;"> '+det[cont].titulo+' </p></b></div>';
				html_text+='<div class="card-content">';
				html_text+='<div class="card-content-inner">';
				html_text+='<p class="color-gray">'+det[cont].fecha+'</p>';
				html_text+='<p>'+det[cont].cuerpo+'</p>';
				html_text+='</div>';
				html_text+='</div>';
				html_text+='<div class="card-footer">';
				html_text+='<a>Enviado por: '+det[cont].username+'</a>';
				html_text+='</div>';
				html_text+='</div> ';				
				
				$$('#latabla').append(html_text);
				cont++;
				}					
			},
			error: function(data){
				var html_text = "";
				html_text+='<h1>No se han podido cargar los mensajes.</h1>';
				html_text+='<p><a href="#" id="reloadn" class="button button-round active" >Cargar De nuevo.</a></p>';
				
			}
				
		});
	 
 }
function firstLaunch(){
	var applaunchCount = window.localStorage.getItem('launchCount');
	var adver= window.localStorage.getItem('adv');
	if(adver!=false){
		myApp.alert('Recuerda que debes estar conectado a internet para utilizar esta app!','',function () {
			 myApp.confirm('Ocultar este mensaje?', '', function () {
				window.localStorage.setItem('adv',false);
		})});
	}
	if(applaunchCount){
	   //This is a second time launch, and count = applaunchCount
	}else{
	myApp.alert('Esta aplicacion requiere de conexion a internet!', 'Aviso!');
	  window.localStorage.setItem('consultasBien',0);
	  window.localStorage.setItem('consultasMal',0);
	  window.localStorage.setItem('problemas',0);
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
	var cb=window.localStorage.getItem('consultasBien');
	var cm=window.localStorage.getItem('consultasMal');
	var ce=window.localStorage.getItem('problemas');
	var cb1=parseInt(cb); console.log(cb);
	var cm1=parseInt(cm);
	var ce1=parseInt(ce);
	
	var u= $("#url").val();
	var p= $("#puerto").val();
	if(p==0){p=80;}
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

				if(data=="online"){
					cb1++;
					window.localStorage.setItem('consultasBien',cb1);
					showCon();
					myApp.hidePreloader();
					navigator.vibrate(150);
					myApp.alert("[ "+u + ":"+p+" ] Se encuentra ONLINE!", "Enhorabuena");
				}
				else if(data=="offline"){
					cm1++;
					window.localStorage.setItem('consultasMal',cm1);
					showCon();
					myApp.hidePreloader();
					navigator.vibrate([100, 50, 100]);
					myApp.alert("[ "+u+":"+p+" ] No ha respondido.", "Error!");
				
				}
			},
			error: function(data) {
				ce1++;
                myApp.hidePreloader();
				window.localStorage.setItem('problemas',ce1);
				showCon();
					navigator.vibrate([100, 50, 100]);
					myApp.alert(" No ha respondido el servicio.", "Error!");
            }
			
		});
	}else{
		myApp.hidePreloader();
		navigator.vibrate([100, 50, 100]);
		myApp.alert("Debes Ingresar una URL/IP y un puerto.", "ERROR");
		
	};
}parseInt
function showCon(){
	$$('#Bieen').html(window.localStorage.getItem('consultasBien'));
	$$('#maal').html(window.localStorage.getItem('consultasMal'));
	$$('#erroor').html(window.localStorage.getItem('problemas'));
	
}
