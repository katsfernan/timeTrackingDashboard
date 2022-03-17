
const task_background_properties = {
        'Work': {
            color:'--light-orange',
            image:'images/icon-work.svg'
        },
        'Play': {
            color:'--soft-blue',
            image:'images/icon-play.svg'
        },
        'Study':{
            color:'--light-red',
            image:'images/icon-study.svg'
        },
        'Exercise': {
            color: '--lime-green',
            image:'images/icon-exercise.svg'
        },
        'Social': {
            color:'--violet',
            image:'images/icon-social.svg'
        },
        'Self Care':{
            color: '--soft-orange',
            image: 'images/icon-self-care.svg'
        }
}
const timeframeMsg = {
    'daily': 'Yesterday',
    'weekly': 'Last Week',
    'monthly': 'Last Month'
};
// const template = document.querySelector('#task-template').content
const container = document.querySelector('.container')
const fragment = document.createDocumentFragment()
const menu = document.querySelectorAll('li')

let tasks = {}
let taskCards 
let timeframe = 'weekly' /*default value*/


const menuEvent = event => {
    menu.forEach(e =>{
        e.classList.remove('menu-active')
    })
    event.target.classList.add('menu-active')
    timeFrame = event.target.innerText.toLowerCase()
    updateCards(timeFrame)
}

menu.forEach(element => {
    element.addEventListener('click', menuEvent)
})


const fetchTaskInfo = async () => {
    const response = await fetch('data.json')
    const data = await response.json() 
    data.forEach(element => {
        tasks[element.title] = element.timeframes
        setTaskCard(element,timeframe)
        taskCards = document.querySelectorAll('.task-card');
    }) 
    
}

function updateCards(timeframe){
    taskCards.forEach(card => {
        updateCard(card, timeframe);
    });
}

function updateCard(card, timeframe) {
    const title = card.querySelector('.card-title h1').innerText;
    const current = tasks[title][timeframe]['current'];
    const previous = tasks[title][timeframe]['previous'];

    
    const hoursElement = card.querySelector('.card-content h1');
    hoursElement.innerText = `${current}hrs`;
    const msgElement = card.querySelector('.card-content h2');
    msgElement.innerText = `${timeframeMsg[timeframe]} - ${previous}hrs`;
}



const setTaskCard = (element, timeframe) => {
        // const clone = template.cloneNode(true)
        // console.log(task_background_properties[item.title].image)
        // clone.querySelector('.task-card').style.backgroundColor = `var(${task_background_properties[item.title].color})`
        // clone.querySelector('.top-img img').src = task_background_properties[item.title].image
        // fragment.appendChild(clone)
        let title = element['title'];
        let current = element['timeframes'][timeframe]['current'];
        let previous = element['timeframes'][timeframe]['previous'];
    
        container.insertAdjacentHTML( 'beforeend',` 
        <div class="task-card" id="${title.toLowerCase().replace(/\s/g, '')}">
            <div class="top-img">
                <img src="${task_background_properties[title].image}" alt="">
            </div>
            <div class="task-card-bottom">
                <div class="card-title">
                    <h1>${title}</h1>
                    <img src="images/icon-ellipsis.svg" alt="">
                </div>

                <div class="card-content">
                    <h1>${current}</h1>
                    <h2>${timeframeMsg[timeframe]}-${previous}</h2>
                </div>
            </div>
        </div> `)

    // container.appendChild(fragment)
}

fetchTaskInfo()