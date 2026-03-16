import { useState } from "react";
import "../components/sidebar.css";
import { Link } from 'react-router-dom';
const Sidebar = ({ children }) => {

    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="sidebar-layout">

            <aside className={collapsed ? "sidebar collapsed" : "sidebar"}>

                <button
                    className="toggle-btn"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    ☰
                </button>

                <nav className="sidebar-nav">
                    <ul>
                        <li className={location.pathname.includes('dashboard') ? 'active' : ''}>
                            <Link to="/dashboard/dashboard">Dashboard</Link>
                        </li>
                        <li className={location.pathname.includes('expense') ? 'active' : ''}>
                            <Link to="/expense/expense">Expense</Link>
                        </li>
                        <li className={location.pathname.includes('income') ? 'active' : ''}>
                            <Link to="/income/income">Income</Link>
                        </li>
                        <li className={location.pathname.includes('history') ? 'active' : ''}>
                            <Link to="/history/history">History</Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className="content">
                {children}
            </main>

        </div>
    );
}

export default Sidebar;