var entry=0;
function screenClear(){
  $('.screen').html(
    '<div class="dataContain">\
    </div>\
    <div class="circle" id="next">\
      <div class="arrow"></div>\
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

function tabAdd(){
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
  <div class="plaque">\
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

// function populate(){
//
// }

$('#submit').click(function(){
  console.log("Drone fetch initiated.")
  category="/"+$('.dropdown').val();
  query="/"+$('.query').val();
  if(category==="/name"){
    category=query;
    query="";
  }
  screenClear();
  tabAdd();
  $.ajax({
    url:'http://localhost:4242'+category+query,
    error: function(err) {console.error(err)},
    method: 'GET',
    success: function(data){
      for(var entry in data){
        $('#name'+entry).text('Name:    '+data[entry].name);
        $('#species'+entry).text('Species: '+data[entry].species);
        $('#type'+entry).text('Type: '+data[entry].type);
        $('#arrival'+entry).text('Arrival: '+data[entry].arrival[0]+' on '+data[entry].arrival[1]+'!');
        $('#role'+entry).text('Role: '+data[entry]["nursery role"]);
        $('#moves'+entry).text('Moves: '+data[entry].moves[0]+','+data[entry].moves[1]);
        $('#IV'+entry).text('IV: '+data[entry].IV);
        $('#notes'+entry).text('Notes: '+data[entry].notes);
        console.log(data[entry]);
        // <span class="dataName" id="name1"></span>\
        // <span class="dataSpecies" id="species1"></span>\
        // <span class="dataType" id="type1"></span>\
        // <span class="dataArrival-a" id="arrival-a1"></span><span class="dataArrival-b" id="arrival-b1"></span>\
        // <span class="dataRole" id="role1"></span>\
        // <span class="dataRole" id="role1"></span>\
        // <span class="dataMoves-a" id="moves-a1"></span><span class="dataMoves-b" id="moves-b1"></span>\
        // <span class="dataRole" id="role1"></span>\
        // <span class="dataIV" id="IV1"></span>\
        // <span class="dataNotes" id="notes1"></span>\
      }
    }
  })
})

// <nav>
//   <span>Home</span>
//   <span>About</span>
//   <span>Gallery</span>
// </nav>
// <h1>Welcome to {{title}}</h1>
// <p>This site will allow any user to to dynamically search through documentation of the nursery's current inhabitants. To search the Pokedex, please select your criteria from the dropdown, then enter your query.</p>
// <div class="searchContain">
//   <p id="insturctions">To search by please enter your query formated as a range following this format without quotation: "30/40".</p>
//   <select class="dropdown" type="dropdown">
//     <option value="" disabled selected hidden>-Select Criteria-</option>
//     <option value="name">Name</option>
//     <option value="type">Type</option>
//     <option value="species">Species</option>
//     <option value="IV">IVs</option>
//   </select>
//   <input class="query" type="text" placeholder="query"></input>
//   <input type="submit" id="submit" value="Search">
