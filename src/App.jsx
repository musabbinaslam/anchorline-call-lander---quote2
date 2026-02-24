import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import WhyChooseUs from './components/WhyChooseUs'
import Stats from './components/Stats'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'
import PrivacyNotice from './pages/PrivacyNotice'
import TermsConditions from './pages/TermsConditions'
import './App.css'

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Stats />
      <CallToAction />
    </>
  )
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }

    // Handle scroll to hash on load or location change
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location])

  return (
    <div className="app">
      <Header scrolled={scrolled} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<PrivacyNotice />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App


