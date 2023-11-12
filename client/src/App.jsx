import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import CreateImage from "./pages/CreateImage";
import FavoriteImages from "./pages/FavoriteImages";
import Dumps from "./pages/Dumps";
import PageRecoveryAccount from "./pages/PageRecoveryAccount";
import CodeRecovery from "./pages/CodeRecovery";
import ProtectedRoutesRecovery from "./components/ProtectedRoutesRecovery";
import RecoveryPassword from "./pages/RecoveryPassword";
import Photos from "./pages/Photos";
import Videos from "./pages/Videos";
import Config from "./pages/Config";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/createimage" element={<CreateImage />} />
          <Route path="/favorite" element={<FavoriteImages />} />
          <Route path="/dump" element={<Dumps />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/config/:id" element={<Config />} />
        </Route>
        <Route path="/recoveryaccount" element={<PageRecoveryAccount />} />
        <Route element={<ProtectedRoutesRecovery />}>
          <Route path="/recoverycode" element={<CodeRecovery />} />
          <Route path="/recoverypassword" element={<RecoveryPassword />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
