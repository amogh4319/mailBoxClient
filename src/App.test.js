import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome link', () => {
  render(<App />);
  const linkElement = screen.getByText('Welcome');
  expect(linkElement).toBeInTheDocument();
});
