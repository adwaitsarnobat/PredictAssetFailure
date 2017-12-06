
var drug1nSample = angular.module("drug1nSample", ['ui.bootstrap', 'sampleSrv','countTo']);



var	AppCtrl	=	['$scope',	'dialogServices', 'dataServices',
function AppCtrl($scope,	dialogServices, dataServices)	{

	$scope.assetstatus="";
 		
	// context ID is a configuration constant in this example
	$scope.context = 'mycontextid'; 
	
	// init UI data model
	$scope.p = 
		{ Temperature:'35',	Leak:'No', Humidity:'90',Service:'3',ScheduledFlights:'100',MaxTemp:'20',MinTemp:'20',MeanTemp:'20',Rain:'1',Snow:'2',Precip:'2',Wind:'2' };

		$scope.IsVisible = false;
		

		$scope.setstatus=function(incoming){

			$scope.assetstatus=incoming[0].data[0][0];
			console.log("asset status value "+$scope.assetstatus);

				if($scope.assetstatus=="Working")
					$scope.assetstatus="Probability of Normal Operations"

					if($scope.assetstatus=="Failed")
					$scope.assetstatus="Probability of Failure";

		}
		
	$scope.score = function()	{

		$scope.IsVisible = true;
		$scope.countTo=0;
		$scope.assetstatus="";
		dataServices.getScore($scope.context, $scope.p,$scope.assetstatus)
		.then(
		
			function(rtn) {
				console.log(rtn);
				if (rtn.data.flag !== false && rtn.status == 200){
					console.log (rtn.data[0].data[0][1]);

					var status = rtn.data[0].data[0][1].trim;
					$scope.assetstatus=status;
					console.log($scope.assetstatus);
					

				
		
		//console.log('prediction status'+predictionstatus);



					$scope.countTo=rtn.data[0].data[0][1]*100;
					//$scope.showResults(rtn.data);
					$scope.setstatus(rtn.data);
					$scope.IsVisible = false;
				} else {
					//failure
					$scope.showError(rtn.data.message);
					$scope.IsVisible = false;
				}
			},
			function(reason) {
				$scope.showError(reason);
			}
		);
	}
		
	$scope.showResults = function(rspHeader, rspData) {
		dialogServices.resultsDlg(rspHeader, rspData).result.then();
	}
		
	$scope.showError = function(msgText) {
		dialogServices.errorDlg("Error", msgText).result.then();
	}
}]

var	ResultsCtrl = ['$scope',	'$modalInstance',	'rspHeader', 'rspData',
function ResultsCtrl($scope,	$modalInstance, rspHeader, rspData) {
	$scope.rspHeader = rspHeader;
	$scope.rspData = rspData;
	
	$scope.cancel	=	function() {
		$modalInstance.dismiss();
	}
}]

var	ErrorCtrl = ['$scope',	'$modalInstance',	'msgTitle',	'message',
function ErrorCtrl($scope,	$modalInstance,	msgTitle,	message) {

	$scope.msgTitle	=	msgTitle;
	$scope.message = message;
	
	$scope.cancel	=	function() {
		$modalInstance.dismiss();
	}
}]

drug1nSample.controller("AppCtrl",	AppCtrl);
drug1nSample.controller("ResultsCtrl", ResultsCtrl);
drug1nSample.controller("ErrorCtrl", ErrorCtrl);


