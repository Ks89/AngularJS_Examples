angular.module('dynamicFormApp')
    .directive('formElement', [function () {

        return {
            restrict: 'E',
            require: '^form',
            scope: true,

            //compile is only used in the rarest of cases, where you need to do major
            //DOM transformations at runtime.
            //In a majority of cases, you might be able to accomplish the same with tranclusion or pure link function.
            compile: function ($element, $attrs) {
                var expectedInputAttrs = {
                    'required': 'required',
                    'ng-minlength': 'ngMinlength',
                    'ng-pattern': 'ngPattern'
                    //More here to be implemented
                };

                //start extracing content from the html
                var validationKeys = $element.find('validation');
                var presentValidationKeys = {};
                var inputName = $attrs.name;
                angular.forEach(validationKeys, function (validationKey) {
                    validationKey = angular.element(validationKey);
                    presentValidationKeys[validationKey.attr('key')] = validationKey.text();
                });


                //Start generating final element html
                var elementHtml = '<div>' +
                    '<label>' + $attrs.label + '</label>';
                elementHtml += '<input type="' + $attrs.type +
                    '" name="' + inputName +
                    '" ng-model="' + $attrs.bindTo + '"';
                $element.removeAttr('type');
                $element.removeAttr('name');
                for (var i in expectedInputAttrs) {
                    if ($attrs[expectedInputAttrs[i]] !== undefined) {
                        elementHtml += ' ' + i + '="' + $attrs[expectedInputAttrs[i]] + '"';
                    }
                    $element.removeAttr(i);
                }

                elementHtml += '>';

                elementHtml +=
                    '<span ng-repeat="(key,text) in validators" ' +
                    ' ng-show="hasError(key)"' +
                    ' ng-bind="text"></span>';

                elementHtml += '</div>';
                $element.html(elementHtml);

                //return a post-link which adds the validators array and a hasError function to show each of the
                //validation messages under the correct conditions. This uses the form controller,
                //which was required by the directive as per the standards defined in chap4.
                return function ($scope, $element, $attrs, formCtrl) {
                    $scope.validators = angular.copy(presentValidationKeys);
                    $scope.hasError = function (key) {
                        return formCtrl[inputName]['$error'][key];
                    };
                };
            }
        };
    }]);
