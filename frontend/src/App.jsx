import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import HealthInfo from './components/HealthInfo';
import About from './components/About';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <HealthInfo />
        <About />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;
