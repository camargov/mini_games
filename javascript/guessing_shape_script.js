const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select("#canvas")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    let myNumber = Math.random()*9
    console.log(myNumber)


    d3.select("#shape--circle").on("click", function() {
        
        if(myNumber <= 3) {

            d3.select("#result").html("Yep, it's a circle! You really know your shapes!");
    
        } else {
            d3.select(this).attr("class", "guessed");
            d3.select("#result").html("Sorry buddy, give it another go.");
        }
    });

    d3.select("#shape--square").on("click", function() {
        
        if(myNumber <= 6 && myNumber > 3) {

            d3.select("#result").html("Yep, it's a square! You really know your shapes!");
    
        } else {
            d3.select(this).attr("class", "guessed");
            d3.select("#result").html("Sorry buddy, give it another go.");
        }

    });

    d3.select("#shape--line").on("click", function() {
        
        if(myNumber > 6) {

            d3.select("#result").html("Yep, it's a line! You really know your shapes!");
    
        } else {
            d3.select(this).attr("class", "guessed");
            d3.select("#result").html("Sorry buddy, give it another go.");
        }

    });

    let theColor = "#DA627D"

    if(myNumber <= 3) {
        
        svg.append("circle")
        .attr("cx", width/2)
        .attr("cy", height/1.7)
        .attr("r", 150)
        .attr("opacity", 0.9)
        .attr("fill", theColor );

    } else if(myNumber <= 6) {
        
        svg.append("rect")
        .attr("x", width/2.5)
        .attr("y", height/2.5)
        .attr("width", 300)
        .attr("height", 300)
        .attr("opacity", 0.9)
        .attr("fill", theColor);

    } else if(myNumber > 6) {
                    
        svg.append("line")
        .attr("x1", width/3)
        .attr("y1", height/2)
        .attr("x2", width * 2/3)
        .attr("y2", height * 3/4)
        .attr("opacity", 0.9)
        .attr("stroke", theColor)
        .attr("stroke-width", 9);};
