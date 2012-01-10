/**
* Switcher
* Module Export
* Switcher module for the sites.
*/
var Switcher = (function () {
  var sw = {},
      i_frame_ = {},
      sites = [
        'www.alistapart.com',
        'www.slashdot.com',
        'www.whitehouse.gov',
        'www.slate.com'
      ],
      site_counter_ = 0,
      switch_timer_ = 30000,
      switch_nav_ = $('footer #switcher_navigation'),
      timeout_,
      highlight_classname_ = 'notice',
      paused = false,
      pause_button_ = $('#pause_button'),
      site_title_ = $('#site_title');
      
  function switchLocation(){    
    var location_ = sites[site_counter_];
    
    switch_nav_.children().each(function(i,e){
      var element_ = $(e);
      var ref = element_.data('loc').reference;
      element_.removeClass(highlight_classname_);
      if (ref == location_){
        site_title_.text(ref);
        element_.addClass(highlight_classname_);
      }
    });
    
    i_frame_.attr('src', 'http://' + location_);
    site_counter_ = (site_counter_ + 1 > sites.length - 1) ? 0 : site_counter_ + 1;
    if(!paused){
      clearTimeout(timeout_);
      timeout_ = setTimeout(switchLocation, switch_timer_);
    }
  }
  
  function navigateLocation(location){
    var location_position_;
    $(sites).each(function(i,e){
      if(e == location){
        site_counter_ = i;
      }
    });
    
    switchLocation();
  }
  
  function gotoLocation(location){
    var location_ = location.replace('http://', '');
    i_frame_.attr('src', 'http://' + location_);
    site_title_.text(location);
  }
  
  function pause(){
    paused = true;
    clearTimeout(timeout_);
    pause_button_.text('Play');
    pause_button_.focus();
  }
  
  function play(){
    paused = false;
    switchLocation();
    pause_button_.text('Pause');
    pause_button_.focus();
  }

  function init_(frame_name) {
    i_frame_ = $('#framer');
    $(sites).each(function(i,e){
      jQuery("<a>", {
        text: e.split('?')[0].split('.')[1],
        href: 'http://' + e,
        'class': 'label',
        
        click: function(e) {
          e.preventDefault();
          Switcher.navigateLocation($(this).data('loc').reference);
        }
      })
      .appendTo(switch_nav_)
      .data('loc', {
        'reference': e
      });
    });
    
    $('#pause_button').click(function(e){
      e.preventDefault();
      Switcher[this.text.toLowerCase()]();
    });
    
    play();
  }

  sw.name = "Switcher";
  
  sw.pause = pause;
  
  sw.play = play;
  
  sw.navigateLocation = navigateLocation;
  
  sw.gotoLocation = gotoLocation;
  
  sw.init = function (frame_name) {
    init_(frame_name);
  };

  return sw;
}());