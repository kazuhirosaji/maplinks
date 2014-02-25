    google.load('visualization', '1', {'packages': ['geochart']});
    google.setOnLoadCallback(loadRanks);
    var code = [];
    var nationCode = [];
    var rank = [];
    var jpWikiUrl = "https://ja.wikipedia.org/wiki/";
    var enWikiUrl = "http://en.wikipedia.org/wiki/"

    function drawRegionsMap() {
      var rankData = [];
      for (var i = 0; i < rank.length; i++) {
        rankData.push([rank[i], i+1]);
      }
      rankData.unshift(['Country', 'rank']);
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
        var index = code.indexOf(reg.region);
        console.log(index);
        console.log(nationCode.nations[index].en_name);

        var country = nationCode.nations[index].en_name;
        var CountryName = nationCode.nations[index].jp_name;
        window.open(jpWikiUrl + CountryName , 'jp_window', 'width=800, height=300');
      }
    };
    
    function loadRanks() {
      httpObj = new XMLHttpRequest();
      httpObj.open("get", "./nations.json", true);
      httpObj.onload = function(){
        console.log("http onload");
        nationCode = JSON.parse(this.responseText);
        var txt = "";
        for (var i=0; i<nationCode.nations.length; i++){
          code[i] = nationCode.nations[i].code;
        }
        for (var i=0; i<nationCode.ranks.length; i++) {
          rank[i] = nationCode.ranks[i].teamName;
        }
        drawRegionsMap();
      }
      httpObj.send(null);
    };

