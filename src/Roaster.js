import React,{Component} from 'react';
import {Link,Switch,Route} from 'react-router-dom';
const playerApi={
    players:[
        {number:1,name:'Sachin Tendulkar',position:"A"},
        {number:2,name:'Virat Kohli',position:"B"},
        {number:3,name:"Mahendra Singh Dhoni",position:"C"},
        {number:4,name:"Sourabh Ganguli",position:"e"},
        {number:5,name:"Rahul Dravid",position:"f"}
    ],
    all:function(){
        return this.players;
    }
    ,
    get:function(id){
        const isPlayer=p=>p.number===id;
    return this.players.find(isPlayer);
    }
}
const Player=(props)=>{
    const player=playerApi.get(parseInt(props.match.params.number,10));
    if(!player)
    return(<div>Sorry No player found with this id</div>)
    return(
        <div>
            <h3>{player.name}</h3>
            <h5>position: {player.position}</h5>
        </div>
    )
}
const FullRoaster=(props)=>{
return(<ul>
    {
        playerApi.all().map(p=>(
            <li key={p.number}>
            <Link to={`/roaster/${p.number}`}>{p.name}</Link></li>
        ))
    }
</ul>)
}
export const Roaster=()=>(
    <Switch>
        <Route exact path="/roaster" >{FullRoaster}</Route>
        <Route path="/roaster/:number">{Player}</Route>
    </Switch>
)