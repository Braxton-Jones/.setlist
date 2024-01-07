import { useNavigate } from 'react-router-dom'
import styles from '../styles/homepage.module.scss'
import axios from 'axios';
import { access_token } from '../spotifyAuth';
import { useLoaderData } from 'react-router-dom';
export const homepageLoader = async () => {
    const token = await access_token;
    const url = 'https://api.spotify.com/v1/me';
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    try {
        const response = await axios.get(url, config);
        return response.data; // return the data so it can be used elsewhere
    } catch (error) {
        console.error(error);
        throw error;
    }
 };

export default function HomePage() {
  let navigate = useNavigate()
  let user = useLoaderData()
  console.log(user)

  return (
    <section className={styles.homepage}>
        <header>
            <h1>Welcome to Setlist!</h1>
            <div className={styles.display_name}>
                <p>Logged in as {user.display_name}</p>
                <img src={user.images[1].url} alt="profile picture"/>
            </div>
            <div className={styles.homepage__nav}>
                <button onClick={() => navigate('/home')}>Home</button>
                <button onClick={() => navigate('/profile')}>Profile</button>
                <button onClick={() => navigate('/create')}>Create</button>
                <button>Settings</button>
                <button onClick={() => navigate('/logout')}>Logout</button>

            </div>
            <section className={styles.homepage__content}>
                <h2>Playlist that you may like</h2>
                <div className={styles.homepage__content__filters}>
                    <h4>Filters:</h4>
                    <p>UK Garage</p>
                </div>
            </section>
        </header>
    </section>
  )
}

{/* <button onClick={() => navigate('/profile')}>Go to Profile</button>
<button onClick={() => navigate('/search')}>Go to Search</button> */}