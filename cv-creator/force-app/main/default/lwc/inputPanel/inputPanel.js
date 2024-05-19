import { LightningElement, wire} from 'lwc';
import {subscribe, MessageContext} from 'lightning/messageService';
import ViewUpdate from '@salesforce/messageChannel/ViewUpdate__c';


export default class InputPanel extends LightningElement {
    static renderMode = "light";
    @wire(MessageContext) messageContext;
    subscription = null;

    a = true;
    b = false;
    c = false;
    d = false;
    e = false;
    f = false;
    g = false;
    h = false;
    isAppended = false;

    renderedCallback() {
        if (!this.subscription){
            this.subscription = subscribe(this.messageContext, ViewUpdate, (message) => {
                this.loadView(message);

                if (window.innerWidth < 1024) {
                    console.log(message);
                    if (message) {
                        this.injectInputCmp();
                    }
                } else {
                    this.uninjectInputCmp();
                }
            });
        }
    }

    loadView(componentName) {
        this.a = false;
        this.b = false;
        this.c = false;
        this.d = false;
        this.e = false;
        this.f = false;
        this.g = false;
        this.h = false;

        if (componentName.componentName == "education") {
            this.b = true;
        } else if (componentName.componentName == "personal") {
            this.a = true;
        } else if (componentName.componentName == "skills") {
            this.d = true;
        } else if (componentName.componentName == "lang") {
            this.e = true;
        } else if (componentName.componentName == "interests") {
            this.f = true;
        } else if (componentName.componentName == "about") {
            this.g = true;
        } else if (componentName.componentName == "clause") {
            this.h = true;
        } else {
            this.c = true;
        }
        this.isAppended = false;
    }

    injectInputCmp() {
            let input_slot = document.querySelector('.active .input-slot')
            if (!this.isAppended) {
                input_slot.append(document.querySelector('.input-container'));
                this.isAppended = true;
            }
    }
    uninjectInputCmp(){
        this.isAppended = false;
        document.querySelector('.input-wrapper').append(document.querySelector('.input-container'));
    }
}