let btn = document.querySelector('#start');
let pumps = document.getElementById('petrolPumps');
let root = document.getElementById('root');
let res = document.getElementById('result');



//Generating Petrol Station randomly within 100 km ...
let petrolPumps = () => {

    let stations = new Array(5);
    for(let i=0;i<5;i++){
        stations[i] = Math.floor(Math.random() * 101);
    }
    return stations;
}

// Generating steps car can move... 
let steps = () => Math.floor(Math.random() * 7);



// 
const renderStation = () => {

    let stations = petrolPumps()
    let h3 = document.createElement('h3');
    let p = document.createElement('p');

    let game = document.createTextNode('Game Started');
    let station = document.createTextNode(`Petrol Pumps Generated at ${stations}`);
    
    h3.appendChild(game);
    p.appendChild(station);
    
    pumps.appendChild(h3);
    pumps.appendChild(p);
    return stations;
};



// Check if car its it petrol station
let isCarAtStation = (totalSteps,stations) => {
    
    for(let i=0;i<stations.length;i++){
        if(stations[i] === totalSteps)
            return true;
    }
    return false;
};



// Calculation for Refuling
const refuel = petrol => {
    if(petrol+20 <= 30)
        return petrol+20;
    return 30;    
}




// 
const renderMove = (move, distanceTravelled, petrol) => {

    let p = document.createElement('p');
    let text = document.createTextNode(`Move ${move} - Car at ${distanceTravelled}, petrol remaining ${petrol}`)
    p.appendChild(text);
    root.appendChild(p);
    return;
        
}



const finalRenderMove = (move, distanceTravelled, petrol, status) => {

    // let p = document.createElement('p');
    let text = document.createTextNode(`Result : Move ${move} - Car at ${distanceTravelled}, petrol remaining ${petrol}, ${status}`)
    res.appendChild(text);
    // root.appendChild(p);
    return;
}



let reset = () =>{
    root.innerHTML = '';
    pumps.innerHTML = '';
    res.innerHTML = '';
}



let play = () => {
    window.scroll({ top:0, left: 0, behavior: 'smooth'});
    reset();
    let stations = renderStation();
    move = 0;
    petrol = 30;
    distanceTravelled = 0;
    playGame(stations);
}





//Main Game Function
let playGame = stations => {
    

    while(distanceTravelled < 100 && petrol > 0){

        ++move;
        let numofSteps = steps();
        if( distanceTravelled+numofSteps > 100 ||  petrol - numofSteps < 0){
            
            if(petrol - numofSteps < 0){
                distanceTravelled += petrol
                petrol -= petrol;
                renderMove(++move, distanceTravelled, petrol);
                break;
            }
            
        }
        distanceTravelled += numofSteps;
        petrol -= numofSteps;

        let flag = isCarAtStation(distanceTravelled,stations);

        if(flag === true)
            petrol = refuel(petrol);
        
        renderMove(move, distanceTravelled, petrol);
    }
    
    if(distanceTravelled >= 100){
        finalRenderMove(move, distanceTravelled, petrol, 'reached! 😍');
    }else
        finalRenderMove(move, distanceTravelled, petrol, 'Game Over! 😢')
        

}


