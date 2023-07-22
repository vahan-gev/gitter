import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";

const CLIENT_ID = "aca02b2a6277ef27921d";

function App() {
  const [userData, setUserData] = useState({});
  const [gistsData, setGistsData] = useState([]);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");

    if (codeParam && !localStorage.getItem("accessToken")) {
      getAccessToken(codeParam);
    }
  }, []);

  async function getAccessToken(code) {
    try {
      const response = await fetch(`http://localhost:4000/getAccessToken?code=${code}`);
      const data = await response.json();
      console.log(data);
      if (data.access_token) {
        localStorage.setItem("accessToken", data.access_token);
        getUserData(data.access_token);
      }
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  }

  async function getUserData(accessToken) {
    try {
      const response = await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle token expiration or invalid token here
      localStorage.removeItem("accessToken");
    }
  }


  async function fetchGistsData() {
    if(Object.keys(userData).length !== 0 ) {
      try {
        const response = await fetch(`https://api.github.com/users/${userData.login}/gists`);
        console.log(`Fetching: https://api.github.com/users/${userData.login}/gists`)
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setGistsData(data);
        } else {
          console.error("Error fetching gists data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching gists data:", error);
      }
    }
  }

  function loginWithGithub() {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
    );
  }

  function logout() {
    localStorage.removeItem("accessToken");
    setUserData({});
  }

  return (
    <>
    <Header></Header>
      <div>
        {localStorage.getItem("accessToken") ? (
          <>
            <h1>Logged in</h1>
            <button onClick={logout}>Log out</button>
            <h3>Get user data from GitHub API</h3>
            <button onClick={() => getUserData(localStorage.getItem("accessToken"))}>Get data</button>
            {Object.keys(userData).length !== 0 ? (
              <>
                <h4>Hey there {userData.login}</h4>
              </>
            ) : (
              <></>
            )}
            <button onClick={fetchGistsData}>Fetch Gists Data</button>
            {gistsData.length !== 0 ? (
          <div>
            <h3>Gists:</h3>
            <ul>
              {gistsData.map((gist) => (
                <li key={gist.id}>
                  <a href={gist.html_url} target="_blank" rel="noopener noreferrer">
                    {gist.description || "Untitled Gist"}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Click the button to fetch gists data.</p>
        )}
          </>
        ) : (
          <>
            <h1>User is not logged in</h1>
            <button onClick={loginWithGithub}>Login with GitHub</button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
