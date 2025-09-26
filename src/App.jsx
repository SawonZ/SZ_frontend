import { useEffect } from "react"
import { useAuth } from "./store/useUserStore";
import Home from './pages/Home';

function App() {
  const {userInfo} = useAuth();

  useEffect(() => {
    userInfo();
  }, [userInfo]);

  return (
      <Home />
  )
}

export default App
