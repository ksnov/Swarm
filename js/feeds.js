Swarm.Feeds = function (){
  var self = this;
};

Swarm.Feeds.prototype = {
  init: function(){
    var self = this;
    self.getFeeds();
    self.attachWindowScrollEvent();
  },
  getFeeds: function(){
      var self = this;
      $("#content").empty();
      jQuery.ajax({
  		type :"GET",
  		url : "https://www.yammer.com/api/v1/messages.json?access_token="+yammer.getAccessToken(),
      data:{
        "limit":7
      },
  		dataType: 'json',
  		xhrFields: {
  			withCredentials: false
  		},
  		success : function(data){
        Swarm.utils.buildFeedInfo(data);
        $('#content').append('<div><button class="mui-z3 mui-btn mui-btn-floating mui-btn-floating-mini post-btn"><i class="material-icons">add</i></button></div>');
  			//console.log(data);
  		},
  		error : function(){
  			alert("Error, Please login to Yammer");
  		}
  	});
  },
  attachWindowScrollEvent: function(){
    var self = this;
    $(window).off('scroll').on('scroll', function(e){
        if($('body').height() != ($(window).height() + window.pageYOffset)){
          return false;
        }

        var lastMsgId = $('div.msg_main:last').attr('data-msg-id');

        jQuery.ajax({
            type :"GET",
            url : "https://www.yammer.com/api/v1/messages.json?access_token="+yammer.getAccessToken(),
            data:{
              "limit":7,
              "older_than": lastMsgId
            },
            dataType: 'json',
            xhrFields: {
              withCredentials: false
            },
            success : function(data){
                Swarm.utils.buildFeedInfo(data);

            },
            error : function(){
              alert("error");
            }
        });
    });
  }

}
