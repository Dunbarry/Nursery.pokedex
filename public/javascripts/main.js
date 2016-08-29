$('.screen').click(function(){
  $.ajax({
    url:'http://localhost:4242/Ronin',
    error: function(err) {console.error(err)},
    method: 'GET',
    success: function(data){
      console.log(data);
    }
  })
})
