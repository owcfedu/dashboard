google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawCountry);
function drawCountry() {
    d3.text("data/asia/asia-countries.csv", function(error, country) {
        country = d3.csv.parseRows(country);
        country[0] = ['Country', 'Number of Children', {role: 'style'}, {role: 'annotation' } ];
        console.log(country);
        for (var i = 1; i < country.length; i++) {
            // for (var j = 1; j < country[0].length; j++) {  
            //     country[i][j] = parseInt(country[i][j]);
            // }
            country[i][3] = country[i][1];
            country[i][1] = parseInt(country[i][1]);
        }

        var data = google.visualization.arrayToDataTable(country);
        // ['Country', 'Number of Children', {role: 'style'}, {role: 'annotation' } ],
        // ['Burma',       1000,              '#b87333',         '1000'],
        // ['India',       1170,              '#f1ca3a',         '1170'],
        // ['Thailand',    660,               '#1c91c0',         '660'],
        // ['Laor',        1030,              '#6f9654',         '1030'],
        // ]);

        var options = {
        title: 'Number of Children Impacted By Countries',
        legend: {position: 'none'}
        };

        var chart = new google.visualization.BarChart(document.getElementById('country-chart'));
        chart.draw(data, options);
    });
}