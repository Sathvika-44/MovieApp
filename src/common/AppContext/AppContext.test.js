import React from 'react';
import { render, screen,fireEvent } from '@testing-library/react';
import { AppProvider, useAppContext } from './AppContext';

const MockComponent = () => {
  const { currentUser, setCurrentUser } = useAppContext();

  return (
    <div>
      <p data-testid="user">{currentUser || 'No user logged in'}</p>
      <button onClick={() => setCurrentUser('Test User')}>Set User</button>
    </div>
  );
};

describe('AppContext', () => {
  test('provides default values', () => {
    render(
      <AppProvider>
        <MockComponent />
      </AppProvider>
    );

    // Check default value of currentUser
    expect(screen.getByTestId('user')).toHaveTextContent('No user logged in');
  });

  test('updates currentUser value', () => {
    render(
      <AppProvider>
        <MockComponent />
      </AppProvider>
    );

    // Simulate user interaction to update context
    fireEvent.click(screen.getByText('Set User'));

    // Verify the context value is updated
    expect(screen.getByTestId('user')).toHaveTextContent('Test User');
  });
});
