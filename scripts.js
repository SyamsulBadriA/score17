function loadTeams() {
  let teams = JSON.parse(localStorage.getItem("teams")) || [];
  const teamList = document.getElementById("team-list");
  teamList.innerHTML = "";

  teams.forEach((team, index) => {
    const teamItem = document.createElement("div");
    teamItem.className = "team-item";
    teamItem.innerHTML = `
            <span>${team.name}</span>
            <span>${team.score}</span>
            <button onclick="incrementScore(${index})">+1</button>
            <button onclick="decrementScore(${index})">-1</button>
            <button onclick="removeTeam(${index})">Remove</button>
        `;
    teamList.appendChild(teamItem);
  });
}

function addTeam(e) {
  e.preventDefault();
  const teamName = document.getElementById("team-name").value;
  let teams = JSON.parse(localStorage.getItem("teams")) || [];

  teams.push({ name: teamName, score: 0 });
  localStorage.setItem("teams", JSON.stringify(teams));
  document.getElementById("team-form").reset();
  loadTeams();
}

function incrementScore(index) {
  let teams = JSON.parse(localStorage.getItem("teams")) || [];
  teams[index].score += 100;
  localStorage.setItem("teams", JSON.stringify(teams));
  loadTeams();
}

function decrementScore(index) {
  let teams = JSON.parse(localStorage.getItem("teams")) || [];
  if (teams[index].score > 0) {
    teams[index].score -= 100;
    localStorage.setItem("teams", JSON.stringify(teams));
    loadTeams();
  }
}

function removeTeam(index) {
  let teams = JSON.parse(localStorage.getItem("teams")) || [];
  teams.splice(index, 1);
  localStorage.setItem("teams", JSON.stringify(teams));
  loadTeams();
}

document.getElementById("team-form").addEventListener("submit", addTeam);

window.onload = loadTeams;
