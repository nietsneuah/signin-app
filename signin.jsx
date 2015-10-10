// Task component - represents a single todo item
Signin = React.createClass({
  propTypes: {
    // This component gets the signin to display through a React prop.
    // We can use propTypes to indicate it is required
    signin: React.PropTypes.object.isRequired
  },
  toggleChecked() {
    // Set the toggled property to the opposite value
    Signins.update(this.props.signin._id, {
      $set: {checked: ! this.props.signin.checked}

    });
  },

  deleteThisTask() {
    Signins.remove(this.props.signin._id);
  },

  render() {
    // Gives signins a different className when they are checked off
    // so they can be styled nicely with CSS
    const taskClassName = this.props.signin.checked ? "checked" : "";

    return (
        // must be in an HTML tag
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly={true}
          checked={this.props.signin.checked}
          onClick={this.toggleChecked}/>

        <span className="text">  {this.props.signin.guest} is a guest of {this.props.signin.member}</span>

        </li>

    );
  }
});
