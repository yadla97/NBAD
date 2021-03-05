var express=require('express')
var app=express();
var router =express.Router();
var bodyParser= require('body-parser');
var urlencodedParser= bodyParser.urlencoded({extended:false});
var itemDB=require('../utility/ItemDB')
var userItemProfile=require('../models/UserProfile.js');
const { check, validationResult } = require('express-validator/check')

var myBooks=itemDB.getItems();
var listofitems=itemDB.itemcodes();

var theUser=function(req,res,next){
  req.session.listofitems=listofitems;
  req.session.save();
  next()
}

router.use(theUser);

router.get('/myItems',function(req,res,next){
console.log("You have accessed Profile Controller");
var action=req.query.action
var userSession=req.session.theUser;
//var userId="lsuram";
if(userSession==undefined){
  var alert = "Please Login!!"
  res.render('login', {alert:alert, login:[]});
//   if( action==undefined){
//
// var alert='';
//       // req.session.currentProfile=currentProfile;
//        // var myBooks=req.session.currentProfile.UserItems;
//
//       // req.session.save();
//       var userProfile=userItemProfile.getUserItems(userId);
//       userProfile.then(function(docs){
//       req.session.theUser=docs;
//       var items=docs
//       if (docs.length==0)
//       {
//           res.render('myItems',{myBooks:[],firstname:userId,alert:'No Books', login:[1]});
//       }
//       else{
//
//           res.render('myItems',{myBooks:docs,firstname:userId,alert:alert, login:[1]});
//       }
//     });
//   }
//
//
//   else if(action=='bookSave'){
//     console.log('Save Action is Called');
//  var itemCode=req.query.theItem;
//  var myBooks=itemDB.getItem(itemCode);
//  item=myBooks.exec();
//   item.then(function(docs) {
//     if(docs.length!=0){
// res.render('item',{data:docs,alert:'Please Sign In to Save this Book!', login:[]});
// }
// else {
//   var myBooks=itemDB.getItems();
//   myBooks=myBooks.exec();
//   myBooks.then(function(docs){
//   res.render('categories',{data:docs,firstname:userId, login:[1],alert:''});
// });
// }
//   });
//   // for(i=0;i<myItems.length;i++){
//   //   if(myItems[i]._itemCode==itemCode){
//   //     myBooks=myItems[i];
//   //   }
//   // }
//   //
//   // console.log(myBooks,'is likhith');
//   // if(myBooks.length==0){
//   // res.render('item',{data:myBooks,alert:'Added', login:[]});
//   // }
//   // else if(myBooks.length!=0) {
//   //      res.render('item',{data:myBooks,alert:'Please Sign In to Save this Book!', login:[]});
//   // }
//   }
//
//   else if(action=='bookRate'){
//     console.log('Rate Action is Called');
//     var itemCode=req.query.theItem;
// console.log("likki", itemCode);
//     var myBooks=itemDB.getItem(itemCode);
//     item=myBooks.exec();
//     item.then(function(docs){
//       if(docs.length!=0){
//        res.render('item',{data:docs,alert:'Please Sign In / add the Book before you Rate It', login:[]});
//      }
//      else {
//        var myBooks=itemDB.getItems();
//        myBooks=myBooks.exec();
//        myBooks.then(function(docs){
//        res.render('categories',{data:docs,firstname:userId, login:[1],alert:''});
//      });
//      }
//      });
//   }
// }
}
else
{
  var userId=req.session.theUser[0].UserId

  var alert='';
  if(action=='delete'){
  itemCode=req.query.theItem

  var stored=0;

  var myBooks=userItemProfile.getUserItems(userId);
  var present=0;
  myBooks.exec().then(function(docs){
    for(i=0;i<docs.length;i++){
      console.log(docs[i].itemCode,'is the item id ',i)
      if(docs[i].itemCode==itemCode){
        present=1;
      }
    }
    if(present==1){
        userItemProfile.removeItem(userId,itemCode);
    }
    else{
      message='Cant delete'
    }
  });
  var myBooks=userItemProfile.getUserItems(userId);

  myBooks.then(function(docs){
    if(docs.length!=0){
   res.redirect('myitems')
   res.render('myitems',{myBooks:docs,firstname:userId,alert:alert, login:[1]});
 }
 else {
      res.render('myitems',{myBooks:[],firstname:userId,alert:alert, login:[1]});
 }
})
 //   if(myBooks.length!=0){
 // res.render('myitems',{myBooks:myBooks,firstname:req.session.theUser.FirstName,alert:alert, login:[1]});
 //   }
 //   else {console.log('length=0')
 //        res.render('myitems',{myBooks:[],firstname:req.session.theUser.FirstName,alert:alert, login:[1]});
 //   }
}

else if(action==undefined){

  var myBooks=userItemProfile.getUserItems(userId);
  myBooks.exec().then(function(docs){
if(docs.length!=0){
    res.render('myitems',{myBooks:docs,firstname:userId,alert:alert, login:[1]});
}
else{
  message='No Books for this Usser'
    res.render('myitems',{myBooks:[],firstname:userId,alert:alert, login:[1]});
}
});
// userProfile.getUserItems(myBooks);
//  if(myBooks.length!=0){
// res.render('myitems',{myBooks:myBooks,firstname:req.session.theUser.FirstName,alert:alert, login:[1]});
//  }
//  else {
//       res.render('myitems',{myBooks:[],firstname:req.session.theUser.FirstName,alert:alert, login:[1]});
//  }
}


else if(action=='bookSave'){
  var alert='';
var itemCode=req.query.theItem;
var stored=0;
var myBooks=userItemProfile.getUserItems(userId);
myBooks.exec().then(function(docs){
  for(i=0;i<docs.length;i++){
    if(docs[i].itemCode==itemCode){
      stored=1
    }
  }
if(stored==0){
userItemProfile.addItem(userId,itemCode);
}
if(stored==1){
  alert='Book is already saved!';
}
});

var allBooks=userItemProfile.getUserItems(userId);
allBooks.exec().then(function(docs){
res.redirect('myitems')
res.render('myitems',{myBooks:docs,firstname:userId,alert:alert, login:[1]});

});
// if(myBooks.length!=0){
// res.render('myitems',{myBooks:myBooks,firstname:req.session.theUser.FirstName,alert:alert, login:[1]});
// }
// else {
//      res.render('myitems',{myBooks:[],firstname:req.session.theUser.FirstName,alert:alert, login:[1]});
// }

}

else if(action=='update'){
var itemCode=req.query.theItem;
var item=userItemProfile.getUpdatedData(userId, itemCode).exec().then(function(docs){

  if(docs.length!=0){

  res.render('feedback',{myBooks:docs,firstname:userId, login:[1]});
  }
  else
   {
     var myBooks=itemDB.getItems();
     myBooks=myBooks.exec();
     myBooks.then(function(docs){
     res.render('categories',{data:docs,firstname:userId, login:[1],alert:'Please Update the books you have!'});
   });
  }

});
// var myBooks=req.session.currentProfile.UserItems;
// myitem=userProfile.updateUserItem(itemCode,myBooks);
// if(myitem.length!=0){
//   for(i=0;i<myitem.length;i++){
// }
// res.render('feedback',{myBooks:myitem,firstname:req.session.theUser.FirstName, login:[1]});
// }
// else {
//      res.render('feedback',{myBooks:[],firstname:req.session.theUser.FirstName, login:[1]});
// }
}

else if(action=='bookRate'){
var itemCode=req.query.theItem;
var stored=0;
var allUserItems=userItemProfile.getUserItems(userId);
allUserItems.exec().then(function(docs){
for(i=0;i<docs.length;i++){
  if(docs[i].itemCode==itemCode){
    stored=1
  }
}

if(stored==1){
  var item=userItemProfile.getUpdatedData(userId, itemCode)
  item.exec().then(function(docs){
res.render('feedback',{myBooks:docs,firstname:userId, login:[1],alert:''});

});
}
else {
  var myBooks=itemDB.getItems();
  myBooks=myBooks.exec();
  myBooks.then(function(docs){
  res.render('categories',{data:docs,firstname:userId, login:[1],alert:'Please Save the Book before Rating!!'});
});

}
});
// var myBooks=req.session.currentProfile.UserItems;
// var myitem=[]
// for(i=0;i<myBooks.length;i++){
//   if(myBooks[i].Item._itemCode==itemCode){
//     myitem.push(myBooks[i]);
//   }
// }
// items=itemDB.getItems();
// for(i=0;i<items.length;i++){
//   if(items[i]._itemCode==itemCode){
//     item=items[i];
//   }
// }
//
// if(myitem.length!=0){
//   for(i=0;i<myitem.length;i++){
// }
// res.render('feedback',{myBooks:myitem,firstname:req.session.theUser.FirstName, login:[1],alert:''});
// }
// else {
//      res.render('item',{data:item,firstname:req.session.theUser.FirstName, login:[1],alert:'Save the Book before Rating!'});
// }
}

}
});

