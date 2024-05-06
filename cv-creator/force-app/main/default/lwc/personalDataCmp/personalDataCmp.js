import { LightningElement, wire, track} from 'lwc';
import avatar from "@salesforce/resourceUrl/avatar";
import getPersonalData from '@salesforce/apex/PersonalDataController.getPersonalData';


export default class PersonalDataCmp extends LightningElement {
   
    avatarIcon = avatar + '/avatar.png';

    @wire(getPersonalData, { userId : '00509000007LAUHAA4'})
    personalData;

}