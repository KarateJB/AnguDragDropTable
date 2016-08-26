angular.module('anguDragDropTable', [])
    .directive('anguDragDropTable', function () {

        var template = `
        <table ng-class="tableClass">
        <thead>
        <tr>
        <td ng-repeat="col in columns">{{col.title}}<td>
        </tr>
        </thead>
        <tbody>
        <tr ng-repeat="row in localData">
           <td ng-repeat="data in row.Data">{{data.value}}</td>
        </tr>
        </tbody>
        </table>
        `;

        return {
            // restrict: "A",
            scope: {
                localData: '=ngModel',  //Row data
                columns: '=',          //Columns
                tableClass: '@'         //The Css class of table
            },
            template: template,
            link: function ($scope, $element, $attr) {
                console.log($scope.tableClass);
            },
            controller: function ($scope, $element) {

            }

        }
    })