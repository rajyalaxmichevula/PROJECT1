import { Outlet } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-60">
        <Header />

        <main className="min-h-screen pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
