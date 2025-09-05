const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  words.forEach((word) => {
    
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `<div class="bg-white rounded-xl shadow-md text-center py-10 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word}</h2>
        <p class="font-semibold text-xs">Meaning/Pronunciation</p>
        <p class="font-bold text-xl font-bangla">${word.meaning} / ${word.pronunciation}</p>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1A91FF15] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF15] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>`;
    wordContainer.append(wordCard);
  });
};

const displayLesson = (lessons) => {
  // 1get the container

  const lessonContainer = document.getElementById("lesson-container");
  lessonContainer.innerHTML = "";
  // 2.get into every lesson
  for (let lesson of lessons) {
    console.log(lesson);
    // 3.create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button onclick="loadLevelWord(${lesson.level_no})" class = "btn btn-outline btn-primary"><i class="fa-solid fa-book-open-reader"></i>Lesson-${lesson.level_no}</button>
    `;
    // 4.append into container
    lessonContainer.append(btnDiv);
  }
};

loadLessons();
