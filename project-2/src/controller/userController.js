const bcrypt = require('bcryptjs');

let users = [];
let sessions = [];

const signup = (req,res)=>{
    const { username, password} = req.body;

    const existingUser = users.find(user => user.username === username);
    if(existingUser) {  //checking for existing user
        return res.status(400).json({ success : false, message : "User already exists"});
    }

    const hashedPassword = bcrypt.hashSync(password,10); //hash the password
    const newUser = { username, password : hashedPassword};
    users.push(newUser);

    return res.status(201).json({ success : true, message : "User Registered Successfully !"});
}

const login = (req,res)=>{
    const { username, password} = req.body;

    const user = users.find(user => user.username === username); //find by user name

    if(!user || !bcrypt.compareSync(password, user.password)) { // Check if user exists and password is correct
        return res.status(400).json({ success : false, message : "Invalid username or password ..." });
    }

    if(!sessions.includes(username)) {  // Add session
        sessions.push(username);
    }

    return res.status(200).json({ success : true, message : "Login Successful !!!"});
}

const logout = (req,res) => {
    const username = req.header('Authorization');

    const  isAuthenticated = sessions.includes(username);  // Check if user is authenticated

    if(!isAuthenticated) {
        return res.status(401).json({ success : false, message : "UnAuthorized"});
    }

    sessions = sessions.filter(sessionItem => sessionItem != username);     // Remove session

    return res.status(200).json({ success : true, message : "Logout Successful"});
}

module.exports = { signup, login, logout};