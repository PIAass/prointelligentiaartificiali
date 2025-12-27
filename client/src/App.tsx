import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/hooks/use-language";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Pages
import Home from "@/pages/Home";
import Mission from "@/pages/Mission";
import Areas from "@/pages/Areas";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Events from "@/pages/Events";
import Courses from "@/pages/Courses";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <Switch>
          <Route path="/">
            <Redirect to="/it" />
          </Route>

          {/* Static Pages per language */}
          <Route path="/:lang" component={Home} />
          <Route path="/:lang/mission" component={Mission} />
          <Route path="/:lang/areas" component={Areas} />
          <Route path="/:lang/services" component={Services} />
          <Route path="/:lang/contact" component={Contact} />
          <Route path="/:lang/events" component={Events} />
          <Route path="/:lang/courses" component={Courses} />

          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router />
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
