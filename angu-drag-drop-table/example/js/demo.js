angular.module('app', ['anguDragDropTable'])
    .controller('DemoCtrl', function ($scope, $q, $timeout) {

        $scope.tableClass = "table-bordered";
        $scope.src= {'columns':{}, 'rows':[]};
        $scope.dragRow = {};
        $scope.dropRow = {};

        $scope.src.columns={'dragColumn':null, 'dropColumn':null,
            'data':[{'id':'colSn','order':1,'title':'SN'},
            {'id':'colName','order':2,'title':'Name'},
            {'id':'colAge', 'order':3,'title':'Age'}]};

            console.log($scope.src.columns.data.length);
        $scope.src.rows={
            'dragRow':null, 'dropRow':null,
            'data':[{'cells':[{'column':'colSn','value':1},{'column':'colName','value':'JB'},{'column':'colAge','value':35}]},
            {'cells':[{'column':'colSn','value':2},{'column':'colName','value':'Lily'},{'column':'colAge','value':18}]},
            {'cells':[{'column':'colSn','value':3},{'column':'colName','value':'Hachi'},{'column':'colAge','value':5}]},
            {'cells':[{'column':'colSn','value':4},{'column':'colName','value':'Micky Mouse'},{'column':'colAge','value':50}]},
            {'cells':[{'column':'colSn','value':5},{'column':'colName','value':'Leia'},{'column':'colAge','value':3}]},
            ]};
    })