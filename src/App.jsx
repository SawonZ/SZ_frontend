import { useEffect } from "react"
import { useAuth } from "./store/useUserStore";
import Home from './pages/Home';

function App() {
  const {login} = useAuth();

  useEffect(() => {
    login();
  }, [login]);

  return (
      <Home />
  )
}

export default App
