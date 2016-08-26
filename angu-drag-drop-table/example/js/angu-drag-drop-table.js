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
                                $scope.columns.dragColumn = col;
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
                                $scope.columns.dropColumn = col;
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
    .directive('anguDragDropTable', function ($document) {

        var template = `
        <input type ="text" ng-model="columns.dragColumn" value="{{columns.dragColumn.id}}" />
        <input type ="text" ng-model="columns.dropColumn" value="{{columns.dropColumn.id}}" />
        <table ng-class="tableClass">
        <thead>
        <tr>
        <td ng-repeat="col in src.columns.data  | orderBy:'order'">
          <div class="form-group">
            <div class="col-md-6" angu-drag ng-model="src.columns" id="{{col.id}}" draggable="true">
                {{col.title}}
            </div>
            <div angu-drop ng-model="src.columns" id="{{col.id}}"
                class="col-md-6" style="background-color:lightblue;min-width:50%;min-height:50%">
            &nbsp;
            </div>
          </div>
          <td>
        </tr>
        </thead>
        <tbody>
        <tr ng-repeat="row in src.rows">
           <td ng-repeat="data in row.Data">{{data.value}}</td>
        </tr>
        </tbody>
        </table>
        <input type="button" value="Show" ng-click="Show()" />
        `;

        return {
            // restrict: "A",
            scope: {
                src: '=ngModel',  //Row data
                tableClass: '@'         //The Css class of table
            },
            template: template,
            link: function ($scope, $element, $attr) {

                $scope.dragColumn = null;
                $scope.dropColumn = null;
                $scope.Show = function () {
                    console.log($scope.src.columns.dragColumn);
                    console.log($scope.src.columns.dropColumn);

                }

                // $scope.initColumns = function () {

                //     angular.forEach($scope.columns, function (col) {

                //         var queryRslt = $document[0].getElementById(id)
                //         var elem = angular.element(queryRslt);

                //     })


                // }

                // $scope.initColumns();
            },
            controller: function ($scope, $element) {

            }

        }
    })