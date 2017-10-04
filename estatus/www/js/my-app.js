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
  $$('#btn').on('click', tomarfoto);
  $$('#btn1').on('click', tomarfoto1);
  }
  
  function tomarfoto(){
	  console.log("tomar foto!!");
	  navigator.camera.getPicture(onSuccess, onFail, options);  
  }
  var options ={
		  sourceType: 1,
		  quality: 50,
		  destinationType: 1,
		  allowEdit: false,
		  correctOrientation: true,
		  saveToPhotoAlbum: true
  }
  function onSuccess(imageURI){
	  $$('#foto').attr('src',imageURI);
  }
  function onFail(message){
		console.log('Error!:', message);
  }
  function tomarfoto1(){
	  console.log("tomar foto!!");
	  navigator.camera.getPicture(onSuccess, onFail, options1);  
  }
  var options1 ={
		  sourceType: 0,
		  quality: 50,
		  destinationType: 1,
		  allowEdit: false,
		  correctOrientation: true,
		  saveToPhotoAlbum: true
  }