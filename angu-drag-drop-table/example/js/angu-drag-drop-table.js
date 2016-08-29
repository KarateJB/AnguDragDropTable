angular.module('anguDragDropTable', ['ngSanitize'])
    .directive('anguDragCol', function ($timeout, $document) {

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
    .directive('anguDropCol', function ($timeout, $document) {

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
    .directive('anguDragRow', function ($timeout, $document) {

        return {
            // restrict: "A",
            scope: {
                rows: "=ngModel",
                isShowVirtualRow: "="
            },
            link: function ($scope, $element, $attr) {

                $element.bind('dragstart', function (event) {

                    var dragRowId = event.target.id;
                    var isStop = false;
                    var index = 0;
                    angular.forEach($scope.rows.data, function (row) {
                        if (!isStop) {
                            if (dragRowId === ("angu_drag-drop_row_" + index.toString())) {
                                $scope.rows.dragRow =row;
                                $scope.$apply();
                                isStop = true;

                            }
                        }

                        index++;
                    })
                })

            },
            controller: function ($scope, $element) {

            }

        }
    })
    .directive('anguDropRow', function ($timeout, $document) {

        return {
            // restrict: "A",
            scope: {
                rows: "=ngModel"
            },
            link: function ($scope, $element, $attr) {

                // var queryRslt = $document[0].getElementById($scope.elemId);
                // var elem = angular.element(queryRslt);

                $element.bind('drop', function (event) {

                    var dropRowId = event.target.id;

                    var isStop = false;
                    var index = 0;
                    angular.forEach($scope.rows.data, function (row) {
                        if (!isStop) {
                            if (dropRowId === ("angu_drag-drop_row_" + index.toString())) {
                                $scope.rows.dropRow = row;
                                $scope.$apply();
                                isStop = true;
                            }
                        }

                        index++;
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

        var template =
            '<input type ="hidden" ng-model="columns.dragColumn" value="{{columns.dragColumn.id}}" />' +
            '<input type ="hidden" ng-model="columns.dropColumn" value="{{columns.dropColumn.id}}" />' +
            '<table ng-class="tableClass" ng-style="tableStyle">' +
            '<thead>' +
            '<tr>' +
            '<td class="col-sm-1"></td>' +
            '<td ng-class="colCellClass" ng-repeat="col in src.columns.data | orderBy:\'order\'">' +
            '<table><tr><td>' +
            '<div class="col-sm-10 text-center" angu-drag-col ng-model="src.columns" id="{{col.id}}" draggable="true">' +
            '{{col.title}}' +
            '</div></td>' +
            '<td><div style="width:30px;height:30px" angu-drop-col ng-model="src.columns" >' +
            '<img style="width:100%;height:100%" src="../../example/image/drop.jpg" id="{{col.id}}" ></img>' +
            '</div></td>' +
            '</tr></table>' +
            '</td>' +
            '</tr>' +
            '</thead>' +
            '<tbody ng-repeat="rowdata in src.rows.data">' +
            // '<tr ng-show="src.rows.isShowVirtualRow" class="virtualRow" ><td colspan="{{row.data.length}}"></td></tr>' +
            // '<tr draggable="true" id="row_{{$index}}" angu-drag-row ng-model="src.rows">' +
            '<tr>' +
            '<td>' +
            '<table><tr>' +
            '<td><div style="width:30px;height:30px" class="circle" draggable="true"  angu-drag-row ng-model="src.rows">' +
            '<img style="width:100%;height:100%" src="../../example/image/recycling.png" id="angu_drag-drop_row_{{$index}}"></img>' +
            '</div></td>' +
            '<td><div style="width:30px;height:30px" class="circle" angu-drop-row ng-model="src.rows">' +
            '<img style="width:100%;height:100%" src="../../example/image/drop.jpg" id="angu_drag-drop_row_{{$index}}" ></img>' +
            '</div></td>' +
            '</tr></table>' +
            '</td>' +
            '<td ng-class="rowCellClass" ng-repeat="data in rowdata.cells | orderBy:\'order\'">' +
            '<span ng-if="data.value">{{data.value}}</span>' +
            '<span ng-if="data.html" ng-bind-html="data.html"></span>' +
            '</td>' +
            '</tr>'
        '</tbody>' +
            '</table>';

        return {
            // restrict: "A",
            scope: {
                src: '=ngModel',        //The source includes columns and rows
                tableClass: '@',        //The Css class of table
                tableStyle: '@',        //The style of table
                colCellClass: '@',      //The Css class of thead>tr>td
                rowCellClass: '@'       //The Css class of tbody>tr>td
            },
            template: template,
            link: function ($scope, $element, $attr) {

                $scope.src.rows.isShowVirtualRow = false;

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
                            if (col.id === $scope.src.columns.dragColumn.id) {
                                $timeout(function () {
                                    col.order = dropColOrder;

                                }, 100)
                                // console.log(col.title + "'s order changes to " + col.order);
                                isStopDg = true;
                            }
                        }
                        if (!isStopDp) {
                            if (col.id === $scope.src.columns.dropColumn.id) {
                                $timeout(function () {
                                    col.order = dragColOrder;
                                }, 100)
                                // console.log(col.title + "'s order changes to " + col.order);
                                isStopDp = true;
                            }
                        }
                    })

                    //Set the new order of row value
                    angular.forEach($scope.src.rows.data, function (row) {
                        angular.forEach(row.cells, function (rowdata) {
                            if (rowdata.column) {
                                var isStopSearchCol = false;
                                angular.forEach($scope.src.columns.data, function (col) {
                                    if (!isStopSearchCol) {
                                        if (rowdata.column === col.id) {
                                            $timeout(function () {
                                                rowdata.order = col.order;
                                            }, 100);
                                            isStopSearchCol = false;
                                        }
                                    }
                                })
                            }
                            else {
                                rowdata.order = 0;
                            }
                        })
                    })

                    $scope.src.columns.dragColumn = {};
                    $scope.src.columns.dropColumn = {};

                })


                $scope.$watch('src.rows.dropRow', function (newValue, oldValue) {

                    console.log(newValue);

                    if (!newValue || newValue == null || newValue == {})
                        return;
                    else {
                        var dragRow = $scope.src.rows.dragRow;
                        var dropRow = $scope.src.rows.dropRow;

                        //Deep clone the dragRow
                        var cloneDragRow = JSON.parse(JSON.stringify(dragRow));

                        //Remove dragRow
                        var removeIdx = $scope.src.rows.data.indexOf(dragRow);
                        $scope.src.rows.data.splice(removeIdx, 1);

                        //Splice for inserting on dropRow index
                        var dropIdx = $scope.src.rows.data.findIndex(x => x === dropRow);
                        $scope.src.rows.data.splice(dropIdx+1, 0, cloneDragRow);
                    }
                })

            },
            controller: function ($scope, $element) {

            }

        }
    })