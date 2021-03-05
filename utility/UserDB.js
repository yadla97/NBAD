// var itemDB = require('./ItemDB.js');
var user = require('../models/User.js');
var userItem = require('../models/UserItem.js');

var myBooks=itemDB.getItems();

var user1=new user('lsuram','Likhith Kumar Reddy','Suram','lsuram@uncc.edu','216 Barton Creek Drive','AptF', 'Charlotte','North Carolina','26282','America');
var user2=new user( 'ssuram','Sudhakara Reddy',  'Suram',  'ssuram@uncc.edu','216 Barton Creek Drive','Apt F',  'Charlotte',  'North Carolina',  '26282','America');
var UserItem1=new userItem(myBooks[1],myBooks[1].rating,'YES');
var UserItem2=new userItem(myBooks[3],myBooks[3].rating,'NO');
var UserItem3=new userItem(myBooks[5],myBooks[5].rating,'NO');
var UserItem4=new userItem(myBooks[2],myBooks[2].rating,'NO');

function UserProfile(UserId, UserItems) {
  this.UserId = UserId;
  this.UserItems = UserItems;
};

var userItem1=[UserItem1,UserItem4];
var userItem2=[UserItem2,UserItem3,UserItem4];
var UserProfile1=new UserProfile(user1.UserId,userItem1);
var UserProfile2=new UserProfile(user2.UserId,userItem2);
var allUsers=[user1,user2];
var allUserItems= [UserItem1,UserItem2,UserItem3];
var allUserProfiles= [UserProfile1,UserProfile2];


var userList=[];

var userList=function(allUserProfiles){
  for (i=0;i<allUserProfiles.length;i++){
    userList.push(allUserProfiles[i].UserId);
  }
  return userList;
}

function getUsers(allUsers){
  return allUsers;
}

var getUserProfile=function(UserId){
  for(i=0;i<allUserProfiles.length;i++){
    if(allUserProfiles[i].UserId===UserId){
return allUserProfiles[i];
    }
    else{
      return "No User data Exists";
    }
  }
}

module.exports.allUsers=allUsers;
module.exports.allUserItems=allUserItems;
module.exports.allUserProfiles=allUserProfiles;
module.exports.getUsers=getUsers;
module.exports.UserProfile=UserProfile;
module.exports.getUserProfile=getUserProfile;
