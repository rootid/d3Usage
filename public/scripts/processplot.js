
//enter creates the placeholder with __data__ object
var h = 400
var w = 500
var timeOut = 1000

var initPlot = function () {
    var dataset = [];
    for (var i=1;i<13;i++) {
        dataset.push( 5 * Math.random() * i);
    }
    //create the SVG element
    var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height",h);
    
    svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("y",200) 
    .attr("x", function(d,i) {
        return (i * 50) + 25;})
    .attr("height",function (d) {
        return d; }) 
    .attr("width",20 )
    .attr("fill", "teal")
    ;
    
};

var updateData = function (dataset) {
    console.log("updating")
    d3.selectAll("rect")
    .data(dataset)
    .transition()
    .attr("x", function(d, i) {
    return (i * 50) + 25;
    })
    .attr("y", h/2)
    .attr("height", function(d) {
        return d.usage /2 ;
    });
};

initPlot ();

var updateWrapper = function () {
    d3.xhr("memplot", "application/json"
            ,function(error, data)
            {
                data_ = JSON.parse(data.response);
                updateData (data_);
            });
};

setInterval(updateWrapper,timeOut);

