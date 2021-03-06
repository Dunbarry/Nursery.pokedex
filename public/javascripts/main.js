var options=["null", "name", "type", "species", "IV"]
var selector=0;
var entry=0;
var pageCheck=1;
var pageCap=1;
var pages=0;
var fetchedData=0;
var prevExempt=0;
var target="";
var homeCheck="onHome";
var standIn="";

function lockTimer(){
  $('.rotateBall').addClass('homeRotation')
  $('.beltTop').addClass('homeShadow');
}

function homeClear(){
  $('.mainTop').removeClass('closeTop');
  $('.mainBottom').removeClass('closeBottom');
  $('.rotateBall').removeClass('homeRotation')
  $('.beltTop').removeClass('homeShadow');
}

function home(){
  if(homeCheck==="notOnHome"){
  homeCheck="onHome"
  setTimeout(lockTimer,250);
  $('.mainTop').addClass('closeTop');
  $('.mainBottom').addClass('closeBottom');
  setTimeout(homeClear,3000);
  console.log("Home is done!")
  }
}

function pulseClear(){
  $(target).removeClass('pulse1x');
}

function pulseMgt(){
  $(target).addClass('pulse1x');
  setTimeout(pulseClear,251)
}

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
      <span class="circleSearch" id="catSelect">select</span>\
      <input class="query" type="text" placeholder="query"></input>\
      <span class="circleGo" id="go">Go!</span>\
    </div>'
  )
  $('#catSelect').text(options[selector]);
}

function plaqueAdd(){
  $('.dataContain').html(
  '<div class="plaque">\
    <span class="dataName" id="name0"></span>\
    <span class="dataSpecies" id="species0"></span>\
    <span class="dataType" id="type0"></span>\
    <span class="dataArrival" id="arrival0"></span>\
    <span class="dataMoves" id="moves0"></span>\
    <span class="dataIV" id="IV0"></span>\
    <span class="dataNotes" id="notes0"></span>\
  </div>\
  <div class="plaque" id="halfPage">\
    <span class="dataName" id="name1"></span>\
    <span class="dataSpecies" id="species1"></span>\
    <span class="dataType" id="type1"></span>\
    <span class="dataArrival" id="arrival1"></span>\
    <span class="dataMoves" id="moves1"></span>\
    <span class="dataIV" id="IV1"></span>\
    <span class="dataNotes" id="notes1"></span>\
  </div>')
}

function returningHome(){
  $('.screen').html(
      '<nav>\
        <span>About</span>\
        <span>Gallery</span>\
      </nav>\
      <h1>Welcome to My Pokedex</h1>\
      <p>This site will allow any user to to dynamically search through documentation of the nursery\'s current\ inhabitants. To search the Pokedex, please choose your criteria by clicking "select", then enter your query.</p>\
      <div class="searchContain">\
        <p id="instructions">To search by IV query must be entered as a range following this format without quotation:\
        "30/40".</p>\
        <span class="circleSearch" id="catSelect">select</span>\
        <input class="query" type="text" placeholder="query"></input>\
        <span class="circleGo" id="go">Go!</span>\
      </div>'
  )
}

function pageState(){
  if(pages>pageCheck){
    $('.circleNext').addClass('pulse');
  }
  else if(pages<=pageCheck&&pageCheck>1){
    $('.circleNext').removeClass('pulse');
    $('.circlePrev').addClass('pulse');
  }
  if(pageCheck<=1){
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
    $('#moves0').text('Moves: '+data[entry].moves[0]+', '+data[entry].moves[1]);
    $('#IV0').text('IV: '+data[entry].IV);
    // $('#notes0').text('Notes: '+data[entry].notes);
    entry++;
    if((entry-0)<=(fetchedData-0)){
      $('#name1').text('Name: '+data[entry].name);
      $('#species1').text('Species: '+data[entry].species);
      $('#type1').text('Type: '+data[entry].type);
      $('#arrival1').text('Arrival: '+data[entry].arrival[0]+' on '+data[entry].arrival[1]+'!');
      $('#moves1').text('Moves: '+data[entry].moves[0]+', '+data[entry].moves[1]);
      $('#IV1').text('IV: '+data[entry].IV);
      // $('#notes1').text('Notes: '+data[entry].notes);
      entry++;
    }
    else{
      $('#halfPage').remove();
    }
    pageState();
  }
}

$('.innerBall').click(function(){
  target=$(this)
  pulseMgt();
  home();
  setTimeout(returningHome,2000);
  console.log("Function is done!")
})

$(document).on('click','#next', function(){
  if((entry-0)<=(fetchedData-0)){
    pageCheck++;
    pageCap=pageCap+2;
    populate(found);
  }
})

$(document).on('click','#prev', function(){
  if(pageCheck>1){
    pageCheck--;
    pageCap=pageCap-2;
    entry=pageCap-1;
    prevExempt++;
    plaqueAdd();
    populate(found);
    prevExempt--;
  }
})

$(document).on('click','#catSelect', function(){
  target='#catSelect';
  pulseMgt();
  if(selector===4){
    selector=0;
  }
  selector++;
  $('#catSelect').text(options[selector]);
})

function spaceScrub(scrub){
  return scrub !== " ";
}

$(document).on('click', '#go', function(){
  homeCheck="notOnHome"
  target='#go';
  pulseMgt();
  category="/"+options[selector];
  if(category==="/IV"){
    query="/"+$('.query').val();
  }
  else{
    query="/"+(_.lowerCase($('.query').val()).split("")).filter(spaceScrub).join('');
  }
  console.log(query)
  if(category==="/name"){
    category=query;
    query="";
  }
  if(category==="/null"||query==="/"){
    alert("Please select a category and enter a query.");
  }
  else{
    screenClear();
    plaqueAdd();
    $.ajax({
      url:category+query,
      error: function(err) {console.error(err)},
      method: 'GET',
      success: function(data){
        console.log(data);
        found=data;
        entry=0;
        if(options[selector]==="name"){
          data=[data]
        }
        fetchedData=data.length-1;
        pages=data.length/2
        populate(data);
      }
    })
  }
})
