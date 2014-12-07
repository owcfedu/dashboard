google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawEducat);
function drawEducat() {
    d3.text("data/africa/africa-educat.csv", function(error, educat) {
        educat = d3.csv.parseRows(educat);
        educat[0] = ["Category", "Funds Amounts", {role: 'style'}, {role: 'annotation' }];
        for (var i = 1; i < educat.length; i++) {
            educat[i][1] = parseInt(educat[i][1]);
        }

        var data = google.visualization.arrayToDataTable(educat);
        //     ["Category", "Funds Amounts", {role: 'style'}, {role: 'annotation' }],
        //     ["HUS",      894,              '#BF69BA',   'High School & University Scholarships'],
        //     ["HSEE",     1049,             '#f1ca3a',   'High School and Elementary Education'],
        //     ["PSE",      1930,             '#30BAD9',   'Pre School Education'],
        //     ["ICB",      2145,             '#D9734E',   'Infrastructure and Capacity Building ']
        // ]);

        var options = {
            title: "Funding amounts to different levels of education",
            bar: {groupWidth: "95%"},
            legend: {position: "none"},
        };

        var chart = new google.visualization.ColumnChart(document.getElementById("educat-chart"));
        chart.draw(data, options);
    });
}