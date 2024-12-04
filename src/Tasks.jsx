import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo, addTodo, completedTodo } from './todoSlice';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import circle from './assets/circle.png';
import check from './assets/tick.png';

function Tasks() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const todos = useSelector(state => state.todos);
  const [date, setDate] = useState(dayjs());
  const [show, setShow] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editDesc, setEditDesc] = useState('');

  const [filter, setFilter] = useState('All');
  const [showFilter, setShowFilter] = useState(false);

  const filterRef = useRef(null);

  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (title.trim() && desc.trim()) {
      dispatch(addTodo({ title, desc, date: date ? date.format('MM-DD-YYYY') : 'No Date' }));
      setTitle('');
      setDesc('');
      setDate(null);
      setOpen(false);
    }
  };

  const handleShow = (id) => {
    setShow((prevShow) => ({
      ...prevShow,
      [id]: !prevShow[id],
    }));
  };

  // Handle task completion toggle
  const handleBullet = (id) => {
    dispatch(completedTodo({ id })); 
  };

  const handleEdit = (id, currentText) => {
    setEditId(id);
    setEditDesc(currentText);
  };

  const handleSaveEdit = (id) => {
    if (editDesc.trim()) {
      dispatch(updateTodo({ id, desc: editDesc }));
      setEditId(null);
      setEditDesc('');
    }
  };

  //check for overdue
  const isOverdue = (date) => {
    const taskDate = dayjs(date);
    return taskDate.isBefore(dayjs(), 'day'); 
  };

  //sorting task
  const sortedTask = [...todos].sort((a, b) => {
    if (a.completed === b.completed) return 0; 
    return a.completed ? 1 : -1; 
  })
  .filter(todo => {
    if (filter === 'Completed') return todo.completed;
    if (filter === 'Pending') return !todo.completed;
    if (filter === 'Overdue') return isOverdue(todo.date) && !todo.completed;
    return true; 
  })

  //toggle filter for better ui
  const toggleFilter = () => {
    setShowFilter(prev => !prev); 
  };

   // Close the filter on click
   useEffect(() => {
    const handleClickOutside = (event) => {
     
      if (
        filterRef.current && !filterRef.current.contains(event.target) && 
        !document.getElementById('hamburger').contains(event.target)
      ) {
        setShowFilter(false);  
      }
    };
  
    document.addEventListener('click', handleClickOutside);
  
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  return (
    <div id="group">
      <div id="part">
      
        
        <ul id="part2">
          <li id="main">
            <i className="fa-solid fa-user"></i>
            <span id="email">JohnDoe@email.com</span>
          </li>
          <li id="fill">Filters:</li>
          <li className="filter" onClick={() => setFilter('All')}>All Task</li>
          <li className="filter" onClick={() => setFilter('Completed')}>Completed Task</li>
          <li className="filter" onClick={() => setFilter('Pending')}>Pending Task</li>
          <li className="filter" onClick={() => setFilter('Overdue')}>Overdue Task</li>
          
        </ul>
    
     </div>

     <div
        id="filter-section"
        ref={filterRef}  
        style={{
          visibility: showFilter ? 'visible' : 'hidden',  
          opacity: showFilter ? 1 : 0,   
          transition: 'visibility 0s, opacity 0.5s ease-in-out',  
         
        }}
      >
        <ul id="part2">
          <li id="main">
            <i className="fa-solid fa-user"></i>
            <span id="email">JohnDoe@email.com</span>
          </li>
          <li id="fill">Filters:</li>
          <li className="filter" onClick={() => setFilter('All')}>All Task</li>
          <li className="filter" onClick={() => setFilter('Completed')}>Completed Task</li>
          <li className="filter" onClick={() => setFilter('Pending')}>Pending Task</li>
          <li className="filter" onClick={() => setFilter('Overdue')}>Overdue Task</li>
          
        </ul>
      </div>
      <div className="task" >
        <div className="head">
        <div
          id="hamburger"
          onClick={toggleFilter}
          style={{
            cursor: "pointer",
            fontSize: "30px",
          }}
        >
          <i className="fa fa-bars"></i> 
        </div>
          <h1>My Tasks</h1>
          <button onClick={() => setOpen(true)}>Add Task</button>
        </div>

        {/* Task List */}
        <ul className="listobj">
          {sortedTask.map((todo) => (
              <li className="list" key={todo.id} style={{ height: show[todo.id] ? '12rem' : 'fit-content' }}>
                <div id="function">
                  <div id="bullet">
                    <img
                      src={todo.completed ? check : circle}
                      width="40px"
                      id="circle"
                      onClick={() => handleBullet(todo.id)} // Toggle completion on bullet click
                    />
                    <div className="text" onClick={() => handleShow(todo.id)}>
                      {todo.title}
                    </div>
                  </div>
                  <br />
                  {show[todo.id] && (
                    <>
                      {editId === todo.id ? (
                        <>
                          <textarea
                            id="textdesc"
                            type="text"
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                          ></textarea>
                          <button id="save" onClick={() => handleSaveEdit(todo.id)}>
                            Save
                          </button>
                        </>
                      ) : (
                        <div className="desc">{todo.desc}</div>
                      )}
                      <pre>
                        <br />
                        <div className="date">{todo.date}</div>
                      </pre>
                      <br />
                    </>
                  )}
                </div>
                <div>
                  <button
                    id="edit"
                    style={{ display: show[todo.id] ? 'block' : 'none' }}
                    onClick={() => handleEdit(todo.id, todo.desc)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(removeTodo(todo.id))}
                    id="list-btn"
                    style={{ marginBottom: show[todo.id] ? '5rem' : '0rem' }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>

      {/* Add Task Popup */}
      {open && (
        <div className="popup">
          <div className="popup-content">
            <h3>Add New Task</h3>
            
            <input
            id="input1"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
            />
            <br />
            <textarea
              name="text"
              id="field"
              placeholder="Enter Task"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <p id='dueDate'>Select Due Date</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={date} onChange={(newValue) => setDate(newValue)} />
            </LocalizationProvider>

            <div className="popup-btn">
              <button onClick={handleAddTask}>Add</button>
              <button onClick={() => setOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks;
