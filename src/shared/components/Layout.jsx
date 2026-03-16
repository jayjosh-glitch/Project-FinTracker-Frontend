import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../components/layout.css";
import Footer from "./Footer";

function Layout({ children }) {

	return (

		 <div className="layout">

      <Navbar />                        {/* full width — top */}

      <div className="middle-section">  {/* row: sidebar + content */}
        <Sidebar />
        <main className="page-content">
          {children}
        </main>
      </div>

      <Footer />                        {/* full width — bottom */}

    </div>

	);

}

export default Layout;