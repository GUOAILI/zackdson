import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
