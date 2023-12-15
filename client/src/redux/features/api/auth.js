// save a user to database
export const saveUser = user => {
    const userInfo = {
      email: user.email,
      photoURL:user?.photoURL,
      name: user.displayName
    }
  
    fetch('https://task-master-server-vert.vercel.app/register', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }
