import Header from "./components/header/Header";
import { AuthProvider } from "./components";

function App() {
  return (
    <>
      <Header />
      <AuthProvider />
    </>
  );
}

export default App;
