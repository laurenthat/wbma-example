import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/variables';

const doFetch = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json(); // or return await response.json();
  if (!response.ok) {
    const message = json.error
      ? `${json.message}: ${json.error}`
      : json.message;
    throw new Error(message || response.statusText);
  }
  return json;
};

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    try {
      const response = await fetch(baseUrl + 'media');
      const json = await response.json();
      const media = await Promise.all(
        json.map(async (file) => {
          const fileResponse = await fetch(baseUrl + 'media/' + file.file_id);
          return await fileResponse.json();
        })
      ); // map is a function that iteratest the whole array and return an array of same length of the original array(20 latest files)

      setMediaArray(media);
    } catch (error) {
      console.error('List, loadMedia', error);
    }
  };
  useEffect(() => {
    loadMedia();
  }, []); // a hook or a function that gets started each time the component starts. We use it to exit an infinite loop in the app
  return {mediaArray}; // it's befind brackets because it is equal to {mediaArray: mediaArray}
};

const useAuthentication = () => {
  const postLogin = async (userCredentials) => {
    // user credentials format: {username: 'someUsername', password: 'somePassword'}
    const options = {
      // TODO: add method, headers and body for sending json data with POST
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };
    try {
      // TODO: use fetch to send request to login endpoint and return the result as json, handle errors with try/catch and response.ok
      const loginResult = await doFetch(baseUrl + 'login', options);
      return loginResult;
    } catch (error) {
      throw new Error('postLogin: ' + error.message);
    }
  };

  return {postLogin};
};

// https://media.mw.metropolia.fi/wbma/docs/#api-User
const useUser = () => {
  // https://media.mw.metropolia.fi/wbma/docs/#api-User-CheckUserName
  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      // TODO: use fetch to send request to login endpoint and return the result as json, handle errors with try/catch and response.ok
      return await doFetch(baseUrl + 'users/user', options);
    } catch (error) {
      throw new Error('getUserByToken: ' + error.message);
    }
  };
  // delete user const deleteUser
  // add a new user const addUser
  return {getUserByToken};
};

export {useMedia, useAuthentication, useUser};
