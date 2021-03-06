import React from 'react'
import Stream from './actions/Stream'
const StreamList = ({streams, setStreams, filterStreams, streamsInfo, setStreamsInfo,newToken,idUser, setIdUser, totalF, setTotalF, totalV, setTotalV}) => {
    
    return(
        <div className="todo-container text-center mb-5">
            <ul className="todo-list">
                <p className="text-reacTodo">
        {streams.length === 0 ? `Streamers List empty..` : ''}
                </p>
                {filterStreams.map(stream => (
                    <Stream 
                    setStreams={setStreams}
                    streams={streams} 
                    key={stream.id} 
                    username={stream.username} 
                    id={stream.checkstats ? stream.fullstats.data.id : stream.id}
                    stream={stream}
                    streamsInfo={streamsInfo}
                    setStreamsInfo={setStreamsInfo}
                    newToken={newToken}
                    idUser={idUser}
                    totalF={totalF}
                    setTotalF={setTotalF}
                    totalV={totalV}
                    setTotalV={setTotalV}
                    setIdUser={setIdUser} />
                ))}
            </ul>
        </div>
    );
}

export default StreamList;