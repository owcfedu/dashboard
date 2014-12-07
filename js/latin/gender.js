google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawGender);

function drawGender() {
        d3.text("data/latin/latin-gender.csv", function(error, gender) {
        gender = d3.csv.parseRows(gender);
        for(var i = 1; i < gender.length; i++) {
            gender[i][1] = parseInt(gender[i][1]);
        }

        var data = google.visualization.arrayToDataTable(gender);
        //     ['Gender', 'Number of Children'],
        //     ['Female',    11],
        //     ['Male',      20],
        // ]);

        var options = {
            title: 'Gender Breakdown in Asia',
            pieHole: 0.2,
            slices: {
                0: { color: '#f1ca3a' },
                1: { color: '#AA9AAA' },
            }
        };

        var chart = new google.visualization.PieChart(document.getElementById('gender-chart'));
        chart.draw(data, options);
    });
}