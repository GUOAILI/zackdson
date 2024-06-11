import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div>
      <main style={{fontSize:'5em'}}>
        <Outlet />
        日夜脑未停留,心力用尽学丘
      </main>
    </div>
  );
}

export default RootLayout;
