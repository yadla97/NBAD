var itemDB=require('../utility/ItemDB');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/Books', { useNewUrlParser: true });

var Schema=mongoose.Schema;

var UserSchema=new Schema({
  UserId : String,
  Password : String,
  FirstName : String,
  LastName : String,
  EmailAddress : String,
  AddressLine1  : String,
  AddressLine2  : String,
  City : String,
  State : String,
  PostalCode : String,
  Country : String,
});

var User=mongoose.model('user',UserSchema);

var UserProfileSchema=new Schema(
  {
    userId: String,
    userItems:[]
  }
);

var UserProfile=mongoose.model('userprofile',UserProfileSchema);

var UserItemsSchema= new Schema(
  {
    userId: String,
    itemCode:String,
    itemName: String,
    catalogCategory:String,
    imageURL:String,
    description:String,
    rating: String,
    madeIt: String

  }
);

var UserItems =mongoose.model('useritem',UserItemsSchema);

var getUserItems=function(id){
  var userData=UserItems.find({userId:id});
  userData.exec().then(function(docs){
  });
  return userData;
}

var getUpdatedData=function(id,itemCode){
var data=UserItems.find({userId:id,itemCode:itemCode})
return data
}



var addItem=function(userId,itemCode){
  var item=itemDB.getItem(itemCode);
  item=item.exec();
  item.then(function(docs){
    var newUser=new UserItems({
      userId: userId,
      itemCode:itemCode,
      itemName: docs[0].itemName,
      catalogCategory:docs[0].catalogCategory,
      imageURL: docs[0].imageURL,
      description: docs[0].description,
      rating: "1",
      madeIt: "No"
    });
    newUser.save().then(function(docs){
      console.log('Book Saved');
    });
});
}


var removeItem=function(userId,itemCode){
  UserItems.remove({userId: userId,itemCode:itemCode}).then(function(docs){
  console.log(docs.length);
  });
}

var updateRating=function(userId,itemCode,rating){
  UserItems.update({userId:userId,itemCode:itemCode},{$set:{rating:rating}}).exec().then(function(docs){
  console.log('Updating');
  });
}

var userDetails = function(id){
  var usr = User.find({EmailAddress:id})
  return usr;
}


var updateMadeIt=function(userId,itemCode,madeIt){
  UserItems.update({userId:userId,itemCode:itemCode},{$set:{madeIt:madeIt}}).exec().then(function(docs){
  console.log('Updating');
  });
}

var addUser=function(UserId,Password,FirstName,LastName,EmailAddress,AddressLine1,AddressLine2,City,State,PostalCode,Country){
  console.log(EmailAddress, 'likki');
var newUser=new User({
UserId : UserId,
Password:Password,
FirstName : FirstName,
LastName : LastName,
EmailAddress : EmailAddress,
AddressLine1 : AddressLine1,
AddressLine2 : AddressLine2,
City : City,
State : State,
PostalCode : PostalCode,
Country : Country
})
newUser.save().then(function(docs){
console.log('New User is saved successfully')
});

}

// class UserProfile{
//   constructor(UserId, UserItems){
//     this.UserId= UserId;
//     this.UserItems=UserItems;
//   }
//
//   addUserItem(itemCode,myBooks){
//       var stored=0
//     var myItems=itemDB.getItems();
//     for(i=0;i<myBooks.length;i++){
//       if(myBooks[i].Item._itemCode==itemCode){
//      stored=1;
//
//       }
//     }
//     if(stored==0){
//     myItems=itemDB.getItems();
//     for(i=0;i<myItems.length;i++){
//       if(myItems[i]._itemCode==itemCode){
//
//         var UserItem=new userItem(myItems[i],0,'NO');
//         myBooks.push(UserItem);
//
//       }
//     }
//   }return myBooks;
//
//   };
// removeUserItem(ItemID,myBooks){
//     var ItemIdobj=[];var stored=0;
//     for (i=0;i<myBooks;i++){
//       ItemIdobj.push(myBooks);
//     }
//
//       for (i=0;i<myBooks.length;i++){
//         if(myBooks[i].Item._itemCode==ItemID){
//           myBooks.splice(i,1);
//           return 'Book with '+ ItemID +' is removed';
//           stored=1;
//         }
//       }
//
//     if(stored==0){
//       return 'No Book with '+ ItemID+' Present';
//     }
//
//
// }
// getUserItems(myBooks){
//   return myBooks;
//
// }
//
// updateUserItem(itemCode,myBooks){
//   var myitem=[];
//   for(i=0;i<myBooks.length;i++){
//     if(myBooks[i].Item._itemCode==itemCode){
//       myitem.push(myBooks[i]);
//     }
//   }
//   return myitem;
// };
//
// emptyProfile(){
// var myBooks=[];
// return myBooks;
// }
// }

module.exports.getUserItems=getUserItems;
module.exports.getUpdatedData=getUpdatedData;
module.exports.removeItem=removeItem;
module.exports.addItem=addItem;
module.exports.updateRating=updateRating;
module.exports.updateMadeIt=updateMadeIt;
module.exports.userDetails=userDetails;
module.exports.addUser=addUser;
