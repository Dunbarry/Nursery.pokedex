function screenClear(){
  $('.screen').html(
    '<div class="dataContain">\
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

$('#submit').click(function(){
  console.log("Drone fetch initiated.")
  category="/"+$('.dropdown').val();
  query="/"+$('.query').val();
  if(category==="/name"){
    category=query;
    query="";
  }
  screenClear();
  $.ajax({
    url:'http://localhost:4242'+category+query,
    error: function(err) {console.error(err)},
    method: 'GET',
    success: function(data){
      console.log(data)
      findings=JSON.stringify(data);
      $('.dataContain').text(findings);
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
