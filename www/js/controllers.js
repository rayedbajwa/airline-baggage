angular.module('airline.controllers', [])
.constant('base_url', 'http://buytheserver.com/api/')
//////////////// ############### Saving Party Data and got to Member's Form ##################////////////////////////

    .controller("PartyCtrl", function ($scope, $http, $state, base_url) {
      $scope.toggleLeftSideMenu = function() {
           $ionicSideMenuDelegate.toggleLeft();
        };
    $scope.SendData = function(){
       var link = base_url+'partyRequest/postParty.php';

        var data = {
                no_of_members: $scope.no_of_members,
                primary_party_member: $scope.primary_party_member,
                flight_date: $scope.flight_date,
                flight_no: $scope.flight_no,
                destination: $scope.destination
                };
         //console.log(data);
       $http({
           method: 'POST',
           url: link,
           data: data,
           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
       })
        .success(function(data) {
           $scope.response = data;
           console.log(data.id);
           console.log(data);
           $state.go('app.members', { partyID: data.id }, {reload: true,
    inherit: false,
    notify: true});
          });

   };

})

//////////////// ############### Edit Party Data and got to Member's Form ##################////////////////////////
.controller("PartyEditCtrl", function ($scope, $http, $state, $stateParams, base_url) {


    var partyID = $stateParams.partyID;

    //// get party data for header
    $http.get(base_url+'partyRequest/getPartybyID.php?partyID='+partyID).
        success(function(data) {
        //console.log(data);
        $scope.response = data;

    });


    $scope.EditParty = function(){


       var link = base_url+'partyRequest/updateParty.php?partyID='+partyID;

        var data = {
                no_of_members: $scope.response.no_of_members,
                primary_party_member: $scope.response.primary_party_member,
                flight_date: $scope.response.flight_date,
                flight_no: $scope.response.flight_no,
                destination: $scope.response.destination,
                party_id : partyID
                };
         //console.log(data);exit;
       $http({
           method: 'POST',
           url: link,
           data: data,
           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
       })
        .success(function(data) {
           $scope.response = data;

           $state.go('app.members', { partyID: partyID }, {reload: true,
    inherit: false,
    notify: true});
          });

   };

}) /// End Edit Party controller



//////////////// ############### Edit Members DATA multiple Member Data ##################////////////////////////

//.controller("MembersEditCtrl", function ($scope, $http, $state, $stateParams, base_url) {
//    var partyID = $stateParams.partyID;
//
//    //// search data of member table and repeat input fields
//    $http.get(base_url+'partyRequest/getPartyMembers.php?partyID='+partyID).
//        success(function(data) {
//        //console.log(data);
//        $scope.response = data;
//
//    });
//
//    ///// ###### Edit Multiple Members and go to Luggage State ######//////
//    $scope.EditMembers = function(){
//       var link = base_url+'membersRequest/editMembers.php?partyID='+partyID;
//       //$log.info($scope.res);
//
//       ///for loop to update multiple members data
//       for (var i in $scope.response) {
//           var vals = $scope.response[i];
//
//        var data = {
//            party_id: partyID,
//            member_name: vals.member_name,
//            member_id: vals.id
//        };
//       console.log(data);
//       $http({
//           method: 'POST',
//           url: link,
//           data: data,
//           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//       })
//        .success(function(data) {
//           $state.go('bags', { partyID: partyID });
//        });
//      }///end for loop
//   };
//
//})//// end Edit members


//////////////// ############### Saving Member multiple Member Data ##################////////////////////////

