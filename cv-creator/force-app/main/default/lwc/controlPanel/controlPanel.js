import { LightningElement, wire} from 'lwc';
import resources from "@salesforce/resourceUrl/ResumeAppResources";
import { publish, MessageContext } from 'lightning/messageService';
import ViewUpdate from '@salesforce/messageChannel/ViewUpdate__c'

export default class ControlPanel extends LightningElement {
    static renderMode = "light";
    @wire(MessageContext)
    messageContext;

    configurationIcon = resources + '/configuration-icon.png';
    previewIcon = resources + '/preview-icon.png';
    saveIcon = resources + '/save-icon.png';
    downloadIcon = resources + '/download-icon.png';


    handleClick(event) {
        let target = event.currentTarget;
        let section = target.closest(".section");
        let componentName = section.dataset.component;
        console.log(componentName);
        var sections = document.getElementsByClassName('section');

        Array.prototype.forEach.call(sections, s => {
           s.classList.remove('active');
          });
          

        section.classList.add('active');
        publish(this.messageContext, ViewUpdate, {
            'componentName': componentName
        });
    }
}