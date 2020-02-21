'use strict';
$(function() {
  $("#main").before($("#main-menu"));
  $("#wrapper2").prepend($("#top-menu"));
  $("#wrapper2").prepend($("#header"));
  addLogo();
  
  //For search and jump project elements
  var srch = '<label class = expandSearch ></label>'
  $( '#quick-search #q' ).before(srch).prependTo('.expandSearch');
  $( "#quick-search #q" ).attr( "placeholder", "Enter Search Text" ).attr( "id","q1" );
  $("#quick-search .expandSearch").attr("title", "Search");

  // For user profile
  $(".account").click(function() {
    var X = $(this).attr('id');
    if(X == 1) {
      $("#profilemenu").hide();
      $(this).attr('id', '0'); 
    }
    else {
      $("#profilemenu").show();
      $(this).attr('id', '1');
    }
  });

  $("#profilemenu").mouseup(function() {
    return false
  });
  $(".account").mouseup(function() {
    return false
  });
  $(document).mouseup(function() {
    $("#profilemenu").hide();
    $(".account").attr('id', '');
  });
});

function addLogo () {
  $( "#header" ).prepend( "<div class='redmine-logo'><svg></svg></div>" );
  $("#loggedas").prependTo("#account");
  $("#account").appendTo("#top-menu");

  // For user profile
  if($("#loggedas").length > 0) {
    var loggedasEle = $.parseHTML($("#loggedas").html());
    $("#loggedas").remove();
    $("#account ul").prepend('<li></li>');
    $("#account ul li").first().html(loggedasEle[1]);
  }
  var account = ' <div id="userprofile"> <div class="profileicon account"/>';
  account += '<div id="profilemenu" style="display: none; "></div></div>';
  $("#quick-search").append(account);
  $("#account ul").attr("id", "profilelist").appendTo("#profilemenu");
  $("#account").remove();

  // For converting Top menu into Icons
    var topMenus = [];
    $("#top-menu ul li a").each(function() {
      var classNames = ($(this).attr('class')).split(" ")
      topMenus.push(classNames[0]);
    });
    topMenus.forEach(function(menu){
      $("#top-menu ."+menu).html("<svg class='menu-icon' id='"+menu+"-icon'></svg>");
    });
    
  // For adding title to all icons 
  $("#project-jump .drdn-trigger").attr("title", "Jump to project");
  $("#userprofile").attr("title", "User profile");

  topMenus.forEach(function(menu){
    var name = menu.replace(/-/g, " ");
    name = name.charAt(0).toUpperCase() + name.slice(1);
    $("#top-menu ."+menu).attr("title", name);
  });

  // For Top Icon Background color
  var pageURL = window.location.pathname;
  topMenus.forEach(function(menu){
    var link = $("#top-menu ."+menu).attr("href");
    switch(menu) {
      case "projects" :
        pageURL = pageURL.split("/");
        link = $("#main-menu ul").children("li").find("a").first().attr("href")
        if("/projects" == link || menu == pageURL[1]) $("#top-menu ."+menu).parent('li').addClass("active");
        break;
      case "administration" :
        if($("#admin-menu").length > 0) $("."+menu).parent('li').addClass("active");
        break;
      default :
        if(pageURL == link) $("."+menu).parent('li').addClass("active");
    }
  });

}