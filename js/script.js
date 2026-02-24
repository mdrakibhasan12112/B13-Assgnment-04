let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

// toggle button
const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const total = document.getElementById('total');
const interviewCount = document.getElementById('interview-count');
const rejectedCount = document.getElementById('rejected-count');
// console.log(total)
const allCardSection = document.getElementById('all-cards');
// console.log(allCardSection.children.length);
mainContainer = document.querySelector('main');
// console.log(mainContainer)
const filteredSection = document.getElementById('filtered-section');

function calculateCount() {
  total.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}
calculateCount();

// toggleling btn
function toggleStyle(id) {
  allFilterBtn.classList.remove('bg-accent', 'text-white');
  interviewFilterBtn.classList.remove('bg-accent', 'text-white');
  rejectedFilterBtn.classList.remove('bg-accent', 'text-white');

  allFilterBtn.classList.add('bg-white', 'text-black');
  interviewFilterBtn.classList.add('bg-white', 'text-black');
  rejectedFilterBtn.classList.add('bg-white', 'text-black');

  // console.log(id)

 const selected = document.getElementById(id);
 currentStatus = id;
  // console.log(selected)

  selected.classList.remove('bg-white', 'text-black');
  selected.classList.add('bg-accent', 'text-white');

  if (id == 'interview-filter-btn') {
    allCardSection.classList.add('hidden');
   filteredSection.classList.remove('hidden');
   renderInterview()
  }
  else if (id == 'all-filter-btn') {
    allCardSection.classList.remove('hidden');
    filteredSection.classList.add('hidden');
  }
  else if (id == 'rejected-filter-btn') {
    allCardSection.classList.add('hidden');
   filteredSection.classList.remove('hidden');
   renderRejected()
  }
}

mainContainer.addEventListener('click', function (event) {
  // console.log(event.target.classList.contains('interview-btn'));

  if (event.target.classList.contains('interview-btn')) {
    const parenNode = event.target.parentNode.parentNode;
    // const parenNode = event.target.closest('.cards');
    const companyName = parenNode.querySelector('.company-name').innerText;
    const positionName = parenNode.querySelector('.position-name').innerText;
    const salary = parenNode.querySelector('.salary').innerText;
    const change = parenNode.querySelector('.change').innerText;
    const notes = parenNode.querySelector('.notes').innerText;

    parenNode.querySelector('.change').innerText = 'Interview';

    const cardInfo = {
      companyName,
      positionName,
      salary,
      change: 'Interview',
      notes,
    };
    // console.log(cardInfo)
    const companyExist = interviewList.find(
      item => item.companyName === cardInfo.companyName,
    );

    if (!companyExist) {
      interviewList.push(cardInfo);
    }
    rejectedList = rejectedList.filter(
      item => item.companyName !== cardInfo.companyName,
    );

    if (currentStatus === 'rejected-filter-btn') {
      renderRejected();
    }

    calculateCount();
  } else if (event.target.classList.contains('rejected-btn')) {
    const parenNode = event.target.parentNode.parentNode;
    // const parenNode = event.target.closest('.cards');
    const companyName = parenNode.querySelector('.company-name').innerText;
    const positionName = parenNode.querySelector('.position-name').innerText;
    const salary = parenNode.querySelector('.salary').innerText;
    const change = parenNode.querySelector('.change').innerText;
    const notes = parenNode.querySelector('.notes').innerText;

    parenNode.querySelector('.change').innerText = 'Rejected';

    const cardInfo = {
      companyName,
      positionName,
      salary,
      change: 'Rejected',
      notes,
    };
    // console.log(cardInfo)
    const companyExist = rejectedList.find(
      item => item.companyName === cardInfo.companyName,
    );

    if (!companyExist) {
      rejectedList.push(cardInfo);
    }
    interviewList = interviewList.filter(
      item => item.companyName !== cardInfo.companyName,
    );

    if (currentStatus === 'interview-filter-btn') {
      renderInterview();
    }
    calculateCount();
  }

  // delete btn
  else if (event.target.closest('.btn-delete')) {
    const parenNode = event.target.closest('.flex');
    const companyName = parenNode.querySelector('.company-name').innerText;

    interviewList = interviewList.filter(
      item => item.companyName !== companyName,
    );

    rejectedList = rejectedList.filter(
      item => item.companyName !== companyName,
    );

    calculateCount();

    if (currentStatus === 'interview-filter-btn') {
      renderInterview();
    } else if (currentStatus === 'rejected-filter-btn') {
      renderRejected();
    }
  }
  
  
});







function renderInterview() {
  filteredSection.innerHTML = '';

  if (interviewList.length === 0) {
    filteredSection.innerHTML = `
   <div id="empty-state" class="flex flex-col items-center justify-center text-center py-20 bg-white">
    <img src="images/jobs.png" alt="">
    <h2 class="text-2xl font-semibold">No jobs available</h2>
    <p class="text-gray-500">Check back soon for new job opportunities</p>
  </div>
    `;
    return;
  }

  for (let interview of interviewList) {
    console.log(interview);

    let div = document.createElement('div');
    div.className = 'flex justify-between p-8 bg-white';
    div.innerHTML = `
   <!-- left site -->
    <div class="space-y-6">
     <div>
      <h3 class="company-name text-2xl font-bold">${interview.companyName}</h3>
      <p class="position-name">${interview.positionName}</p>
     </div>

     <div class="flex gap-2">
     ${interview.salary}
     </div>

     <p class="change bg-base-300 w-[120px]">${interview.change}</p>
     <p class="notes">${interview.notes}</p>

     <div>
      <button class="interview-btn text-green-400 border px-4 py-2">Interview</button>
      <button class="rejected-btn text-red-400 border px-4 py-2">Rejected</button>
     </div>

    </div>

    <!-- right site -->
    <div>
     <button class="btn-delete px-4"><i class="fa-regular fa-trash-can"></i></button>
    </div>
  
  `;
    filteredSection.appendChild(div);
  }
}


function renderRejected() {
  filteredSection.innerHTML = '';

  if (rejectedList.length === 0) {
    filteredSection.innerHTML = `
    <div id="empty-state" class="flex flex-col items-center justify-center text-center py-20 bg-white">
    <img src="images/jobs.png" alt="">
    <h2 class="text-2xl font-semibold">No jobs available</h2>
    <p class="text-gray-500">Check back soon for new job opportunities</p>
  </div>
    `;
    return;
  }


  for (let rejected of rejectedList) {
    console.log(rejected);

    let div = document.createElement('div');
    div.className = 'flex justify-between p-8 bg-white';
    div.innerHTML = `
   <!-- left site -->
    <div class="space-y-6">
     <div>
      <h3 class="company-name text-2xl font-bold">${rejected.companyName}</h3>
      <p class="position-name">${rejected.positionName}</p>
     </div>

     <div class="flex gap-2">
     ${rejected.salary}
     </div>

     <p class="change bg-base-300 w-[120px]">${rejected.change}</p>
     <p class="notes">${rejected.notes}</p>

     <div>
      <button class="interview-btn text-green-400 border px-4 py-2">Interview</button>
      <button class="rejected-btn text-red-400 border px-4 py-2">Rejected</button>
     </div>

    </div>

    <!-- right site -->
    <div>
     <button class="btn-delete px-4"><i class="fa-regular fa-trash-can"></i></button>
    </div>
  
  `
    filteredSection.appendChild(div);
  }
}


