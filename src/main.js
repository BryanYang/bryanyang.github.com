

var ExampleApplication = React.createClass({
    render: function() {
        var elapsed = Math.round(this.props.elapsed / 100);
        var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0');
        var message =
           <h1> 'React has been successfully running for ' + seconds + ' seconds.'</h1>;

        return React.DOM.p(null, message);
    }
});

// Call React.createFactory instead of directly call ExampleApplication({...}) in React.render
var ExampleApplicationFactory = React.createFactory(ExampleApplication);

var Counter = React.createClass({
        getInitialState: function () {
          return { clickCount: 0 };
        },
        handleClick: function () {

          this.setState(function(state) {
            return {clickCount: state.clickCount + 1};
          });
        },
        render: function () {
          return (<h2 onClick={this.handleClick}>Click me! Number of clicks: {this.state.clickCount}</h2>);
        }
  });
/*
React.render(
<Counter />,
document.getElementById('message')
);
*/
function aa(){
  alert(1)
}

var Buttons = React.createClass({
		    getInitialState: function () {
          return { zhuangtai: 'VIEW' };
        },
        handleClick: function () {
        
          this.setState(function(state) {
          	var s = 'VIEW';
          	console.log(state.zhuangtai);
          	if(state.zhuangtai == 'VIEW') s='EDIT';
          	else if(state.zhuangtai == 'EDIT') s='CHECK';
            return {zhuangtai: s};
          }.bind(this));
        },
        render: function () {
        	var buttons = [];
        	switch (this.state.zhuangtai){
        		case 'VIEW':
        			buttons = ['编辑','返回'];
        			break;
        		case 'EDIT':
        			buttons = ['提交','返回'];
        			break;
        		case 'CHECK':
        			buttons = ['同意','拒绝','返回'];
        			break;
        	}

        
          	return (<div >
          				<h1>Hi:</h1>
          				<h2 className="commentAuthor">
				          {this.props.author}
				        </h2>
				        {this.props.children}
          			{
                  buttons.map(function(b){
                  return(
                    <input type='button' value={b} onClick={this.handleClick.bind(this)} />)}
                  ,this)
                }
          			</div>);
        }
})


React.render(
<Buttons author="yanggaofei" />,
document.getElementById('message')
);

