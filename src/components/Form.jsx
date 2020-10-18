import React from 'react'

export default function Form({input, setInput, streams, setStreams, setStatus, active, setActive}) {
    
    const inputChange = (e) => {
        setInput(e.target.value);
    }
     // Function to capitalize first letter
     function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const SubmitForm = (e) => {
        let btn = document.getElementById('input-todo');
        let alertbox = document.getElementById('alert');
        let alertBtn = document.createElement('p');
        e.preventDefault();
        let date = new Date();
        let inputL = input.length
        if(inputL >= 4){
            setStreams([
                ...streams,{username: capitalizeFirstLetter(input), checkstats: false,id: Math.random()*1000, checkfollows: false},
            ]);
            btn.placeholder = 'Insert twitch username';
            btn.className = 'input-todo';
            alertBtn.innerText = 'Streamer added...';
            alertbox.appendChild(alertBtn);
            setTimeout(() => {
                alertbox.removeChild(alertBtn);
            }, 2000);

        }else if(inputL <= 3){
            btn.placeholder = 'Text minimum size: 4';
            btn.className = 'error';
        }
        setInput('');
    }
    const statusHandler = (e) => {
        e.preventDefault();
        if(e.target.value === 'all'){
            setStatus('all');
        }else if(e.target.value === 'online'){
            setStatus('online');
        }else if(e.target.value === 'offline'){
            setStatus('offline');
        }else if(e.target.value === 'partner'){
            setStatus('partner');
        }else if(e.target.value === 'afiliates'){
            setStatus('afiliates');
        }else{
            setStatus('all');
        }
    }
    const deleteAll = (e) => {
        e.preventDefault();
        let alertbox = document.getElementById('alert');
        let alertBtn = document.createElement('p');
        alertBtn.innerText = 'All Deleted...';
        alertbox.appendChild(alertBtn);
        setTimeout(() => {
            alertbox.removeChild(alertBtn);
        }, 2000);
        setStreams([]);
        setStatus('all');
    }
    return (
        <form>
            <div id="alert"></div>
            <input value={input} id="input-todo" type="text" onChange={inputChange} placeholder='Insert new twitch username' minLength="4" maxLength="50" size="20" className="input-todo"/>
            <button onClick={SubmitForm} type="submit" className="buttonUser">+</button>

            <div className="select d-flex flex-column flex-md-row justify-content-center align-items-center">
                <button className={`select-button ${active ? "active" : ''}`} value="all" onClick={statusHandler} >All</button>
                <button className={`select-button ${active ? "active" : ''}`} value="online" onClick={statusHandler}>Online</button>
                <button className={`select-button ${active ? "active" : ''}`} value="offline" onClick={statusHandler}>Offline</button>
                <button className={`select-button ${active ? "active" : ''}`} value="partner" onClick={statusHandler}>Partners</button>
                <button className={`select-button ${active ? "active" : ''}`} value="afiliates" onClick={statusHandler}>Afiliates</button>
            </div>
            <button onClick={deleteAll} className="select-button"><i className="fas fa-trash"></i> All</button>
        </form>
    )
}