var w = 800;
var h = 1000;

function init() {

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

function update() {
    $("#container").empty();
    init();
}