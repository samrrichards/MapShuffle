import React from 'react';
import ReactDOM from 'react-dom';
import MapShuffle from './MapShuffle';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapShuffle />, div);
});