router.post('/action*',urlencodedParser,function(req,res,next){
var userId=req.session.theUser[0].UserId
    var itemcodeobj=req.session.listofitems;
    var theItem=req.query.theItem;
     var action=req.query.action;

      if(action=='feedback'){
     var itemCode=req.query.theItem;

     var rating;
     var madeIt;
     if(req.body.rating!=null){
        rating=req.body.rating;


    userItemProfile.updateRating(userId,itemCode,rating);
    var items=userItemProfile.getUserItems(userId)
    items.exec().then(function(docs){
      if(docs.length!=0){
        res.redirect('myItems')
         res.render('myItems',{myBooks:docs,firstname:userId,alert:'', login:[1]});
      }
      else{
          res.send('No Books');
      }
    });
  }

  if(req.body.madeIt!=null){
    madeIt=req.body.madeIt;
    userItemProfile.updateMadeIt(userId,itemCode,madeIt);
    var items=userItemProfile.getUserItems(userId)
    items.exec().then(function(docs){
      if(docs.length!=0){
        res.redirect('myItems')
         res.render('myItems',{myBooks:docs,firstname:userId,alert:'', login:[1]});
      }
      else{
          res.send('No Books');
      }
    });

  }

     }
 });

router.get('/login', function(req,res,next){
  var alert = "Please Login!!"
  res.render('login', {alert:alert, login:[]});

});

