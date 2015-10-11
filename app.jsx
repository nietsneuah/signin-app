// App component - represents the whole app
App = React.createClass({

    // This mixin makes the getMeteorData method work
     mixins: [ReactMeteorData],

     getInitialState() {
       return {
         // Initialize the state of hideCompleted
         hideCompleted: false
       }
     },

     // Loads items from the Tasks collection and puts them on this.data.signins
     getMeteorData() {
       let query = {};

       if (this.state.hideCompleted) {
         // If hide checkbox is checked then filter
         query = {checked: {$ne: true}};
       }

       return {
         signins: Signins.find({}, {sort: {createdAt: -1}}).fetch(),
         incompleteCount: Signins.find({checked: {$ne: true}}).count()
       };
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
       // Force a Re-Render with this.state by calling this.setState
       toggleHideCompleted() {
         this.setState({
           hideCompleted: ! this.state.hideCompleted
         });
       },

     render() {
          return (
            <div className="container">
              <header>
                <h1>{this.data.incompleteCount}    Guests currently at the pool</h1>
                <label className="hide-completed">
                  <input
                  type="checkbox"
                  readOnly={true}
                  checked={this.state.hideCompleted}
                  onClick={this.toggleHideCompleted} />
                Hide Billed Guests from view
                </label>
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
