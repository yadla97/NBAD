var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Books', { useNewUrlParser: true });

var Schema = mongoose.Schema;

var ItemSchema = new Schema({
userId: String,
itemCode:String,
itemName:String,
catalogCategory:String,
description:String,
rating:String,
imageURL:String
});

var Item = mongoose.model('item', ItemSchema);

var getItems = function(){
  var data = Item.find();
  return data;
}

var getItem = function(code){
var item = Item.find({itemCode:code});
return item;
};

var itemcodes=function(){
allitems=Item.find({}).then(function(docs){
});
var itemcodeobj=[];
for(var i=0;i<allitems.length;i++){
itemcodeobj.push(allitems[i].itemCode);
}
return itemcodeobj;
}

var getItemByName=function(name){
var itemByName=Item.find({itemName:name});
return itemByName;
}

var specCateg=function(category){
var books=Item.find({catalogCategory:category});
return books;
}

var addItem=function(userId,itemCode,itemName,catalogCategory,description,rating,imageURL){
var newItem=new Item({
userId:userId,
itemCode:itemCode,
itemName:itemName,
catalogCategory:catalogCategory,
description:description,
rating:rating,
imageURL:imageURL
})
newItem.save().then(function(docs){
console.log('NewItem is saved');
})
}

var updateUserItem=function(userId,itemCode,itemName,category,description,rating,imageURL){
var updatedItem=Item.update({userId:userId,itemCode:itemCode},
{$set:{itemName:itemName,catalogCategory:category,description:description,rating:rating,getImageURL:imageURL}})
return updatedItem;
console.log('likki');
};

//itemcodes(allItems);
//console.log(getItems,'is data after function call')

// var getItems = function () {
//
//     let items = [];
//     for (let i = 0; i < data.length; i++) {
//         let item = new Item(data[i].itemCode,
//             data[i].itemName,
//             data[i].catalogCategory,
//             data[i].description,
//             data[i].rating,
//             data[i].imageURL);
//
//         items.push(item);
//
//     }
//     return items;
//
// };
//
// /**
//  *
//  * @param itemCode
//  * @returns {*}
//  */
// var getItem = function (itemCode) {
//     for (var i = 0; i < data.length; i++) {
//
//         if ((data[i].itemCode) == itemCode) {
//             let item = new Item(data[i].itemCode,
//                 data[i].itemName,
//                 data[i].catalogCategory,
//                 data[i].description,
//                 data[i].rating,
//                 data[i].imageURL
//                 )
//
//             return item;
//         }
//
//     }
//
//     if(i==data.length){
//       return "error";
//     }
// };
//
// var itemcodes=function(){
//   myBooks=getItems();
//   var itemcodeobj=[];
//   for(var i=0;i<myBooks.length;i++){
//     itemcodeobj.push(myBooks[i].itemCode);
//   }
//   return itemcodeobj;
// }
//
// var data = [
//     {
//         itemCode: 'cheaters',
//         itemName:'Cheaters',
//         catalogCategory:'New Books',
//         description:'Cheaters tells nine short stories, each discussing a different shade of infidelity in todays times when societal norms are still the same-archaic. However, the urge to explore and experiment amongst the youth is at an all-time high. This friction, if not handled well, could lead to unexpected roads. Each story, though high on emotions, unfolds in a thrilling narrative.',
//         rating:'5',
//         imageURL: '/assets/images/chetares.jpg'
//     },
//     {
//         itemCode: 'algos',
//         itemName:'Introduction to Algorithms',
//         catalogCategory:'New Books',
//         description:"Some books on algorithms are rigorous but incomplete; others cover masses of material but lack rigor. Introduction to Algorithms uniquely combines rigor and comprehensiveness. The book covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers. Each chapter is relatively self-contained and can be used as a unit of study.",
//         rating:"3",
//         imageURL: '/assets/images/algos.png'
//     },
//
//
//     {
//         itemCode: 'ds',
//         itemName:"Data Structures",
//         catalogCategory:"New Books",
//         description:"Designed to function as a textbook or as a professional reference, Fundamentals of Data Structures in C provides in-depth coverage of all aspects of data structure implementation in ANSI C. The book goes beyond the standard fare of stacks, queues, and lists to offer such features as afull chapter on search structures and a discussion of advanced tree structures.",
//         rating:"4",
//         imageURL: '/assets/images/fds.jpg'
//     },
//
//
//     {
//         itemCode: 'sql',
//         itemName:"SQL Handbook",
//         catalogCategory:"Used Books",
//         description:"SQL Pocket Guide describes how these database systems implement SQL syntax for querying, managing transactions, and making changes to data. It also shows how the systems use SQL functions, regular expression syntax, and type conversion functions and formats.",
//         rating:"5",
//         imageURL: '/assets/images/sql.jpg'
//     },
//
//     {
//         itemCode: 'bunny',
//         itemName:'Pat The Bunny',
//         catalogCategory:'Used Books',
//         description:"For over 75 years, Pat the Bunny has been creating special first-time moments between parents and their children. One of the best-selling children’s books of all time, this classic touch-and-feel book offers babies a playful and engaging experience, all the while creating cherished memories that will last a lifetime.",
//         rating:"3",
//         imageURL: '/assets/images/bunny.jpg'
//     },
//     {
//         itemCode: 'pokemon',
//         itemName:'Pokemon',
//         catalogCategory:'Used Books',
//         description:'Pokémon, also known as Pocket Monsters in Japan, is a media franchise managed by The Pokémon Company, a Japanese consortium between Nintendo, Game Freak, and Creatures. The franchise copyright is shared by all three companies, but Nintendo is the sole owner of the trademark',
//         rating:'2',
//         imageURL: '/assets/images/pokemon.jpg'
//     },
// ];
//
// var category = ["New Books", "Used Books"];

module.exports.getItems = getItems;
module.exports.getItem = getItem;
module.exports.itemcodes=itemcodes;
module.exports.getItemByName=getItemByName;
module.exports.specCateg=specCateg;
module.exports.addItem = addItem;
module.exports.updateUserItem = updateUserItem;
