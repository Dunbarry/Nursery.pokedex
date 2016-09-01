var options=["null", "name", "type", "species", "IV"]
var selector=0;
var entry=0;
var pageCheck=1;
var pageCap=1;
var pages=0;
var fetchedData=0;
var prevExempt=0;

$(document).on('click','#catSelect', function(){
  if(selector===4){
    selector=0;
  }
  selector++;
  $('#catSelect').text(options[selector]);
  console.log(document.getElementById('catSelect').innerHTML);
})

function screenClear(){
  $('.screen').html(
    '<div class="dataContain">\
    </div>\
    <div class="circleNext" id="next">\
      <div class="arrowRight"></div>\
    </div>\
    <div class="circlePrev" id="prev">\
      <div class="arrowLeft"></div>\
    </div>\
    <div class="searchContain">\
      <select class="dropdown" type="dropdown">\
        <option value="" disabled selected hidden>-Select Criteria-</option>\
        <option value="name">Name</option>\
        <option value="type">Type</option>\
        <option value="species">Species</option>\
        <option value="IV">IVs</option>\
      </select>\
      <input class="query" type="text" placeholder="query"></input>\
      <input type="submit" id="submit" value="Search">\
    </div>'
  )
}

function plaqueAdd(){
  $('.dataContain').html(
  '<div class="plaque">\
    <span class="dataName" id="name0"></span>\
    <span class="dataSpecies" id="species0"></span>\
    <span class="dataType" id="type0"></span>\
    <span class="dataArrival" id="arrival0"></span>\
    <span class="dataRole" id="role0"></span>\
    <span class="dataMoves" id="moves0"></span>\
    <span class="dataIV" id="IV0"></span>\
    <span class="dataNotes" id="notes0"></span>\
  </div>\
  <div class="plaque" id="halfPage">\
    <span class="dataName" id="name1"></span>\
    <span class="dataSpecies" id="species1"></span>\
    <span class="dataType" id="type1"></span>\
    <span class="dataArrival" id="arrival1"></span>\
    <span class="dataRole" id="role1"></span>\
    <span class="dataMoves" id="moves1"></span>\
    <span class="dataIV" id="IV1"></span>\
    <span class="dataNotes" id="notes1"></span>\
  </div>')
}

function pageState(){
  if(pages>pageCheck){
    $('.circleNext').addClass('pulse');
  }
  else if(pages<=pageCheck){
    $('.circleNext').removeClass('pulse');
  }
  if(pageCheck>1){
    $('.circlePrev').addClass('pulse');
  }
  else if(pageCheck===1){
    $('.circlePrev').removeClass('pulse');
  }
}

function populate(data){
  if(entry<0){
    entry=0;
    pageCap=1;
  }
  pageState();
  while(entry<pageCap){
    $('#name0').text('Name: '+data[entry].name);
    $('#species0').text('Species: '+data[entry].species);
    $('#type0').text('Type: '+data[entry].type);
    $('#arrival0').text('Arrival: '+data[entry].arrival[0]+' on '+data[entry].arrival[1]+'!');
    $('#role0').text('Role: '+data[entry]["nursery role"]);
    $('#moves0').text('Moves: '+data[entry].moves[0]+', '+data[entry].moves[1]);
    $('#IV0').text('IV: '+data[entry].IV);
    $('#notes0').text('Notes: '+data[entry].notes);
    entry++;
    console.log(entry,pageCap);
    if((entry-0)<(fetchedData-0)){
      $('#name1').text('Name: '+data[entry].name);
      $('#species1').text('Species: '+data[entry].species);
      $('#type1').text('Type: '+data[entry].type);
      $('#arrival1').text('Arrival: '+data[entry].arrival[0]+' on '+data[entry].arrival[1]+'!');
      $('#role1').text('Role: '+data[entry]["nursery role"]);
      $('#moves1').text('Moves: '+data[entry].moves[0]+', '+data[entry].moves[1]);
      $('#IV1').text('IV: '+data[entry].IV);
      $('#notes1').text('Notes: '+data[entry].notes);
      entry++;
    }
    else{
      $('#halfPage').remove();
    }
    pageState();
    console.log(entry,pageCap);
  }
}

$(document).on('click','#next', function(){
  if((entry-0)<=(fetchedData-0)){
  pages--;
  pageCheck++;
  entry=pageCap;
  pageCap=pageCap+2;
  populate(found);
  }
})

$(document).on('click','#prev', function(){
  pages++;
  pageCheck--;
  pageCap=pageCap-2;
  entry=entry-3;
  prevExempt++;
  console.log(entry,pageCap);
  // screenClear();
  plaqueAdd();
  populate(found);
  prevExempt--;
})

$('#submit').click(function(){
  console.log("Drone fetch initiated.")
  category="/"+options[selector];
  // document.getElementById('catSelect').innerHTML
  query="/"+$('.query').val();
  if(category==="/name"){
    category=query;
    query="";
  }
  screenClear();
  plaqueAdd();
  $.ajax({
    url:'http://localhost:4242'+category+query,
    error: function(err) {console.error(err)},
    method: 'GET',
    success: function(data){
      found=data;
      entry=0;
      fetchedData=data.length-1;
      pages=data.length/2
      console.log(data,pages);
      populate(data);
      }
  })
})
