/* Based on the code available @ http://bl.ocks.org/NPashaP/a74faf20b492ad377312 */

/* Create a cache object */
var cache = new LastFMCache();

/* Create a LastFM object */
var lastfm = new LastFM({
    apiKey: '9450310003b8769c8ba77933c7fbd8df',
    apiSecret: 'is afcbd261dd01ab5dd9ee529e7e0f1a14',
    cache: cache
});

var text = ' { "metro":[ { "name":"Boston", "state":"MA", "country":"United States" }, { "name":"Austin", "state":"TX", "country":"United States" }, { "name":"Jacksonville", "state":"FL", "country":"United States" }, { "name":"Pensacola", "state":"FL", "country":"United States" }, { "name":"New Orleans", "state":"LA", "country":"United States" }, { "name":"Houston", "state":"TX", "country":"United States" }, { "name":"Atlanta", "state":"FL", "country":"United States" }, { "name":"Nashville", "state":"TN", "country":"United States" }, { "name":"Memphis", "state":"TN", "country":"United States" }, { "name":"Little Rock", "state":"AR", "country":"United States" }, { "name":"Denver", "state":"CO", "country":"United States" }, { "name":"Milwaukee", "state":"WI", "country":"United States" }, { "name":"El Paso", "state":"TX", "country":"United States" }, { "name":"Tampa", "state":"FL", "country":"United States" }, { "name":"Orlando", "state":"FL", "country":"United States" }, { "name":"Philadelphia", "state":"PA", "country":"United States" }, { "name":"Minneapolis", "state":"MN", "country":"United States" }, { "name":"Columbus", "state":"OH", "country":"United States" }, { "name":"Cleveland", "state":"OH", "country":"United States" }, { "name":"Pittsburgh", "state":"PA", "country":"United States" }, { "name":"Washington DC", "state":"MD", "country":"United States" }, { "name":"Baltimore", "state":"MD", "country":"United States" }, { "name":"Virginia Beach", "state":"VA", "country":"United States" }, { "name":"Richmond", "state":"VA", "country":"United States" }, { "name":"Detroit", "state":"MI", "country":"United States" }, { "name":"Chicago", "state":"IL", "country":"United States" }, { "name":"St Louis", "state":"MO", "country":"United States" }, { "name":"Indianapolis", "state":"IN", "country":"United States" }, { "name":"Louisville", "state":"KY", "country":"United States" }, { "name":"Cincinnati", "state":"OH", "country":"United States" }, { "name":"Syracuse", "state":"NY", "country":"United States" }, { "name":"Rochester", "state":"NY", "country":"United States" }, { "name":"Buffalo", "state":"NY", "country":"United States" }, { "name":"Seattle", "state":"WA", "country":"United States" }, { "name":"Portland", "state":"FL", "country":"United States" }, { "name":"Las Vegas", "state":"CA", "country":"United States" }, { "name":"Sacramento", "state":"CA", "country":"United States" }, { "name":"San Jose", "state":"CA", "country":"United States" }, { "name":"San Francisco", "state":"CA", "country":"United States" }, { "name":"San Diego", "state":"CA", "country":"United States" }, { "name":"Los Angeles", "state":"CA", "country":"United States" }, { "name":"Phoenix", "state":"AZ", "country":"United States" }, { "name":"Miami", "state":"FL", "country":"United States" }, { "name":"New York", "state":"NY", "country":"United States" }, { "name":"West Palm Beach", "state":"FL", "country":"United States" }, { "name":"Dallas", "state":"TX", "country":"United States" }, { "name":"Wichita", "state":"KS", "country":"United States" } ] }';
var json_obj = JSON.parse(text);

var sampleData = {};

