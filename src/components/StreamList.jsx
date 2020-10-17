import React from 'react'
import Stream from './actions/Stream'
const StreamList = ({streams, setStreams, filterStreams, streamsInfo, setStreamsInfo,newToken}) => {
    
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
                    newToken={newToken} />
                ))}
            </ul>
        </div>
    );
}

export default StreamList;