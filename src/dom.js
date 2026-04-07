const initialCnt = 0;
let count = initialCnt;



const display = document.querySelector('[data-counter-display]');
const buttons = document.querySelectorAll('[data-counter-button]');

showCount(count);
console.log({display, buttons});

for(const button of buttons){
    button.addEventListener('click', handleClick);
}




function handleClick(event){
    const clickedButton = event.currentTarget;
    const buttonAction = clickedButton.dataset.counterButton;

    switch(buttonAction){
        case 'increment' :
            count += 1;
            break;
        case 'decrement' :
            count -= 1;
            break;
        case 'reset':
            count = initialCnt;
            break;
        default:
            throw new Error(`Action "${buttonAction}" not implemented in code!`)
            //break;
    }
    adjustDisplayColor(count);
    showCount(count);
}

function showCount(count){
    display.textContent = count;
}

function adjustDisplayColor(count){
    display.classList.remove('positive','negative')
    if(count < 0){
        display.classList.add('negative');
    }
    if(count > 0){
        display.classList.add('positive');
    }
}



