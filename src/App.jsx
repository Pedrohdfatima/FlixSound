import React, {useState, useEffect} from "react";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async (code) => {
      const codeVerifier = localStorage.getItem('code_verifier');
      const clientId = 'f3b61241871444a2849aec12cd8a02ab'
     const isProduction = process.env.NODE_ENV === 'production';
    const redirectUri = isProduction
      ? 'https://pedrohdfatima.github.io/FlixSound/' // Sua URL do GitHub Pages
      : 'http://localhost:5174'; // Sua URL local

      const params = new URLSearchParams();
      params.append('client_id', clientId);
      params.append('grant_type', 'authorization_code');
      params.append('code', code);
      params.append('redirect_uri', redirectUri);
      params.append('code_verifier', codeVerifier);

      const result = await fetch('https://accounts.sppotify.com/api/token', {
        method: 'POST',
        headers: {'Content-type' : 'application/x-www-form-urlencoded' },
        body: params,
      });

      const {acess_token} = await result.json();
      setToken(access_token);

      const url = new URL(window.location.href);
      url.searchParams.delete("code");
      window.history.pushState({}, '', url);
     };
     const urlParams = new URLSearchParams(window.location.search);
     const code = urlParams.get('code');

     if (code) {
      fetchToken(code);
     }
  }, []);
  return (
    <div className="App">
      {!token ? (
        <login />
      ): (
        <h1>Logado Com Sucesso!</h1>
      )}
    </div>
  )
}


export default App;