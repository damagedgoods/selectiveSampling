var w = 800;
var h = 1000;
var img = 1;

var dragging = false;
var dragX, dragY;
var offsetX = 0, offsetY = 0;
var currentImg = 0;

var imgList = [
    "./data/p1.jpg",
    "./data/p2.jpg",
    "./data/p3.jpg",
    "./data/p4.jpg",
    "./data/p5.jpg",
    "./data/p6.jpg",
    "./data/p7.jpg",
    "./data/p8.jpg",
    "./data/p9.jpg",
    "./data/p10.jpg",
    "http://revolverwarholgallery.com/wp-content/uploads/unspecified-4.jpg",
    "http://www.musee-orangerie.fr/sites/default/files/thumbnails/image/grant_wood_-_american_gothic_site.jpg"
]

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
    $('#imgInput').click(function(e) {e.stopPropagation()});
    $('html').click(function() {$('#imgInput').hide();});

    buildThumbnails();
    initTiles();
}

function initTiles() {
    
    var src = imgList[currentImg];
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
        $("#container").height(numRows*smallTile);
    }
}

function buildThumbnails() {

    // Tabla de imágenes
    var table = $("#imageTable");
    table.empty();
    var row = $('<tr></tr>');
    for (var i=0; i<imgList.length; i++) {
        var src = imgList[i];
        var img = $('<img onclick="javascript:selectImg('+i+')">');
        img.attr("src", src);
        var td = $('<td></td>');
        td.append(img);
        row.append(td);
        if ((i+1) % 3 == 0) {
            table.append(row);
            row = $('<tr></tr>');
        }
    }

    // Añado celda con el +
    var td = $('<td><a id="addImgLink" onclick="javascript:addImgPanel(event)">+</a></td>');
    row.append(td);    

    // Añado la que está pendiente
    table.append(row);
}

function selectImg(id) {
    currentImg = id;
    initTiles();
}

function nextImg() {
    currentImg++;
    if (currentImg == imgList.length) currentImg = 0;
    initTiles();
}

function addImgPanel(e) {
    $('#imgInput').show();
    $('#imgInputField').focus();
    event.stopPropagation();     
}

function addNewImg() {
    var newURL = $('#imgInputField').val();
    if (!validURL(newURL)) {
        // Pintar error de formato
        return;
    }    
    imgList.push(newURL);
    $('#imgInputField').val("");
    $('#imgInput').hide();
    buildThumbnails();
    initTiles();
}

function validURL(str) {
  var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if(!regex .test(str)) {
    return false;
  } else {
    return true;
  }
}