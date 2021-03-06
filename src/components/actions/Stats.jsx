import React from 'react'
import Verified from '../../images/verified.png';
import Normal from '../../images/normal.png';

export default function Stats({stream, followers, live, counterLive}) {

    // Function to capitalize first letter
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function numberWithCommas(x) {
        if(x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }else{
            return x;
        }
    }

    return (
        <div>
            <div className="stats">
                <div className="d-flex flex-row align-items-center justify-content-center user-data">
                <img className="picture" src={`${stream.fullstats.data[0].profile_image_url}`} alt="Avatar" title="Avatar" />
                <p className="p-0 m-0 ml-2 mr-2"> {`${capitalizeFirstLetter(stream.fullstats.data[0].display_name)}`}</p>
                <img className={`picture-badge
                ${stream.fullstats.data[0].broadcaster_type === 'partner' ? 'partner'
                :
                stream.fullstats.data[0].broadcaster_type === 'affiliate' ? 'afiliate-user'
                :
                'normal-user' }`}
                src={
                stream.fullstats.data[0].broadcaster_type === 'partner' ? Verified
                :
                stream.fullstats.data[0].broadcaster_type === 'affiliate' ? Normal
                : 
                Normal
                } alt="avatar" title="avatar" />
                </div>
                <div className="d-flex flex-row align-items-center justify-content-center">
                <p className="viewers-title p-0 m-0 mr-2"><i className="fas fa-eye"></i></p>
                <p className="viewersCount p-0 m-0"> {`${numberWithCommas(stream.fullstats.data[0].view_count)}`}</p>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-center">
                <p className="viewers-title p-0 m-0 mr-2"><i className="fas fa-user"></i></p>
                <p className="viewersCount p-0 m-0"> {numberWithCommas(followers)}</p>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-center">
                <p className="viewers-title p-0 m-0 mr-2"><i className={`fas fa-circle ${counterLive === 0 ? 'text-muted' : 'text-danger'}`}></i></p>
                <p className="viewersCount p-0 m-0"> {counterLive === 0 ? 'Offline' : numberWithCommas(counterLive)}</p>
                </div>
            </div>
        </div>
    )
}
