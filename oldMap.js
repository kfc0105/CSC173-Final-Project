// mapid is the id of the div where the map will appear
var map = L
  .map('mapid')
  .setView([34.4263,-119.6808], 12);   // center position + zoom

//add the variable which will store the data for dots
var locations

//add the variable which will store the data
var dataset



// Add a tile to the map = a background. Comes from OpenStreetmap
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    maxZoom: 18,
    }).addTo(map);

// Add a svg layer to the map
L.svg().addTo(map);




d3.json("yelp_filtered_to_santa_barbara.json", function(error, yelpData) {
  if (error) throw error; 
  console.log(yelpData)
  dataset = yelpData

  var myColor = d3.scaleLinear().domain([1,5]) 
  .range(['blue','orange','green'])

  console.log(d3.min(yelpData, function(d){return d.stars}))

  // Select the svg area and add circles:
  locations =   d3.select("#mapid")
                  .select("svg")
                  .selectAll("myCircles")
                  .data(yelpData)
                  .enter()
                  .append("circle")
                    .attr("cx", function(d){ return map.latLngToLayerPoint([d.latitude, d.longitude]).x })
                    .attr("cy", function(d){ return map.latLngToLayerPoint([d.latitude, d.longitude]).y })
                    .attr("r", function(d){return Math.sqrt(d.review_count/Math.PI)*2})
                    .style("fill", d=> myColor(d.stars))
                    .attr("stroke", d=> myColor(d.stars))
                    .attr("stroke-width", 3)
                    .attr("fill-opacity", .4)


    // locations.filter(d=> d.name == 'H&M').attr("r", 20).style("fill",'black')
    console.log(locations.data())


    //stars Rating slider
    
    var data = yelpData;
    
    var sliderStep = d3
    .sliderBottom()
    .min(d3.min(data, d=> d.stars)) 
    .max(d3.max(data, d=> d.stars))
    .width(200)
    .tickFormat(d3.format('.2'))
    .ticks(5)
    .step(0.5)
    .default(0.015)
    .on('onchange', val => {
      d3.select('p#value-step').text(d3.format('.2')(val));

      locations.attr("stroke-width", 3).attr("fill-opacity", .4)

      var starInput = val;
      if(dataset.filter(d=> d.stars == starInput)){
        locations.filter(d=> d.stars != starInput).attr("stroke-width", 0).attr("fill-opacity", 0)
      }
    });

  var gStep = d3
    .select('div#slider-step')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gStep.call(sliderStep);

  d3.select('p#value-step').text(d3.format('.2')(sliderStep.value()));


  // review count slider

  var sliderSimple = d3
    .sliderBottom()
    .min(d3.min(data, d=> d.review_count))
    .max(d3.max(data, d=> d.review_count))
    .width(300)
    .tickFormat(d3.format('.5'))
    .ticks(10)
    .step(1)
    .default(0.015)
    .on('onchange', val => {
      d3.select('p#value-simple').text(d3.format('.5')(val));

      locations.attr("stroke-width", 3).attr("fill-opacity", .4)

      var reviewInput = val;
      if(dataset.filter(d=> d.review_count == reviewInput)){
        locations.filter(d=> d.review_count != reviewInput).attr("stroke-width", 0).attr("fill-opacity", 0)
      }
    });

  var gSimple = d3
    .select('div#slider-simple')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gSimple.call(sliderSimple);

  d3.select('p#value-simple').text(d3.format('.5')(sliderSimple.value()));
  
  
})

// Function that update circle position if something change
function update() {
  d3.selectAll("circle")
        .attr("cx", function(d){ return map.latLngToLayerPoint([d.latitude, d.longitude]).x })
        .attr("cy", function(d){ return map.latLngToLayerPoint([d.latitude, d.longitude]).y })
}

// If the user change the map (zoom or drag), I update circle position:
map.on("moveend", update)

//add event listener for name search

d3.select("button").on("click", function() {

      locations.attr("stroke-width", 3).attr("fill-opacity", .4)

      var txtName = d3.select("#locationName").node().value;
      if(txtName.length !=0){
        if(dataset.filter(d=> d.name.toLowerCase() == txtName.toLowerCase()).length !=0)
        {
          locations.filter(d=> d.name.toLowerCase() != txtName.toLowerCase()).attr("stroke-width", 0).attr("fill-opacity", 0)
        }
        else{
          locations.attr("stroke-width", 0).attr("fill-opacity", 0)
        }
      }
      
    });