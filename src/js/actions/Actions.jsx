import Flux from '@4geeksacademy/react-flux-dash';
import React from 'react';
import {POST, GET, PUT, UPLOAD} from './utility/api';
import {Session} from './utility/session';
import Store from "../store/Store.jsx"

class Actions extends Flux.Action {

    getContactData(user){
        GET('users/'+user.user.id+"?access_token="+user.access_token)
            .then((data)=>{
                let email = data.email
                GET('Units/?filter[where][accountnumber]='+user.user.info.accountnumber)
                    .then((address)=>{
                        GET('Contacts?filter[where][peoplekey]='+user.user.info.peoplekey+'')
                            .then((contactData)=>{
                                this.dispatch("Store.setContactInformation", {email, address, contactData})
                            })
                            .catch(function(error) {
                                Notify.error(error.message || error);
                                console.error("Failed getting contact information" + error);
                            })
                    })
                    .catch(function(error) {
                        Notify.error(error.message || error);
                        console.log("Failed getting property address" + error)
                    })
            })
            .catch(function(error) {
                Notify.error(error.message || error);
                console.error("Failed getting email" + error);
            })
    }
    getEmail(user){
        GET('users/'+user.user.id+"?access_token="+user.access_token)
            .then((data)=>{
                this.dispatch("Store.updateStateEmail", data)
            })
            .catch(function(error) {
                Notify.error(error.message || error);
                console.error(error);
            });
    }
    getPossesionData(topsOwnerID){
        GET('possesions/?filter[where][topsownerid]='+topsOwnerID)
            .then((data)=>{
                this.dispatch("Store.setPossesionData", data)
            })
            .catch(function(error) {
                Notify.error(error.message || error);
                console.error(error);
            });
    }

