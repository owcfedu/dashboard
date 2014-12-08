function loadMap() {
    var map = new Datamap({
        element: document.getElementById('globalchart'),
        scope: 'world',
        setProjection: function(element) {
            var projection = d3.geo.equirectangular()
                               .center([30, 35])
                               .rotate([30, 0])
                               .scale(170)
                               // .translate([element.offsetWidth, element.offsetHeight / 2]);
            var path = d3.geo.path()
                         .projection(projection);
            return {path: path, projection: projection};
        },
        fills: {
            defaultFill:  'rgba(210,210,210,0.9)', 
            tendergreen:  'rgba(162, 242, 135, 0.9)', 
            lightcyan:    'rgba(130, 194, 245, 0.9)',
            lightyellow:  'rgba(240,230,154,0.5)',
            lightpink:    'rgba(227,168,166,0.55)',
            lightpurple:  '#BAAAFF',
            mintgreen:    '#BCFFAD',
            lakeblue:     '#62E9E0',
            brickgray:    '#D9C6B0',
            sunsetpurple: '#D98CFF',
            bluegray:     '#CFCEF2',
            lightbrown:   '#C7B9A6',
            highyellow:   '#FFFE61',
            darkgreen:    '#A39C80',
            lightgreen:   '#b5cf6b'
        },
        data: {
            // asia
            'MMR': { fillKey: 'lightpurple' },
            'IND': { fillKey: 'mintgreen' },
            'TLS': { fillKey: 'lightpink' },
            'PAK': { fillKey: 'brickgray' },
            'THA': { fillKey: 'sunsetpurple' },

            // africa
            'KEN': { fillKey: 'lightpurple' },
            'BFA': { fillKey: 'mintgreen' },
            'ZWE': { fillKey: 'lightcyan' },
            'UGA': { fillKey: 'tendergreen' },
            'COD': { fillKey: 'lightbrown'},
            'TZA': { fillKey: 'lightpink' },
            'ZAF': { fillKey: 'sunsetpurple' },
            'BWA': { fillKey: 'lightyellow' },
            'ZMB': { fillKey: 'bluegray' },

            // america
            'PAN': { fillKey: 'lightpurple' },
            'NIC': { fillKey: 'mintgreen' },
            'BRA': { fillKey: 'lightpink' },
            'USA': { fillKey: 'brickgray' },
            'HTI': { fillKey: 'sunsetpurple'},
            'ARG': { fillKey: 'lightcyan' },
            'ECU': { fillKey: 'lightyellow' }
        },
        geographyConfig: {
            highlightFillColor: '#62E9E0'
        }
    });

    // get the partner data for shown on the bubbles
    var radiusNumber = 5;
    var fillColor = "darkgreen";  
    var yeildVal = 15000;
    d3.csv("data/global/global-partners.csv", function(error, data) {
        // reformat data for shown in bubbles
        for (var i = 0; i < data.length; i++) {
            data[i]["yeild"] = yeildVal;
            data[i]["fillKey"] = fillColor;
            data[i]["radius"] = radiusNumber;            
            data[i]["latitude"] = parseFloat(data[i]["latitude"]);            
            data[i]["longitude"] = parseFloat(data[i]["longitude"]);            
        }

        // set bubbles for the datamap
        map.bubbles(data);

        // add click event to the bubbles
        $(".datamaps-bubble").on('click', function(event) {
            var data = JSON.parse(this.getAttribute("data-info"));
            $("#clicktip").remove();
            $("#link").text(data.name);
            $("#link").attr("href", data.link);
            $("#content").text(data.content);
        });
    }); 
}


// Dealing with window resizing event
$(window).bind("load resize", function() {
    if (typeof loadMap != 'undefined') {
        // resize the map
        var mapwidth = $("#asiachart").width();
        var mapheight = mapwidth;
        if (mapwidth >= 800) {
            mapheight *= 0.6;
        } else if (mapwidth >= 640) {
            mapheight *= 0.8;
        } else if (mapwidth >= 600){
            mapheight *= 0.9;
        } else {
            mapheight *= 1.0;
        }
        $("#asiachart").height(mapheight);
        $(".datamap" ).remove();                // remove the old chart
        loadMap();                              // draw the new chart 
    };
});

