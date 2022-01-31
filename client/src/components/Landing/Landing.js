import { Link } from 'react-router-dom';

export default function Landing(){
    return(
        <div className='landing'>
            <h1>The Dogs App</h1>
            <h1>Show me some Dogs</h1>
            <Link to="/home">
                <button>Home</button>
            </Link>
        </div>
    )
};