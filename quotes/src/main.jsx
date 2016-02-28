var ready = false;
var quotes = [];
var mainCard;

function loadQuotes() 
{
	$.get("api/quotes.php", function(data) 
	{
		quotes = JSON.parse(data);
		console.log(quotes);
		init();
	});
}

function init()
{
	console.log("Data Ready.");
	var t = [];
	quotes.forEach(function(quote) 
	{
		if (t.indexOf(quote[2]) < 0) {
			t.push(quote[2]);
		}
	});
    
    mainCard = document.getElementById("mainCard");
	console.log(t);
}

function changeQuote()
{
	var index = Math.floor(Math.random() * quotes.length-1);
    
	var quote = quotes[index][0];
	var author = quotes[index][1];
	var category = quotes[index][2];
    $("#mainCard .category").html(category);
    $("#mainCard .author").html(author);
    $("#mainCard .quote").html(quote);
	$("#mainCard").addClass("animate");
    
}

var Quote = React.createClass({
  render: function() {
    return (
      <div className="card">
        <div className="card-header">
            <div className="category">{this.props.category}</div>
        </div>
        <div className="card-body">
            <div className="quote">{this.props.quote}</div>
        </div>
        <div className="card-footer">
            <div className="author">- {this.props.author}</div>
        </div>
      </div>
    );
  }
});


var App = React.createClass({
    //TODO move init/quote loader here.
    // once quotes load, render a new "card" with a transition
    getInitialState: function() {
        return {currentQuote: {author: "", quote:"", category: ""}, data: []};
    }, 
    componentDidMount: function() {
        
    },
    getRandomQuote: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({currentQuote: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        var quote = this.state.currentQuote.quote;
        var author = this.state.currentQuote.author;
        var category = this.state.currentQuote.category;
        return (
            <div>
                <nav>
                    <a className="button-action" href="#" onClick={this.getRandomQuote}>New Quote</a>
                </nav>
                <Quote quote={quote} category={category} author={author}></Quote>                   
            </div>
        );
    } 
});
ReactDOM.render(
        <App url="http://localhost/api/random_quote.php"/>,
        document.getElementById('content')
    );