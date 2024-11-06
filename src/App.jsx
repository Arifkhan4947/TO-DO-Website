import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const taskCounts = {
    all: tasks.length,
    today: tasks.filter(task => {
      const today = new Date().toDateString();
      return task.dueDate === today;
    }).length,
    important: tasks.filter(task => task.important).length,
    planned: tasks.filter(task => task.dueDate).length,
    assigned: 0
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-[#1A1D1B]">
        <Navbar toggleSidebar={toggleSidebar} isOpen={isOpen} />
        <div className="max-w-[1344px] mx-auto flex h-[calc(100vh-56px)]">
          <div 
            className={`
              fixed lg:static 
              top-[150px] 
              lg:mt-[150px]
              -mt-[95px]
              left-0 
              h-[calc(100vh-56px)] 
              w-[280px] 
              bg-[#EEF6EF] dark:bg-[#1E2321]
              transition-transform duration-300 ease-in-out
              ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
              z-40
              shadow-lg lg:shadow-none
            `}
          >
            <Sidebar
              taskCounts={taskCounts}
              pendingTasks={pendingTasks}
              completedTasks={completedTasks}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </div>

          {isOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
          )}

          <main 
            className={`
              flex-1
              w-full lg:w-[calc(100%-280px)]
              transition-all duration-300
              bg-white dark:bg-[#1A1D1B]
              ${isOpen ? 'lg:ml-0' : ''}
              overflow-y-auto
              no-scrollbar
            `}
          >
            <MainContent 
              tasks={tasks} 
              setTasks={setTasks}
              pendingTasks={pendingTasks}
              completedTasks={completedTasks}
            />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;