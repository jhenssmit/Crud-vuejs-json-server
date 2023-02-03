import axios from "axios";


export class ContactService{
    static serveURL = 'http://localhost:9000';

    static getAllContacts(){
        let dataUrl = `${this.serveURL}/contacts`;
        return axios.get(dataUrl);
    }

    static getContacts(contactId){
        let dataUrl = `${this.serveURL}/contacts/${contactId}`;
        return axios.get(dataUrl);
    }

    static createContact(contact){
        let dataUrl = `${this.serveURL}/contacts/`;
        return axios.post(dataUrl, contact);
    }

    static updateContact(contact, contactId){
        let dataUrl = `${this.serveURL}/contacts/${contactId}`;
        return axios.put(dataUrl, contact);
    }

    static deleteContact(contactId){
        let dataUrl = `${this.serveURL}/contacts/${contactId}`;
        return axios.delete(dataUrl);
    }

    static getAllGroups(){
        let dataUrl = `${this.serveURL}/groups/`;
        return axios.get(dataUrl);
    }

    static getGroup(contact){
        let groupId = contact.groupId;
        let dataUrl = `${this.serveURL}/groups/${groupId}`;
        return axios.get(dataUrl);
    }
}