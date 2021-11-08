import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Coindata from './Coin';
import './App.css';
function App() {

const [Coins, setCoin] = useState([]);
const [search,setsearch] = useState('');
useEffect(() => {
  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=1000&page=1&sparkline=false')
  .then(res=>{
    setCoin(res.data);
   // console.log(res.data);
  }).catch(error=>{
    console.log(error);
  })
},[]);

const handleChange=(e)=>{
  setsearch(e.target.value);
};
const filteredCoins=Coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));

  return (
    
    <div className="coin-app">
      <h1 className='naam'>CryptoVeda</h1>
      <div className="coin_search">
        <form>
          <input type="text" placeholder='Search Crypto...' className="coin_input" onChange={handleChange}></input>
        </form> 
      </div>
      
        <div className="coin-row">
          <div className="coin">
            <h1 style={{fontSize: 20, color: 'rgb(94, 77, 243)'}}>NAME</h1>
            <p className="coin-symbol head">SYMBOL</p>
          </div>
          <div className="coin_data">
            <p className="coin-price head">PRICE</p>
            <p className="coin-volume head">VOLUME(in cr.)</p>
            <p className="coin-percent head">MARKET</p>
          </div>
        </div>
      {
        filteredCoins.map(coin=>{
          return(
              <Coindata key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              price={coin.current_price}
              volume={coin.total_volume}
              priceChange={coin.price_change_percentage_24h}
              />

          )
        })
      }
    </div>
  );
}

export default App;
