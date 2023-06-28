document.addEventListener("DOMContentLoaded", () => {

    const inputForm = document.querySelector("form"); 
    inputForm.addEventListener("submit", getFormContentToJsonDb)
  })

  function getFormContentToJsonDb (event) {
    event.preventDefault();

     // Setting up API Request
    let userInput =  event.target[0].value
    let url = `https://api.github.com/search/users?q=${userInput}`
    let stuff =   {
        method:'GET',
        headers:{'Content-Type':'application/json',
                  'Accept': 'application/vnd.github.v3+json'}
      };
    console.log(url)

    // The Get request
    fetch(url, stuff)
    .then(res => res.json())
    .then(data =>showData(data))
  }

  function showData(d) {

    // Iterating through returned data, creating li, with event listener
    for (let x of d.items) {
        let userList = document.getElementById('user-list');
        let displayData = `${x.login}`
        let newLi = document.createElement('li');
        let createA = document.createElement('text');
        let createAText = document.createTextNode(displayData);
        createA.appendChild(createAText);
        newLi.appendChild(createA)
        newLi.id = `${x.login}`
        newLi.addEventListener("click", getUserRepoDataAndDisplayUpdateDom);
        userList.appendChild(newLi);
    }

function getUserRepoDataAndDisplayUpdateDom(e) {
    // Setting up API Request
    let url = `https://api.github.com/users/${e.target.outerText}/repos`
    let stuff =   {
        method:'GET',
        headers:{'Content-Type':'application/json',
                  'Accept': 'application/vnd.github.v3+json'}
      };

    // The Get request And Display Repo Data
    fetch(url, stuff)
    .then(res => res.json())
    .then(data =>displayRepoData(data))
}
}


function displayRepoData (dd) {
    let userInfo = document.getElementById('repos-list');

    // Clearing out the repo list of all li
    while( userInfo.firstChild ){
        userInfo.removeChild( userInfo.firstChild );
      }

    // Iterating through repo data, creating li for display
    for (let i of dd) {
        //console.log(i.name)

        let anotherNewLi = document.createElement('li');
        let createA = document.createElement('text');
        let createAText = document.createTextNode(i.name);
        createA.appendChild(createAText);
        anotherNewLi.appendChild(createA)
        userInfo.appendChild(anotherNewLi);
    }
}