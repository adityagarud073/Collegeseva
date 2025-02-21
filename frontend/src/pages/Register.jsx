// import React, { useState } from 'react'
// //import Add from '../img/gallary.png'

// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db, storage } from '../firebase'
// import { Link, useNavigate } from "react-router-dom";
// import "../style/style.scss"

// const Register = () => {

//   const navigate = useNavigate();
//   const [err, setErr] = useState(false)
//   const [loading, setLoading] = useState(false)

//   // const [isChecked, setIsChecked] = useState(false);

//   // const handleCheckboxChange = (event) => {
//   //   setIsChecked(event.target.checked);
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     const name = e.target[0].value;
//     const email = e.target[1].value;
//     const password = e.target[2].value;
//     const file = e.target[3].files[0];
//     const ischeck = e.target[4].checked
//     console.log(ischeck);

//     try {
//       //Create user
//       const res = await createUserWithEmailAndPassword(auth, email, password);

//       //Create a unique image name
//       const date = new Date().getTime();
//       const storageRef = ref(storage, `${name + date}`);

//       await uploadBytesResumable(storageRef, file).then(() => {
//         getDownloadURL(storageRef).then(async (downloadURL) => {
//           try {
//             //Update profile
//             await updateProfile(res.user, {
//               displayName: name,
//               photoURL: downloadURL,

//             });

//             //create user on firestore
//             await setDoc(doc(db, "users", res.user.uid), {
//               uid: res.user.uid,
//               displayName: name,
//               isVolunteer: ischeck,
//               email,
//               photoURL: downloadURL,
//             });

//             //create empty user chats on firestore
//             await setDoc(doc(db, "userChats", res.user.uid), {});
//             navigate("/");

//             // ischeck && await setDoc(doc(db, "services", res.user.uid), {});
//             navigate("/");

//           } catch (err) {
//             console.log(err);
//             setErr(true);
//             setLoading(false);
//           }
//         });
//       });

//     } catch (err) {
//       setErr(true);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='formContainer'>
//       <div className="formWrapper">
//         <span className="logo">College Seva</span>
//         <span className="title">Register</span>
//         <form onSubmit={handleSubmit}>
//           <input type="text" placeholder='Name' />
//           <input type="email" placeholder='Email' />
//           <input type="password" placeholder='Password' />
//           <input type="file" id='file' />
//           <label htmlFor="file" style={{ display: 'flex', alignItems: 'center', gap: '5px' }} >
//             <span style={{ fontSize: '14px', color: '#4F3B78', paddingLeft: '5px' }}>Add an Avatar !
//             </span></label>

//           <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'gray' }}>
//             Join as volunteer?
//             <input
//               type="checkbox"

//             />
//           </label>

//           <button>Sign Up</button>
//           {loading && "Uploading and compressing the image please wait..."}
//           {err && <span>Something went wrong !</span>}
//         </form>
//         <p>Do have an account ? <Link to='/login'>Login</Link></p>
//       </div>

//     </div>
//   )
// }

// export default Register

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const file = formData.get("file");
    const ischeck = formData.get("ischeck") === "on"; // Convert checkbox value to boolean

    try {
      const response = await axios.post("http://localhost:4000/api/v1/user/new", {
        name,
        email,
        password,
        file,
        ischeck,
      });
      setLoading(false);
      console.log(response);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError("Something went wrong!");
    }
  };

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>College Seva</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input type='text' name='name' placeholder='Name' />
          <input type='email' name='email' placeholder='Email' />
          <input type='password' name='password' placeholder='Password' />
          <input type='file' name='file' id='file' />
          <label htmlFor='file'>
            <span>Add an Avatar!</span>
          </label>
          <label>
            Join as volunteer?
            <input type='checkbox' name='ischeck' />
          </label>
          <button type='submit'>Sign Up</button>
          {loading && <span>Uploading and compressing the image please wait...</span>}
          {error && <span>{error}</span>}
        </form>
        <p>
          Do have an account ? <Link to='/login'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
