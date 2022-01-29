import React,{useState,useEffect} from 'react';
import './App.css';
import { Title } from './components/Title';
import Dropdown from './components/Dropdown';
import Artist  from './components/Artist';
import { Credentials } from './components/Credentials';
import axios from 'axios';

const App = () => {

  const spotify = Credentials();  

  console.log('RENDERING APP.JS');

  const data = [
    {value: 1, name: 'A'},
    {value: 2, name: 'B'},
    {value: 3, name: 'C'},
  ]; 

  const [token, setToken] = useState('');
  const [category, setCategory] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [artists, setArtists] = useState([]);
  


  useEffect(() => {

    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => { 
      console.log(tokenResponse.data.access_token)     
      setToken(tokenResponse.data.access_token);

      axios('https://api.spotify.com/v1/browse/categories', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then (genreResponse => {        
        setCategory(genreResponse.data.categories.items)
      });
      
    });

  }, []); 
 

  const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search?&limit=1", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: searchKey,
            type: "artist"
        }
    })

    setArtists(data.artists.items);
    console.log(data.artists.items);
}


  return (
    <div className="container ">
      
        <form onSubmit={searchArtists}>
          <Title>Search Artist</Title>
          <label className="form-label col-sm-2">Category</label>         
          <Dropdown options={category} />
          <label className="form-label col-sm-2">Artist</label>   
          <input 
            type="text" placeholder='Search To Artist' required 
            onChange={e => setSearchKey(e.target.value)}class="form-control form-control-sm col-md-12" /> 
          <div>
            <button type={'submit'} className="btn col-sm-6">Search</button>
          </div>
          <Artist art={artists} /> 
        </form>
    </div> 
  );
}



export default App;
