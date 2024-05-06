public without sharing class PersonalDataController {
    public PersonalDataController() {

    }

    @AuraEnabled(cacheable=true)
    public static Personal_Info__c getPersonalData(String userId){
        return [SELECT Id, FirstName__c, LastName__c, Phone__c, Email__c, Birthdate__c
        FROM Personal_Info__c
        WHERE CreatedById = :userId LIMIT 1];
    }
}