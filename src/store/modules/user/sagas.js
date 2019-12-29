import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';

import ActionTypes from './types';
import {
  loadUserRequest,
  loadUserSuccess,
  loadUserFailure,
  updateProfileSuccess,
  updateProfileFailure,
} from './actions';

export function* loadUser() {
  try {
    const { data } = yield call(api.get, 'users');

    yield put(loadUserSuccess(data));
  } catch (err) {
    yield put(loadUserFailure());
  }
}

export function* updateUser({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    yield call(api.put, 'users', profile);

    yield put(loadUserRequest());

    yield put(updateProfileSuccess());

    Alert.alert('Sucesso!', 'Perfil atualizado com sucesso');
  } catch (err) {
    Alert.alert(
      'Falha na atualização',
      'Não foi possível atualizar seu perfil, verifique seus dados e tente novamente',
    );

    yield put(updateProfileFailure());
  }
}

export default all([
  takeLatest(ActionTypes.LOAD_REQUEST, loadUser),
  takeLatest(ActionTypes.UPDATE_REQUEST, updateUser),
]);
