import React from 'react'
import axios from 'axios';
import Stats from './Stats';
import Follows from './Follows';

const Stream = ({username, stream, streams, setStreams, id, setStreamsInfo, streamsInfo, newToken, idUser, setIdUser}) => {
    
    let alertbox = document.getElementById('alert');
    let alertBtn = document.createElement('p');
    // Arrow function to delete stream
    const deleteStream = () => {
        setStreams(streams.filter((el) => el.id !== stream.id));
        alertBtn.innerText = 'Stream deleted...';
        alertbox.appendChild(alertBtn);
        setTimeout(() => {
            alertbox.removeChild(alertBtn);
        }, 2000);
    }

    // Async Arrow function to check stream data with try catch.
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
                let dataJ = JSON.parse(json);
                console.log(dataJ.data[0].id);
                alertBtn.innerText = 'Getting stream information...';
                alertbox.appendChild(alertBtn);
                setTimeout(() => {
                    alertbox.removeChild(alertBtn);
                }, 2000);
                
                getFollows(dataJ.data[0].id);

                setStreams(streams.map((item) => {
                    if(item.id === stream.id){
                        return {
                            ...item, checkstats: !item.checkstats, checkfollows: !item.checkfollows, fullstats: JSON.parse(json), followers: JSON.parse(localStorage.getItem('followers'))
                        }
                    }
                return item;
                }))


            } catch (error) {
                console.log('username invalid or something went wrong...');
            }
            alertBtn.innerText = 'Stream data loaded...';
        }
            
    const getFollows = async (x) => {
        try {
            const response = await axios.get(`https://api.twitch.tv/helix/users/follows?to_id=${x}`, {
              headers: {
                  'Authorization' : `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : newToken }`,
                  'Client-ID' : '3ygw3aha6vfzkwh6lw0nlyhrdhs8bs',
                  'Content-Type' : 'application/json',
            }
          });        
            localStorage.setItem('followers', response.data.total);
        } catch (error) {
            console.log('username invalid or something went wrong...');
        
    }
}
    return(
        <div className="d-flex flex-column">
            <div className="todo">
            {stream.checkstats && stream.checkfollows ? 
            <Stats stream={stream} followers={stream.followers}/>
            : 
            <div className="todo">
                <li id={id}>{username}</li>
                <button onClick={checkStream} className={`${stream.checkstats ? "complete-btn" : "complete-btn text-white"}`} disabled={`${stream.checkstats ? "disabled" : ''}`}><i className="fas fa-chart-bar"></i></button>
            </div>
            }          
            <button onClick={deleteStream} className="trash-btn"><i className="fas fa-trash"></i></button>            
            </div>
        </div>
    );
}

export default Stream;