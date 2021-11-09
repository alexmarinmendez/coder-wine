import './App.css';
import {products} from './products';
import SearchArea from './SearchArea';

function App() {

  return (
    <>
      <SearchArea products={products} />
    </>
  );
}

export default App;
