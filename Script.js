const questionDiv = document.getElementById('question');
const Spinner = document.getElementById('spinnerMain');

function isNumber(value) {
    if (value === null) return false;
    return !isNaN(value) && value.trim() !== '';
  }
  
  let tempmax = 4;
  while (true) {
    tempmax = prompt("Enter the row number:"); 
    if (isNumber(tempmax)) {
      tempmax = Number(tempmax); 
      break;
    } else {
      alert("Please enter a valid number."); 
    }
  }
  
const max = tempmax;
reset = true;

function inputInsert() {
    questionDiv.style.gridTemplateColumns = `repeat(${max}, 1fr)`;
    const fragment = document.createDocumentFragment();
    for (let row = 0; row < max; row++) {
        for (let col = 0; col < max; col++) {
            const div = document.createElement('div');
            div.id = `${row},${col}`;
            div.classList.add('cell-input');

            div.addEventListener('click', () => AddQueen(row, col));

            fragment.appendChild(div);
        }
    }

    questionDiv.innerHTML = '';
    questionDiv.appendChild(fragment);
}


inputInsert()


function AddQueen(row,col){
    let object=document.getElementById(row+","+col);
    if(object.classList.contains("Queen")){
        object.classList.remove("Queen")
    }else{
        if(placement(row,col)){
            object.classList.add("Queen")
        }else{
            alert("Cant add here")
        }
    }
}
function resetall(){
    if(reset){
        let objects=document.querySelectorAll(".Queen");
        objects.forEach(element => {
            element.classList.remove("Queen");
        });
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function result(){
    // resetall();
    Spinner.style.display='grid';
    await sleep(100)
    reset=false;
    let nonQueenCount=[]
    for(let i=0;i<max;i++){
        let flag=0;
        for(let j=0;j<max;j++){
            let object=document.getElementById(i+","+j);
            if(object.classList.contains("Queen")){
                flag++;
            }
        }
        if(flag>1){
            alert("Not Possiable");
            return;
        }else if(flag==0){
            nonQueenCount.push(i);
        }
    }
    if(!placeQueen(0,nonQueenCount)){
        alert("This Can't be Solved")
    }
    Spinner.style.display='none';
    reset=true
}

function placeQueen(row,nonQueenCount){
    if(row>=nonQueenCount.length){
        return true;
    }
    
    for(let i=0;i<max;i++){
        if(placement(nonQueenCount[row],i)){
            let object=document.getElementById(nonQueenCount[row]+","+i);
            object.classList.add("Queen")
            if(placeQueen(row+1,nonQueenCount)){ 
                return true;
            }
            object.classList.remove("Queen")
        }
    }
    return false;
}

function placement(row,col){
    for(let i=row;i>=0;i--){
        let object=document.getElementById(i+","+col);
        if(object.classList.contains("Queen")){
            return false
        }
    }
    for(let i=col;i>=0;i--){
        let object=document.getElementById(row+","+i);
        if(object.classList.contains("Queen")){
            return false
        }
    }
    for(let i=col;i<max;i++){
        let object=document.getElementById(row+","+i);
        if(object.classList.contains("Queen")){
            return false
        }
    }
    for(let i=row;i<max;i++){
        let object=document.getElementById(i+","+col);
        if(object.classList.contains("Queen")){
            return false
        }
    }
    for(let i=row, j=col;i>=0&&j>=0;i--,j--){
            let object=document.getElementById(i+","+j);
            if(object.classList.contains("Queen")){
                return false
        }
    }
    for(let i=row, j=col;i<max&&j<max;i++,j++){
        let object=document.getElementById(i+","+j);
        if(object.classList.contains("Queen")){
            return false
    }
}
    for(let i=row, j=col;i>=0&&j<max;i--,j++){
        let object=document.getElementById(i+","+j);
        if(object.classList.contains("Queen")){
            return false
        }
    }
    for(let i=row, j=col;j>=0&&i<max;j--,i++){
        let object=document.getElementById(i+","+j);
        if(object.classList.contains("Queen")){
            return false
        }
    }
    return true
}
