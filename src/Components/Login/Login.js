import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig/FirebaseConfig';
import { UserContext } from '../../App';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [loggedInUser , setLoggedInUser]= useContext(UserContext);

    const [newUser , SetnewUser ] =useState(false)
    const [user , setUser ] =useState({
        isSignedIn: false,
        name:'',
        email: '',
        photo:'',
        password:'',
        newUser: false,
    })

    const provider = new firebase.auth.GoogleAuthProvider();

    const handleSignin = () => {

        firebase.auth().signInWithPopup(provider)
        .then(res => {
           const{displayName, email, photoURL} = res.user;
           const signedInUser ={
               isSignedIn:true,
               name: displayName,
               email: email,
               photo: photoURL,
           }
           setUser(signedInUser);
           
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleSignOut = () => {
        firebase.auth().signOut()
        .then(res => {
            const SignOutuser ={
                isSignedIn: false,
                name:'',
                email:'',
                photo:'',
                error:'',
                success:'',
            }
            setUser(SignOutuser);
        })
        .catch(err => {console.log(err)})
           
    }
   const handleChange = (e) => {
       
        let isFormValid = true;

    //    console.log(e.target.value, e.target.name)

       if(e.target.name === 'email'){
         isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
        
       }
       if(e.target.name === 'password'){
        const isPasswordValid = e.target.value.length > 6;
        const isPasswordNumber = /\d{1}/.test(e.target.value)
        isFormValid = (isPasswordValid && isPasswordNumber)
       }

       if(isFormValid){
        const newUserInfo = {...user}
        newUserInfo[e.target.name] =e.target.value;
        setUser(newUserInfo);
    }
      
   }

   const handleSubmit = (e) => {
      if( newUser && user.password && user.email){
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((response) => {
            const newUserInfo ={...user}
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            updateUserName(user.name);
        })

        .catch((error) => {
         const newUserInfo ={...user}
         newUserInfo.error = error.message;
         newUserInfo.success =false;
         setUser(newUserInfo);
        });
      }

      if(!newUser && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then( res => {
            const newUserInfo ={...user}
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo); 
            console.log(res.user); 
        })
        .catch((error) => {
            const newUserInfo ={...user}
            newUserInfo.error = error.message;
            newUserInfo.success =false;
            setUser(newUserInfo);
        });
      }

    e.preventDefault();
   }

   const updateUserName = (name) => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: {name},
     
    }).then(function() {
     console.log("user name update successfully")
    }).catch(function(error) {
      console.log(error)
    });
   }
    return (
        <div>
            
            {
                user.isSignedIn ?<button onClick={handleSignOut} className="btn btn-danger justify-content-center ">Log out</button> :
                <button onClick={handleSignin} className="btn btn-danger justify-content-center ">Login</button>
            }
            {
                user.isSignedIn && 
                <div>
                    <p>  welcome {user.name} </p>
                    <p>{user.email}</p>
                    <img src={user.photo} alt=""/>
                </div>
            }

            <h1>our own authontication</h1>

           <input type="checkbox" onChange={() => SetnewUser(!newUser)} name="newUser" id=""/>
           <label htmlFor="newUser">New User</label>
           <p>new user register</p>


            <form onClick={handleSubmit}>
                
                {newUser && <input type="text" onBlur={handleChange} name="name" placeholder="name" required />}<br/>
                <input type="text" onBlur={handleChange} name="email" placeholder="email" required/><br/>
                <input type="password" onBlur={handleChange} name="password" placeholder="password" required/><br/> 
                <input type="submit" value="submit"/>
            </form>
            <p style={{color:'red' , fontSize:'30px'}} >{user.error}</p>
            {user.success && <p style={{color:'green' , fontSize:'30px'}}>use {newUser ? 'created ' : 'Login '} successfully</p>}
        </div>
    );
};

export default Login;