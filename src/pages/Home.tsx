import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Trophy,
  ArrowRight,
  CheckCircle,
  School,
  Sparkles,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { getSupabaseData } from "@/lib/supabaseHelpers";
import { motion } from "framer-motion";

interface Event {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  category: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  attendees: number;
  published: boolean;
}

const Home = () => {
  const navigate = useNavigate();
  const [recentHighlights, setRecentHighlights] = useState<Event[]>([]);

  useEffect(() => {
    loadRecentHighlights();
  }, []);

  const loadRecentHighlights = async () => {
    try {
      const events = await getSupabaseData<Event[]>('royal-academy-events', []);

      // Filter published events and get the 3 most recent
      const publishedEvents = events.filter(e => e.published);
      const sortedEvents = publishedEvents.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });

      setRecentHighlights(sortedEvents.slice(0, 3));
    } catch (error) {
      console.error("Error loading recent highlights:", error);
      setRecentHighlights([]);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />

      {/* Recent Highlights */}
      <section className="section-padding bg-gradient-to-b from-background via-muted/5 to-accent/5">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-black dark:text-foreground">
              Recent <span className="text-gradient-gold">Highlights</span>
            </h2>
            <p className="text-xl text-black dark:text-foreground max-w-3xl mx-auto leading-relaxed">
              Celebrating our recent achievements and events
            </p>
          </div>

          {recentHighlights.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>No recent highlights available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentHighlights.map((highlight) => (
                <div
                  key={highlight.id}
                  onClick={() => navigate(`/events/${highlight.id}`)}
                  className="glass-card cursor-pointer overflow-hidden group transition-transform hover:scale-105 hover:-translate-y-2"
                >
                  {highlight.imageUrl && (
                    <div className="h-48 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                      <img
                        src={highlight.imageUrl}
                        alt={highlight.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute bottom-4 left-4 right-4 z-20">
                        <div className="flex items-center space-x-2 text-xs text-gold mb-2">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(highlight.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {!highlight.imageUrl && (
                    <div className="h-48 relative overflow-hidden bg-gradient-to-br from-royal/20 to-crimson/20 flex items-center justify-center">
                      <div className="text-center">
                        <Calendar className="h-12 w-12 mx-auto mb-2 text-gold" />
                        <div className="text-xs text-muted-foreground">
                          {new Date(highlight.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-heading font-bold text-black dark:text-foreground group-hover:text-gold transition-colors">
                      {highlight.title}
                    </h3>

                    <p className="text-sm text-black dark:text-muted-foreground leading-relaxed line-clamp-3">
                      {highlight.description}
                    </p>

                    {highlight.fullContent && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-gold uppercase tracking-wider">Highlights:</p>
                        <div className="space-y-1">
                          {highlight.fullContent.split('\n').slice(0, 3).map((line, i) => (
                            line.trim() && (
                              <div key={i} className="flex items-start space-x-2 text-xs text-black dark:text-muted-foreground">
                                <CheckCircle className="h-3 w-3 text-gold mt-0.5 flex-shrink-0" />
                                <span className="line-clamp-1">{line.trim()}</span>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    )}

                    <Button variant="outline" className="w-full mt-4 group-hover:bg-gold group-hover:text-black transition-all glass-button">
                      View Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button 
              onClick={() => navigate('/events')}
              className="glass-button text-black hover:text-gold hover:shadow-lg transition-colors duration-300"
            >
              View All Events & News
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Newsletter Signup */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
            className="text-center bg-gradient-to-r from-royal/10 via-crimson/5 to-royal/10 p-16 rounded-2xl border border-border"
          >
            <h3 className="text-4xl font-heading font-bold mb-6 text-black dark:text-foreground">Stay Updated</h3>
            <p className="text-xl text-black dark:text-muted-foreground mb-8 max-w-3xl mx-auto">
              Subscribe to our newsletter to receive updates about upcoming events, academic achievements, and school news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-gold text-black dark:text-foreground"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-gold px-6 py-3 font-semibold rounded-lg text-black"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <CookieConsentBanner />
    </div>
  );
};

export default Home;