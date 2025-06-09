import React from "react";

const Login = () => {
    const handleLogin = async () => {
        const clientId = 'f3b61241871444a2849aec12cd8a02ab'
        const isProduction = process.env.NODE_ENV === 'production';
        const redirectUri = isProduction
            ? 'https://pedrohdfatima.github.io/FlixSound/' // Sua URL do GitHub Pages
                : 'http://localhost:5174'; // Sua URL local

        const generateRandomString = (length) => {
            let text = ''
            const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            for (let i = 0; i < length; i++){
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text
        };
         const generateCodeChallenge = async (codeVerifier) => {
      const data = new TextEncoder().encode(codeVerifier);
      const digest = await window.crypto.subtle.digest('SHA-256', data);
      return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    };
    
    const codeVerifier = generateRandomString(128);
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    localStorage.setItem('code_verifier', codeVerifier);

    const scope = 'suer-read-private user-read-email streaming user-read-playback-state user-modify-playback-state';
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    const params = {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri
    }

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  };

  return (
    <div>
      <h1>FlixSound</h1>
      <button onClick={handleLogin}>Login com Spotify</button>
    </div>
  );
};

export default Login;

