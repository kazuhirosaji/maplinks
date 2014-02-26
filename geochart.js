    google.load('visualization', '1', {'packages': ['geochart']});
    google.setOnLoadCallback(loadRanks);
    var gCountryCode = [];
    var gNationsData = [];
    var gTeamName = [];
    var wikiUrl = "https://ja.wikipedia.org/wiki/";

    function drawRegionsMap() {
      var rankData = [];
      for (var i = 0; i < gTeamName.length; i++) {
        console.log(gTeamName[i]);
        rankData.push([gTeamName[i], i+1]);
      }
      rankData.unshift(['Country', 'Rank']);
      console.log(rankData);

      var data = google.visualization.arrayToDataTable(rankData);

      var options = {
        backgroundColor: {fill:"blue"},
        region: 'world', // or 'world' or 030 or 'JP'
        displayMode: 'regions',
        datalessRegionColor: "white",
        colorAxis: {colors: ['red', '#DDDDFF']}
      };

      var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
      chart.draw(data, options);

      google.visualization.events.addListener(chart, 'regionClick', selectHandler);

      function selectHandler(reg) {
        console.log(reg);
        var index = gCountryCode.indexOf(reg.region);
        var countryName = gNationsData.nations[index].jp_name;
        console.log(index);
        console.log(countryName);
        window.open(wikiUrl + countryName , 'jp_window', 'width=800, height=300');
      }
    };

    function loadRanks() {
      httpObj = new XMLHttpRequest();
      httpObj.open("get", "./nations.json", true);
      httpObj.onload = function(){
        console.log("http onload");
        gNationsData = JSON.parse(this.responseText);
        for (var i=0; i<gNationsData.nations.length; i++){
          gCountryCode[i] = gNationsData.nations[i].code;
        }
        for (var i=0; i<gNationsData.ranks.length; i++) {
          gTeamName[i] = gNationsData.ranks[i].teamName;
        }
        drawRegionsMap();
      }
      httpObj.send(null);
    };

