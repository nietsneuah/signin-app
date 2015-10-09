// Define new collection
Signins = new Mongo.Collection("Signins");


// CollectionName.allow({
//     insert: function(){
//         return true;
//     },
//     update: function(){
//         return true;
//     },
//     remove: function(){
//         return true;
//     }
// });


if (Meteor.isClient) {
  // This code is executed on the client only

  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    React.render(<App />, document.getElementById("render-target"));
  });
}
