import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/variables';

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
      ); //map is a function that iteratest the whole array and return an array of same length of the original array(20 latest files)

      setMediaArray(media);
    } catch (error) {
      console.error('List, loadMedia', error);
    }
  };
  useEffect(() => {
    loadMedia();
  }, []); //a hook or a function that gets started each time the component starts. We use it to exit an infinite loop in the app
return {mediaArray}; //it's befind brackets because it is equal to {mediaArray: mediaArray}
};

export {useMedia};
