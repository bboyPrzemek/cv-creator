import { LightningElement, wire} from 'lwc';
import resources from "@salesforce/resourceUrl/ResumeAppResources";
import { publish, MessageContext } from 'lightning/messageService';
import ViewUpdate from '@salesforce/messageChannel/ViewUpdate__c'
import getSections from '@salesforce/apex/ControlPanelController.getSections';

export default class ControlPanel extends LightningElement {
    static renderMode = "light";
    isAppended = false;

    @wire(MessageContext) messageContext;
    @wire(getSections) sections;

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

    renderedCallback(){
        if (window.innerWidth < 1024) {
            this.injectInputCmp();
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth < 1024) {
                this.injectInputCmp();
            }else {
                this.unInjectInputCmp();
            }
        });
    }

    injectInputCmp() {
        let input_slot = document.querySelector('.active .input-slot');
        if (input_slot) {
            if (!this.isAppended) {
                input_slot.append(document.querySelector('.input-container'));
                this.isAppended = true;
             }
        }
    }

    unInjectInputCmp(){
        this.isAppended = false;
        document.querySelector('.input-wrapper').append(document.querySelector('.input-container'));
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
