import React, { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { Container, TInput } from './styles';

function Input({ style, icon, enabled, ...rest }, ref) {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color="rgba(255,255,255,.6)" />}
      <TInput
        {...rest}
        ref={ref}
        selectionColor="#3b9eff"
        renderToHardwareTextureAndroid
        editable={enabled}
      />
    </Container>
  );
}

Input.propTypes = {
  enabled: PropTypes.bool,
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Input.defaultProps = {
  enabled: true,
  icon: null,
  style: {},
};

export default forwardRef(Input);
