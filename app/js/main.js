/**
 * Created by davidesozzi on 14/11/15.
 */
angular.module('contactApp', [])
    .controller('contactListController', function() {
        var contactList = this;
        contactList.contacts = [
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
        contactList.inEdit = null;

        /**
         *
         * @type {boolean}
         */
        contactList.isNewContact = false;

        /**
         *
         * @type {null}
         */
        contactList.currentContactIdx = null;

        /**
         *
         */
        contactList.addContact = function() {
            var obj = {
                id: this.contacts.length,
                avatar: 'img/faces/6.jpg'
            };
            contactList.contacts.push(
                angular.extend({}, obj,this.getContactFormFields())
            );

            contactList.inEdit = null;
        };

        /**
         *
         * @param contact
         */
        contactList.delete = function(contact){
            var idx = this.contacts.indexOf(contact);
            this.contacts.splice(idx,1);
        };

        /**
         *
         * @param contact
         */
        contactList.edit = function(contact){
            this.currentContactIdx = this.contacts.indexOf(contact);
            this.inEdit = angular.copy(contact);;
        };

        /**
         *
         */
        contactList.cancelEdit = function(){
            this.inEdit = null;
            this.isNewContact = false;
            this.currentContactIdx = null;
        };

        /**
         *
         */
        contactList.newContact = function(){
            this.isNewContact = true;
            this.inEdit = {
                name : null,
                tel: null,
                email: null
            };
        };

        /**
         *
         */
        contactList.saveContact = function(){
            if(this.isNewContact){
                this.addContact();
            } else {
                this.updateContent();
            }
            this.cancelEdit();
        };

        /**
         *
         */
        contactList.updateContent = function(){
            var contact = this.contacts[this.currentContactIdx];
            angular.extend(contact,this.getContactFormFields())
        };

        /**
         *
         * @returns {{name: null, tel: null, email: null}}
         */
        contactList.getContactFormFields = function(){
            return {
                name : contactList.inEdit.name,
                tel: contactList.inEdit.tel,
                email: contactList.inEdit.email
            }
        }
    });