/* amount of tracks to be shown in each tooltip */
var nTracks = 10;
var flag = false;
function setMapData() {
    /* Sample random data. */
    ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
        "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH",
        "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT",
        "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN",
        "WI", "MO", "AR", "OK", "KS", "LS", "VA"]
        .forEach(function (d) {
            for (var i = 0; i < json_obj.metro.length; i++) {
                var obj = json_obj.metro[i];
                var metro_name;
                var metro_state;

                if (obj["state"] === d) {
                    metro_state = obj["state"];
                    metro_name = obj["name"];
                    flag = true;
                    break;
                }
                else {
                    flag = false;
                }
            }

            var images = [];
            var tracks = [];
            var listeners = 0;
            var urls = [];

            sampleData[d] = {};
            sampleData[d].img = [];
            sampleData[d].trk = [];
            sampleData[d].url = [];

            if (flag == true) {
                lastfm.geo.getMetroTrackChart({metro: metro_name, country: 'United States', limit: nTracks}, {success: function (data) {
                    /* Use data. */
                    if (data.toptracks.track != undefined) {

                        console.log(data.toptracks.track);

                        //console.log(metro_name);

                        for (var i = nTracks - 1; i >= 0; i--) {
                            if (data.toptracks.track[i].image != undefined) {
                                images[i] = data.toptracks.track[i].image[0]["#text"];
                            }
                            else {
                                images[i] = "../img/not-found36.png";
                            }
                            listeners += parseInt(data.toptracks.track[i].listeners);

                            tracks[i] = data.toptracks.track[i].name +
                                ' - ' +
                                data.toptracks.track[i].artist.name +
                                ' [' + listeners.toString() + ']';

                            urls[i] = data.toptracks.track[i].url;

//                            $('#spotify').load(urls[i],function(p){
//                                var value=$(p).find("#spotify-inline-play-button").attr("data-uri");
//                                console.log(value);
//                            });

                            //console.log(' [' + images[i] + '] ' + tracks[i]);
                            sampleData[d].img[i] = images[i];
                            sampleData[d].trk[i] = tracks[i];
                            sampleData[d].url[i] = urls[i];
                        }
                        //sampleData[d].color = d3.interpolate("#ffffcc", "#800026")(listeners / 1000);
                        sampleData[d].color = d3.interpolate("#407f7f", "#003333")(listeners / 1000);

                        //console.log(listeners);
                    }

                }, error: function (code, message) {
                    /* Show error message. */
                    //console.log('Error ' + code + ': ' + message);
                }
                });
            }
            else {
                lastfm.geo.getTopTracks({country: 'United States', limit: nTracks}, {success: function (data) {
                    console.log(data);

                    for (var i = nTracks - 1; i >= 0; i--) {
                        if (data.toptracks.track[i].image != undefined) {
                            images[i] = data.toptracks.track[i].image[0]["#text"];
                        }
                        else {
                            images[i] = "../img/not-found36.png";
                        }

                        listeners += parseInt(data.toptracks.track[i].listeners);

                        tracks[i] = data.toptracks.track[i].name + ' - ' + data.toptracks.track[i].artist.name
                            //+ ' [' + listeners + ']'
                            ;

                        urls[i] = data.toptracks.track[i].url;

//                        $('#spotify').load(urls[i],function(p){
//                            var value=$(p).find("#spotify-inline-play-button").attr("data-uri");
//                            console.log(value);
//                        });

                        sampleData[d].img[i] = images[i];
                        sampleData[d].trk[i] = tracks[i];
                        sampleData[d].url[i] = urls[i];
                    }

                    sampleData[d].color = "#669999";

                }, error: function (code, message) {
                    /* Show error message. */
                    console.log('Error ' + code + ': ' + message);
                }
                });
            }

        });
}

function tooltipHtml(n, d) {    /* function to create html content string in tooltip div. */
    var tooltip = "<h4>" + n + "</h4><table>";

    for (var i = 0; i < nTracks; i++) {
        tooltip += "<tr><td>" +
            "<img src='" + (d.img[i]) + "' height='36' width='36'>" +
            "</td><td>" +
            '<a href="' +
            (d.url[i]) +
            '" target="_blank">' +
            (d.trk[i]) +
            "</a>" +
            "</td></tr>";
    }

    tooltip += "</table>";

    return tooltip;
}

function drawMap() {
    console.log(sampleData);

    /* svg to hold the map */
    var svg = '<svg width="960" height="600" id="statesvg"></svg>';

    /* replace spinner with svg*/
    document.getElementById('spin').innerHTML = svg;

    /* draw states on id #statesvg */
    uStates.draw("#statesvg", sampleData, tooltipHtml);
}