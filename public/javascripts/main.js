$('#submit').click(function(){
  console.log("Drone fetch initiated.")
  category="/"+$('.dropdown').val();
  query="/"+$('.query').val();
  if(category==="/name"){
    category=query;
    query="";
  }
  $.ajax({
    url:'http://localhost:4242'+category+query,
    error: function(err) {console.error(err)},
    method: 'GET',
    success: function(data){
      console.log(data);
    }
  })
})
