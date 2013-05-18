// JavaScript Document
var base = "http://bip.pe/smart/free/moso/data/";
//var base = "../app/";
$(document).ready(function(){
	
	$('.page .contentMenu a.m').each(function() {			
			$(this).click(function (e) {
				//alert(8);
				e.preventDefault();
				$('.page .contentMenu a').removeClass("select");
				$(this).addClass("select");
				
				var div = $(this).attr("title");
				$(".contentPage").fadeOut("fast", function(){
					$("#" + div).fadeIn("fast");
				});				 
			});			
	});
	

		 
			getCanciones();
			getArtista();
			
			
		$("#txtbuscar").keyup(function () {
			//if (event.keyCode == '13') {
	
				searchString = $("#txtbuscar").val();
				console.log(searchString);
				$.each("#canciones .salas ul li", function (i,v) {
					console.log(i);
					/*if ($(this).html().toLowerCase().indexOf(searchString) == -1) {
						$('#' + this.id, "#canciones .salas ul table").hide()
					} else {
						$('#' + this.id, "#canciones .salas ul table").show()
					}*/
				});
			//}
		});
		
		});
		
		
function getCanciones() {
 $('#busy').show();	
	$.getJSON(base + "getAlbum.php", function (data) {
		$('#busy').hide();
		//console.log(data); 
		 $.each(data.wsRTConsultarAlbumResult , function(i,item){
			// console.log(i); 
			$.each(item , function(a,itemResult){
				//console.log(itemResult); 
				ArtistaImagen = itemResult.ArtistaImagen;				
				if (itemResult.ArtistaImagen.indexOf(".jpg") == -1 && itemResult.ArtistaImagen.indexOf(".png") == -1  && itemResult.ArtistaImagen.indexOf(".gif") == -1 )
					ArtistaImagen = "img/rtdefault.jpg";
					
				//$("#canciones .salas ul").append('<li id="'+itemResult.CodigoRBT+'" autor="'+itemResult.Autor+'" genero="'+itemResult.Genero+'"><div class="content-sala"><p>'+itemResult.Tema+'</p><span>'+itemResult.Artista+'</span></div></li>'); 
				
				
				$("#canciones .salas ul").append('<li id="'+itemResult.CodigoRBT+'" autor="'+itemResult.Autor+'" genero="'+itemResult.Genero+'"><div class="content-sala"><table border="0"><tr><td width="15%"><img src="'+ArtistaImagen+'" /></td><td  width="55%" style=" padding-left:10px;"><p>'+itemResult.Tema+'</p><span>'+itemResult.Artista+' caciones</span></td><td width="30%"> <span class="precio"> S/. '+itemResult.Precio+'</span></td></table></div></li>'); 
				
			});
			
			getDescarga();
			 
		  });
	  });
			
 
}

function getDescarga(){
	alert(vNumUser);
				alert(vActivacion);
				
	$("#canciones ul li").each(function() {
				
				
                $(this).click(function(evento) {
                    evento.preventDefault();
					alert($(this).attr("id"));
               		if(vActivacion==1){
						codigo = $(this).attr("id");
						alert("http://bip.pe/pe/mo/wap/ft/validacionDescargaSmart.php?nue=" + vNumUser + "&c=" + codigo);
						$.getJSON("http://bip.pe/pe/mo/wap/ft/validacionDescargaSmart.php?nue=" + vNumUser + "&c=" + codigo, function (data) {
				 			alert(data);					 
				  		});			   
					}
					else{
						alert("Activacion: Configurar tu cuenta en la opcion de Mi Perfil");
					}
			  
                });
            });
	
	}
		
function getArtista() {
 $('#busy').show();	
	$.getJSON(base + "getAlbumCatalogo.php", function (data) {
		$('#busy').hide();
		//console.log(data); 
		 $.each(data.wsRTConsultarAlbumCatalogoResult , function(i,item){
			// console.log(i); 
			$.each(item , function(a,itemResult){
				//console.log(itemResult);
				ArtistaImagen = itemResult.ArtistaImagen;				
				if (itemResult.ArtistaImagen.indexOf(".jpg") == -1 && itemResult.ArtistaImagen.indexOf(".png") == -1  && itemResult.ArtistaImagen.indexOf(".gif") == -1 )
					ArtistaImagen = "img/rtdefault.jpg";
			
				 
				$("#artistas .salas ul").append('<li id="'+itemResult.CodigoRBT+'" autor="'+itemResult.Autor+'" genero="'+itemResult.Genero+'"><div class="content-sala"><table border="0"><tr><td width="20%"><img src="'+ArtistaImagen+'" /></td><td width="80%" style=" padding-left:10px;"><p>'+itemResult.Artista+'</p><span>'+itemResult.UsaCredito + ' ' + (itemResult.UsaCredito>1? "canciones" : "cancion")  +  '</span></td></table></div></li>'); 
				
			});
			 
		  });
	  });
			
 
}