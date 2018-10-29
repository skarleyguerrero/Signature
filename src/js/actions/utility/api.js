/* global localStorage, fetch */
import Actions from '../Actions.jsx';
import {Session} from './session';

const rootAPIendpoint = process.env.apiHost+'/api';

let HEADERS = {
  'Content-Type': 'application/json'
};

const getToken = () => {
  if (Session) {
    const token = Session.store.getSession().access_token;
    return token;
  }
  return null;
};

const appendExtra = (data) => {
  if (Session && data) {
    //data.employer = Session.store.getSession().user.profile.employer;
    return data;
  }
};

/* AVAILABLE MODELS
  - badges
  - employees
  - employers
  - favlists
  - positions
  - profiles
  - shifts
  - venues
  - oauth/token (generate token)
  - tokenuser (get user data from local saved token)
*/

/**
 * Fetch JSON from API through GET method
 * @param {string} model Model data to be fetched. **Must be plural**
 * @returns {data}
 */
export const GET = (model, id = null, extraHeaders = {}) => {
  let path = `${rootAPIendpoint}/${model}`;
  if(id) path += '/'+id;
  const response = fetch(path, {
    method: 'GET',
    headers: new Headers({
      ...HEADERS,
      ...extraHeaders,
      Authorization: `JWT ${getToken()}`
    })
  })
  .then((resp) =>{
    return resp.json(); 
  })
  .then((data) => {
      if (data.detail) {
        Actions.logout();
        return 0;
      }
      return data;
  })
  .catch(err => {
    throw new Error(`Could not GET models from API due to -> ${err}`);
  });
  
  return response;
};

export const POST = (model, postData, extraHeaders = {}) => {
  
  if(['register', 'login'].indexOf(model) == -1){
    HEADERS['Authorization'] = `JWT ${getToken()}`;
    postData = appendExtra(postData);
  } 
  const REQ = {
    method: 'POST',
    headers: Object.assign(HEADERS,extraHeaders),
    body: JSON.stringify(postData)
  };
  
  const response = fetch(`${rootAPIendpoint}/${model}`, REQ)
    .then((resp) => {
      if(resp.status == 400) throw new Error('Bad Request');
      const data = resp.json();
      return data;
    })
    .catch(err => {
      throw new Error(`Could not POST model to API due to -> ${err}`);
    });
  // if (data.detail) {
  //   logout();
  //   return 0;
  // }
  return response;
};

export const UPLOAD = (model, formData, extraHeaders = {}) => {
  
  if(['register', 'login'].indexOf(model) == -1){
    HEADERS['Authorization'] = `JWT ${getToken()}`;
    delete HEADERS['Content-Type'];
  } 
  const REQ = {
    method: 'POST',
    headers: HEADERS,
    body: formData
  };
  
  const response = fetch(`${rootAPIendpoint}/${model}`, REQ)
    .then((resp) => {
      if(resp.status == 400) throw new Error('Bad Request');
      const data = resp.json();
      return data;
    })
    .catch(err => {
      throw new Error(`Could not POST model to API due to -> ${err}`);
    });
  // if (data.detail) {
  //   logout();
  //   return 0;
  // }
  return response;
};

export const PUT = (model, id, putData, extraHeaders = {}) => {
    putData = appendExtra(putData);
    return fetch(`${rootAPIendpoint}/${model}/${id}`, {
        method: 'PUT',
        headers: new Headers({
          ...HEADERS,
          ...extraHeaders,
          Authorization: `JWT ${getToken()}`
        }),
        body: putData
    })
    .then((resp) => resp.json())
    .then((data) => {
        if (data.detail) {
            Actions.logout();
            return 0;
        }
        return data;
    })
    .catch(err => {
        throw new Error(`Could not UPDATE model on API due to -> ${err}`);
    });
};

export const PATCH = (model, id, putData, extraHeaders = {}) => {
    putData = appendExtra(putData);
    return fetch(`${rootAPIendpoint}/${model}/${id}`, {
        method: 'PATCH',
        headers: new Headers({
          ...HEADERS,
          ...extraHeaders,
          Authorization: `JWT ${getToken()}`
        }),
        body: putData
    })
    .then((resp) => resp.json())
    .then((data) => {
        if (data.detail) {
            Actions.logout();
            return 0;
        }
        return data;
    })
    .catch(err => {
        throw new Error(`Could not UPDATE model on API due to -> ${err}`);
    });
};

export const DELETE = (model, id = '', extraHeaders = {}) => {
    return fetch(`${rootAPIendpoint}/${model}/${id}`, {
        method: 'DELETE',
        headers: new Headers({
          ...HEADERS,
          extraHeaders
        })
    }).catch(err => {
        throw new Error(`Could not GET models from API due to -> ${err}`);
    });
};