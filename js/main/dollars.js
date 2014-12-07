google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawDollars);

// the two selected years
var year1, year2;
var chart;

function drawDollars() {
    // define the chart
    if (typeof chart == 'undefined') {
        chart = new google.visualization.LineChart(document.getElementById('dollars-chart'));
    }

    // read in data and draw chart
    d3.text("data/main/dollars.csv", function(error, dollars) {
        // read and reformat the data
        dollars = d3.csv.parseRows(dollars);
        for (var i = 1; i < dollars.length; i++) {
            for (var j = 1; j < dollars[0].length; j++) {  
                dollars[i][j] = parseInt(dollars[i][j]);
            }
        }

        // add all the years option
        // remove the old options
        $("#year1").empty()
        $("#year2").empty()
        var years = dollars[0];
        // add the new options
        for (var i = 1; i < dollars[0].length; i++) {
            $("#year1").append('<li><a class="year1">' + dollars[0][i] + '</a></li>')
            $("#year2").append('<li><a class="year2">' + dollars[0][i] + '</a></li>')
        }

        // add event for year1 options
        if (typeof year1 == 'undefined') {
            year1 = dollars[0].length - 2;  // the sencond to the last year
        }
        $(".year1").click(function() {
            // get the selected year in the first button
            for (var i = 1; i < years.length; i++) {
                if (years[i] == "" + this.text) {
                    year1 = i;
                }
            }
            $("#year1button").text(this.text);
            drawLineGraph(year1, year2, dollars);
        })

        // add event for year2 options
        if (typeof year2 == 'undefined') {
            year2 = dollars[0].length - 1;  // the sencond to the last year
        }
        $(".year2").click(function() {
            // get the selected year in the second button
            for (var i = 1; i < years.length; i++) {
                if (years[i] == "" + this.text) {
                    year2 = i;
                }
            }
            $("#year2button").text(this.text);
            drawLineGraph(year1, year2, dollars);
        })  

        // draw initial graph
        $("#year1button").text(years[year1]);
        $("#year2button").text(years[year2]);
        drawLineGraph(year1, year2, dollars); 
    })
}


function drawLineGraph(year1, year2, dollars) {
        // selected columns
        var yearIndices = [0, year1, year2];    
        var filteredDollars = [];
        for (var i = 0; i < dollars.length; i++) {
            filteredDollars[i] = [];
            for (var j = 0; j < yearIndices.length; j++) {  
                filteredDollars[i][j] =  dollars[i][yearIndices[j]]
            }
        }

        // set the data for the google charts
        var data = google.visualization.arrayToDataTable(filteredDollars);
        // var data = google.visualization.arrayToDataTable([
        //     ['Year', '2013', '2014'],
        //     ['Q1',  10000,      40000],
        //     ['Q2',  11700,      46000],
        //     ['Q3',  66000,      11200],
        //     ['Q4',  103000,     54000]
        // ]);

        var options = {
            title: 'Dollars Raised by Champions for Education',
            lineWidth: 3, 
            pointSize: 15, 
            curveType: 'function',
            pointShape: 'diamond',
            series: {0: { color: '#1c91c0' }},
            animation:{
                duration: 500,
                easing: 'out'
            }
        };

        // draw the chart
        chart.draw(data, options);
}