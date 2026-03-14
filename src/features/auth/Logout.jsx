
import Navbar from '../../shared/components/Navbar';
import { useAuth } from '../auth/Authcontext';
import { useNavigate } from 'react-router-dom';
import '../auth/logout.css';
import { useState } from 'react';


const Logout = () => {

	const [loading, setloading] = useState(false)
	const { logout, currentuser } = useAuth()
    const navigate = useNavigate()
	const handlelogout =  () => {
		try{
			setloading(true)
			logout()
            navigate('/auth/login')
			console.log('logged out successfully')
		} catch (error) {
			console.error('Error occurred while logging out:', error);
		} finally {
			setloading(false)
		}
	}

	return (
		<>
			<Navbar />
			<main className='logout-main'>
				<h1>Logout Page</h1>
				<div className='logout'>
					<div>
						<p>Email: <span>{ currentuser.email}</span></p>
						<button type="button" disabled={loading} onClick={handlelogout}>
                            {loading ? (
                                <span className="loader"></span>
                            ) : (
                                "Logout →"
                            )}
                        </button>
					</div>
				</div>
		</main >
		</>

	);
};

export default Logout;
