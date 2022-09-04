import firebase from 'firebase/compat/app';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCLAFoKcjmOq25IK6kRBWzVzT8ZTlJehoA',
  authDomain: 'chat-app-356221.firebaseapp.com',
  projectId: 'chat-app-356221',
  storageBucket: 'chat-app-356221.appspot.com',
  messagingSenderId: '829863441351',
  appId: '1:829863441351:web:92d6b2d75421d213c09fe2',
};

const app = firebase.initializeApp(firebaseConfig);
const storage = getStorage(app);

interface FileUpload {
  setProgress?: (progress: number) => void;
  file: File;
  fileName: string;
}

export const uploadFile = async ({
  file,
  fileName,
  setProgress,
}: FileUpload) => {
  if (!file) return;
  let url = '';

  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  await new Promise((res, req) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        if (setProgress) {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        }
      },
      () => req(new Error('Upload Filed')),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          res(downloadURL);
        });
      }
    );
  })
    .then((res) => {
      if (typeof res === 'string') url = res;
    })
    .catch((error) => console.error(error));

  return { url };
};
