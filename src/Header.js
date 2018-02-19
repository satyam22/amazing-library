import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component{
    render(){

        return(
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/roaster'>Roaster</Link></li>
                <li><Link to='/schedule'>Schedule</Link></li>
            </ul>
        )
    }
}