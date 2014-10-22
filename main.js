<!DOCTYPE html>
<meta charset="utf-8">
<style>
	.state{
		fill: none;
		stroke: #a9a9a9;
		stroke-width: 1;
	}
	.state:hover{
		fill-opacity:0.5;
	}
	#tooltip {   
		position: absolute;           
		text-align: center;
		padding: 20px;             
		margin: 10px;
		font: 12px sans-serif;        
		background: lightsteelblue;   
		border: 1px;      
		border-radius: 2px;           
		pointer-events: none;         
	}
	#tooltip h4{
		margin:0;
		font-size:14px;
	}
	#tooltip{
		background:rgba(0,0,0,0.9);
		border:1px solid grey;
		border-radius:5px;
		font-size:12px;
		width:auto;
		padding:4px;
		color:white;
		opacity:0;
	}
	#tooltip table{
		table-layout:fixed;
	}
	#tooltip tr td{
		padding:0;
		margin:0;
	}
	#tooltip tr td:nth-child(1){
		width:50px;
	}
	#tooltip tr td:nth-child(2){
		text-align:center;
	}
</style>
<body>
<div id="tooltip"></div><!-- div to hold tooltip. -->
<svg width="960" height="600" id="statesvg"></svg> <!-- svg to hold the map. -->
<script src="uStates.js"></script> <!-- creates uStates. -->
<script src="http://d3js.org/d3.v3.min.js"></script>
<script>

	function tooltipHtml(n, d){	/* function to create html content string in tooltip div. */
		return "<h4>"+n+"</h4><table>"+
			"<tr><td>"(d.img0)"</td><td>"+(d.trk0)+"</td></tr>"+
			"<tr><td>"(d.img1)"</td><td>"+(d.trk1)+"</td></tr>"+
			"<tr><td>"(d.img2)"</td><td>"+(d.trk2)+"</td></tr>"+
			"<tr><td>"(d.img3)"</td><td>"+(d.trk3)+"</td></tr>"+
			"<tr><td>"(d.img4)"</td><td>"+(d.trk4)+"</td></tr>"+
			"</table>";
	}
	
	var sampleData ={};	/* Sample random data. */	
	["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
	"ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
	"MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
	"CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
	"WI", "MO", "AR", "OK", "KS", "LS", "VA"]
		.forEach(function(d){ 

			//Define an array images
			//Define an array tracks
			var images[5];
			var tracks[5];

			var cache = new LastFMCache();

			var lastFM = newLastFM({
				apiKey: "9450310003b8769c8ba77933c7fbd8df",
				apiSecret: "is afcbd261dd01ab5dd9ee529e7e0f1a14",
				cache: cache
			});

			//Identify City(name) of each d (state) make a variable
			var metro;
			//Need to insert the json file in this
			var usa = "United States";
			for(key in json){
				if(json[state]==d)
				{
					metro=json[name];
				}
				else
				{
					//For now just init it to Austin
					metro="Austin"
				}
			}


			for(var i = 0; i<5; i++)
			{
				//For every state assign it these arrays of top 5 tracks with images alongwith
				//Use the lastfm api call with params: city i and imagelink
				lastFM.geo.getMetroArtistsChart(metro,usa){
						
				};
				//use the lastfm api call with params: city i and tracklink
				lastFM.geo.getMetroArtistsChart(metro,usa){
						
				};

			}

			sampleData[d]={
				img0: images[0], img1: images[1], img2: images[2], img3: images[3], img4: images[4],
				trk0: tracks[0], trk1: tracks[1], trk2: tracks[2], trk3: tracks[3], trk4: tracks[4]
			};
			/*var low=Math.round(100*Math.random()), 
				mid=Math.round(100*Math.random()), 
				high=Math.round(100*Math.random());
			sampleData[d]={low:d3.min([low,mid,high]), high:d3.max([low,mid,high]), 
					avg:Math.round((low+mid+high)/3), color:d3.interpolate("#ffffcc", "#800026")(low/100)}; 
			*/
		});
	
	/* draw states on id #statesvg */	
	uStates.draw("#statesvg", sampleData, tooltipHtml);
</script>

</body>