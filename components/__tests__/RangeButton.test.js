import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RangeButton from '../buttons/RangeButton';

describe('<RangeButton />', () => {
  it('should call onPress prop when button is clicked', () => {
    const onPressMock = jest.fn();

    const { getByTestId } = render(
      <RangeButton onPress={onPressMock} text='Test Button' selected={false} />
    );
    const button = getByTestId('range-button');

    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalled();
  });

  it('should display the correct text', () => {
    const { getByText } = render(
      <RangeButton text='Test Button' selected={false} />
    );
    const button = getByText('Test Button');

    expect(button).toBeDefined();
  });
});
