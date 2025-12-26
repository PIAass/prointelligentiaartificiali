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
import ContentList from "@/pages/ContentList";
import ContentDetail from "@/pages/ContentDetail";
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

          {/* Dynamic Content Pages */}
          <Route path="/:lang/blog">
            <ContentList 
              type="blog" 
              title="Blog & Risorse" 
              description="Articoli, guide e riflessioni sulla sovranità digitale." 
            />
          </Route>
          
          <Route path="/:lang/events">
            <ContentList 
              type="events" 
              title="Eventi" 
              description="Webinar, workshop e incontri dal vivo." 
            />
          </Route>

          <Route path="/:lang/courses">
            <ContentList 
              type="courses" 
              title="Formazione" 
              description="Corsi professionali per accrescere le tue competenze digitali." 
            />
          </Route>

          <Route path="/:lang/projects">
            <ContentList 
              type="projects" 
              title="Progetti" 
              description="Iniziative concrete per la comunità e il territorio." 
            />
          </Route>

          {/* Content Detail Pages */}
          <Route path="/:lang/blog/:slug">
            <ContentDetail type="blog" />
          </Route>
          <Route path="/:lang/events/:slug">
            <ContentDetail type="events" />
          </Route>
          <Route path="/:lang/courses/:slug">
            <ContentDetail type="courses" />
          </Route>
          <Route path="/:lang/projects/:slug">
            <ContentDetail type="projects" />
          </Route>

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
