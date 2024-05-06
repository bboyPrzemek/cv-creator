import { LightningElement } from 'lwc';
import resources from "@salesforce/resourceUrl/ResumeAppResources";


export default class TopBar extends LightningElement {
    logo = resources + '/logo.png';
}