google.load('visualization', '1', {'packages': ['geochart']});
google.setOnLoadCallback(loadRanks);
var gCountryCode = [];
var gNationsData = [];
var gTeamName = [];
var wikiUrl = "https://ja.wikipedia.org/wiki/";

/* Chart描画処理 */
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

  // クリックした国のサッカー代表チームのWikiページを表示する
  function selectHandler(reg) {
    console.log(reg);
    var index = gCountryCode.indexOf(reg.region);
    var countryName = gNationsData.nations[index].jp_name;
    console.log(index);
    console.log(countryName);
    openNationalTeamPage(countryName);
  }
};

var gCountrymaCode = [];

function openNationalTeamPage(name) {
  window.open(wikiUrl + "サッカー" + name +"代表", 'jp_window', 'width=800, height=300');
}

/* FIFAランキングで使用されている3文字の国コードを
   GeoChartで使用するための2文字の国コードに変換する
*/
function changeCountryName3to2(cName, i) {
  var index = gCountrymaCode.indexOf(cName);
  console.log(cName + "=>" + gCountryCode[index]);
  if (gCountryCode[index]) {
    console.log(gNationsData.nations[index].en_name);
    return gNationsData.nations[index].code;
  } else {
    /* 対応する2文字の国コードが見つからない場合は、FIFAランキングで
       取得した国名を使用する。
    */
    console.log(gNationsData.ranks[i].teamName);
    return gNationsData.ranks[i].teamName;
  }
}

function loadRanks() {
  httpObj = new XMLHttpRequest();
  httpObj.open("get", "./nations.json", true);
  
  /* 取得した国の地域コード(ISO-3166)、FIFAランキングデータから
     国名[ランキング]の配列を作成する
  */
  httpObj.onload = function(){
    console.log("http onload");
    gNationsData = JSON.parse(this.responseText);
    for (var i=0; i<gNationsData.nations.length; i++){
      gCountryCode[i] = gNationsData.nations[i].code;
      gCountrymaCode[i] = gNationsData.nations[i].maCode;
    }
    var maCode;
    for (var i=0; i<gNationsData.ranks.length; i++) {
      maCode = gNationsData.ranks[i].maCode;
      gTeamName[i] = changeCountryName3to2(maCode, i);
    }
    drawRegionsMap();
  }
  httpObj.send(null);
};

