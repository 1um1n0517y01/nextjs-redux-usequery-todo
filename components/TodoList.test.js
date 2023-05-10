import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import TodoList from './TodoList';
import { addTodo, removeTodo } from '../redux/action';

const mockStore = configureMockStore();

describe('TodoList', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      todoReducer: {
        list: [
          { id: 1, data: 'Get Milk' },
          { id: 2, data: 'Get Bread' },
        ],
      },
    });
  });

  it('should render the input field and task list', () => {
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    const inputField = screen.getByPlaceholderText('Add new todo');
    const taskList = screen.getAllByTestId('task-item');
    expect(inputField).toBeInTheDocument();
    expect(taskList.length).toBe(2);
  });

  it('should add a task when the user submits the form', () => {
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    const inputField = screen.getByPlaceholderText('Add new todo');
    fireEvent.change(inputField, { target: { value: 'New task' } });
    fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter' });

    const taskList = screen.getAllByTestId('task-item');
    expect(taskList.length).toBe(3);
    expect(store.getActions()).toContainEqual(addTodo('New task'));
  });

  it('should remove a task when the user clicks the X button', () => {
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    const taskList = screen.getAllByTestId('task-item');
    const removeButton = taskList[0].querySelector('button');
    fireEvent.click(removeButton);

    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    expect(store.getActions()).toContainEqual(removeTodo(1));
  });
});
