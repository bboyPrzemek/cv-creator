public without sharing class ControlPanelController {
    public ControlPanelController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Section_Order__c> getSections(){
       return [SELECT Id, Name__c, Active__c, Order__c, Name from Section_Order__c WHERE
       Section_Order__c = 'a05J8000000uX7mIAE'  AND Active__c = true ORDER by Order__c ASC];
    }
}