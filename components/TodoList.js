import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo } from '../redux/action';

const TodoList = () => {
  const [inputEvent, setInputEvent] = useState('');
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.todoReducer.list);

  const handleSubmit = () => {
    if (inputEvent.trim() === '') return;
    dispatch(addTodo(inputEvent));
    setInputEvent('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className='flex flex-col gap-4 p-8 rounded-lg shadow-lg space-y-8'>
      <h2 className='flex justify-center font-bold text-orange-300 text-xl'>
        TODO
      </h2>
      <div className='space-x-4'>
        <input
          type='text'
          onChange={(e) => setInputEvent(e.target.value)}
          onKeyDown={handleKeyDown}
          value={inputEvent}
          placeholder='Add new todo'
          className='pl-4 p-3 border-2 border-orange-200 w-96 rounded-md outline-orange-200'
        />
      </div>

      {selector.map((item) => {
        return (
          <div
            key={item.id}
            className='flex justify-between border-b border-orange-100 !mt-3'
          >
            <p className='font-normal italic'>{item.data}</p>
            <button
              onClick={() => dispatch(removeTodo(item.id))}
              className='px-3 rounded-md text-grey hover:text-orange-400'
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
