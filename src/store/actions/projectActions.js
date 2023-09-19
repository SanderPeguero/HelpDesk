export const createProject = (project) => {
    return (dispatch, getState, { getFirebase }) => {

        const firebase = getFirebase();
        const firestore = firebase.firestore();
        const profile = getState().firebase;
        console.log(profile)
        const authorId = getState().firebase.auth.uid;

        firestore.collection('projects').add({
            ...project,
            authorFirstName: profile.auth.email,
            authorFirstName: profile.auth.displayName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
        }).catch(err => {
            dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
        });
    }
};