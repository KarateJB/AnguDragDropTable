angular.module('anguDragDropTable', [])
    .directive('anguDrag', function ($timeout, $document) {

        return {
            // restrict: "A",
            scope: {
                columns: "=ngModel"
            },
            link: function ($scope, $element, $attr) {

                $element.bind('dragstart', function (event) {

                    var dragColId = event.target.id;
                    var isStop = false;
                    angular.forEach($scope.columns.data, function (col) {
                        if (!isStop) {
                            if (dragColId === col.id) {
                                $scope.columns.dragColumn = JSON.parse(JSON.stringify(col));
                                $scope.$apply();
                                isStop = true;
                            }
                        }
                    })
                })

            },
            controller: function ($scope, $element) {

            }

        }
    })
    .directive('anguDrop', function ($timeout, $document) {

        return {
            // restrict: "A",
            scope: {
                columns: "=ngModel"
            },
            link: function ($scope, $element, $attr) {

                // var queryRslt = $document[0].getElementById($scope.elemId);
                // var elem = angular.element(queryRslt);

                $element.bind('drop', function (event) {

                    var dropColId = event.target.id;

                    var isStop = false;
                    angular.forEach($scope.columns.data, function (col) {
                        if (!isStop) {
                            if (dropColId === col.id) {
                                $scope.columns.dropColumn = JSON.parse(JSON.stringify(col));
                                $scope.$apply();
                                isStop = true;
                            }
                        }
                    })



                    // event.stopPropagation();
                    event.preventDefault();
                });

                $element.bind('dragover', function (event) {
                    event.preventDefault();
                });

            },
            controller: function ($scope, $element) {

            }

        }
    })
    .directive('anguDragDropTable', function ($document, $timeout) {

        var template = `
        <input type ="hidden" ng-model="columns.dragColumn" value="{{columns.dragColumn.id}}" />
        <input type ="hidden" ng-model="columns.dropColumn" value="{{columns.dropColumn.id}}" />
        <table ng-class="tableClass">
        <thead>
        <tr>
        <td ng-repeat="col in src.columns.data  | orderBy:'order'">
          <div class="form-group">
            <div class="col-md-10 text-center" angu-drag ng-model="src.columns" id="{{col.id}}" draggable="true">
                {{col.title}}
            </div>
            <div class="circle col-md-2" angu-drop ng-model="src.columns" id="{{col.id}}">
            &nbsp;
            </div>
          </div>
          <td>
        </tr>
        </thead>
        <tbody>
        <tr ng-repeat="row in src.rows">
           <td ng-repeat="data in row.data | orderBy:'order'">
              {{data.value}}
           </td>
        </tr>
        </tbody>
        </table>
        `;

        return {
            // restrict: "A",
            scope: {
                src: '=ngModel',        //The source includes columns and rows
                tableClass: '@'         //The Css class of table
            },
            template: template,
            link: function ($scope, $element, $attr) {

                $scope.dragColumn = null;
                $scope.dropColumn = null;

                $scope.$watch('src.columns.dropColumn.id', function (newValue, oldValue) {

                    if (!newValue || newValue == null)
                        return;

                    //Set the new order of columns
                    var dragColOrder = $scope.src.columns.dragColumn.order;
                    var dropColOrder = $scope.src.columns.dropColumn.order;

                    var isStopDg = false;
                    var isStopDp = false;
                    angular.forEach($scope.src.columns.data, function (col) {

                        if (!isStopDg) {
                            if (col.title === $scope.src.columns.dragColumn.title) {
                                $timeout(function () {
                                    col.order = dropColOrder;
                                    
                                }, 100)
                                // console.log(col.title + "'s order changes to " + col.order);
                                isStopDg = true;
                            }
                        }
                        if (!isStopDp) {
                            if (col.title === $scope.src.columns.dropColumn.title) {
                                $timeout(function () {
                                    col.order = dragColOrder;
                                }, 100)
                                // console.log(col.title + "'s order changes to " + col.order);
                                isStopDp = true;
                            }
                        }
                    })

                    //Set the new order of row value
                    angular.forEach($scope.src.rows, function (row) {
                        angular.forEach(row.data, function (rowdata) {
                            if (rowdata.column) {
                                var isStopSearchCol = false;
                                angular.forEach($scope.src.columns.data, function (col) {
                                    if (!isStopSearchCol) {
                                        if(rowdata.column===col.title){
                                            $timeout(function(){
                                                rowdata.order = col.order;
                                            }, 100);
                                            isStopSearchCol = false;
                                        }
                                    }
                                })
                            }
                            else{
                                rowdata.order =0;
                            }
                        })
                    })

                    $scope.src.columns.dragColumn = {};
                    $scope.src.columns.dropColumn = {};

                })

                // $scope.initColumns = function () {
                //     angular.forEach($scope.columns, function (col) {
                //         var queryRslt = $document[0].getElementById(id)
                //         var elem = angular.element(queryRslt);
                //     })
                // }

            },
            controller: function ($scope, $element) {

            }

        }
    })