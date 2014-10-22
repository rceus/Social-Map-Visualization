/* Based on the code available @ http://bl.ocks.org/NPashaP/a74faf20b492ad377312 */

/* Create a cache object */
var cache = new LastFMCache();

/* Create a LastFM object */
var lastfm = new LastFM({
    apiKey: '9450310003b8769c8ba77933c7fbd8df',
    apiSecret: 'is afcbd261dd01ab5dd9ee529e7e0f1a14',
    cache: cache
});

var text = ' { "city":[ { "name":"Boston", "state":"MA", "country":"United States" }, { "name":"Austin", "state":"TX", "country":"United States" }, { "name":"Jacksonville", "state":"FL", "country":"United States" }, { "name":"Pensacola", "state":"FL", "country":"United States" }, { "name":"New Orleans", "state":"LA", "country":"United States" }, { "name":"Houston", "state":"TX", "country":"United States" }, { "name":"Atlanta", "state":"FL", "country":"United States" }, { "name":"Nashville", "state":"TN", "country":"United States" }, { "name":"Memphis", "state":"TN", "country":"United States" }, { "name":"Little Rock", "state":"AR", "country":"United States" }, { "name":"Denver", "state":"CO", "country":"United States" }, { "name":"Milwaukee", "state":"WI", "country":"United States" }, { "name":"El Paso", "state":"TX", "country":"United States" }, { "name":"Tampa", "state":"FL", "country":"United States" }, { "name":"Orlando", "state":"FL", "country":"United States" }, { "name":"Philadelphia", "state":"PA", "country":"United States" }, { "name":"Minneapolis", "state":"MN", "country":"United States" }, { "name":"Columbus", "state":"OH", "country":"United States" }, { "name":"Cleveland", "state":"OH", "country":"United States" }, { "name":"Pittsburgh", "state":"PA", "country":"United States" }, { "name":"Washington DC", "state":"MD", "country":"United States" }, { "name":"Baltimore", "state":"MD", "country":"United States" }, { "name":"Virginia Beach", "state":"VA", "country":"United States" }, { "name":"Richmond", "state":"VA", "country":"United States" }, { "name":"Detroit", "state":"MI", "country":"United States" }, { "name":"Chicago", "state":"IL", "country":"United States" }, { "name":"St Louis", "state":"MO", "country":"United States" }, { "name":"Indianapolis", "state":"IN", "country":"United States" }, { "name":"Louisville", "state":"KY", "country":"United States" }, { "name":"Cincinnati", "state":"OH", "country":"United States" }, { "name":"Syracuse", "state":"NY", "country":"United States" }, { "name":"Rochester", "state":"NY", "country":"United States" }, { "name":"Buffalo", "state":"NY", "country":"United States" }, { "name":"Seattle", "state":"WA", "country":"United States" }, { "name":"Portland", "state":"FL", "country":"United States" }, { "name":"Las Vegas", "state":"CA", "country":"United States" }, { "name":"Sacramento", "state":"CA", "country":"United States" }, { "name":"San Jose", "state":"CA", "country":"United States" }, { "name":"San Francisco", "state":"CA", "country":"United States" }, { "name":"San Diego", "state":"CA", "country":"United States" }, { "name":"Los Angeles", "state":"CA", "country":"United States" }, { "name":"Phoenix", "state":"AZ", "country":"United States" }, { "name":"Miami", "state":"FL", "country":"United States" }, { "name":"New York", "state":"NY", "country":"United States" }, { "name":"West Palm Beach", "state":"FL", "country":"United States" }, { "name":"Dallas", "state":"TX", "country":"United States" }, { "name":"Wichita", "state":"KS", "country":"United States" } ] }';
var json_obj = JSON.parse(text);

function tooltipHtml(n, d) {    /* function to create html content string in tooltip div. */
    return "<h4>" + n + "</h4><table>" +
        "<tr><td>" + (d.img0) + "</td><td>" + (d.trk0) + "</td></tr>" +
        "<tr><td>" + (d.img1) + "</td><td>" + (d.trk1) + "</td></tr>" +
        "<tr><td>" + (d.img2) + "</td><td>" + (d.trk2) + "</td></tr>" +
        "<tr><td>" + (d.img3) + "</td><td>" + (d.trk3) + "</td></tr>" +
        "<tr><td>" + (d.img4) + "</td><td>" + (d.trk4) + "</td></tr>" +
        "</table>";
}

var sampleData = {};
/* Sample random data. */
["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
    "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH",
    "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT",
    "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN",
    "WI", "MO", "AR", "OK", "KS", "LS", "VA"]
    .forEach(function (d) {
        for (var i = 0; i < json_obj.city.length; i++) {
            var obj = json_obj.city[i];
            var city_name;
            var city_state;

            if (obj["state"] === d) {
                city_state = obj["state"];
                city_name = obj["name"];
                break;
            }
        }

        var images = [];
        var tracks = [];
        var listeners = 0;
        lastfm.geo.getMetroTrackChart({metro: city_name, country: 'United States', limit: 5}, {success: function (data) {
            /* Use data. */
            if (data.toptracks.track != undefined) {

                console.log(city_name);
                for (var i = 0; i < 5; i++) {
                    images[i] = 'img' + i;
                    tracks[i] = data.toptracks.track[i].name;
                    listeners += parseInt(data.toptracks.track[i].listeners);
                    console.log(' [' + images[i] + '] ' + tracks[i]);
                }
                console.log(listeners);

            }
        }, error: function (code, message) {
            /* Show error message. */
            //console.log('Error ' + code + ': ' + message);
        }});


        sampleData[d] = {
            'img0': images[0], 'img1': images[1], 'img2': images[2], 'img3': images[3], 'img4': images[4],
            'trk0': tracks[0], 'trk1': tracks[1], 'trk2': tracks[2], 'trk3': tracks[3], 'trk4': tracks[4],
            'color': d3.interpolate("#ffffcc", "#800026")(listeners / 100)
        };


    });

/* draw states on id #statesvg */
uStates.draw("#statesvg", sampleData, tooltipHtml);