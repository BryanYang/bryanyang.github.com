var Line = React.createClass({
    render: function() {
        var l = this.props.line;
        var ul_begin = false;
        //l = l.replace(/.+</g,'&lt;').replace(/.+>/g,'&gt;');
        l = l.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
        l = l.replace(/\*(.+?)\*/g,'<em>$1</em>');
        l = l.replace(/!\[.+?\]\((.+?)\)/g,'<img src="$1" class="img-thumbnail"/>');
        l = l.replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2">$1</a>');
        l = l.replace(/```([^`]+?)```/g,'<pre>$1</pre>');
        l = l.replace(/`(.+?)`/g,'<code>$1</code>');
        l = l.replace(/<pre>(.*?)<\/pre>/g,function(p){
          return '<pre>'+RegExp.$1.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</pre>';
        });
        l = l.replace(/<code>(.*?)<\/code>/g,function(p){
          return '<code>'+RegExp.$1.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</code>';
        });
        if(/^#\s(.*)/.test(l)){
          return (<h1 className="page-header" dangerouslySetInnerHTML={{__html: RegExp.$1}}></h1>)
        }else if(/^##\s(.*)/.test(l)){
          return (<h2 dangerouslySetInnerHTML={{__html: RegExp.$1}}></h2>)
        }else if(/^----/.test(l)){
          return(<div className='border'></div>)
        }else if(/^>\s(.*)/.test(l)){
          return(<blockquote dangerouslySetInnerHTML={{__html: RegExp.$1}}></blockquote>)
        }else if(/^\*\s(.*)/.test(l)){
            return(<li dangerouslySetInnerHTML={{__html: RegExp.$1}}></li>)
        }

        else return(
          <div className="bs-docs-section" dangerouslySetInnerHTML={{__html:'<p>' +l+'</p>'}}>
      
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
          <div className="container">
          {html}
          </div>);
    }
});
