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
        let section = event.currentTarget.closest(".section");

        this.toggle(section);

        publish(this.messageContext, ViewUpdate, {
            'componentName': section.dataset.component
        });
    }

    toggle(section){
        Array.prototype.forEach.call(document.getElementsByClassName('section'), s => {
            s.classList.remove('active');
        });
        section.classList.add('active');

        let slot = document.querySelector('.active .input-slot');
        let disp = slot.style.display;
        slot.style.display = disp == "block" ? "none" : "block";
    }
}