router.post('/login',urlencodedParser,[
      check('email').isEmail().not().isEmpty(),
      check('password').isLength({ min: 4 }),
], function(req,res,next){
  const errors = validationResult(req);
  if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array() });
  }
  else{
  var email=req.body.email;
  console.log("likki", email);
  var password=req.body.password;
  var users=userItemProfile.userDetails(email)
  users.exec().then(function(docs){
    console.log(docs,'is the data')
    if(docs.length==0){
      var alert='Invalid UserId, Please Enter a valid UserId!!'
      res.render('login',{alert:alert,login:[]})
    }

    else if(password==docs[0].Password){
      req.session.theUser=docs
      var userId=req.session.theUser[0].UserId
      var myBooks=userItemProfile.getUserItems(userId);
      myBooks.exec().then(function(userItems){
        console.log(userItems,'is inside password validation')
    if(docs.length!=0){
      //req.session.theUser=userItems
      req.session.currentProfile=userItems
        res.render('myItems',{myBooks:userItems,firstname:userId,alert:alert, login:[1]});
    }
    else{
        alert='No Books for this User'
        res.render('myItems',{myBooks:[],firstname:userId,alert:alert, login:[]});
    }
      })
    }
    else{
      var alert='Incorrect UserId or Password!!'
      res.render('login',{alert:alert,login:[]})
    }
  })
}
})

router.get('/register', function(req,res,next){
  var alert = "Please Register!!"
  res.render('register', {alert:alert, login:[]});

});


