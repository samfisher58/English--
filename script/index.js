const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const removeActive =()=>{
    const lessonBtns = document.querySelectorAll(".lesson-btn");
    lessonBtns.forEach(btn=>btn.classList.remove("active"));
}

const loadLevelWord = (id) => {
    manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) =>{
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active");
        displayLevelWord(data.data)
    });
};

const createSynonym =(arr)=>{
    const synonymsElement = arr.map((el) => `<span class ="btn">${el}</span>`);
    return (synonymsElement.join(" "));
}

const loadWordDetail=async(id)=>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayWordDetails(data.data);

}

const manageSpinner=(status)=>{
    if(status==true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }else{
         document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

const displayWordDetails =(word)=>{
console.log(word);
const detailsBox = document.getElementById("details-container");
detailsBox.innerHTML = `<div>
            <h2 class="text-2xl font-bold">
              ${word.word}( ${word.pronunciation} <i class="fa-solid fa-microphone"></i>)
            </h2>
          </div>
          <div>
            <h2 class="text-2xl font-bold">
              Meaning
            </h2>
            <p class="font-bangla">${word.meaning}</p>
          </div>
          <div>
            <h2 class="text-2xl font-bold">
              Example
            </h2>
            <p>${word.sentence}</p>
          </div>
          <div>
            <h2 class="text-2xl font-bold font-bangla">
              সমার্থক শব্দ গুলো
            </h2>
            <div class="">${createSynonym(word.synonyms)}</div>
            
          </div>`
document.getElementById("my_modal_5").showModal()
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if(words.length==0){
    wordContainer.innerHTML = `
    <div class="text-center my-10 col-span-full rounded-xl py-10 space-y-6">
      <img class="mx-auto" src="./assets/alert-error.png" alt="">
      <h4 class="font-bangla text-xl text-gray-400 font-semibold">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h4>
      <h1 class="font-bangla text-5xl font-bold">নেক্সট Lesson এ যান</h1>
    </div>
    `;
    manageSpinner(false);
    return;
  }
  words.forEach((word) => {
    
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `<div class="bg-white rounded-xl shadow-md text-center py-10 px-5 space-y-4">
        
        <h2 class="font-bold text-2xl">${word.word ? word.word : 'Word not found😐😐'}</h2>
        <p class="font-semibold text-xs">Meaning--Pronunciation</p>
        <p class="font-bold text-xl font-bangla">${word.meaning ? word.meaning :'Meaning not found😐😐' } -- ${word.pronunciation ? word.pronunciation : 'Pronunciation not found😐😐'}</p>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF15] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
          <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF15] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>`;
    wordContainer.append(wordCard);
  });
  manageSpinner(false);
};

const displayLesson = (lessons) => {
  // 1get the container

  const lessonContainer = document.getElementById("lesson-container");
  lessonContainer.innerHTML = "";
  // 2.get into every lesson

    lessons.forEach(lesson => {
        // 3.create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class = "btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open-reader"></i>Lesson-${lesson.level_no}</button>
    `;
    // 4.append into container
    lessonContainer.append(btnDiv);
    });

};

loadLessons();

document.getElementById('btn-search').addEventListener("click",()=>{
    removeActive()
    const input = document.getElementById('input-search');
    const searchValue= input.value.trim().toLowerCase();

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res)=>res.json())
    .then((data)=>{
        const allWords = data.data;
        const filterWords = allWords.filter(word=>word.word.toLowerCase().includes(searchValue))
        displayLevelWord(filterWords)
    })

})
