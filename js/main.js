var bigTile = 50;
var smallTile = 20;
var src = "./data/p1.jpg";

var w = 800;
var h = 1000;

function init() {
    console.log("Init");

    var numCols = w / bigTile;
    var numRows = h / bigTile;

    for (var i=0; i<numRows; i++) {
        for (var j=0; j<numCols; j++) {            
            var div = $('<div></div>').addClass('smallDiv').attr('id',i+'_'+j);
            div.css("position", "absolute");
            div.css("left", j*smallTile);
            div.css("top", i*smallTile);
            div.css("background", "url("+src+") "+(-j*bigTile)+"px "+(-i*bigTile)+"px");
            //div.css("background-position", j*bigTile+" "+i*bigTile);
            div.width(smallTile+"px");
            div.height(smallTile+"px");
            $("#container").append(div);
        }
    }

    $("#container").width(numCols*smallTile);

}