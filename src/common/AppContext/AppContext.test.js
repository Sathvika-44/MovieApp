import React from 'react';
import { render, screen,fireEvent } from '@testing-library/react';
import { AppProvider, useAppContext } from './AppContext';

const MockComponent = () => {
  const { currentUser, setCurrentUser, term, setTerm  } = useAppContext();

  return (
    <div>
      <p data-testid="current-user">{currentUser || 'No user logged in'}</p>
      <p data-testid="search-term">{term}</p>
      <button onClick={() => setCurrentUser("Test User")} data-testid="set-user">
        Set User
      </button>
      <button onClick={() => setTerm("New Term")} data-testid="set-term">
        Set Term
      </button>
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
    expect(screen.getByTestId('current-user')).toHaveTextContent('No user logged in');
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
    expect(screen.getByTestId('current-user')).toHaveTextContent('Test User');
  });
  it('allows updating the search term', () => {
    render(
      <AppProvider>
        <MockComponent />
      </AppProvider>
    );

    fireEvent.click(screen.getByText('Set Term'));

    expect(screen.getByTestId('search-term').textContent).toBe("New Term");
  });
});
