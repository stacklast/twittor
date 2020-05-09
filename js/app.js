var url = window.location.href;
var swlocation = '/twittor/sw.js';



if(navigator.serviceWorker){
    if(url.includes('localhost')){
        swlocation = '/sw.js';
    }

    navigator.serviceWorker.register(swlocation);
}


// Referencias de jQuery

var titulo      = $('#titulo');
var nuevoBtn    = $('#nuevo-btn');
var salirBtn    = $('#salir-btn');
var cancelarBtn = $('#cancel-btn');
var postBtn     = $('#post-btn');
var avatarSel   = $('#seleccion');
var timeline    = $('#timeline');

var modal       = $('#modal');
var modalAvatar = $('#modal-avatar');
var avatarBtns  = $('.seleccion-avatar');
var txtMensaje  = $('#txtMensaje');

// El usuario, contiene el ID del héroe seleccionado
var usuario;




// ===== Codigo de la aplicación

function crearMensajeHTML(mensaje, personaje) {

    var content =`
    <li class="animated fadeIn fast">
        <div class="avatar">
            <img src="img/avatars/${ personaje }.jpg">
        </div>
        <div class="bubble-container">
            <div class="bubble">
                <h3>@${ personaje }</h3>
                <br/>
                ${ mensaje }
            </div>
            
            <div class="arrow"></div>
        </div>
    </li>
    `;

    timeline.prepend(content);
    cancelarBtn.click();

}



// Globals
function logIn( ingreso ) {

    if ( ingreso ) {
        nuevoBtn.removeClass('oculto');
        salirBtn.removeClass('oculto');
        timeline.removeClass('oculto');
        avatarSel.addClass('oculto');
        modalAvatar.attr('src', 'img/avatars/' + usuario + '.jpg');
    } else {
        nuevoBtn.addClass('oculto');
        salirBtn.addClass('oculto');
        timeline.addClass('oculto');
        avatarSel.removeClass('oculto');

        titulo.text('Seleccione Personaje');
    
    }

}


// Seleccion de personaje
avatarBtns.on('click', function() {

    usuario = $(this).data('user');

    titulo.text('@' + usuario);

    logIn(true);

});

// Boton de salir
salirBtn.on('click', function() {

    logIn(false);

});

// Boton de nuevo mensaje
nuevoBtn.on('click', function() {

    modal.removeClass('oculto');
    modal.animate({ 
        marginTop: '-=1000px',
        opacity: 1
    }, 200 );

});

// Boton de cancelar mensaje
cancelarBtn.on('click', function() {
   modal.animate({ 
       marginTop: '+=1000px',
       opacity: 0
    }, 200, function() {
        modal.addClass('oculto');
        txtMensaje.val('');
    });
});

// Boton de enviar mensaje
postBtn.on('click', function() {

    var mensaje = txtMensaje.val();
    if ( mensaje.length === 0 ) {
        cancelarBtn.click();
        return;
    }

    crearMensajeHTML( mensaje, usuario );

});

function enviarNotificacion(){

    const notificationOpt = {
        body : 'este es el cuerpo de la notificacion',
        icon: 'img/icons/icon-72x72.png'
    };

    const n = new Notification('Hola Mundo', notificationOpt);

    n.onclick = ()=>{
        console.log('click');
    };


}

function notificarme(){

    if(!window.Notification){
        console.log('Este navegador no soporta notificaciones');
        return;
    }

    if(Notification.permission === 'granted'){
        enviarNotificacion();
    }
    
    else if (Notification.permission == 'denied' || Notification.permission == 'default'){
        Notification.requestPermission( function(permission){
            
            console.log(permission);
            
            if(permission == 'granted'){
                enviarNotificacion();
            }
        });
    }
}

notificarme();