router.post('/Register',urlencodedParser,[
check('email').isEmail().not().isEmpty(),
check('password').isLength({ min: 6 }),
check('fname').not().isEmpty(),
check('lname').not().isEmpty(),
check('UserId').not().isEmpty(),
check('line1').not().isEmpty(),
check('line2').not().isEmpty(),
check('state').not().isEmpty(),
check('postal').not().isEmpty(),
check('country').not().isEmpty()
], function(req,res,next){

var UserId=req.body.email.split("@",1)
var Password=req.body.password
var FirstName=req.body.fname
var LastName=req.body.lname
var EmailAddress=req.body.email
var AddressLine1=req.body.line1
var AddressLine2=req.body.line2
var City=req.body.city
var State=req.body.state
var PostalCode=req.body.postal
var Country=req.body.country

var users=userItemProfile.userDetails(EmailAddress)

users.exec().then(function(docs){

if(docs.length==0){
var addNewUser=userItemProfile.addUser(UserId,Password,FirstName,LastName,
EmailAddress,AddressLine1,AddressLine2,City,State,PostalCode,Country)

res.render('register',{alert:'Yipppeee!! Successfully Registered :) ',login:[]})
}
else{
res.render('register',{alert:'Same User Id exists!! Please try another one.',login:[]})
}
});
});

router.get('/addBook',function(req,res,next){
var user=req.session.theUser
if(user==undefined){
var message='Please Login!!'
res.render('login',{alert:message,login:[]})
}
else{
res.render('addBook',{alert:'',firstname:req.session.theUser[0].UserId,login:[1]})
}

})

router.post('/AddBook',urlencodedParser,[ check('bcode').not().isEmpty(),
check('bname').not().isEmpty(),
check('desc').not().isEmpty()],function(req,res,next){
const errors = validationResult(req);
if(!errors.isEmpty()){
return res.status(422).json({errors: errors.array() });
}
else{
var userId=req.session.theUser[0].UserId
var itemCode=req.body.bcode
var itemName=req.body.bname
var description=req.body.desc
var category=req.body.category
var rating=req.body.rating
var imageURL=req.body.imageurl

var items=itemDB.getItem(itemCode)

items.exec().then(function(docs){

if(docs.length==0){
var addItem=itemDB.addItem(userId,itemCode,itemName,category,
description,rating,imageURL)

res.render('addBook',{alert:'Book added Successfully!!',firstname:req.session.theUser[0].UserId,login:[1]})
}
else{
res.render('addBook',{alert:'Same Book is already present with same/different Category!!',login:[]})
}
})

}
})

router.get('/updateBook',function(req,res,next){
var user=req.session.theUser
if(user==undefined){
var alert='Please Login!'
res.render('login',{alert:alert,login:[]})
}
else{
res.render('updateBook',{alert:'',firstname:req.session.theUser[0].UserId,login:[1]})
}

})

router.post('/UpdateBook',urlencodedParser,[ check('bcode').not().isEmpty()],
function(req,res,next){
const errors = validationResult(req);
if(!errors.isEmpty()){
return res.status(422).json({errors: errors.array() });
}
else{
if(req.session.theUser==undefined){
var message='Please Login!'
res.render('updateBook',{alert:alert,login:[],firstname:''})
}
else{
var itemCode=req.body.bcode
var itemDetail=itemDB.getItem(itemCode)
itemDetail.exec().then(function(docs){
if(docs.length!=0){
if(docs[0].userId==req.session.theUser[0].UserId){
var userId=req.session.theUser[0].UserId
var name=req.body.bname

if(name!=null){
var itemName=req.body.bname
}
else{
var itemName=docs[0].itemName
}
if(req.body.category!=null){
var category=req.body.category
}
else{
var category=docs[0].catalogCategory
}
if(req.body.desc!=null){
var description=req.body.desc
}
else{
var description=docs[0].description
}
if(req.body.rating!=null){
var rating=req.body.rating
}
else{
var rating=docs[0].rating
}
if(req.body.imageurl!=null){
var imageURL=req.body.imageurl
}
else{
var imageURL=docs[0].imageURL
}


var updateItem=itemDB.updateUserItem(userId,itemCode,itemName,category,description,rating,imageURL)
updateItem.exec().then(function(docs){

})
res.render('updateBook',{alert:'Book is Updated Successfully!!',login:[1],firstname:req.session.theUser[0].UserId})

}
else{
res.render('updateBook',{alert:'Please Update the Book added by You!!',login:[1],firstname:req.session.theUser[0].UserId})
}

}
})
}
}
})



router.get('/logout',function(req,res,next){
    req.session.destroy();
    console.log('User Logout');
    res.render('index',{login:[]})

});

 module.exports= router;
