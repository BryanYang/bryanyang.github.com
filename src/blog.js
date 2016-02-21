var Line = React.createClass({
   getInitialState: function() {
    return {windowWidth: window.innerWidth};
  },
     componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  handleResize: function(e) {
    this.setState({windowWidth: window.innerWidth});
  },


    render: function() {
        var l = this.props.line;
        l = l.replace(/\t/g,'    ');
        //l = l.replace(/.+</g,'&lt;').replace(/.+>/g,'&gt;');
        if(!/```([^`]+?)```/.test(l)){
            l = l.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
            l = l.replace(/\*(.+?)\*/g,'<em>$1</em>');
            l = l.replace(/!\[.+?\]\((.+?)\)/g,'<img src="$1" class="img-thumbnail" style="margin-right:50px;float:left"/>');
            l = l.replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2">$1</a>');
            l = l.replace(/`(.+?)`/g,'<code>$1</code>');
        }
        
    
        l = l.replace(/<code>(.*?)<\/code>/g,function(p){
          return '<code>'+RegExp.$1.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</code>';
        });
        if(/^#\s(.*)/.test(l)){
          return (
            <h1 className="page-header" dangerouslySetInnerHTML={{__html: RegExp.$1}}></h1>
            )
        }else if(/^##\s(.*)/.test(l)){
          return (<h2 dangerouslySetInnerHTML={{__html: RegExp.$1}}></h2>)
        }
        else if(/^###\s(.*)/.test(l)){
          return (<h3 dangerouslySetInnerHTML={{__html: RegExp.$1}}></h3>)
        }else if(/^----/.test(l)){
          return(<div className='border'></div>)
        }else if(/^>\s(.*)/.test(l)){
          return(<blockquote dangerouslySetInnerHTML={{__html: RegExp.$1}}></blockquote>)
        }else if(/^\*\s(.*)/.test(l)){
            return(<li dangerouslySetInnerHTML={{__html: RegExp.$1}}></li>)
        }else if(/```([^`]+?)```/.test(l)){
          return (<pre className="prettyprint linenums Lang-js" dangerouslySetInnerHTML={{__html:RegExp.$1.replace(/</g,'&lt;').replace(/>/g,'&gt;')}}></pre>);
        }else if(/^\|\s(.*)/.test(l)){
            if(this.state.windowWidth>600){
              return(<table className="table table-bordered" dangerouslySetInnerHTML={{__html: RegExp.$1}}></table>)
            }else{
              var h = RegExp.$1.replace(/<tr>/g,'<div class="row">').replace(/<\/tr>/g,'</div>').replace(/<td>/g,'<div class="col-xs-6">').replace(/<\/td>/g,'</div>');
              console.log(h);
              return(<div dangerouslySetInnerHTML={{__html: h}}></div>)
            }
          
        }else return(
          <div className="bs-docs-section" dangerouslySetInnerHTML={{__html:'<p>' +l+'<p>'}}>
      
          </div>);
    }
});

var Article = React.createClass({
    render: function() {
        var lines = this.props.lines;
        var author= this.props.author;
        var date = this.props.date;
        lines.splice(1,0,'**'+author+'**'+'  *'+ date+'*');
        var html = lines.map(function(line){
            return (<Line line={line} />)
        })

        return (
          <div className="">
          {html}
          </div>);
    }
});


