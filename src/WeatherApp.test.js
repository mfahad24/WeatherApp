import React from 'react';
import { render } from '@testing-library/react';
import WeatherApp from './WeatherApp';

test('renders learn react link', () => {
  const { getByText } = render(<WeatherApp />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
