const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const pictureInput = document.getElementById("profile-picture");
const createProfileBtn = document.getElementById("create-profile");
const profileList = document.getElementById("profile-list");
const themeToggleBtn = document.getElementById("theme-toggle");
const footer = document.querySelector("footer");

let profiles = [];

function createProfileCard(name, age, pictureURL, id) {
  const profileCard = document.createElement("div");
  profileCard.classList.add("profile-card");
  profileCard.setAttribute("data-id", id);

  const img = document.createElement("img");
  img.src = pictureURL;
  img.alt = `${name}'s profile picture`;

  const profileName = document.createElement("h3");
  profileName.textContent = name;

  const profileAge = document.createElement("p");
  profileAge.textContent = `Age: ${age}`;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => editProfile(id));

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => deleteProfile(id));

  profileCard.appendChild(img);
  profileCard.appendChild(profileName);
  profileCard.appendChild(profileAge);
  profileCard.appendChild(editBtn);
  profileCard.appendChild(deleteBtn);

  profileList.appendChild(profileCard);
}

function editProfile(id) {
  const profile = profiles.find((profile) => profile.id === id);
  if (profile) {
    nameInput.value = profile.name;
    ageInput.value = profile.age;
    pictureInput.value = profile.pictureURL;

    deleteProfile(id);
  }
}

function deleteProfile(id) {
  const profile = profiles.find((profile) => profile.id === id);
  if (
    profile &&
    confirm(`Are you sure you want to delete ${profile.name}'s profile?`)
  ) {
    profiles = profiles.filter((profile) => profile.id !== id);
    const profileCard = document.querySelector(`[data-id="${id}"]`);
    if (profileCard) {
      profileCard.remove();
    }
  }
}

createProfileBtn.addEventListener("click", () => {
  const name = nameInput.value;
  const age = ageInput.value;
  const pictureURL = pictureInput.value;

  if (name && age && pictureURL) {
    const id = Date.now();
    const profile = { id, name, age, pictureURL };

    profiles.push(profile);

    createProfileCard(name, age, pictureURL, id);

    nameInput.value = "";
    ageInput.value = "";
    pictureInput.value = "";
  } else {
    alert("Please fill in all fields.");
  }
});

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
});

const currentYear = new Date().getFullYear();
footer.innerHTML = `Profile Card Generator - ${currentYear}`;
