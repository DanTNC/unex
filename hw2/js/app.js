var state = 0;
var stwk = 0;

$(document).ready(function(){
  $("#contact_me input[type=text]").val("");
  $(".a").click(function(){
    if(state==2){
      $("#contact").slideToggle("slow",function(){
        $("#about").slideToggle("slow");
      });
    }else{
      $("#about").slideToggle("slow");
    }
    state = (state==1?0:1);
    //alert(state);
  });
  $(".c").click(function(){
    if(state==1){
      $("#about").slideToggle("slow",function(){
         $("#contact").slideToggle("slow");
      });
    }else{
      $("#contact").slideToggle("slow");
    }
    state = (state==2?0:2);
    //alert(state);
  });
  $(".c1").click(function(){
    window.open('https://www.facebook.com/profile.php?id=100003934883716','_blank');
  });
  $(".c2").click(function(){
    window.open('https://www.instagram.com/fad11203/','_blank');
  });
  $("#about button").click(function(){
    //$("#about").slideToggle("slow");
    $(".works").fadeIn("slow");
    $(".works").css("display","inline-block");
    $("#u1 a").text("close");
    $('html, body').animate({
          scrollTop: $("#work_").offset().top
    }, 800);
    state=0;
    stwk=1;
  });
  $("#u1").click(function(){
    if(stwk==1){
      $(".works").fadeOut("slow");
      $("#u1 a").text("");
      $('html, body').animate({
            scrollTop: $("#abouttable").offset().top
      }, 800);
      stwk=0;
    }
  });
  $(".MSOE").click(function(){
    window.open('http://msoe-fad11204.c9users.io:8080','_blank');
  });
  $(".tipbox").click(function(){
    window.open('https://dantnc.github.io/uidd2017_fintech','_blank');
  });
});

$(document).mouseup(function(e){
  var _con = $(".link, li, #about button, center");
  if(!_con.is(e.target) && _con.has(e.target).length === 0){
    if(state==1){
      $("#about").slideToggle("slow");
    }else if(state==2){
      $("#contact").slideToggle("slow");
    }
    state=0;
  }
});
