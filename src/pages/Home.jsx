import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>蓝城市滨海区初高中学习辅助系统</h1>
      <button type='submit' onClick={() => navigate('/nav')}>进入主题</button>
    </div>
  );
}

export default HomePage;