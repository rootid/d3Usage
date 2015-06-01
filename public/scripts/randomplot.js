
//enter creates the placeholder with __data__ object
var h = 300
var w = 500
var timeOut = 1000

var initPlot = function () {
    var dataset = [];
    for (var i=1;i<10;i++) {
        dataset.push( 5 * Math.random() * i);
    }
    //create the SVG element
    var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height",h);
    
    svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d, i) {
    return (i * 50) + 25;
    })
    .attr("cy", h/2)
    .attr("r", function(d) {
    return d;
    })
    .attr("fill", "teal")
    .attr("stroke", "orange")
    .attr("stroke-width", function(d) {
        return d/2; }
    );
    
};

var updateData = function (dataset) {
    console.log("updating")
    d3.selectAll("circle")
    .data(dataset)
    .transition()
    .attr("cx", function(d, i) {
    return (i * 50) + 25;
    })
    .attr("cy", h/2)
    .attr("r", function(d) {
    return d;
    });
};

initPlot ();

var updateWrapper = function () {
    d3.xhr("plot", "application/json"
            ,function(error, data)
            {
                data_ = JSON.parse(data.response);
                updateData (data_);
            });
};

setInterval(updateWrapper,timeOut);

