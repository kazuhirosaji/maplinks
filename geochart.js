    google.load('visualization', '1', {'packages': ['geochart']});
    google.setOnLoadCallback(loadRanks);
    var code = [];
    var nationCode = [];
    var rank = [];
    var jp_wiki_url = "https://ja.wikipedia.org/wiki/";
    var en_wiki_url = "http://en.wikipedia.org/wiki/"

    function drawRegionsMap() {
      var rank_data = [];
      for (var i=0; i<rank.length; i++) {
        rank_data.push([rank[i], i+1]);
      }
      rank_data.unshift(['Country', 'rank']);
      console.log(rank_data);

      var data = google.visualization.arrayToDataTable(rank_data);

      var options = {
        backgroundColor: {fill:"blue"},
        region: 'world', // or 'world' or 030 or 'JP'
        displayMode: 'regions',
        colorAxis: {colors: ['red', '#DDDDFF']} // orange to blue
      };

      var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
      chart.draw(data, options);

      google.visualization.events.addListener(chart, 'regionClick', selectHandler);

      function selectHandler(reg) {
        console.log(reg);
//      alert(reg.region);
        console.log(code.indexOf(reg.region));
        console.log(nationCode.nations[code.indexOf(reg.region)].en_name);
        var country = nationCode.nations[code.indexOf(reg.region)].en_name;
        var jp_country = nationCode.nations[code.indexOf(reg.region)].jp_name;
        alert(country);
//      document.location = en_wiki_url + country;
//      window.open(en_wiki_url + country , 'en_window', 'width=800, height=300');
        window.open(jp_wiki_url + jp_country , 'jp_window', 'width=800, height=300');
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
          txt = txt + nationCode.nations[i].en_name + "  " + nationCode.nations[i].code+"<br>";
        }
        for (var i=0; i<nationCode.ranks.length; i++) {
          rank[i] = nationCode.ranks[i].teamName;
        }
        drawRegionsMap();
      }
      httpObj.send(null);
    };

