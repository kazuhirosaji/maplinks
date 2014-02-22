    google.load('visualization', '1', {'packages': ['geochart']});
    google.setOnLoadCallback(drawRegionsMap);
    var code = [];
    var myData = [];
    var jp_wiki_url = "https://ja.wikipedia.org/wiki/";
    var en_wiki_url = "http://en.wikipedia.org/wiki/"
    function drawRegionsMap() {
      var data = google.visualization.arrayToDataTable([
        ['Country', 'Popularity']
      ]);

      var options = {
        backgroundColor: {fill:"blue"},
        region: 'world', // or 'world' or 030 or 'JP'
        displayMode: 'regions',
        datalessRegionColor: "#00DD44",
        colorAxis: {colors: ['#e7711c', '#4374e0']} // orange to blue
      };

      var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
      chart.draw(data, options);

      google.visualization.events.addListener(chart, 'regionClick', selectHandler);

      function selectHandler(reg) {
        console.log(reg);
//      alert(reg.region);
        console.log(code.indexOf(reg.region));
        console.log(myData.nations[code.indexOf(reg.region)].en_name);
        var country = myData.nations[code.indexOf(reg.region)].en_name;
        var jp_country = myData.nations[code.indexOf(reg.region)].jp_name;
        alert(country);
//      document.location = en_wiki_url + country;
//      window.open(en_wiki_url + country , 'en_window', 'width=800, height=300');
        window.open(jp_wiki_url + jp_country , 'jp_window', 'width=800, height=300');
      }
    };

    httpObj = new XMLHttpRequest();
    httpObj.open("get", "./nations.json", true);
    httpObj.onload = function(){
      myData = JSON.parse(this.responseText);
      var txt = "";
      for (var i=0; i<myData.nations.length; i++){
        code[i] = myData.nations[i].code
        txt = txt + myData.nations[i].en_name + "  " + myData.nations[i].code+"<br>";
      }
      //document.getElementById("result") = txt;
      console.log(txt);
    }
    httpObj.send(null);