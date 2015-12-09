

var ExampleApplication = React.createClass({displayName: "ExampleApplication",
    render: function() {
        var elapsed = Math.round(this.props.elapsed / 100);
        var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0');
        var message =
           React.createElement("h1", null, " 'React has been successfully running for ' + seconds + ' seconds.'");

        return React.DOM.p(null, message);
    }
});

// Call React.createFactory instead of directly call ExampleApplication({...}) in React.render
var ExampleApplicationFactory = React.createFactory(ExampleApplication);

var Counter = React.createClass({displayName: "Counter",
        getInitialState: function () {
          return { clickCount: 0 };
        },
        handleClick: function () {

          this.setState(function(state) {
            return {clickCount: state.clickCount + 1};
          });
        },
        render: function () {
          return (React.createElement("h2", {onClick: this.handleClick}, "Click me! Number of clicks: ", this.state.clickCount));
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

var Buttons = React.createClass({displayName: "Buttons",
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

        
          	return (React.createElement("div", null, 
          				React.createElement("h1", null, "Hi:"), 
          				React.createElement("h2", {className: "commentAuthor"}, 
				          this.props.author
				        ), 
				        this.props.children, 
          			
                  buttons.map(function(b){
                  return(
                    React.createElement("input", {type: "button", value: b, onClick: this.handleClick.bind(this)}))}
                  ,this)
                
          			));
        }
})


React.render(
React.createElement(Buttons, {author: "yanggaofei"}),
document.getElementById('message')
);

