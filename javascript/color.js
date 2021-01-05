const width = 800;
const height = 500;
const totalBuildings = 16;
const svg = d3.select("#canvas")
    .append("svg")
    .attr("width", width)
    .attr("height", height);


let background = svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "white");


let sun = svg.append("circle")
    .attr("r", width/4)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("cx", width/2)
    .attr("cy", height/4 * 3);


let buildings = [];
let outline = true;
let skySelected = false;
let sunSelected = false;
let buildingsSelected = false;
let currentColor = "white";
let currentOpacity = 1;


for (let i = 0; i < totalBuildings; i++) {
    let buildingHeight = 20 + Math.random() * 200;
    
    let tempRect = svg.append("rect")
        .attr("width", 50)
        .attr("height", buildingHeight)
        .attr("fill", currentColor)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("x", 50 * i)
        .attr("y", height - buildingHeight);

    buildings.push(tempRect);
}





// The setting of the appearances of the selected objects
d3.select("#no_outline_radio").on("input", function() {
    outline = false;
});

d3.select("#outline_radio").on("input", function() {
    outline = true;
});


d3.select("#color_setting").on("input", function() {
    currentColor = d3.select("#color_setting").property("value");
});

d3.select("#opacity_setting").on("input", function() {
    currentOpacity = 0.01 * d3.select("#opacity_setting").property("value");
});




// Determines which objects the user has selected
d3.select("#skyCheckbox").on("input", function() {
    skySelected = !skySelected;

});

d3.select("#sunCheckbox").on("input", function() {
    sunSelected = !sunSelected;
});

d3.select("#buildingsCheckbox").on("input", function() {
    buildingsSelected = !buildingsSelected;
});




// Applies the appearance settings to the selected objects
d3.select("#apply_button").on("click", function() {

    // changing sky's appearance
    if (skySelected) {
        background.attr("fill", currentColor);
        background.attr("opacity", currentOpacity);
    }

    // changing sun's appearance
    if (sunSelected) {
        sun.attr("fill", currentColor);
        sun.attr("opacity", currentOpacity);
        
        if (!outline) {
            sun.attr("stroke", "none");
        }
        else {
            sun.attr("stroke", "black");
        }
    }

    // changing building' appearance
    if (buildingsSelected) {
        for (let i = 0; i < buildings.length; i++) {
            buildings[i].attr("fill", currentColor);
            buildings[i].attr("opacity", currentOpacity);

            if (!outline) {
                buildings[i].attr("stroke", "none");
            }
            else {
                buildings[i].attr("stroke", "black");
            }

        }
    }
});




// Resets the drawing to the default fill colors and outline setting
d3.select("#reset_button").on("click", function() {
    // resetting the global variables
    outline = true;
    skySelected = false;
    sunSelected = false;
    buildingsSelected = false;
    currentColor = "white";
    currentOpacity = 1;

    // resetting the appearance of the sun and sky
    sun.attr("stroke", "black");
    sun.attr("fill", currentColor);
    sun.attr("opacity", currentOpacity);
    background.attr("fill", currentColor);
    background.attr("opacity", currentOpacity);

    // resetting the appearance of the buildings
    for (let i = 0; i < buildings.length; i++) {
        buildings[i].attr("stroke", "black")
            .attr("fill", currentColor)
            .attr("opacity", currentOpacity);
    }

    // resetting the selection of the inputs
    d3.select("#skyCheckbox").property("checked", false);
    d3.select("#sunCheckbox").property("checked", false);
    d3.select("#buildingsCheckbox").property("checked", false);
    d3.select("#no_outline_radio").property("checked", false);
    d3.select("outline_radio").property("checked", false);
    d3.select("#color_setting").property("value", "#ffffff");
    d3.select("#opacity_setting").property("value", "100");
});



                    