    getRevoToken(token,accountNumber){
        fetch('https://eastern-amp-201517.appspot.com/revo/login?access_token='+token, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "paypoint_id": "1212234",
                "account_number": accountNumber
            })
        })
        .then((response)=>{
            return response.json()
        })
        .then((content)=>{
            this.dispatch("Store.setRevoToken", content)
        })
        .catch(function(error) {
            Notify.error(error.message || error);
            console.error(error);
        });
    }

    getTransactions(topsOwnerID){
        GET('transactions/?filter[where][topsownerid]='+topsOwnerID+'&filter[order]=sequencenumber DESC')
            .then((transactionData)=>{
                this.dispatch("Store.setTransactions", transactionData)
            })
            .catch(function(error) {
                Notify.error(error.message || error);
                console.error(error);
            });
    }

    login(email, password,nextPage, history) {

        POST('Users/login', { email, password })
            .then((data)=>{
                const access_token = data.id;
                let user = {
                    id: data.userId,
                    info: {
                        firstName: ''
                    }
                };
                GET('People/findOne?filter[where][uid]='+user.id)
                    .then((data)=>{
                        user.info = data;
                        Session.actions.login({ user, access_token });
                        history.push(nextPage)
                    })
                    .catch(function(error) {
                        Notify.error(error.message || error);
                        alert("Incorrect Password. Please try again");
                    });
            })
            .catch(function(error) {
            Notify.error(error.message || error);
            //console.error(error);
        });
    }

    logout(history) {
        Session.actions.logout();

    }

    resetCurrentPassword (token,oldPassword,newPassword){
        var params = {
            oldPassword: oldPassword,
            newPassword: newPassword
        };

        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }

        var request = {
            method: 'POST',
            headers: {
                'Accept': 'text/html',
                'Content-Type': 'application/x-www-form-urlencoded',
            }, 'redirect' : 'error',
            body: 'oldPassword='+oldPassword+'&newPassword='+newPassword+''
        };

       fetch('https://eastern-amp-201517.appspot.com/api/users/change-password?access_token='+token, request)
        .then((response)=>{
            if(response.ok) {
                alert("Password Changed Successfully")
                return
            }
        throw new Error('Failed request. Please check your password and try again.');
        })
        .catch(function(error) {
          // Notify.error(error.message || error);
           alert("Incorrect Password. Please try again");
           return
        });
    }

    resetPassword(email) {
        fetch('https://eastern-amp-201517.appspot.com/request-password-reset', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               "email": email
            })
        })
        .then((response)=>{
            return response.json()
        })
        .catch(function(error) {
            Notify.error(error.message || error);
            console.error(error);
            return error.json()
        });

    }

    saveAddress(user,data){
        const today = new Date().toJSON().slice(0,10).replace(/-/g,'/')
        let token = user.access_token
        let id = data.mailingAddress.id
        let url = ''
        let fetchMethod = ''
        if (id == "") {
            url = 'https://eastern-amp-201517.appspot.com/api/Contacts?access_token='+token
            fetchMethod = "POST"
        } else {
            url = 'https://eastern-amp-201517.appspot.com/api/Contacts/'+id+'?access_token='+token
            fetchMethod = "PUT"
        }

        let bodyObj = JSON.stringify({
            "id":id,
            "associationid":user.user.info.associationid,
            "possesionid":user.user.info.possesionid,
            "peopleid":user.user.info.id,
            "topsownerid":user.user.info.topsownerid,
            "peoplekey":user.user.info.peoplekey,
            "status":"active",
            "contacttype":"altAddress",
            "contactsource":"website",
            "statuschangeDate":today,
            "address":data.mailingAddress.address,
            "address2":data.mailingAddress.address2,
            "city":data.mailingAddress.city,
            "state":data.mailingAddress.state,
            "zip":data.mailingAddress.zip,
            "createdate":today
            })
        fetch(url, {
            method: fetchMethod,
            headers: {
                'Content-Type': 'application/json'
            },
            body:bodyObj
        })
        .then((response)=>{
            console.log("Success updating address")
            return response.json()
        })
        .catch((error)=>{
            console.log("error updating address")
        })
    }

    savePhone(user,key,phone){
        const today = new Date().toJSON().slice(0,10).replace(/-/g,'/')
        let idPhone = phone.id
        let token = user.access_token
        let url = ''
        let fetchMethod = ''
        phone = phone.value
        if (idPhone == "") {
            url = 'https://eastern-amp-201517.appspot.com/api/Contacts?access_token='+token
            fetchMethod = "POST"
        } else {
            url = 'https://eastern-amp-201517.appspot.com/api/Contacts/'+idPhone+'?access_token='+token
            fetchMethod = "PUT"
        }

        let bodyObj = JSON.stringify({
            "id":idPhone,
            "associationid":user.user.info.associationid,
            "possesionid":user.user.info.possesionid,
            "peopleid":user.user.info.id,
            "topsownerid":user.user.info.topsownerid,
            "peoplekey":user.user.info.peoplekey,
            "status":"active",
            "contacttype":"phone",
            "contactsource":"website",
            "topsphonetype":key,
            "phone":phone,
            "createdate":today
            })
        fetch(url, {
            method: fetchMethod,
            headers: {
                'Content-Type': 'application/json'
            },
            body:bodyObj
        })
        .then((response)=>{
            console.log("Success updating: "+key)
        })
        .catch((error)=>{
            console.log("error updating: "+key)
        })
    }

    submitArchitectural(user, data,propertyInfo) {
        const today = new Date().toJSON().slice(0,10).replace(/-/g,'/')
        fetch('https://prod-00.westus.logic.azure.com:443/workflows/28153c1f9b924de391fcdf093e7f2878/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=aVWZr6jrCmtWZmOHWa8HpxIbaHiZETkYt-1iTvdWo_o', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
	           "ticketNumber": today,
                "dateRequested": today,
                "associationName": "Vintage Estates",
                "accountNumber":user.accountnumber,
                "ownerName": user.firstname+" "+user.lastname,
                "ownerAddress": propertyInfo.mailingAddress.address,
                "ownerAddress2": propertyInfo.mailingAddress.address2,
                "ownerCity": propertyInfo.mailingAddress.city,
                "ownerState": propertyInfo.mailingAddress.state,
                "ownerZip": propertyInfo.mailingAddress.zip,
                "ownerEmail": propertyInfo.email,
                "ownerPhone": propertyInfo.phone.Alternate.value,
                "startDate": data.startdate,
                "numberOfDays": data.duration,
                "modificationRequested": data.modificationrequested,
                "CompanyName": data.companyname,
                "contactName": data.contactname,
                "companyAddress": data.address,
                "companyAddress2": data.address2,
                "companyCity": data.city,
                "companyState": data.state,
                "companyZip": data.zip,
                "companyEmail": data.email,
                "companyPhone": data.phone
            })
        })
        .then((response)=>{
            return response.json()
        })
        .catch(function(error) {
            console.error(error);
            return error.json()
        });
    }

    updateStore(update) {
        this.dispatch("Store.updateState", update)
    }

    uploadFiles(files){
        files.forEach((file) => {
            var formData = new FormData();
            formData.append('file', file);
            UPLOAD('Containers/ams-file-storage/upload',formData)
            .then((resp)=>{
                Notify.success("File uploaded: "+resp.result.files.file[0].name);
                //this.dinpm run buildspatch("Store.setUserFiles", contactData)
            })
            .catch(function(error) {
                Notify.error(error.message || error);
                console.error(error);
            });
        });
    }
}

var actions = new Actions();
export default actions;
