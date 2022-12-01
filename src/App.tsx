import React, {useEffect} from 'react';
import Button from '@mui/material/Button';

function App() {
    const BASE_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        fetch(`${BASE_URL}/security/`).then(res => res.text()).then(textData => {
            console.log(textData)
        }).catch(console.error)
    }, [BASE_URL])

    const register = async () => {
        fetch(`${BASE_URL}/security/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: null,
                identity: "980623065020",
                pin: "123456",
                phoneNumber: "+60199523110",
                role: "SUPERUSER"
            })
        }).then(res => res.json()).then(jsonData => {
            console.log(jsonData)
        }).catch(console.error)
    }

    const login = async () => {
        fetch(`${BASE_URL}/security/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identity: "980623065020",
                pin: "123456"
            })
        }).then(res => res.text()).then(textData => {
            console.log('No error')
            console.log(textData)
            localStorage.setItem('jwt', textData);
        }).catch(console.error)
    }

    const getUsers = async () => {
        const jwt = localStorage.getItem('jwt');

        if (jwt) {
            fetch(`${BASE_URL}/user/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + jwt
                }
            }).then(res => res.json()).then(jsonData => {
                console.log(jsonData)
            }).catch(console.error)
        } else {
            alert('No JWT found!')
        }

    }

    const logout = async () => {
        localStorage.removeItem('jwt');
    }

    return (
        <div>
            <Button onClick={register}>Register</Button>
            <Button onClick={login}>Login</Button>
            <Button onClick={getUsers}>Users</Button>
            <Button onClick={logout}>Logout</Button>
        </div>
    );
}

export default App;
