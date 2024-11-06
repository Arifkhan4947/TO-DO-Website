import React, { useState, useContext } from 'react';
import clarity_notification from '../assets/clarity_notification.png';
import bi_repeat from '../assets/bi_repeat.png';
import iconoir_calendar from '../assets/iconoir_calendar.png';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useTheme } from '../context/ThemeContext';
import delete_icon from '../assets/delete_icon.png';

const MainContent = ({ tasks, setTasks, pendingTasks, completedTasks }) => {
  const { isDarkMode } = useTheme();
  const [newTask, setNewTask] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Custom styles for the DatePicker
  const getDatePickerStyles = () => `
    .react-datepicker {
      background-color: ${isDarkMode ? '#2A312C' : 'white'};
      border: 1px solid ${isDarkMode ? '#3A423C' : '#E3EBE4'};
      border-radius: 8px;
      font-family: inherit;
    }
    .react-datepicker__header {
      background-color: ${isDarkMode ? '#2A312C' : 'white'};
      border-bottom: 1px solid ${isDarkMode ? '#3A423C' : '#E3EBE4'};
    }
    .react-datepicker__day {
      color: ${isDarkMode ? 'white' : 'black'};
    }
    .react-datepicker__day:hover {
      background-color: ${isDarkMode ? '#3A423C' : '#E3EBE4'};
    }
    .react-datepicker__day--selected {
      background-color: #4CAF50 !important;
      color: white !important;
    }
    .react-datepicker__day--keyboard-selected {
      background-color: #4CAF50 !important;
      color: white !important;
    }
    .react-datepicker__current-month {
      color: ${isDarkMode ? 'white' : 'black'};
    }
    .react-datepicker__day-name {
      color: ${isDarkMode ? 'white' : 'black'};
    }
  `;

  // Add new task
  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj = {
        id: Date.now(),
        text: newTask,
        completed: false,
        important: false
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  // Toggle task completion
  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Toggle task importance
  const toggleImportant = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, important: !task.important } : task
    ));
  };

  // Remove task
  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Task Item Component
  const TaskItem = ({ task }) => (
    <div 
      className="group flex items-center gap-3 p-3 bg-[#F8FAF8] dark:bg-[#2A312C] rounded-lg cursor-pointer hover:bg-[#E3EBE4] dark:hover:bg-[#3A423C] transition-colors"
      onClick={() => {
        setSelectedTask(task);
        setShowTaskDetails(true);
      }}
    >
      <input 
        type="checkbox" 
        checked={task.completed}
        onChange={(e) => {
          e.stopPropagation();
          toggleComplete(task.id);
        }}
        className="w-5 h-5 rounded-sm cursor-pointer accent-[#4CAF50]"
      />
      <span className={`flex-1 ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'dark:text-white'}`}>
        {task.text}
      </span>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          toggleImportant(task.id);
        }}
        className={`w-6 h-6 flex items-center justify-center text-2xl ${task.important ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
      >
        {task.important ? '★' : '☆'}
      </button>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          removeTask(task.id);
        }}
        className="w-6 h-6 flex items-center justify-center text-2xl text-red-500 opacity-0 group-hover:opacity-100"
      >
        ×
      </button>
    </div>
  );

  // Task Details Component
  const TaskDetails = ({ task }) => (
    <div className="h-full flex flex-col">
      {/* Task Content */}
      <div className="flex items-center gap-3 py-4 border-b dark:border-gray-700">
        <input 
          type="checkbox" 
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className="w-5 h-5 rounded-sm cursor-pointer"
        />
        <span className={`flex-1 ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'dark:text-white'}`}>
          {task.text}
        </span>
        <button 
          className="text-2xl text-[#1A1D1B] dark:text-white"
          onClick={() => toggleImportant(task.id)}
        >
          {task.important ? '★' : '☆'}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 py-4">
        <button className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <span className="text-xl">+</span>
          <span>Add Step</span>
        </button>
        <button className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <span>🔔</span>
          <span>Set Reminder</span>
        </button>
        
        {/* Date Picker Button */}
        <div className="relative">
          <button 
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="w-full flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <span>📅</span>
            <span>Add Due Date</span>
          </button>
          
          {showDatePicker && (
            <div className="absolute left-0 mt-2 z-50">
              <style>{getDatePickerStyles()}</style>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setShowDatePicker(false);
                }}
                inline
                calendarClassName="shadow-lg"
                dateFormat="EEE, MMM d"
                minDate={new Date()}
                customInput={<></>}
                popperClassName="datepicker-popper"
                showPopperArrow={false}
              />
              <div className="flex justify-between p-2 bg-white dark:bg-[#2A312C] border-t dark:border-[#3A423C]">
                <button 
                  onClick={() => {
                    setSelectedDate(null);
                    setShowDatePicker(false);
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Clear
                </button>
                <div>
                  <button 
                    onClick={() => setShowDatePicker(false)}
                    className="mr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setShowDatePicker(false)}
                    className="text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <button className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <span>🔄</span>
          <span>Repeat</span>
        </button>
      </div>

      {/* Notes Section */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Add Notes"
          className="w-full p-3 bg-transparent text-gray-700 dark:text-gray-300 outline-none"
        />
      </div>

      {/* Footer/Header moved to bottom */}
      <div className="flex items-center justify-between py-4 border-t dark:border-gray-700 mt-auto">
        <button 
          className="text-xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={() => setShowTaskDetails(false)}
        >
          ×
        </button>
        <span className="text-sm text-gray-500 dark:text-gray-400">Created Today</span>
        <button className="text-red-500 hover:text-gray-600">
          <img src={delete_icon} alt="" height={18} width={18}/>     
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full p-6 overflow-y-auto no-scrollbar mt-[56px]">
      <div className="max-w-[1344px] mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <select className="px-4 py-2 bg-transparent border rounded-lg dark:border-gray-700 dark:text-white focus:outline-none focus:border-[#4CAF50]">
            <option>To Do</option>
          </select>
        </div>

        {/* Add Task Section */}
        <div className="bg-[#F8FAF8] dark:bg-[#2A312C] p-4 rounded-lg mb-6">
          <input 
            type="text" 
            placeholder="Add A Task"
            className="w-full bg-transparent outline-none dark:text-white text-base"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div className="flex items-center gap-4 mt-3">
            <div className="flex gap-4">
              <button className="hover:bg-[#E3EBE4] dark:hover:bg-[#3A423C] p-1 rounded-lg transition-colors">
                <img src={clarity_notification} alt="reminder" className="w-6 h-6 dark:invert" />
              </button>
              <button className="hover:bg-[#E3EBE4] dark:hover:bg-[#3A423C] p-1 rounded-lg transition-colors">
                <img src={bi_repeat} alt="repeat" className="w-6 h-6 dark:invert" />
              </button>
              <button className="hover:bg-[#E3EBE4] dark:hover:bg-[#3A423C] p-1 rounded-lg transition-colors">
                <img src={iconoir_calendar} alt="calendar" className="w-6 h-6 dark:invert" />
              </button>
            </div>
            <button 
              className="ml-auto bg-[#E3EBE4] dark:bg-[#3A423C] px-4 py-2 rounded-lg text-base font-medium hover:bg-[#D1E0D3] dark:hover:bg-[#2F3632] transition-colors"
              onClick={handleAddTask}
            >
              ADD TASK
            </button>
          </div>
        </div>

        {/* Tasks Lists */}
        <div className="space-y-4">
          {/* Pending Tasks */}
          <div className="space-y-2">
            {pendingTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4 text-black dark:text-white">Completed</h3>
              <div className="space-y-2">
                {completedTasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Task Details Sidebar */}
        {showTaskDetails && selectedTask && (
          <div className="fixed inset-y-0 right-0 w-full sm:w-[380px] lg:w-[400px] bg-white dark:bg-[#2A312C] shadow-lg p-4 sm:p-6 z-50">
            <TaskDetails task={selectedTask} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;