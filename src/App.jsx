import { useEffect } from "react"
import { useAuth } from "./store/useUserStore";
import Main from "./pages/Main";

function App() {
  const {userInfo, user} = useAuth();

  useEffect(() => {
    userInfo();
  }, [userInfo]);

  return (
      <>
        <p>{user.userName}</p>
      </>
  )
}

export default App
