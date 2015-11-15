/**
 * Created by davidesozzi on 14/11/15.
 */
angular.module('contactApp', [])
    .controller('contactListController', ['$scope', function($scope) {
        $scope.contacts = [
            {
                id: 1,
                name : 'Terrence S. Hatfield',
                tel: '651-603-1723',
                email: 'TerrenceSHatfield@rhyta.com',
                avatar: 'img/faces/1.jpg'
            },
            {
                id: 2,
                name : 'Chris M. Manning',
                tel: '513-307-5859',
                email: 'ChrisMManning@dayrep.com',
                avatar: 'img/faces/2.jpg'
            },
            {
                id: 3,
                name : 'Ricky M. Digiacomo',
                tel: '918-774-0199',
                email: 'RickyMDigiacomo@teleworm.us',
                avatar: 'img/faces/3.jpg'
            },
            {
                id: 4,
                name : 'Michael K. Bayne',
                tel: '702-989-5145',
                email: 'MichaelKBayne@rhyta.com',
                avatar: 'img/faces/4.jpg'
            },
            {
                id: 5,
                name : 'John I. Wilson',
                tel: '318-292-6700',
                email: 'JohnIWilson@dayrep.com',
                avatar: 'img/faces/5.jpg'
            },
            {
                id: 6,
                name : 'Rodolfo P. Robinett',
                tel: '803-557-9815',
                email: 'RodolfoPRobinett@jourrapide.com',
                avatar: 'img/faces/6.jpg'
            }
        ];

        /**
         *
         * @type {null}
         */
        $scope.inEdit = null;

        /**
         *
         * @type {boolean}
         */
        $scope.isNewContact = false;

        /**
         *
         * @type {null}
         */
        $scope.currentContactIdx = null;

        /**
         *
         */
        $scope.saveNewContact = function() {
            var obj = {
                id: $scope.contacts.length,
                avatar: 'img/faces/6.jpg'
            };
            $scope.contacts.push(
                angular.extend({}, obj,$scope.getContactFormFields())
            );

            $scope.inEdit = null;
        };

        /**
         *
         * @param contact
         */
        $scope.delete = function(contact){
            var idx = $scope.contacts.indexOf(contact);
            $scope.contacts.splice(idx,1);
        };

        /**
         *
         * @param contact
         */
        $scope.edit = function(contact){
            $scope.currentContactIdx = $scope.contacts.indexOf(contact);
            $scope.inEdit = angular.copy(contact);

        };

        /**
         *
         */
        $scope.cancelEdit = function(){
            $scope.inEdit = null;
            $scope.isNewContact = false;
            $scope.currentContactIdx = null;
        };

        /**
         *
         */
        $scope.newContact = function(){
            $scope.isNewContact = true;
            $scope.inEdit = {
                name : null,
                tel: null,
                email: null
            };
        };

        /**
         *
         */
        $scope.saveContact = function(){
            if($scope.isNewContact){
                $scope.saveNewContact();
            } else {
                $scope.updateContent();
            }
            $scope.cancelEdit();
        };

        /**
         *
         */
        $scope.updateContent = function(){
            var contact = $scope.contacts[$scope.currentContactIdx];
            angular.extend(contact,$scope.getContactFormFields())
        };

        /**
         *
         * @returns {{name: null, tel: null, email: null}}
         */
        $scope.getContactFormFields = function(){
            return {
                name : $scope.inEdit.name,
                tel: $scope.inEdit.tel,
                email: $scope.inEdit.email
            }
        }
    }]);