
var githubUsername=null;
function checkIfLoggedIn(){
    firebase.auth().onAuthStateChanged(function(user){
        if ( user ) {
            console.log( 'User signed in' );
            console.log( user );
            
            var photoURL = user.photoURL;
            console.log("photoURL"+photoURL);
            document.getElementById('github-pic').setAttribute('src', photoURL);          
            // do logged in stuff
            document.getElementById('github-signin')
            .setAttribute('style', 'display: none; visibility: hidden');                      
            document.getElementById('signout')
            .setAttribute('style', 'display: inline-block; visibility: visible; position: absolute; top: 20px; left: 900px;');  
            document.getElementById('showMyRepo').setAttribute('style', 'display: inline-block; visibility: visible;');        
            return true;
        } else {
            console.log( 'User not signed in.' );
            // do not logged in stuff
            document.getElementById('github-signin')
            .setAttribute('style', 'display: inline-block; visibility: visible');
            document.getElementById('signout')
            .setAttribute('style', 'display: none; visibility: hidden') ;
            githubUsername=null;    
            return false;           
        }
    });

}

window.onload= function(){
    console.log("window loaded");
   checkIfLoggedIn();
};

function signOut(){
    firebase.auth().signOut();
    document.getElementById('github-pic').setAttribute('src', '');
    document.getElementById('repoForm').setAttribute('style', 'display: none; visibility: hidden'); 
    githubUsername=null;
}



function signInWithGoogle(){
    var gitHubAuthProvider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(gitHubAuthProvider)
        .then( function(data) {
            console.log("data string "+JSON.stringify(data));
            
            var photoURL = data.user.photoURL;
            ///setting github username
            githubUsername=data.additionalUserInfo.username;
            console.log("photoURL"+photoURL);
            console.log("githubUsername "+githubUsername);
           
            document.getElementById('github-pic').setAttribute('src', photoURL);
            document.getElementById('github-pic').setAttribute('style', 'display: inline-block; visibility: visible');
            document.getElementById('github-signin').setAttribute('style', 'display: none; visibility: hidden');                      
            document.getElementById('signout').setAttribute('style', 'display: inline-block; visibility: visible; position: absolute; top: 20px; left: 900px;');    
           
            
        })
        .catch( function(error) {
            console.log(error);
            // checkIfLoggedIn()
        });
}

