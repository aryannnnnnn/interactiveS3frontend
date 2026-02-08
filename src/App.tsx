import Header from "./components/header/Header";
import { AuthProvider } from "./components";
import AppSidebar from "./components/sidebar/Sidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Toaster } from "sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <div className="flex flex-col min-h-screen w-full">
          <Header />

          <div className="flex flex-1 overflow-hidden">
            <AppSidebar />

            <main className="flex-1 overflow-y-auto">
              <AuthProvider />
            </main>
          </div>
        </div>
      </SidebarProvider>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
