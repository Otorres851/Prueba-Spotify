import React from 'react';

const Artist = props => {
    return props.art.map(artist => (
        <div className="col-sm-6 row form-group px-0 two" key={artist.id}>
            {artist.images.length ? <img width={"100px"} src={artist.images[0].url} alt='name'/> : <div>No Image</div>}
            {artist.name}
        </div>
        
    ));
}

export default Artist;