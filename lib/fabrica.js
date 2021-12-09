export function getFirestore() {
  return firebase.firestore();
}

export function getAuth() {
  // @ts-ignore
  return firebase.auth();
}

export function getStorage() {
  // @ts-ignore
  return firebase.storage();
}