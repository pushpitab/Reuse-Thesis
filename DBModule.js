module.exports.saveDB = function(db,modelDetails){
console.log("saving data ..............");
  var ref = db.ref("model_details");
  ref.once("value", function(snapshot) {
    console.log(snapshot.val());
  });
 checkIfUserExists(db,modelDetails.gitUserName);
 var usersRef = ref.child(modelDetails.gitUserName);
 var userDataRef= usersRef.push({
    Model: {
      model_name: modelDetails.repoName,
      model_input: modelDetails.input,
      model_output:modelDetails.output
    }
  });


};


function checkIfUserExists(db,userId) {
    var usersRef = db.ref("model_details");
    usersRef.child(userId).once('value', function(snapshot) {
      var exists = (snapshot.val() !== null);
      userExistsCallback(userId, exists);
    }); 
}

function userExistsCallback(userId, exists) {
    if (exists) {
      console.log("user exists");
    } else {
        console.log('user ' + userId + ' does not exist!');
    }
  }