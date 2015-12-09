var Line = React.createClass({displayName: "Line",
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
          return (React.createElement("h1", {className: "page-header", dangerouslySetInnerHTML: {__html: RegExp.$1}}))
        }else if(/^##\s(.*)/.test(l)){
          return (React.createElement("h2", {dangerouslySetInnerHTML: {__html: RegExp.$1}}))
        }else if(/^----/.test(l)){
          return(React.createElement("div", {className: "border"}))
        }else if(/^>\s(.*)/.test(l)){
          return(React.createElement("blockquote", {dangerouslySetInnerHTML: {__html: RegExp.$1}}))
        }else if(/^\*\s(.*)/.test(l)){
            return(React.createElement("li", {dangerouslySetInnerHTML: {__html: RegExp.$1}}))
        }

        else return(
          React.createElement("div", {className: "bs-docs-section", dangerouslySetInnerHTML: {__html:'<p>' +l+'</p>'}}
      
          ));
    }
});

var Article = React.createClass({displayName: "Article",
    render: function() {
        var lines = this.props.lines;
        var author= this.props.author;
        var date = this.props.date;
        lines.splice(1,0,'**'+author+'**'+'  *'+ date+'*');
        var html = lines.map(function(line){
            return (React.createElement(Line, {line: line}))
        })

        return (
          React.createElement("div", {className: "container"}, 
          html
          ));
    }
});
