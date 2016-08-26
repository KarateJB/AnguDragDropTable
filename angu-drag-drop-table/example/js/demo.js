angular.module('app', ['anguDragDropTable'])
    .controller('DemoCtrl', function ($scope, $q, $timeout) {

        $scope.tableClass = "table-bordered";
        $scope.src= {'columns':[], 'localData':[]}

        $scope.src.columns=[{'title':'SN'},{'title':'Name'},{'title':'Age'}];
        $scope.src.localData=[
            {'Data':[{'column':'SN','value':1},{'column':'Name','value':'JB'},{'column':'Age','value':35}]},
            {'Data':[{'column':'SN','value':2},{'column':'Name','value':'Lily'},{'column':'Age','value':18}]},
            {'Data':[{'column':'SN','value':3},{'column':'Name','value':'Leia'},{'column':'Age','value':3}]},
            ];
    })