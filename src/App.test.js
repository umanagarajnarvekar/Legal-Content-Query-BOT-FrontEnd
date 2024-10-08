import { render, screen } from '@testing-library/react';
import App from './App';
import Login from './component/pages/layout/LoginPage';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('renders login page', () => {
  render(<Login />);
  const username = screen.getByText(/usename/i);
  const password = screen.getByText(/password/i);
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
});
