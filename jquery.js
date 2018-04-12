var encontrada = false;
var cargar = 1;



function buscarPeliculas(pelicula) {
    var div = document.createElement("div");
    var error = document.createTextNode("ERROR: Pelicula No Encontrada");
    $('#buscar').click(function () {
        cargar = 1;
        $.ajax({
            url: "http://www.omdbapi.com/?s=" + $("#introducirPeli").val() + "&type=movie&apikey=eb823df7",
            success: function (resultados) {
                if (resultados.Response === 'True') {
                    encontrada = true;
                    encontrarPelicula(resultados);

                } 
                else {
                    div.appendChild(error);
                    document.body.appendChild(div);
                    console.log("no se ha encontrado la pelicula");
                }
            },
            error: function (result) {
                div.appendChild(error);
                document.body.appendChild(div);
                console.log("no se ha encontrado la pelicula");
            }

        });
    });
};

function mostrarDetalle(id) {
    $.ajax({
        url: "http://www.omdbapi.com/?i=" + id + "&plot=full&apikey=eb823df7",
        success: function (info) {
            for (var i = 0; i < info.Ratings.length; i++) {
                console.log(info.Ratings[i]);
            }
            $("#introducirPeli").val(null);
            $("#peliculas").empty();
            
            $('#peliculas').append('<div class="row">');
            $('#peliculas').append('<div class="col-lg-6 col-sm-6 col-md-6"><img class="img-fluid" src="'+ info.Poster +'"></div>');
            $('#peliculas').append('<div class="col-lg-6 col-md-6 col-sm-6" id="accordion" style="float:right">\n' +
                '  <div class="card">\n' +
                '    <div class="card-header" id="heading">\n' +
                '      <h5 class="mb-0">\n' +
                '        <button class="btn btn-link" data-toggle="collapse" data-target="#collapse" aria-expanded="true" aria-controls="collapse">\n' +
                '          Descripción: \n' +
                '        </button>\n' +
                '      </h5>\n' +
                '    </div>\n' +
                '\n' +
                '    <div id="collapse" class="collapse show" aria-labelledby="heading" data-parent="#accordion">\n' +
                '      <div class="card-body">\n' +
                '        ' + info.Plot + '\n' +
                '      </div>\n' +
                '    </div>\n' +
                '  </div>\n' +

                '  <div class="card">\n' +
                '    <div class="card-header" id="info">\n' +
                '      <h5 class="mb-0">\n' +
                '        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#cInfo" aria-expanded="true" aria-controls="cInfo">\n' +
                '          Información de la película: \n' +
                '        </button>\n' +
                '      </h5>\n' +
                '    </div>\n' +
                '\n' +
                '    <div id="cInfo" class="collapse" data-toggle="collapse" aria-labelledby="info" data-parent="#accordion">\n' +
                '      <div class="card-body">\n' +
                '        <p>Año: ' + info.Year + '</p>\n' +
                '<p>Duración: ' + info.Runtime + '</p>\n' +
                '<p>Director: ' + info.Director + '</p>\n' +
                '<p>Género: ' + info.Genre + '</p>\n' +
                '<p>Actores : ' + info.Actors + '</p>\n' +
                '<p>Fecha: ' + info.Released + '</p>\n' +
                '<p>Idioma: ' + info.Language + '</p>\n' +
                '      </div>\n' +
                '    </div>\n' +
                '  </div>\n' +

                '  <div class="card">\n' +
                '    <div class="card-header" id="detalles">\n' +
                '      <h5 class="mb-0">\n' +
                '        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#detalles" aria-expanded="false" aria-controls="detalles">\n' +
                '          Más Detalles\n' +
                '        </button>\n' +
                '      </h5>\n' +
                '    </div>\n' +
                '    <div id="detalles" class="collapse" aria-labelledby="detalles" data-parent="#accordion">\n' +
                '      <div class="card-body">');
            for (var i = 0; i < info.Ratings.length; i++) {
                $('#detalles').append('<p>Fuente: ' + info.Ratings[i].Source + '</p><p>Valoración: ' + info.Ratings[i].Value + '</p><hr>\n')
            }
            $('#peliculas').append('</div>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '</div>');
            $('#peliculas').append('</div>');
        },
        error: function (noInfo) {
            console.log('Error en los detalles', info);
        }
    });
}
    
function noImagen(pelicula) {
    pelicula.src = "https://vignette.wikia.nocookie.net/monsterhunterespanol/images/a/aa/Imagen-no-disponible-282x300.png/revision/latest?cb=20140827124248&path-prefix=es"
}

function encontrarPelicula(pelicula) {
    if (encontrada === true) {
        $("#peliculas").append('<a style="text-align: center">Resultados para:<p> <h4 style="display:inline-block;">' + $("#introducirPeli").val() + '</h4></a><hr>');
    }
    encontrada = false;
    for (var i = 0; i < pelicula['Search'].length; i++) {
        $("#peliculas").append('<div class="card col-lg-3 col-md-4 col-sm-6 col-xs-12 col-12" style="height: 500px; display: inline-flex;">\n' +
            '  <img class="card-img-top" style="height: 300px; width: 100%;" src="' + pelicula['Search'][i].Poster + '" onerror="noImagen(pelicula.target)">\n' +
            '  <div class="card-body">\n' +
            '    <a class="card-title" href="#" onclick="mostrarDetalle(\'' + pelicula['Search'][i].imdbID + '\')">' + pelicula['Search'][i].Title + '</a>\n' +
            '    <p class="card-text">Año: ' + pelicula['Search'][i].Year + '</p>\n' +
            '    <p class="btn btn-primary col-6 offset-3" style="color: white" onclick="mostrarDetalle(\'' + pelicula['Search'][i].imdbID + '\')">Ver detalle</p>\n' +
            '  </div>\n' +
            '</div>')
    }


$(window).scroll(function () {
    var gifCargando = $('<img src="./imagenes/cargando.gif">');
    var peticionScroll = true
        if ($(document).height() - $(window).height() <= ($(window).scrollTop() + 80) && peticionScroll === true && $("#introducirPeli").val() != '') {
            cargar++;
            peticionScroll = false;
            gifCargando.css('display', 'block');
            $.ajax({
                url: "http://www.omdbapi.com/?s=" + $("#introducirPeli").val() + "&type=movie&page=" + cargar + "&apikey=eb823df7",
                success: function (nueva) {
                    gifCargando.css('display', 'none');
                    encontrarPelicula(nueva);
                    peticionScroll = true;
                }
            });
        }
    });
}


$(document).ready(function () {
    buscarPeliculas();
});