import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import TodoList from '../components/TodoList';
// import store from '../redux/store';

test('renders the list of todos', () => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TodoList {...pageProps} />
      </PersistGate>
    </Provider>
  );
  expect(screen.getByText('Get Milk')).toBeInTheDocument();
  expect(screen.getByText('Get Bread')).toBeInTheDocument();
});

test('adds a new todo', () => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TodoList {...pageProps} />
      </PersistGate>
    </Provider>
  );
  const input = screen.getByPlaceholderText('Add new todo');
  const button = screen.getByText('ADD TODO');
  fireEvent.change(input, { target: { value: 'Walk the dog' } });
  fireEvent.click(button);
  expect(screen.getByText('Walk the dog')).toBeInTheDocument();
});

test('removes a todo', () => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TodoList {...pageProps} />
      </PersistGate>
    </Provider>
  );
  const button = screen.getByText('X');
  fireEvent.click(button);
  expect(screen.queryByText('Buy groceries')).not.toBeInTheDocument();
});
