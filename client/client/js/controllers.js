/**
 * Currency data Module controllers
 * Conatins angular js AMD controllers to relay data to Ui
 *
 * @author Lujja Henry Bbosa +256 777 777 557
 */

angular.module('controllers', ['services','angularModalService'])
.config(($sceDelegateProvider)=> {
    $sceDelegateProvider.resourceUrlWhitelist(['self', '**']);
}).controller('HomeCtrl', ['$scope','GetData','SendData','config','ModalService','Rating','DataService',($scope,GetData,SendData,config,ModalService,Rating,DataService)=> {
      $scope.me =JSON.parse(window.localStorage.getItem("current_user")) || {};

      if(_.isEmpty($scope.me))
      {
        //alert("tigidi");
        window.location.href=config.BaseURL+"index.html";
      }else{
        //console.log("me is"+$scope.me);
        $scope.session_id = $scope.me.sessionId;
        $scope.user_name = $scope.me.username;
      }
 
    $scope.toggle_value = 0;
    $scope.toggleShow=(item)=>{ $scope.toggle_value=item; $scope.$apply();}
    $scope.content = [];

    /*fetch video listings*/

    $scope.fetchVideoListings = (skip_val,limit)=> {
        var extString ='videos?sessionId='+$scope.session_id+'&skip='+skip_val+'&limit='+limit;
        DataService.getData(extString).then( (result)=> {
            $scope.content = result.data.data;
            _.each($scope.content,(oneContent)=>{
              oneContent['rating']=Rating.calculateRate(oneContent.ratings);
            });
            //console.log($scope.content);
        });
    };


   $scope.fetchVideoListings(0,10);

   /*end fetch video listings*/


    /*logout*/

    $scope.log_out =()=>{
          
        DataService.getData('user/logout?sessionId='+session_id).then( (result)=> {
            $scope.logout_res = result.data;
            window.location.href=config.BaseURL+"index.html";
            //console.log($scope.content);
        });

    }
    /*end logout*/

    /*get particular video*/

    $scope.fetchOneVideo = (video_id)=> {

         //alert(kabadi);
         DataService.getData('video?sessionId='+$scope.session_id+'&videoId='+video_id).then( (result)=> {
            $scope.chosenVideo = result.data.data;
            $scope.chosenVideo['rating']=Rating.calculateRate($scope.chosenVideo.ratings);
            //console.log($scope.chosenVideo);
            $scope.toggle_value=1;
         });
    };

    /*End get particular video*/


    /*Rate particular video*/
    $scope.rate_info ={
      video_id : '',
      rating : '',
    }

    $scope.rateVideo =(video_item)=>{

        //alert("tindigidi");

      SendData.submitData(config.BaseURL+'video/ratings?sessionId='+$scope.session_id,$scope.rate_info,(response)=>{
        $scope.login_res = JSON.parse(response);
        
      });

    }
    // $scope.showRatingItem =()=>{
    //     Rating.addRatingWidget(buildShopItem(data[i]), data[i]);
    // }



    /*End rate particular video*/

    $scope.goToVideo=(video_id)=>{
        //console.log('Kabali'+video_id);
        $scope.fetchOneVideo(video_id);
       
    }

    $scope.backToList=()=>{
        $scope.toggle_value=0;
        $scope.$digest();
    }

}]).controller('AuthCtrl', ['$scope','config','GetData','SendData', ($scope,config,GetData,SendData)=> {

window.localStorage.clear();
$scope.alert_toggle = 0;

$scope.login_data  = {
		username :'',
		password : '',

}

//$scope.name = CryptoJS.MD5("hhhjjdjskdksdk");
//console.log($scope.name);

$scope.login =()=>{
    //console.log("tigidi");
	SendData.submitData(config.BaseURL+'user/auth',$scope.login_data,(response)=>{
        $scope.login_res = response;
        //console.log("tigidify"+$scope.login_res);
        if($scope.login_res.status=='success')
        {
            $scope.current_user = $scope.login_res;
            window.localStorage.setItem("current_user",JSON.stringify($scope.current_user));
            window.location.href=config.BaseURL+"index.html#/home";

        }else
        {
          $scope.alert_toggle = -1;
          $scope.$apply();
        }
		
		
	});
}





	
}])