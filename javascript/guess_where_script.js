let selectedColor = ""; 
let playerName = "";
// read from in the input type text
d3.select("#name").on("input", function() {
    playerName = d3.select(this).property("value");
    d3.select("#nameDisplay").html("Hello "+ playerName);
});
// handle radio buttons
d3.selectAll("input[name = 'colorGroup']").on("input", function() {
  selectedColor = d3.select(this).property("value");
})
// listen on input of radio buttons
let showRect = false; 
let showCircle = false;
d3.select("#shapeOption1").on("input", function() {
    showRect = d3.select(this).property("checked");
});

d3.select("#shapeOption2").on("input", function() {
    showCircle = d3.select(this).property("checked");      
});

/* Generate random number from 0 to 8 */ 
let mysteryNumber = 0; 
/* Click to restart game */ 
d3.select("#generate").on("click", function() {        
  if (selectedColor == "" || (!showCircle && !showRect)) {
    d3.select("#result")
    .attr("class", "trying")
    .html("Please pick a color and select a shape first. ");          
  } else {
    mysteryNumber = Math.floor(Math.random() * 9); 
    generateCards();
    
    d3.select("#result")
    .attr("class", "trying")
    .html("Click on a card to guess where your favorite color is. ");
    }
});

const data = [
  { x: 0, y: 0 },
  { x: 110, y: 0 },
  { x: 220, y: 0 },

  { x: 0, y: 110 },
  { x: 110, y: 110 },
  { x: 220, y: 110 },

  { x: 0, y: 220 },
  { x: 110, y: 220 },
  { x: 220, y: 220 },
]; 

for (let i=0; i < 9; i++) {
  data[i].id = i; 
  data[i].color = "rgb(51, 51, 51)";  // initialize with black/invisible cards
}

/* CREATE THE SVG CANVAS */
const width = 350; 
const height = 350; 
const svg = d3.select("#card--container")
.append("svg")
.attr("width", width)
.attr("height", height);

d3.select("#result")
.attr("class", "trying")
.html("Click on a card to guess where your selected color is.");

function handleOnClickShape(shape) {
  let num = d3.select(shape).property("id");
    if(num == mysteryNumber) {
      d3.select(shape)
      .attr("fill", selectedColor)

      d3.select("#result").attr("class", "win").html("Congrautations! "+playerName+" you found it. Click Generate new hidden card to restart the game."); 
    } else {
      d3.select(shape).attr("fill", "white");
      d3.select("#result").attr("class", "trying").html("Sorry, try again."); 
    }   
}
/* PERFORM THE DATA JOIN */
function generateCards() {
  d3.selectAll("circle").remove();
  d3.selectAll("rect").remove();

  if (showRect) {
      svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect") 
        .attr("id", function(d) {return d.id})
        .attr("x", function(d) {return d.x + 2})
        .attr("y", function(d) {return d.y + 2})
        .attr("fill", "white" )
        .attr("width", 100)
        .attr("height", 100)
        .attr("cursor", "pointer"); 

        d3.selectAll("rect").attr("fill", "lightgrey");

        d3.selectAll("rect").on("click", function() {
          handleOnClickShape(this);
        }); 
    }

    if (showCircle) {
        svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle") 
          .attr("id", function(d) { return d.id; })
          .attr("cx", function(d) { return d.x + 52; }) 
          .attr("cy", function(d) { return d.y + 52})
          .attr("r", function(d) { return 50 })
          .attr("fill", "white" )
          .attr("stroke-width", 2)
          .attr("stroke", "grey")              
          .attr("cursor", "pointer"); 
  
        d3.selectAll("circle").attr("fill", "lightgrey");

         d3.selectAll("circle").on("click", function() {
            handleOnClickShape(this);                
          });      
        }
}
