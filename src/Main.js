import React,{Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {Home} from './Home';
import {Roaster} from './Roaster';
import {Schedule} from './Schedule';
export default class Main extends Component{
    render(){
        return(
            <Switch>
                <Route path='/' exact>{Home}</Route>
                <Route path='/roaster' >{Roaster}</Route>
                <Route path='/schedule' >{Schedule}</Route>
            </Switch>
        )
    }
}