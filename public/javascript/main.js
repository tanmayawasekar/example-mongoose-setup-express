var socket = io();

socket.on("reload-kichen-pages", function (data) {
    if (window.location.href.indexOf("kitchen/display") != -1) {
        location.reload(true);
    }
});

$(".mark-complete").click(function(){
    $.ajax({url: "/order/mark-complete", 
    type:"POST",
    data: {
        id: this.id
    },
    success: function(result){
        location.reload(true);
      }
    });
      
  });
