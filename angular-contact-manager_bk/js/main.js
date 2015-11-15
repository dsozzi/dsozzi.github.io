/**
 * Created by davidesozzi on 14/11/15.
 */
var dependencies = [];
if (typeof APP_TEST !== "undefined")
    dependencies.push("ngMock");

var contactApp = angular.module('contactApp', dependencies)
    .controller('contactListController', ['$scope', function($scope) {

        /**
         * The contact list. Ideally they are fetched from a service
         * @type {*[]}
         */
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
         * The bridge between the controller and the view. When this object is declared, the
         * edit/new form appear. It allows us to determine when in editing mode
         * @type {null}
         */
        $scope.inEdit = null;


        /**
         * When creating a new contact we use this Boolean to keep track it
         * @type {boolean}
         */
        $scope.isNewContact = false;


        /**
         * Current editing contact index.
         * //TODO use the index for a confirmation message upon delete
         * @type {null}
         */
        $scope.currentContactIdx = null;


        /**
         * Function called when filled the form correctly and creating a new contact.
         * We assign a new id and an avatar. Ideally the avatar should be decided upon creation.
         */
        $scope.saveNewContact = function() {
            var obj = {
                id: $scope.contacts.length,
                avatar: $scope.getAvatar()
            };
            $scope.contacts.push(
                angular.extend({}, obj,$scope.getContactFormFields())
            );

            $scope.inEdit = null;
        };


        /**
         * Function which deletes the contact from the list
         * @param contact {Object} contact in the contact list
         */
        $scope.delete = function(contact){
            var idx = $scope.contacts.indexOf(contact);
            $scope.contacts.splice(idx,1);
        };


        /**
         * Function called when clicked the edit button in the contact
         * @param contact {Object} contact in the contact list
         */
        $scope.edit = function(contact){
            $scope.currentContactIdx = $scope.contacts.indexOf(contact);
            $scope.inEdit = angular.copy(contact);

        };


        /**
         * Function which reset the app status
         */
        $scope.cancelEdit = function(){
            $scope.inEdit = null;
            $scope.isNewContact = false;
            $scope.currentContactIdx = null;
        };

        /**
         * When clicked the New Contact button we prepare the app status
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
         * Function called when confirming the form submission. We evaluate if it's a new contact or
         * a simple edit.
         */
        $scope.saveContact = function(){
            if($scope.isNewContact){
                $scope.saveNewContact();
            } else {
                $scope.updateContact();
            }
            $scope.cancelEdit();
        };


        /**
         * Update the contact
         */
        $scope.updateContact = function(){
            var contact = $scope.contacts[$scope.currentContactIdx];
            angular.extend(contact,$scope.getContactFormFields())
        };


        /**
         * Utility to get the form values
         * @returns {{name: null, tel: null, email: null}}
         */
        $scope.getContactFormFields = function(){
            return {
                name : $scope.inEdit.name,
                tel: $scope.inEdit.tel,
                email: $scope.inEdit.email
            }
        }

        
        /**
         * Utility to get the avatar path
         * @returns {string} The image path
         */
        $scope.getAvatar = function(){

            var num =  Math.floor(Math.random()*(15-1+1)+1);
            return 'img/faces/'+ num +'.jpg'
        }

    }]);