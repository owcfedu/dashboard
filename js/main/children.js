// load the childrens number impacted chart
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChildren);
var chart2;
var thisYearIndex; // the selected year to show the graph

function drawChildren() {
    // define the chart
    if (typeof chart2 == 'undefined') {
        chart2 = new google.visualization.ComboChart(document.getElementById('children-edu'));
    }
    var children;

    // read in data and draw chart
    d3.text("data/main/children.csv", function(error, children) {
        // read and reformat the data
        children = d3.csv.parseRows(children);
        for (var i = 1; i < children.length; i++) {
            for (var j = 1; j < children[0].length; j++) {  
                children[i][j] = parseInt(children[i][j]);
            }
        }
        
        // get all the available years, and show in dropdown button
        var years = [];
        for (var i = 1; i < children.length; i++) {
            var thisYear = children[i][0].substring(0, 4);
            if (years.indexOf(thisYear) == -1) {
                years.push(thisYear);
            }
        }

        // set button's text default to be the last year
        if (typeof thisYearIndex == 'undefined') {
            thisYearIndex = years.length - 1;  // default is the last year
        }

        // add all options for the button
        $("#yearselection").empty()
        for (var i = 0; i < years.length; i++) {
            $("#yearselection").append('<li><a class="yearforchildren">' + years[i] + '</a></li>')
        }

        // add event for when choosing a year
        $(".yearforchildren").click(function() {
            for (var i = 0; i < years.length; i++) {
                if (years[i] == this.text) {
                    thisYearIndex = i;
                }
            }
            $("#thisyear").text(years[thisYearIndex]);
            drawComboGraph(years[thisYearIndex], children);
        })

        $("#thisyear").text(years[thisYearIndex]);
        drawComboGraph(years[thisYearIndex], children);
    })

}


function drawComboGraph(thisYear, children) {
    // get the data into the format for google charts to show
    var data = [];
    var index = 1;
    data[0] = children[0];
    for (var i = 1; i < children.length; i++) {
        if (children[i][0].substring(0, 4) == thisyear.innerHTML) {
            data[index] = children[i];
            index += 1
        }
    }
    var graphData = google.visualization.arrayToDataTable(data)
    //// Original data format for google charts
    // var data = google.visualization.arrayToDataTable([
    //     ['Quarters', 'Africa', 'Asia', 'Latin America', 'Average'],
    //     ['2013/Q1',  1165,      938,        522,         633],
    //     ['2013/Q2',  435,      1268,       288,         550],
    //     ['2013/Q3',  657,      1167,       623,         890],
    //     ['2013/Q4',  139,      1110,       609.4,       300]
    // ]);

    var options = {
        title : 'Number Of Children Served With Education',
        vAxis: {title: "Number of Children"},
        hAxis: {title: "Quarters"},
        seriesType: "bars",
        series: {
            0: { color: '#1c91c0' },
            1: { color: '#e7711b' },
            2: { color: '#f1ca3a' },
            3: { type: "line", color: '#6f9654', lineWidth: 3, pointSize: 10, curveType: 'function'},
        }
    };
    chart2.draw(graphData, options);
}