import React, {useState} from 'react';

const Dropdown = props => {    

    const [selectedValue, setSelectedValue]= useState('');


    return (
        <div class="col-md-12 form-group row px-0 one">           
            <select value={selectedValue} onChange={e => setSelectedValue(e.target.value)}  className="form-control form-control-sm col-sm-12">
                {props.options.map((item, idx) => <option key={idx} value={item.value}>{item.name}</option>)}
            </select>       
        </div>
    );
}

export default Dropdown;