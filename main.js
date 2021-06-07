//필요한 변수 모두 불러오기
const startbutton = document.querySelector(".start_button");
const containerbox = document.querySelector(".container_box");
const questions = document.querySelector(".question");
const question = document.querySelector(".question");
const optionlist = document.querySelector(".option_list");
const nextbutton = document.querySelector(".next_question");
const currentnumber = document.querySelector(".current_number");
const timer = document.querySelector(".timer");
const timebar = document.querySelector(".timer_bar");
const resultbox = document.querySelector(".result_box");
const resulttext = document.querySelector(".result_text");
const replay = document.querySelector(".replay");
const correcticon = '<i class="fas fa-check"></i>';
const wrongicon = '<i class="fas fa-times"></i>';
let index = 0;
let score = 0;
let timeleft = 10;

//quiz start
startbutton.onclick=()=>{
  containerbox.classList.add("playing");
  showquestions(0);
  currentnumber.innerHTML=`${index+1}/${questlists.length} 문제`;
}

//다음 버튼을 눌렀을 때
nextbutton.onclick=()=>{
  if (index < questlists.length-1) {
    index++;
    showquestions(index);
    //현재 몇번째 문제인지 표기
    currentnumber.innerHTML=`${index+1}/${questlists.length} 문제`;
  } else {
    containerbox.classList.remove("playing");
    resultbox.classList.add("endgame");
    resulttext.innerHTML=`${score}개를 맞추셨네요!`;
  }
}

//restart
replay.onclick=()=>{
  window.location.reload();
}


//문제 넣기
function showquestions(index){
  questions.innerHTML=`${questlists[index].number}. ${questlists[index].question}`;
  optionlist.innerHTML=`<div class="options">${questlists[index].optionslist[0]}</div>
                        <div class="options">${questlists[index].optionslist[1]}</div>
                        <div class="options">${questlists[index].optionslist[2]}</div>
                        <div class="options">${questlists[index].optionslist[3]}</div>
                        <div class="options">${questlists[index].optionslist[4]}</div>`;
  const optionbutton = optionlist.querySelectorAll(".options");

  //타이머 
  let counter = setInterval(() => {
    //시간 초 표시
    timeleft--;
    timebar.innerHTML = `0${timeleft}`;
    if(timeleft === 0) {
      clearInterval(counter);
      nextbutton.classList.add("done");
      timeleft=11;
      for(let j=0; j<optionbutton.length; j++){
        if(optionbutton[j].textContent==questlists[index].answers){
          optionbutton[j].classList.add("correct");
          optionbutton[j].insertAdjacentHTML("beforeend", correcticon);
          optionlist.classList.add("done");
          }
        }
    }
    }, 1000);


  // 막대 타이머
  let timecount = 1000;
  let timercounter = setInterval(() => {
    timecount--;
    timer.style.width=`${timecount/10}%`;
  }, 10);


    
  //1번 선택지부터 끝번호까지 순회한다.
  for(let i=0; i<optionbutton.length; i++) {
    //옵션지를 클릭했을 때 이벤트
    optionbutton[i].onclick= (e)=>{
      clearInterval(timercounter);
      timecount = 1000;
      nextbutton.classList.add("done");
      clearInterval(counter);
      timeleft=11;
      //선택 후 더이상 다른 질문지를 고르지 못하게 하기위함
      optionlist.classList.add("done");
      //만약 선택지가 정답이라면
      if(e.target.textContent == questlists[index].answers){
        score++;
        e.target.classList.add("correct");
        e.target.insertAdjacentHTML("beforeend", correcticon);
        //정담이 아니라면
      } else {
        e.target.classList.add("wrong");
        e.target.insertAdjacentHTML("beforeend", wrongicon);
        //오답시 정답을 보여주는 코딩
        for(let j=0; j<optionbutton.length; j++){
          if(optionbutton[j].textContent==questlists[index].answers){
            optionbutton[j].classList.add("correct");
            optionbutton[j].insertAdjacentHTML("beforeend", correcticon);
            }
          }
        }
      }
    optionlist.classList.remove("done");
    nextbutton.classList.remove("done");

    }
}

