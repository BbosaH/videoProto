/**
 * custom services
 * Module that contains service functions that will
 * be used in several Angular controllers
 * @author Lujja Henry Bbosa 0777777557
 */

angular.module('services', [])
.factory("GetData",['$http','$q',($http,$q)=>{
  
  var getDataPromise = (link)=>{
    
    
    var headers = {

      'Access-Control-Allow-Origin' : '*',
      'X-Parse-Application-Id' : 'xxxx',
      'Content-Type' : 'application/json'
      
    }
    

    var deffered = $q.defer();

      $http.get(link,headers).
        then((response)=> {
         
          deffered.resolve(response)
        },(response)=> {
          
          deffered.reject(response)
      });
      return deffered.promise;

  };

  return{

    getData: (link,callback)=>{

         getDataPromise(link).then((data)=>{
            
            mydata=data.data;
            ////console.log(data.data);
            
            callback(data.data);

          },(error)=>{
            

          });

    }

  };


}])
.factory('SendData', ['config', (config)=> {
 
    var submitData=(link,request_data,callback)=>{	

      if(request_data.hasOwnProperty('password')){
         request_data.password = MD5(request_data.password);
         //console.log(request_data.password);
      }

  		$.ajax({

  			url : link,
  			type: "POST",
  			data: request_data,
  			cache : true,
  			//processData: false,
  			//contentType: false,
  			dataType : 'json',
  			success:(response)=> {
  			    console.log(response);
  			    callback(response);
  			    			//window.location.href=config.BaseURL+"#/home";
  			},
  			error:(jqXHR, textStatus, errorMessage)=>{
  			                
  			}

  		});
			   
		   
	}
	
    var isValid =(val)=>!_.isUndefined(val)&&_.isNull(val);

    var isEmpty = (str)=> (!str || 0 === str.length);

    var isDigit = (val)=> !isNaN(val);

    
 
 	return {

 		submitData: submitData,
 		isValid : isValid,
 		
 		isEmpty : isEmpty,
 		isDigit : isDigit,
 		
 	};

 }]).factory('DataService',['$http','config' ,($http, config)=> {

    var getData = (link_ext)=> {
        return $http.get(config.BaseURL + link_ext);
    };

    return {
        getData: getData
    };
}]).factory('TemplateService',['$http','config' , ($http, config) =>{
    var getTemplates = ()=> {

        return $http.get(config.dataURL + 'templates.json');
    };

    return {
        getTemplates: getTemplates
    };
}]).factory('Rating', ['config','$compile','$templateRequest',(config,$compile,$templateRequest)=> {
   
     // BUILD VIDEO ITEM
    var buildVideoItem = (template,div_col_class) => {

        var videoItem = document.createElement('div');
        videoItem.classList.add(div_col_class);
        videoItem.innerHTML = template;
        return videoItem;
    }

    // ADD RATING WIDGET
    var addRatingWidget = (videoItem,data,callback)=> {

        // var ratingElement = shopItem.querySelector('.c-rating');
        //console.dir("The vid"+videoItem);
        var ratingElement = videoItem.querySelector('.c-rating');
        //console.dir("The ratea"+ratingElement);
        var currentRating = data.rating;
        var maxRating = 5;
        //var callback = (rating)=>alert(rating);
        var r = rating(ratingElement, currentRating, maxRating, callback);

    }

    var calculateRate =(array_rates)=>{
     var sum= _(array_rates).reduce((sm,rate)=>{return sm+rate;},0);
     var final_rate =0;

     switch(true){
        case (sum < 20):
          final_rate=0;
        break;
        case (sum > 20 && sum < 40):
          final_rate=1;
        break;
        case (sum > 40 && sum < 60):
          final_rate=2;
        break;
        case (sum > 60 && sum < 90):
         final_rate=3;
        break;
        case (sum > 90 && sum < 120):
         final_rate=4;
        break;
        case (sum > 120):
         final_rate=5;
        break;
        default:
        break;
     }
     //console.log("The final"+final_rate);
     return final_rate;
    }

    

  
 
   return {

      buildVideoItem : buildVideoItem,
      addRatingWidget : addRatingWidget,
      calculateRate :calculateRate
 
   };


 }]).directive('contentItem', ['$compile','TemplateService','Rating',($compile,TemplateService,Rating)=>{

  var html_temp =`
            
               <div>
                 <span class="videoTitle" ng-click="toggle()" ><h5 style="white-space: nowrap;width: 20em; overflow:hidden;text-overflow: ellipsis; ">{{content.name}}</h5></span>
    
                 <video ng-attr-id='{{content._id}}' class="video-js" width="280" height="180" controls>
                   <source ng-src="{{config.BaseURL+content.url}}" type="video/mp4">
                   <source ng-src="{{config.BaseURL+content.url}}" type="video/webm">
                   <source ng-src="{{config.BaseURL+content.url}}" type="video/ogv">
                </video>
                <ul class="c-rating"></ul>
                <p style="white-space: nowrap;width: 20em; overflow:hidden;text-overflow: ellipsis; ">{{content.description}}</p>
                <hr>
                

                </div>
            
              `;

  



   return {

      restrict: "E",
     
      scope: {
        content:'=',
        toggle: "&"
      },

      link: (scope, element, attrs)=> {
    
        //console.dir("tigidi"+element);
        var videoTemplate = Rating.buildVideoItem(html_temp,'col-sm-4') ;
        Rating.addRatingWidget(videoTemplate,scope.content,(rating)=>alert('Click Video Title to Goto to video page to rate it'));
        
        //$compile(element.contents())(scope);
        $(".video-js").load(function() {

          $(".video-js").each(function (videoIndex) {

              var videoId = $(this).attr("id");
              console.log('The video id'+videoId);

              videojs(videoId).ready(function(){
                  this.on("play", function(e) {
                      //pause other video
                      $(".video-js").each(function (index) {
                          if (videoIndex !== index) {
                              this.player.pause();
                          }
                      });
                  });

              });
          });


        // Run code
        });

        $compile(videoTemplate)(scope);
        element.html(videoTemplate);
        
        
     
        }

   };


 }]).directive('oneVideoItem', ['$compile','Rating','SendData','config',($compile,Rating,SendData,config)=>{

  var html_temp =`
            
               <div>
                 <span class="videoTitle"><h3 style="font-weight:normal">{{content.name}}</h3></span>
                  <hr>
                 <video width="620" height="440" controls style="margin-top:-3%">
                   <source ng-src="{{config.BaseURL+content.url}}" type="video/mp4">
                   <source ng-src="{{config.BaseURL+content.url}}" type="video/webm">
                   <source ng-src="{{config.BaseURL+content.url}}" type="video/ogv">
                </video>
                <div>

                <div style="float:left"><label style="font-weight:bold;font-size:15px;color:black">Rate video :  </label></div>
                <div><ul class="c-rating" style="margin-left:15%"></ul></div>

                </div>
                

                </div>
            
              `;

  



   return {

      restrict: "E",
     
      scope: {

        content:'=',
        
       
      },

      link: (scope, element, attrs)=> {
    
        //console.dir("tigidi"+element);
        var videoTemplate = Rating.buildVideoItem(html_temp,'col-sm-8') ;
        Rating.addRatingWidget(videoTemplate,scope.content,(rating)=>{
           //(scope.$parent.chosenVideo._id);
          // var video_id = scope.$parent.chosenVideo._id;
           var rate_info = {
              videoId : scope.$parent.chosenVideo._id,
              rating : rating
           }
           SendData.submitData(config.BaseURL+'video/ratings?sessionId='+scope.$parent.session_id,rate_info,(response)=>{
              //$scope.login_res = JSON.parse(response);
              console.log(response);
              
           });
        });
        $compile(videoTemplate)(scope);
        element.html(videoTemplate);
        //$compile(element.contents())(scope);
        
     
      }

   };


 }])
 .factory('Utilities', ['config','GetData','SendData',(config,GetData,SendData)=> {
 
   
  
    var isValid =(val)=>!_.isUndefined(val)&&_.isNull(val);

    var isEmpty = (str)=> (!str || 0 === str.length);

    var isDigit = (val)=> !isNaN(val);

 
  return {

    
    isValid : isValid,
    isEmpty : isEmpty,
    isDigit : isDigit,
    
  };

 }]).constant('config', {
         

        BaseURL: 'http://localhost:3000/',
        dataURL : 'http://localhost/swipe_loan/data/'
        

 })