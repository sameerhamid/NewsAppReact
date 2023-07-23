
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [news, setNews] = useState([]);
  const [serach, setSearch] = useState('react')
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react')
  const fetchNews = () => {
    setLoading(true)
    fetch(url).then(res => res.json()).then(data => {
      setNews(data.hits)
      setLoading(false)
    }).catch(err => {
      console.log(err);
    })
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setUrl(`http://hn.algolia.com/api/v1/search?query=${serach}`)
  }

  useEffect(() => {
    fetchNews()
  }, [url])

  return (
    <div className="App">
      <h1>News</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={serach} onChange={handleChange} style={{ border: '1px solid black', height: '20px', padding: '15px', fontSize: '18px', outline: 'none', marginRight: '20px', borderRadius: '30px', width: '350px' }} />
        <button style={{ border: 'none', backgroundColor: 'black', color: 'white', fontWeight: 'bold', padding: '15px', fontSize: '20px', borderRadius: '30px' }} type='submit'>Search</button>
      </form>

      {loading ? (<h1>Loading...</h1>) : news.map((n, i) => <p key={i} style={{ color: 'purple' }}>{n.title}</p>)}
    </div>
  );
}

export default App;
