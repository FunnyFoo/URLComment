import * as firebase from "firebase/app";
import "firebase/firestore";

const { Timestamp } = firebase.firestore;

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
};

firebase.initializeApp(config);

const db = firebase.firestore();

const postsRef = db.collection("posts");
const commentsRef = db.collection("comments");

const checkPost = (url) => {
  const query = postsRef.where("url", "==", url);
  return query.get().then((querySnapshot) => {
    return { empty: querySnapshot.empty, snapshot: querySnapshot };
  });
};

export const writePost = (title, url) => {
  return checkPost(url).then(({ empty, snapshot }) => {
    if (empty) {
      const data = {
        title,
        url,
        submitted: Timestamp.now(),
      };
      return postsRef.add(data).then((docRef) => ({
        ...data,
        id: docRef.id,
      }));
    }

    const first = snapshot.docs[0];

    return { id: first.id, ...first.data() };
  });
};

export const getCommentsQuery = (postId) => {
  const query = commentsRef
    .where("postId", "==", postId)
    .orderBy("submitted", "asc");
  return query;
};

export const writeComment = (body, postId) => {
  const data = {
    body,
    postId,
    submitted: Timestamp.now(),
  };

  return commentsRef.add(data).then((docRef) => ({ ...data, id: docRef.id }));
};
