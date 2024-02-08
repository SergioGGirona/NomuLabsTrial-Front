import "./App.css";
import { Login } from "./components/login/login";
function App() {
  return (
    <>
      <img src="./favicon.png" alt="Logo of coockbook" />
      <h1>Cookbook</h1>
      <p>The social network for recipe pirates</p>

      <Login />
    </>
  );
}

export default App;
