var tweets = [{
  username: '@iamspidermayne',
  displayName: 'Justin C',
  date: new Date(),
  content: "Apple has an announcement on Monday! #excited #apple"
}, {
  username: '@tonystark',
  displayName: 'Tony Stark',
  date: new Date(),
  content: "@steverogers sometimes I wanna punch you in your perfect teeth."
}, {
  username: '@steverogers',
  displayName: 'Captain America',
  date: new Date(),
  content: "It's time we fight for what we believe in. #forfreedom"
}];

var Tweet = React.createClass({
  displayName: 'Tweet',

  propTypes: {
    displayName: React.PropTypes.string,
    username: React.PropTypes.string,
    date: React.PropTypes.string,
    content: React.PropTypes.string
  },

  render: function () {
    return (
        <div className="tweet-card">
          <div className = "tweet-card-user" >
            <h3>{ this.props.displayName }</h3>
            <h5>{ this.props.username } - { this.props.date }</h5>
          </div>
          <div className="tweet-card-content">{ this.props.content }</div>
        </div>
    );
  }
});

var App = React.createClass({
  displayName: 'App',

  getInitialState: function () {
    return {
      tweets: this.props.initialData
    };
  },

  componentDidMount: function () {
    console.log('App component mounted!');
    this._generateNewTweets();
  },

  propTypes: {
    initialData: React.PropTypes.array,
    maxCount: React.PropTypes.number,
    interval: React.PropTypes.number
  },

  render: function () {
    return <div>{this._renderTweets()}</div>;
  },

  // Render Helper methods

  _renderTweets: function () {
    var tweetElems = [],
        tweets = this.state.tweets;
    for (var i = tweets.length - 1; i >= 0; i--) {
      tweetElems.push(
      	<Tweet 	key={i} 
      			displayName={tweets[i].displayName} 
      			username={tweets[i].username}
      			date={tweets[i].date.toString()}
      			content={tweets[i].content }
      	></Tweet>);
    }
    return tweetElems;
  },

  // Private methods

  _generateNewTweets: function () {
    var self = this;
    window.setInterval(function () {
    	// make a copy of the Array
      var newTweets = self.state.tweets.slice();

      if (newTweets.length >= self.props.maxCount) {
        newTweets.shift();
      }

      newTweets.push({
        username: '@spambot',
        displayName: 'Spam Bot :)',
        date: new Date(),
        content: 'Beware of Spam Bot! I am taking over twitter! #worlddomination #spambot'
      });

      self.setState({ tweets: newTweets });
    }, self.props.interval);
  },

});

// Note: there is a bug where maxCount cannot be < 3 since our original Tweets array starts off with 3 elements
// Because I want to leave this as identical to the code in the blog post as possible, this here doesn't resolve that. However, feel free to do it yourself!
ReactDOM.render(React.createElement(App, {
  initialData: tweets,
  maxCount: 5,
  interval: 5000
}), document.getElementById('app'));

