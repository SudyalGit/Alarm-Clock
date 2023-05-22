// Alarms array
let alarms=[];

class Alarm {
        constructor(id, title, time, timeOut){
            this.id = id;
            this.title = title;
            this.time = time;
            this.timeOut=timeOut;
        }

        getTime(){
            let hour=(new Date(this.time)).toTimeString().slice(0,2);

            if(hour>=12){
                return (hour-12+(new Date(this.time)).toTimeString().slice(2,8)+' PM');
            }else{
                return ((new Date(this.time)).toTimeString().slice(0,8)+' AM');
            }
        }
}

let realTime=document.querySelector("#real-time");
let alarmTime=document.querySelector("#alarm-time");
let alarmTitle=document.querySelector("#alarm-title");
let createButton=document.querySelector("#create-btn");
let alarmsList=document.querySelector("#alarms-list");
let deleteButton=document.querySelector("#alarms-list");

//render the all alarms
function renderList(){
    alarmsList.innerHTML='';
    for(let alarm of alarms){
        let li=document.createElement("li");
        li.className="item-list";

        li.innerHTML=`<span class="alarms-list-time">${alarm.getTime()}</span>
        <span class="alarms-list-title">${alarm.title}</span>
        <i data-id="${alarm.id}" class="fa fa-trash-o alarms-list-item trash-icon delete-btn" aria-hidden="true"></i>`;
        alarmsList.append(li);
    }
};

// real time in format (HH:MM:SS)
function getRealTime(){
    let time=new Date().toTimeString().slice(0,8);
    return time;
}

//displaying real time
function displayRealTime(){
    //reseting
    realTime.innerHTML="";

    let time=getRealTime();
    let period="";
    let hour=Number(time.slice(0,2));

    if(hour>=12){
        period="PM";
        hour=hour-12;
        time=hour+time.slice(2,8);
    }else{
        period="AM";
    }

    let span=document.createElement("span");
    span.innerHTML=time+"  "+period;
    realTime.append(span);
}

//notification function
function notification(text){
    alert(text);
}

//creating alarm
function createAlarm(id, time, title){
    return setTimeout(()=>{
        notification(title);
        deleteAlarm(id);
    }, (time.getTime()-id));
}

//deleting alarm
function deleteAlarm(id){
    newAlarm=alarms.filter((alarm)=>{
        return alarm.id!=id;
    })
    alarms=newAlarm;
    renderList();
}

//adding alarm
function addAlarm(){
    //creating a unique id
    let id=(new Date()).getTime();

    //fetching title
    let title=alarmTitle.value;

    //fetching alarm time input
    let inputTime=alarmTime.value;

    let hour=inputTime.slice(0,2);
    let minute=inputTime.slice(3,5);
    let year=new Date().getFullYear();
    let month=new Date().getMonth();
    let date=new Date().getDate();

    //alarm date and time
    let time=(new Date(year, month, date, hour, minute));

    let timeoutId=createAlarm(id, time, title);

    const alarm=new Alarm(id, title, time, timeoutId);

    //adding alarm in alarms array
    alarms.unshift(alarm);
    renderList();

    alarmTitle.value="";
    // alarmTime.value="00:00";
}

setInterval(displayRealTime,1000);

createButton.addEventListener("click",addAlarm
);
deleteButton.addEventListener("click",(e)=>{
    let target=e.target;
    deleteAlarm(target.dataset.id);
}
);