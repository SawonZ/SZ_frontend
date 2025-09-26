import { useEffect } from "react"
import { useAuth } from "./store/useUserStore";
import Main from "./pages/Main";

function App() {
  const {userInfo} = useAuth();

  useEffect(() => {
    userInfo();
  }, [userInfo]);

  return (
      <Main />
  )
}

export default App
