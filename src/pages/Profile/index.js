import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Backgound from '../../components/Background';

// import { Container } from './styles';

export default function Profile() {
  return <Backgound />;
}

Profile.navigationOptions = {
  tabBarLabels: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
