import Flux from '@4geeksacademy/react-flux-dash';


class Store extends Flux.Store {

    constructor() {
        super();
        this.state = {
            currentBalance:"",
            displayName: "",
            history: "",
            password: "",
            peopleKey: "",
            propertyInfo:{
                email:'',
                mailingAddress:{
                    address:"",
                    address2:"",
                    city:"",
                    state:"",
                    zip:""
                },
            phone:{
                Home:{id:'',value:''},
                Alternate:{id:'',value:''},
                Work:{id:'',value:''}
                },
            },
            registerActivePage: "login",
            registerActiveMobilePage: "loginMobile",
            disputePage: "disputeForm",
            modificationPage: "request",
            displaySection: "pageOneConditionOne",
            resetEmail: "false",
            revoAccountNumber:"",
            revoToken:"",
            transactions: [],
            transactionsDate:"",
            uid: "",
            userInformation: ""
        }
    }

    //Action Methods

    _resetSendView() {
        this.setStoreState({ resetEmail: "false" }).emit()
    }
    
    _setContactInformation(data) {
        let email = data.email
        let address = data.address[0]
        let contactData = data.contactData
        
        let propertyAddress = {
                id: address.id,
                address: address.address,
                address2: address.address2,
                city: "Doral",
                state: "FL",
                zip: "33178",
            }
        let newPhone = {}
        let phone = {
            Alternate: {id:'', value:''},
            Home: {id:'', value:''},
            Work: {id:'', value:''}
        }
        let mailingAddress = {}
        for (let i = 0; i < contactData.length; i++) {
            const key = contactData[i].contacttype
            if (key == 'altAddress') {
                mailingAddress = { 
                    id: contactData[i].id,
                    address: contactData[i].address,
                    address2: contactData[i].address2,
                    city: contactData[i].city,
                    state: contactData[i].state,
                    zip: contactData[i].zip
                }
            } 
            
            if (key == 'phone') {
                if (contactData[i].topsphonetype === 'Alternate') {
                    newPhone = {
                        Alternate: {
                            id: contactData[i].id,
                            value: contactData[i].phone
                        }
                    }
                Object.assign(phone,newPhone)
                }
            
                if (contactData[i].topsphonetype === 'Home') {
                    newPhone = {
                        Home: {
                            id: contactData[i].id,
                            value: contactData[i].phone
                        }
                    }
                Object.assign(phone,newPhone)
                }
                if (contactData[i].topsphonetype === 'Work') {
                    newPhone = {
                        Work: {
                            id: contactData[i].id,
                            value: contactData[i].phone
                        }
                    }
                Object.assign(phone,newPhone)
                }
            }
        }
        if (Object.getOwnPropertyNames(mailingAddress).length === 0) {
            propertyAddress.id = ""
            mailingAddress = propertyAddress
        }
        this.setStoreState ({
            propertyInfo: {
                email: email,
                propertyAddress: propertyAddress,
                mailingAddress: mailingAddress,
                phone: phone
            }
        }).emit()
    }
    _setPossesionData(data){
        this.setStoreState({
                currentBalance:data[0].currentbalance,
                revoAccountNumber:data[0].revoaccountnumber
            })
            .emit()
    }
    
    _setRevoToken(data){
        this.setStoreState({
                revoToken: data.token
            })
            .emit()
    }
    _setState(data) {
        this.setStoreState({
                uid: data.info.id,
                displayName: data.info.firstname,
                peopleKey: data.info.peoplekey
            })
            .emit()
    }
    _setTransactions(data){
        const today = new Date().toJSON().slice(0,10).replace(/-/g,'/')
        this.setStoreState({
                transactions:data,
                transactionsDate:today
            })
            .emit()
    }
    _setUserData(data) {
        this.setStoreState({
                history: data.history,
                pets: data.pets,
                userInformation: data.userInformation,
                vehicles: data.vehicles,
                transactions: data.transactions
            })
            .emit()
    }
    _updateState(update) {
        this.setStoreState(update)
            .emit()
        console.log(this.state.registerActivePage)
    }
    _updateStateEmail(data) {
        this.setStoreState({
            propertyInfo:{email : data.email}
            })
        .emit()
    }

// Views methods

    getCurrentBalance() {
        const currentBalance = this.state.currentBalance
        return currentBalance
    } 
    getEmail(){
        const email = this.state.propertyInfo.email
        return email
    }
    getLoggedInInfo(){
        const userInfo = this.state
        return userInfo
    }
    getPropertyInfo() {
        const propertyInfo = this.state.propertyInfo
        return propertyInfo
    }
    getRevoAccountNumber() {
        const revoAccountNumber = this.state.revoAccountNumber
        return revoAccountNumber
    }
    getRevoToken() {
        const revoToken = this.state.revoToken
        return revoToken
    }
    getTransactions() {
        const transactions = this.state.transactions
        const transactionsDate = this.state.transactionsDate
        const transactionsInfo = [transactions, transactionsDate] 
        return transactionsInfo
    }
    saveAddressToStore(add) {
        this.setStoreState({ address: add }).emit()
    }
}
    
var store = new Store();
export default store;
