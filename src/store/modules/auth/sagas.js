import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

// import history from '~/services/history';
import api from '../../../services/api';

import { signInSuccess, signFailure, signUpSuccess } from './actions';
import ActionTypes from './types';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const { data } = yield call(api.post, 'sessions', { email, password });

    const { token } = data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert('Erro no login', 'Verifique os seus dados');

    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    yield put(signUpSuccess());

    // history.push('/');
  } catch (error) {
    Alert.alert('Erro no cadastro', 'Verifique os seus dados');

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) {
    return;
  }

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(ActionTypes.SIGN_IN_REQUEST, signIn),
  takeLatest(ActionTypes.SIGN_UP_REQUEST, signUp),
  takeLatest(ActionTypes.SIGN_OUT, signOut),
]);
