var Quote = React.createClass({
    componentDidMount: function() {
        //console.log("Mounting");
    },
    componentWillUnmount: function() {
       //console.log("Unmounting");  
    },
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
    getInitialState: function() {
        return {quotes: []};
    }, 
    componentDidMount: function() {
        this.getRandomQuote();
    },
    getRandomQuote: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                var quotes = [data];
                this.setState({quotes: quotes});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
    
        var quotes = this.state.quotes.map(function(quote, key) 
        {
           return (
               <Quote key={key+quote.author} quote={quote.quote} category={quote.category} author={quote.author}></Quote> 
           );
        });
        
        return (
            <div>
                <nav>
                    <a className="button-action" href="#" onClick={this.getRandomQuote}>New Quote</a>
                </nav>
                {quotes}               
            </div>
        );
    } 
});


ReactDOM.render(
    <App url="http://localhost/api/random_quote.php"/>,
    document.getElementById('content')
);