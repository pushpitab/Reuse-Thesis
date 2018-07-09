
function showMyRepo(){
var dropdown = document.getElementById("Repolist");
var fetchURL= "https://api.github.com/users/"+githubUsername+"/repos?per_page=1000";
    console.log("fetchURL"+fetchURL);
var repoList = fetch(fetchURL)
  .then(function (response) {
  return response.json();
})
    .then(function (data) {
     var reponames =[];
      for(let i = 0; i<data.length;i++) {
      reponames.push(data[i].name);
      console.log("  json.data[i] "+reponames[i]);
      dropdown[dropdown.length] = new Option(reponames[i], reponames[i]);
  }   
  document.getElementById('Repolist').setAttribute('style', 'display: inline-block; visibility: visible;'); 
  document.getElementById('postUserData').value=githubUsername;
  return  reponames;
});

// Get dropdown element from DOM
}

function getReadMe(){
  var repoSelected=  document.getElementById('Repolist').value;
  var fetchReadmeURL= "https://api.github.com/repos/"+githubUsername+"/"+repoSelected+"/contents/README.md";
  console.log("fetchReadmeURL"+fetchReadmeURL);
  var readme = fetch(fetchReadmeURL)
  .then(function (response) {
    return response.json();
   })
    .then(function (data) {
      console.log("encoded readme data"+ data.content);
      var decodedString = atob(data.content);
      console.log(decodedString);
      document.getElementById("message").innerHTML = "Readme content in Github :\n"+decodedString;
      document.getElementById("infnamelabel").innerHTML  = "Input File name ";
      document.getElementById("outfnamelabel").innerHTML  = "Output File name ";
      document.getElementById('infile_name').setAttribute('style', 'display: inline-block; visibility: visible;');
      document.getElementById('opfile_name').setAttribute('style', 'display: inline-block; visibility: visible;');
      document.getElementById('Submit').setAttribute('style', 'display: inline-block; visibility: visible;'); 
    })
}

  