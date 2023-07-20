import { Router } from './routes/Router';
import Header from './auth/pageComponent/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Router />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
        crossorigin="anonymous"
      />
    </div>
  );
}

export default App;
