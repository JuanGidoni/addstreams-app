import React from 'react'
import axios from 'axios';

const Stream = ({username, stream, streams, setStreams, id, setStreamsInfo, streamsInfo, newToken}) => {
    
    let alertbox = document.getElementById('alert');
    let alertBtn = document.createElement('p');
    const deleteStream = () => {
        setStreams(streams.filter((el) => el.id !== stream.id));
        alertBtn.innerText = 'Stream deleted...';
        alertbox.appendChild(alertBtn);
        setTimeout(() => {
            alertbox.removeChild(alertBtn);
        }, 2000);
    }
    const checkStream = async () => {
            try {
                const response = await axios.get(`https://api.twitch.tv/helix/users?login=${username}`, {
                  headers: {
                      'Authorization' : `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : newToken }`,
                      'Client-ID' : '3ygw3aha6vfzkwh6lw0nlyhrdhs8bs',
                      'Content-Type' : 'application/json',
                }
              });        
                let json = JSON.stringify(response.data);
                localStorage.setItem('streamsInfo', json);

                alertBtn.innerText = 'Getting stream information...';
                alertbox.appendChild(alertBtn);
                setTimeout(() => {
                    alertbox.removeChild(alertBtn);
                }, 2000);
                

                setStreams(streams.map((item) => {
                    if(item.id === stream.id){
                        return {
                            ...item, checkstats: !item.checkstats, fullstats: JSON.parse(json)
                        }
                    }
                return item;
                }))

            } catch (error) {
                console.log('username invalid or something went wrong...');
            }
    }
    return(
        <div className="d-flex flex-column">
            <div className="todo">
            <li id={id}>{username}</li>
            <button onClick={checkStream} className={`${stream.checkstats ? "complete-btn" : "complete-btn text-white"}`} disabled={`${stream.checkstats ? "disabled" : ''}`}><i className="fas fa-chart-bar"></i></button>
            <button onClick={deleteStream} className="trash-btn"><i className="fas fa-trash"></i></button>
            </div>
        </div>
    );
}

export default Stream;