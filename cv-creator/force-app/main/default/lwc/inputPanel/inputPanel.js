import { LightningElement, wire} from 'lwc';
import {subscribe, MessageContext} from 'lightning/messageService';
import ViewUpdate from '@salesforce/messageChannel/ViewUpdate__c';


export default class InputPanel extends LightningElement {
    static renderMode = "light";
    @wire(MessageContext)
    messageContext;
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
        let wrapper = document.querySelector('.input-wrapper');
        subscribe(this.messageContext, ViewUpdate, (message) => this.loadView(message,document.querySelector('.active .input-slot'), wrapper));

        //refactor

        this.injectInputCmp(document.querySelector('.active .input-slot'), wrapper);
        window.addEventListener('resize', () => {
            this.injectInputCmp(document.querySelector('.active .input-slot'), wrapper);
        });
    }

    loadView(componentName,cmp,cmp2) {
        this.injectInputCmp(cmp, cmp2, componentName);

        this.a = false;
        this.b = false;
        this.c = false;
        this.d = false;
        this.e = false;
        this.f = false;
        this.g = false;
        this.h = false;

        if (componentName.componentName == "educationCmp") {
            this.b = true;
        } else if (componentName.componentName == "personalDataCmp") {
            this.a = true;
        } else if (componentName.componentName == "skillsCmp") {
            this.d = true;
        } else if (componentName.componentName == "languagesCmp") {
            this.e = true;
        } else if (componentName.componentName == "interestsCmp") {
            this.f = true;
        } else if (componentName.componentName == "aboutCmp") {
            this.g = true;
        } else if (componentName.componentName == "clauseCmp") {
            this.h = true;
        } else {
            this.c = true;
        }
    }

    injectInputCmp(cmp, cmp2, message) {
        if (window.innerWidth < 1024) {
            if (!this.isAppended || message) {
                cmp.append(document.querySelector('.input-container'));
                this.isAppended = true;
            }
        } else {
            this.isAppended = false;
            cmp2.append(document.querySelector('.input-container'));
        }
    }
}