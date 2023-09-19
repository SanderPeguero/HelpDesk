import React from 'react'
import './index.css';
import { render } from 'react-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import rootReducer from './store/reducers/rootReducer'
import thunk from 'redux-thunk'
import fbConfig from './config/fbConfig'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
//import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, applyMiddleware, compose } from 'redux'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
import { createFirestoreInstance, reduxFirestore } from 'redux-firestore'

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  createFirestoreInstance: true
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)
firebase.firestore()
firebase.auth()

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase})),
    reduxFirestore(fbConfig), // redux bindings for firestore
  )
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

function Apps() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

render(<Apps/>, document.getElementById('root'));
registerServiceWorker()