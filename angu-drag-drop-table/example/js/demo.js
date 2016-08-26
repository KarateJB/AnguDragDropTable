angular.module('app', ['anguDragDropTable'])
    .controller('DemoCtrl', function ($scope, $q, $timeout) {

        $scope.tableClass = "table-bordered";
        $scope.src= {'columns':[], 'localData':[]}

        $scope.src.columns={'dragColumn':{}, 'dropColumn':{},
            'data':[{'id':'colSn','order':1,'title':'SN'},
            {'id':'colName','order':2,'title':'Name'},
            {'id':'colAge', 'order':3,'title':'Age'}]};
        $scope.src.rows=[
            {'data':[{'column':'SN','value':1},{'column':'Name','value':'JB'},{'column':'Age','value':35}]},
            {'data':[{'column':'SN','value':2},{'column':'Name','value':'Lily'},{'column':'Age','value':18}]},
            {'data':[{'column':'SN','value':3},{'column':'Name','value':'Leia'},{'column':'Age','value':3}]},
            ];
    })