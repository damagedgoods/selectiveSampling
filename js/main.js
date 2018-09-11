var w = 800;
var h = 1000;
var img = 1;

var dragging = false;
var dragX, dragY;
var offsetX = 0, offsetY = 0;
var currentImg = 1;

function init() {

    $("#small_tile_slider")
    .slider({
      min: 2,
      max: 20,
      range: "min",
      value: 10,
      slide: function( event, ui ) {
        $( "#small_tile" ).val( ui.value );
        initTiles();
      }
    });    

    $("#big_tile_slider")
    .slider({
      min: 2,
      max: 100,
      range: "min",
      value: 50,
      slide: function( event, ui ) {
        $( "#big_tile" ).val( ui.value );
        initTiles();
      }
    });

    $("#container").mousedown(function(e) {
        // Empieza el drag
        dragging = true;
        dragX = e.pageX;
        dragY = e.pageY;
        //nextImg();
    });

    $("#container").mouseover(function(e) {
        if (dragging) {
            offsetX = dragX - e.pageX;
            offsetY = dragY - e.pageY;
            initTiles();
        }
    });

    $("#container").mouseup(function(e) {
        // Suelto el drag
        if ((e.pageX == dragX)&&(e.pageY == dragY)) nextImg();
        dragging = false;

    });

    $(".control_link").click(function() {$("#control_panel").toggle()});

    // Tabla de imágenes
    var table = $("#imageTable");
    var row = $('<tr></tr>');
    for (var i=1; i <= 4; i++) {
        var src = "./data/p"+i+".jpg";
        var img = $('<img onclick="javascript:selectImg('+i+')">');
        img.attr("src", src);
        var td = $('<td></td>');
        td.append(img);
        row.append(td);
        if (i % 3 == 0) {
            table.append(row);
            row = $('<tr></tr>');
        }
    }
    // Añado la que está pendiente
    table.append(row);
    initTiles();
}

function initTiles() {
    
    var src = "./data/p"+currentImg+".jpg";
    var img = new Image();
    img.src = src;
    img.onload = function() {

        // Una vez carga la original, creo los tiles
        $("#container").empty();
        var bigTile = $("#big_tile").val();
        var smallTile = $("#small_tile").val();
        
        var numCols = this.width / bigTile;
        var numRows = this.height / bigTile;

        for (var i=0; i<numRows; i++) {
            for (var j=0; j<numCols; j++) {            
                var div = $('<div></div>').addClass('smallDiv').attr('id',i+'_'+j);
                div.css("position", "absolute");
                div.css("left", j*smallTile);
                div.css("top", i*smallTile);
                div.css("background", "url("+src+") "+(-j*bigTile+offsetX)+"px "+(-i*bigTile+offsetY)+"px");
                div.width(smallTile+"px");
                div.height(smallTile+"px");
                $("#container").append(div);
            }
        }
        $("#container").width(numCols*smallTile);
    }
}

function selectImg(id) {
    currentImg = id
    initTiles();
}

function nextImg() {
    img = (img++ % 4 == 0)?1:img;
    currentImg = img
    initTiles();
}
