import '../components/sass/Tab.scss';
import { Link } from 'react-router-dom';

const Tab = ({ activeTab, handleTabClick }) => {
  const tabs = [
    { id: 'detail', name: '상품상세정보' },
    { id: 'review', name: '리뷰(57)' },
    { id: 'qna', name: '상품Q&A(2)' },
  ];

  return (
    <ul className="tab-ver1">
      {tabs.map((tab) => (
        <li key={tab.id} className={activeTab === tab.id ? 'active' : ''}>
          <Link onClick={() => handleTabClick(tab.id)}>{tab.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Tab;
