import React from 'react';
import profile from '../assets/profile.png';

const Sidebar = ({ taskCounts = {}, pendingTasks = [], completedTasks = [], isOpen, setIsOpen }) => {
  // Provide default values for taskCounts
  const {
    all = 0,
    today = 0,
    important = 0,
    planned = 0,
    assigned = 0
  } = taskCounts;

  // Calculate progress percentage
  const totalTasks = pendingTasks.length + completedTasks.length;
  const completionPercentage = totalTasks === 0 ? 0 : (completedTasks.length / totalTasks) * 100;
  
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const completedOffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <aside className="h-full p-6 overflow-y-auto lg:-mt-20 no-scrollbar">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <img src={profile} alt="" height={100} width={100}/>
        <h2 className="text-xl font-semibold mb-2 dark:text-white">Hey, ABCD</h2>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-2 mb-8">
        <a href="#" className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <span>📋</span>
          <span>All Tasks</span>
          <span className="ml-auto">{all}</span>
        </a>
        <a href="#" className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <span>📅</span>
          <span>Today</span>
          <span className="ml-auto">{today}</span>
        </a>
        <a href="#" className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <span>⭐</span>
          <span>Important</span>
          <span className="ml-auto">{important}</span>
        </a>
        <a href="#" className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <span>📊</span>
          <span>Planned</span>
          <span className="ml-auto">{planned}</span>
        </a>
        <a href="#" className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <span>👥</span>
          <span>Assigned to me</span>
          <span className="ml-auto">{assigned}</span>
        </a>
      </nav>

      {/* Today's Tasks Count */}
      <div className="bg-white dark:bg-[#1A1D1B] p-4 rounded-lg mb-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-gray-700 dark:text-gray-300 text-sm">Today Tasks</span>
            <button className="text-gray-400 hover:text-gray-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </button>
          </div>
          <span className="text-2xl font-medium text-gray-800 dark:text-white">{all}</span>
        </div>

        {/* Progress Circle */}
        <div className="relative h-auto pb-4 w-full aspect-square">
          <svg 
            className="w-full h-full -rotate-90 transform"
            viewBox="0 0 100 100"
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#E3EBE4"
              strokeWidth="20"
              className="dark:stroke-[#2D5F30]"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#4CAF50"
              strokeWidth="20"
              strokeDasharray="251.2"
              strokeDashoffset={`${251.2 * (1 - completionPercentage / 100)}`}
              className="transition-all duration-500"
            />
          </svg>

          {/* Legend */}
          <div className="absolute h-auto py-2 left-2 flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#4CAF50]"></div>
              <span className="text-gray-600 dark:text-gray-400">Pending</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#2D5F30]"></div>
              <span className="text-gray-600 dark:text-gray-400">Done</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;