import Header from "./components/header/Header";
import { AuthProvider } from "./components";
import AppSidebar from "./components/sidebar/Sidebar";
import { SidebarProvider, SidebarInset } from "./components/ui/sidebar";

function App() {
  return (
    <>
      {/*<Header/> */}
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <AuthProvider />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

export default App;