.controller("savememberCtrl", function ($scope, $http, $state, $stateParams, base_url) {
    var partyID = $stateParams.partyID;
    //// search data of party table and repeat input fields

    $http.get(base_url+'partyRequest/getPartyMembers.php?partyID='+partyID).
        success(function(data) {

          var res = [];
          //for (var i = 1; i < data.no_of_members; i++) {
              if(data=='null'){

                  $http.get(base_url+'partyRequest/getPartybyID.php?partyID='+partyID).
                    success(function(data3) {
                        //console.log(data3.id);
                    $scope.response = data3.id;

                      for (var n = 1; n < data3.no_of_members; n++) {
                        res.push({'name': res[n]});
                      }
                 });

              }else{
                $http.get(base_url+'partyRequest/getPartyMembers.php?partyID='+partyID).
                success(function(datas) {
                  $scope.response=datas;

                      for (var n = 0; n < datas.length; n++) {

                        res.push({'name': data[n].member_name, 'mid': data[n].id});
                      }
                });

              }

          //}
          $scope.res = res;

       //console.log($scope.res);
          //$scope.response = data;

    });


    ///// ###### Insert Multiple Members and go to Luggage State ######//////
    $scope.SaveMembers = function(){

         ///for loop to insert multiple members data
           for (var i in $scope.res) {
               var vals = $scope.res[i];
               //console.log(vals);

               var link = base_url+'membersRequest/editMembers.php';
                var data = {
                    party_id: partyID,
                    member_name: vals.name,
                    member_id : vals.mid
                };

                console.log(data);

           $http({
               method: 'POST',
               url: link,
               data: data,
               headers: {'Content-Type': 'application/x-www-form-urlencoded'}
           })
            .success(function(data) {
               //return $scope.response = data;
               //console.log(data);
               $state.go('app.bags', { partyID: partyID }, {reload: true,
    inherit: false,
    notify: true});
              });
            }///end for loop

   };

    //// Save and Conitnue
    $scope.saveandcontinue = function(){
        var link = base_url+'summaryRequest/saveContinue.php?partyID='+partyID;
        var form_link = 'http://localhost:8100/#/app/members/'+partyID;


        $http.get(base_url+'partyRequest/getPartybyID.php?partyID='+partyID).
        success(function(data) {
            console.log(data);
            $scope.response = data;
            var name = data.primary_party_member;


            var data = {
                primary_member: name,
                link: form_link
            };
            //console.log(data);exit;
            $http({
                method: 'POST',
                url: link,
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .success(function(data) {
                $state.go('app.summary', { partyID: partyID }, {reload: true,
    inherit: false,
    notify: true});
            });

        });
    };

})//// end members
.controller('topCtrl',function($scope,$http,base_url,$stateParams){
  if($stateParams.partyID)
  {     var partyID = $stateParams.partyID;
        $http.get(base_url+'partyRequest/getPartybyID.php?partyID='+partyID).
        success(function(datas) {
        $scope.response=datas;
  });
}
})


//////////////// ############### Saving Luggage Data ##################////////////////////////

.controller("saveluggageCtrl", function ($scope, $http, $state, $stateParams, base_url) {
var members=[];
var bags=[];
    ////// Search Data from members to insert bags
    var partyID = $stateParams.partyID;
    //console.log(partyID);
    $http.get(base_url+'luggageRequest/getBagsbyMemberID.php?partyID='+partyID).
        success(function(data) {
console.log(data);
          _.forEach(data,function(value){

                bags.push({'weight':'','member_id':value.id,'unit':''});
              members.push({'member_id':value.id,'member_name':value.member_name, 'party_id':partyID , bags});
                bags=[];
          });

          $scope.members=members;
        //  console.log(bags);
    });


    // add remove fields

    $scope.addInput = function (member_id) {
    //console.log(member_id);
    _.forEach($scope.members,function(key,value){
    bags=[];
    bags.push({'weight':'','member_id':value.member_id,'unit':''});
        if(key.member_id==member_id){
              console.log(value);
              $scope.members[value].bags.push(bags);
        }
    });
       $scope.members.push(bags);
    }

    $scope.removeInput = function (index) {
        $scope.bags.splice(index, 1);
    }
    ///end add remove fields

    ///// ###### Insert Multiple Bags and go to Summary State ######/////
    $scope.SaveBags = function(){

        //console.log($scope.members);
        var link = base_url+'luggageRequest/editLuggage.php';
        $http({
           method: 'POST',
           url: link,
           data: $scope.members,
           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data) {
           //return $scope.response = data;
           console.log(data);
           $state.go('app.summary', { partyID: partyID }, {reload: true,
    inherit: false,
    notify: true});
        });


//        for (var i in $scope.members) {
//           for (var n = 0; n < $scope.members.length; n++) {
//           var vals = $scope.members[n].bags[i];
//
//            //console.log(vals);
//
//            //if(vals != ''){
//               var link = base_url+'luggageRequest/editLuggage.php';
////            }else{
////                var link = base_url+'luggageRequest/postLuggage.php';
////            }
//
//            var data = {
//                weight: vals.weight,
//                member_id: vals.member_id,
//                weight_type: vals.unit
//                //id: vals.id
//            };
//
//           console.log(data);
//           $http({
//               method: 'POST',
//               url: link,
//               data: data,
//               headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//           })
//            .success(function(data) {
//               //return $scope.response = data;
//               console.log(data);
//               $state.go('app.summary', { partyID: partyID });
//              });
//       }}
        //end loop

   };

    //// Save and Conitnue
    $scope.saveandcontinue = function(){
        var link = base_url+'summaryRequest/saveContinue.php?partyID='+partyID;
        var form_link = 'http://localhost:8100/#/app/bags/'+partyID;


        $http.get(base_url+'partyRequest/getPartybyID.php?partyID='+partyID).
        success(function(data) {
            console.log(data);
            $scope.response = data;
            var name = data.primary_party_member;


            var data = {
                primary_member: name,
                link: form_link
            };
            //console.log(data);exit;
            $http({
                method: 'POST',
                url: link,
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .success(function(data) {
                $state.go('app.summary', { partyID: partyID }, {reload: true,
    inherit: false,
    notify: true});
            });

        });
    };

})/// end Luggage controller


//////////////// ############### Update Luggage Data ##################////////////////////////

//.controller("editLuggageCtrl", function ($scope, $http, $state, $stateParams, base_url) {
//
//    ////// Search Data from members to insert bags
//    var partyID = $stateParams.partyID;
//
//    $http.get(base_url+'luggageRequest/getBagsbyMemberID.php?partyID='+partyID).
//        success(function(data) {
//            $scope.responses = data;
//            console.log(data);
//
//        });
//
//    ///// ###### Update Multiple Bags and go to Summary State ######/////
//    $scope.editBags = function(){
//
//        var link = base_url+'luggageRequest/editLuggage.php';
//
//        for (var i in $scope.responses) {
//           var vals = $scope.responses[i];
//
//        console.log(vals);
//       // var member_id = document.getElementById('member_id').value;
//        var data = {
//            member_id: vals.id,
//            weight: vals.weight,
//            weight_type: vals.weight_type
//            };
//
//        // console.log(data);exit;
//       $http({
//           method: 'POST',
//           url: link,
//           data: data,
//           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//       })
//        .success(function(data) {
//           //return $scope.response = data;
//           console.log(data);
//           $state.go('summary', { partyID: partyID });
//          });
//       }
//
//   };
//
//})/// end Edit Luggage controller


//////////////// ############### Showing Summary of Members ##################////////////////////////

.controller("summaryCtrl", function ($scope, $http, $state, $stateParams, base_url) {
    var partyID = $stateParams.partyID;
    //$scope.data = [];


    $http.get(base_url+'summaryRequest/getUsers.php?partyID='+partyID).
    success(function(total) {

        var len = total.length;
        $scope.total = len*15;
        //console.log(len*15);

    });

    $http.get(base_url+'summaryRequest/getSummary.php?partyID='+partyID).
    success(function(data) {
        $scope.names = data;
        $scope.response = data;
        //console.log(data);

        var num = [];
        var wt = [];
        for (var i = 0; i < data.length; i++) {
            var memName = data[i];

            //console.log(memName.id);
                $http.get(base_url+'summaryRequest/getSummarybyMember.php?memberID='+memName.member_id).
                success(function(data1) {
                    num.push({'nums': data1});
                });

             $http.get(base_url+'summaryRequest/getSummarybyWeight.php?memberID='+memName.id).
                success(function(data2) {
                    wt.push({'weight': data2.weight, 'type': data2.weight_type});
                });

            $scope.weigt = wt;
            $scope.num_bags = num;

        }


    });


    //// got payment page
    $scope.gotoPayment = function(){
        $state.go('app.payment', { partyID: partyID }, {reload: true,
    inherit: false,
    notify: true});
    };

    //// Save and Conitnue
    $scope.saveandcontinue = function(){
        var link = base_url+'summaryRequest/saveContinue.php?partyID='+partyID;
        var form_link = 'http://localhost:8100/#/app/editParty/'+partyID;


        $http.get(base_url+'partyRequest/getPartybyID.php?partyID='+partyID).
        success(function(data) {
            console.log(data);
            $scope.response = data;
            var name = data.primary_party_member;


            var data = {
                primary_member: name,
                link: form_link
            };
            //console.log(data);exit;
            $http({
                method: 'POST',
                url: link,
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .success(function(data) {
                $state.go('app.summary', { partyID: partyID }, {reload: true,
    inherit: false,
    notify: true});
            });

        });
    };


}) ///end summary controller


//////////////// ############### Payment Controller ##################////////////////////////

.controller("paymentCtrl", function ($scope, $http, $state, $stateParams, base_url) {
    var partyID = $stateParams.partyID;
    //$scope.data = [];


    $http.get(base_url+'summaryRequest/getUsers.php?partyID='+partyID).
    success(function(data) {

        var len = data.length;
        $scope.total = len*15;

        $scope.response = data;
        //alert(len);
    });

    $scope.makePayment = function(){
        var link = base_url+'paymentRequest/payment.php';
        var amount = document.getElementById('amount').value;

        var data = {
                    firstname: $scope.firstname,
                    lastname: $scope.lastname,
                    email: $scope.email,
                    address: $scope.address,
                    city: $scope.city,
                    state: $scope.state,
                    zip: $scope.zip,
                    cardtype: $scope.cardtype,
                    cardholder: $scope.cardholder,
                    cardnumber: $scope.cardnumber,
                    cardmonth: $scope.cardmonth,
                    cardyear: $scope.cardyear,
                    cardcvv: $scope.cardcvv,
                    amount: amount
                };
       //console.log(data);
       $http({
           method: 'POST',
           url: link,
           data: data,
           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
       })
       .success(function(data) {

           $scope.response = data;
           //console.log(data);
           if(data.resp == 'ok'){
               alert('Payment successful, check email for more details');
               $state.go('app.print', { partyID: partyID }, {reload: true,
    inherit: false,
    notify: true});
           }else{
               alert('Payment failed, try again');
               $state.go('app.payment', { partyID: partyID }, {reload: true,
    inherit: false,
    notify: true});
           }


       });
    };

    /// if cash
     $scope.printBtn = function(){

        $state.go('app.print', { partyID: partyID }, {reload: true,
    inherit: false,
    notify: true});

    };

}) ///end payment controller

//////////////// ############### Print Controller ##################////////////////////////

.controller("printCtrl", function ($scope, $http, $state, $stateParams, base_url) {
    var partyID = $stateParams.partyID;
    //$scope.data = [];


    $http.get(base_url+'partyRequest/getPartybyID.php?partyID='+partyID).
    success(function(data) {
       console.log(data);

    });
}) ///end print controller

//////////////// ############### GET SAVE & Continue forms Controller ##################////////////////////////
    .controller("savedformsCtrl", function ($scope, $http, $state, $stateParams, base_url) {


    $http.get(base_url+'summaryRequest/getsavedforms.php').
    success(function(data) {
        $scope.saved = data;
       console.log(data);

    });

}).controller('tabs',function($scope,$stateParams, $state){

      $scope.active = $state.$current.self.name;
}); ///end save and continue controller
