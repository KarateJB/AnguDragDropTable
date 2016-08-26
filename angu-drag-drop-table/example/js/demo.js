angular.module('app', ['anguDragDropTable'])
    .controller('DemoCtrl', function ($scope, $q, $timeout) {

        $scope.tableClass = "table-bordered";
        $scope.src= {'columns':{}, 'rows':[]};

        $scope.src.columns={'dragColumn':{}, 'dropColumn':{},
            'data':[{'id':'colSn','order':1,'title':'SN'},
            {'id':'colName','order':2,'title':'Name'},
            {'id':'colAge', 'order':3,'title':'Age'}]};

            console.log($scope.src.columns.data.length);
        $scope.src.rows=[
            {'data':[{'column':'colSn','value':1},{'column':'colName','value':'JB'},{'column':'colAge','value':35}]},
            {'data':[{'column':'colSn','value':2},{'column':'colName','value':'Lily'},{'column':'colAge','value':18}]},
            {'data':[{'column':'colSn','value':3},{'column':'colName','value':'Leia'},{'column':'colAge','value':3}]},
            ];
    })