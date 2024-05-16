// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    const metaData = data.metadata.find(item=> item.id == sample);
    
  
  

    // Filter the metadata for the object with the desired sample number


    // Use d3 to select the panel with id of `#sample-metadata`
    const metadataSection = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    metadataSection.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(metaData).forEach(([key, value]) => {
      metadataSection.append("p").text(`${key}: ${value}`);
    });

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    const values = data.samples.find(item=> item.id == sample);
    
 

    // Filter the samples for the object with the desired sample number


    // Get the otu_ids, otu_labels, and sample_values
    otu_ids = values.otu_ids;

    otu_labels = values.otu_labels;

    sample_values = values.sample_values

    console.log(otu_ids);
    console.log(sample);

    // Build a Bubble Chart
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      height: 600,
      width: 1200,
      xaxis: {
        title: 'OTU ID'
      },
      yaxis: {
        title: 'Number of Bacteria'
    }};
    
    

    // Render the Bubble Chart

    Plotly.newPlot('bubble', data, layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks

    let yticks = otu_ids.map(id => `OTU ${id}`);

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately

    function getTop10OTUs(sample_values) { 
    sample_values.sort((a, b) => b.sample_value - a.sample_value);
    var top10OTUs = sample_values.slice(0, 10);

    console.log(top10OTUs)
    }

    var trace1 = {
      x: sample_values,
      y: top10OTUs,
      type: 'bar',
      orientation: 'h',
      text: otu_labels,
      marker: {
        color: 'rgb(142,124,195)'
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Top 10 Bacteria Cultures Found',
      font:{
        family: 'Raleway, sans-serif'
      },
      showlegend: false,
      xaxis: {
        tickangle: -45
      },
      yaxis: {
        zeroline: false,
        gridwidth: 2,
        ticktext: yticks
      },
      bargap :0.05
    };
    


    // Render the Bar Chart

    Plotly.newPlot('myDiv', data, layout);

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
   
    // Get the names field
    const names = data.names

    // Use d3 to select the dropdown with id of `#selDataset`
 // d3.selectAll("#selDataset").on("change", optionChanged);
    const dropdown = d3.select("#selDataset")

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i = 0; i < names.length; i++) {
      const element = names[i];
      dropdown.append('option').text(element)
    }

    // Get the first sample from the list
   const nameSelected = names[0] 

    // Build charts and metadata panel with the first sample
    optionChanged(nameSelected)
  });
}

// Function for event listener
function optionChanged(newSample) {
    buildMetadata(newSample)
    buildCharts(newSample)
 
}

// Initialize the dashboard
init();
