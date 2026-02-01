import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { AuthProvider } from "./components";

function App() {
  return (
    <>
      <Header />
      <AuthProvider />
      <Footer />
    </>
  );
}

export default App;
