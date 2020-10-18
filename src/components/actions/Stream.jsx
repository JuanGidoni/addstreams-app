import React, {useState} from 'react'
import axios from 'axios';
import Stats from './Stats';
import Follows from './Follows';

const Stream = ({username, stream, streams, setStreams, id, setStreamsInfo, streamsInfo, newToken, idUser, setIdUser}) => {
    
    let alertbox = document.getElementById('alert');
    let alertBtn = document.createElement('p');
    const [live, setLive] = useState(false);
    const [counterLive, setcounterLive] = useState(0);
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
                

                setStreams(streams.map((item) => {
                    if(item.id === stream.id){
                        return {
                            ...item, checkstats: !item.checkstats, checkfollows: !item.checkfollows, fullstats: JSON.parse(json), followers: item.followers
                        }
                    }
                return item;
                }))
                
                getFollows(dataJ.data[0].id,JSON.parse(json));
                checkIfLive(dataJ.data[0].id,JSON.parse(json));


            } catch (error) {
                console.log('username invalid or something went wrong...');
            }
            alertBtn.innerText = 'Stream data loaded...';
        }
            
    const getFollows = async (a,b) => {
        try {
            const response = await axios.get(`https://api.twitch.tv/helix/users/follows?to_id=${a}`, {
              headers: {
                  'Authorization' : `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : newToken }`,
                  'Client-ID' : '3ygw3aha6vfzkwh6lw0nlyhrdhs8bs',
                  'Content-Type' : 'application/json',
            }
          });        
            localStorage.setItem('followers', response.data.total);

            setStreams(streams.map((item) => {
                if(item.id === stream.id){
                    return {
                        ...item,fullstats: b, checkstats: !item.checkstats, checkfollows: !item.checkfollows, followers: response.data.total
                    }
                }
            return item;
            }))

        } catch (error) {
            console.log('username invalid or something went wrong...');
        }
    }

        const checkIfLive = async(a,b) => {
            try {
                const response = await axios.get(`https://api.twitch.tv/helix/streams?user_id=${a}`, {
                  headers: {
                      'Authorization' : `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : newToken }`,
                      'Client-ID' : '3ygw3aha6vfzkwh6lw0nlyhrdhs8bs',
                      'Content-Type' : 'application/json',
                }
              }); 
              
              let json = JSON.stringify(response.data);

              localStorage.setItem('live', json);

              let dataL = JSON.parse(json);

                if(dataL.data[0].type === 'live'){
                    setcounterLive(dataL.data[0].viewer_count);
                    console.log(dataL.data[0].type);
                    console.log('t-'+ dataL.data);
                    setLive(true);
                setStreams(streams.map((item) => {
                    if(item.id === stream.id){
                        return {
                            ...item, fullstats: b, checkstats: !item.checkstats, checkfollows: !item.checkfollows, followers: item.followers, live: dataL.data[0].type
                        }
                    }
                return item
                }))

                }else{
                    setStreams(streams.map((item) => {
                        if(item.id === stream.id){
                            return {
                                ...item, fullstats: b, checkstats: !item.checkstats, checkfollows: !item.checkfollows, followers: item.followers, live: item.live
                            }
                        }
                    return item
                    }))
                }

                

    
            } catch (error) {
                console.log('username invalid or something went wrong...');
            }
        }
    return(
        <div className="d-flex">
            <div className="todo d-flex flex-column justify-content-center align-items-center">
            {stream.checkstats && stream.checkfollows ? 
            <Stats stream={stream} followers={stream.followers} live={live} counterLive={counterLive} />
            : 
            <div className="d-flex justify-content-between align-items-center">
                <li className="mr-2" id={id}>{username}</li>
                <button onClick={checkStream} className={`${stream.checkstats ? "complete-btn" : "complete-btn text-white"}`} disabled={`${stream.checkstats ? "disabled" : ''}`}><i className="fas fa-chart-bar"></i></button>
            </div>
            }  
            </div>        
            <div className="d-flex justify-content-between align-items-center">   
            <button onClick={deleteStream} className="trash-btn"><i className="fas fa-trash"></i></button>            
            </div>
        </div>
    );
}

export default Stream;