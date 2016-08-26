angular.module('anguDragDropTable', [])
    .directive('AnguDragDropTable', function () {

        var template=`
        <table class="tableClass">
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
            restrict: "A",
            scope: {
                localData:'=ngModel',  //Row data
                columns: '=',          //Columns
                tableClass:'@'         //The Css class of table
            },
            template: template,
            link: function ($scope, $element, $attr) {

            },
            controller: function ($scope, $element, $attr) {

            }

        }
    })