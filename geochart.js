google.load('visualization', '1', {'packages': ['geochart']});
google.setOnLoadCallback(loadRanks);
var gCountryCode = [];
var gNationsData = [];
var gTeamName = [];
var wikiUrl = "https://ja.wikipedia.org/wiki/";

/* Chart�`�揈�� */
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

  // �N���b�N�������̃T�b�J�[��\�`�[����Wiki�y�[�W��\������
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
  window.open(wikiUrl + "�T�b�J�[" + name +"��\", 'jp_window', 'width=800, height=300');
}

/* FIFA�����L���O�Ŏg�p����Ă���3�����̍��R�[�h��
   GeoChart�Ŏg�p���邽�߂�2�����̍��R�[�h�ɕϊ�����
*/
function changeCountryName3to2(cName, i) {
  var index = gCountrymaCode.indexOf(cName);
  console.log(cName + "=>" + gCountryCode[index]);
  if (gCountryCode[index]) {
    console.log(gNationsData.nations[index].en_name);
    return gNationsData.nations[index].code;
  } else {
    /* �Ή�����2�����̍��R�[�h��������Ȃ��ꍇ�́AFIFA�����L���O��
       �擾�����������g�p����B
    */
    console.log(gNationsData.ranks[i].teamName);
    return gNationsData.ranks[i].teamName;
  }
}

function loadRanks() {
  httpObj = new XMLHttpRequest();
  httpObj.open("get", "./nations.json", true);
  
  /* �擾�������̒n��R�[�h(ISO-3166)�AFIFA�����L���O�f�[�^����
     ����[�����L���O]�̔z����쐬����
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

