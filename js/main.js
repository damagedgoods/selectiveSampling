var w = 800;
var h = 1000;
var img = 1;

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

    $("#container").click(function() {
        nextImg();
    }); 

    $(".control_link").click(function() {$("#control_panel").toggle()});

    initTiles();

}

function initTiles() {

    //console.log("Init tiles");
    $("#container").empty();
    var bigTile = $("#big_tile").val();
    var smallTile = $("#small_tile").val();
    var src = "./data/p"+$("#image").val()+".jpg";
    var numCols = w / bigTile;
    var numRows = h / bigTile;

    for (var i=0; i<numRows; i++) {
        for (var j=0; j<numCols; j++) {            
            var div = $('<div></div>').addClass('smallDiv').attr('id',i+'_'+j);
            div.css("position", "absolute");
            div.css("left", j*smallTile);
            div.css("top", i*smallTile);
            div.css("background", "url("+src+") "+(-j*bigTile)+"px "+(-i*bigTile)+"px");
            div.width(smallTile+"px");
            div.height(smallTile+"px");
            $("#container").append(div);
        }
    }

    $("#container").width(numCols*smallTile);


}

function nextImg() {
    img = (img++ % 4 == 0)?1:img;
    $("#image").val(img);
    initTiles();
}
