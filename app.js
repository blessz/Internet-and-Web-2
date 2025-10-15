async function fetchUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('HTTP error! status: ${response.status}');
    }
    const users = await response.json();
    displayUserList(users);
  } catch (error) {
    console.error('Fetch Error: ', error);
    document.getElementById('userList').innerHTML = '<li class="error">Failed to load users. Please try again later.</li>';
  }
}

function displayUserList(users) {
  const userList = document.getElementById('userList');
  userList.innerHTML = ''; // Clear previous list
  users.forEach(user => {
    const userElement = document.createElement('li');
    userElement.textContent = user.name;
    userElement.classList.add('user-item');
    userElement.addEventListener('click', () => displayUserDetails(user));
    userList.appendChild(userElement);
  });
}

function displayUserDetails(user) {
  const userDetails = document.getElementById('userDetails');
  userDetails.innerHTML = `
    <h2>${user.name}</h2>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
    <p><strong>Phone:</strong> ${user.phone}</p>
    <p><strong>Company:</strong> ${user.company.name}</p>
  `;
}

// Initial fetch of users
fetchUsers();