import React, { useState } from 'react';
import './sass/Tab.scss';

const ReusableTabs = ({ tabsData }) => {
  const [activeTab, setActiveTab] = useState(tabsData[0]?.id || '');
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  const activeContent = tabsData.find((tab) => tab.id === activeTab)?.content;
  return (
    <div className="tab-container">
      <ul className="tab-ver1">
        {tabsData.map((tab) => (
          <li
            key={tab.id}
            className={tab.id === activeTab ? 'active' : ''}
            onClick={() => handleTabClick(tab.id)}
          >
            <a href="#!">{tab.title}</a>
          </li>
        ))}
      </ul>
      <div
        className="tab-content"
        style={{ border: '1px solid #ccc', padding: '20px', marginTop: '10px' }}
      >
        {activeContent}
      </div>
    </div>
  );
};

export default ReusableTabs;
