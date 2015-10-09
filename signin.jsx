// Task component - represents a single todo item
Signin = React.createClass({
  propTypes: {
    // This component gets the signin to display through a React prop.
    // We can use propTypes to indicate it is required
    signin: React.PropTypes.object.isRequired
  },
  render() {
    return (
        // must be in an HTML tag


        <li>{this.props.signin.guest} is a guest of {this.props.signin.member}</li>

    );
  }
});
