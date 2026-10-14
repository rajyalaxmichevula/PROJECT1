import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

const AppLayout = () => {
  return (
    <div className="h-screen overflow-hidden bg-slate-50">
      <Sidebar />

      <div className="ml-60 h-full">
        <Header />

        <main className="h-full overflow-auto pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
