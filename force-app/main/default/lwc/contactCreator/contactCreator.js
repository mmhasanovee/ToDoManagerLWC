import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import {createRecord} from 'lightning/uiRecordApi';

export default class ContactCreator extends LightningElement {
    objectApiName = CONTACT_OBJECT;
    fields = [FNAME_FIELD, LNAME_FIELD, EMAIL_FIELD];
    accountName = '';
    handleSuccess(event){
        const toastEvent = new ShowToastEvent({
            title: 'Success',
            message: "Record Id: "  + event.detail.id,
            variant: 'info'
        });
        this.dispatchEvent(toastEvent);
    }
    
    //LDS 
    handleButtonClick() {
        console.log('btn is clicked!!!!');
        console.log('accountName: ' + this.accountName);
        const recordInput = {
            apiName: ACCOUNT_OBJECT.objectApiName,
            fields: {
                [ACCOUNT_NAME_FIELD.fieldApiName] : accountName
            }
        };
        createRecord(recordInput)
            .then(account => {
                console.log('Account created successfully!!');
            })
            .catch(error => {
                console.log(error);
            });
    }
}