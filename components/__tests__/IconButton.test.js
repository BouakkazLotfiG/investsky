import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import IconButton from '../buttons/IconButton';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => 'FontAwesomeIcon',
}));

describe('<IconButton />', () => {
  it('should call onPress prop when button is clicked', () => {
    const onPressMock = jest.fn();
    const iconMock = 'mock-icon';

    const { getByTestId } = render(
      <IconButton onPress={onPressMock} icon={iconMock} />
    );
    const button = getByTestId('icon-button');

    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalled();
  });
});
