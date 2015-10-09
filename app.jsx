// App component - represents the whole app
App = React.createClass({

    // This mixin makes the getMeteorData method work
     mixins: [ReactMeteorData],

     // Loads items from the Tasks collection and puts them on this.data.tasks
     getMeteorData() {
       return {
         signins: Signins.find({}).fetch()
       }
     },

     renderSignins() {
       // Get signin from this.data.signins
       return this.data.signins.map((signin) => {
         return <Signin key={signin._id} signin={signin} />;
       });
     },

     handleSubmit(event) {
         event.preventDefault();

         // Find the text field via the React ref
         var guest = React.findDOMNode(this.refs.guestInput).value.trim();
         var member = React.findDOMNode(this.refs.memberInput).value.trim();

         Signins.insert({
           guest: guest,
           member: member,
           createdAt: new Date() // current time
         });

         // Clear form
         React.findDOMNode(this.refs.guestInput).value = "";
         React.findDOMNode(this.refs.memberInput).value = "";

       },

     render() {
          return (
            <div className="container">
              <header>
                <h1>{Signins.find().count()}    Guests currently at the pool</h1>

                {/* Comment -- Add Input with a form */}
             <form className="new-task" onSubmit={this.handleSubmit} >
                <input
                  type="text"
                  ref="guestInput"
                  placeholder="Add Guest Name Here" required />
                  <input
                    type="text"
                    ref="memberInput"
                    placeholder="Add Member Name Here" required />
                <button onClick={this.handleSubmit}>Save</button>
              </form>
              </header>

              <ul>
                {this.renderSignins()}
              </ul>

            </div>
          );
        }
      });
