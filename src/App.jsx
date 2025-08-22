import "./styles/navbar-footer.scss";
import Navbar from './components/Navbar';
import Dashboard from './components/DashboardTickets';
import RenderTickets from './components/RenderTickets';
import Footer from './components/Footer';


function App() {

  return (
    <>
      <Navbar />
      <main className="main-content">
        <RenderTickets />
        <Dashboard />
      </main>
      <Footer />
    </>
  )
}

export default App
