import React ,{Component}from 'react';
import $ from 'jquery';
require('whatwg-fetch/fetch');
require('./ui.less');

class Line extends Component{
  constructor(props){
    super(props);
    this.state={
      windowWidth:window.innerWidth,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  handleResize(e){
    this.setState({windowWidth: window.innerWidth});
  }

  render(){
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
              return(<div dangerouslySetInnerHTML={{__html: h}}></div>)
            }
          
        }else return(
          <div className="bs-docs-section" dangerouslySetInnerHTML={{__html:'<p>' +l+'<p>'}}>
      
          </div>);
  }

}


class App extends Component{
  constructor(props){
    super(props);

    this.state={
      articleLines : [],
      articleList : [],
    }
  }

  componentDidMount(){
    this.fetchArticleList();
    let myElement = document.querySelector('header');
    let headroom  = new Headroom(myElement,{
        tolerance: 5,
        offset: 205,
        classes: {
          initial: 'animated',
          pinned: 'slideInDown',
          unpinned: 'slideOutUp'
        }
    });
    headroom.init();
    prettyPrint();
    let hash = window.location.hash.substr(1);
    if(hash != ''){
      this.fetchArticle(`build/datas/${hash}.json`);
    }
  }

  componentDidUpdate(){
    if(window.prettyPrint){
      prettyPrint();
    }

    $('.post-nav').pin({padding: {top: 10, bottom: 10}});
  }

  fetchArticle(link){
    fetch(link)
    .then(response => response.json())
    .then((json) => {
      let array = link.split('/');
      let name = array[array.length-1].split('.')[0];
      window.location.hash = name;
      this.setState({articleLines:json})
    })
  }

  fetchArticleList(){
    fetch('build/datas/articles.json')
    .then(function (response) {return response.json();})
    .then(json => this.setState({articleList:json}));
  }

  render(){
    return(
      <div className="container mt50">
        <header className="header header--fixed hide-from-print animated">
          <div className="container">
            <nav className="nav-wrapper">
            </nav>
            <a href="#" className="brand header__link">
              <b className="brand__forename">Bryan Yang</b><b className="brand__surname">'s blog</b>
            </a>
          </div>
        </header>
            <div className="row">
                <div className="col-xs-12 col-md-9 main ">
                    <Article lines={this.state.articleLines}  />
                </div>
                <div className="col-xs-12 col-md-3 side">
                  <Author/>
                  <ArticleList dataSource={this.state.articleList} toArticle={this.fetchArticle.bind(this)}/>
                </div>
                  
            </div>
        </div>
      )
  }
}


class Article extends Component{
  constructor(props){
   super(props);
  }

  render(){
        let lines = this.props.lines;
        let html = lines.map(function(line){
            return (<Line line={line} />)
        });
        return (
          <div className="">
          {html}
          </div>);
  }
}



class Author extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
        <div className="widget-box no-border">
          <p className="text-muted">本文标签</p>
          <h4 className="fz16"><a href="/blog/haiping">web前端</a></h4>
          <p className="wordbreak">记录前端开发过程的思考，分享开发经验！</p>
          <div className="article__widget--author">
              <a href="/u/haiping">
                  <img className="avatar-40" src="https://avatars0.githubusercontent.com/u/3216761?v=3&s=460" alt="haiping"/>
                  <span>Bryan Yang</span>
              </a>
              <span className="text-muted">作者</span>
          </div>
        </div>

      )
  }
}

class ArticleList extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    $('.post-nav').pin();
  }

  render(){
    return (
        <div className="post-nav hidden-xs side-outline hidden-sm">
          <div className="panel panel-default widget-outline">
            <div className="panel-heading">文章目录</div>
            <div className="panel-body">
              <div className="nav-body">
                <div className="highlight-title"></div>
                <ul className="articleIndex">
                 {this.props.dataSource.map( a => <li><a href='javascript:void(0)' 
                  onClick={this.props.toArticle.bind(this,a.link)}>{a.title}</a></li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
  }
}

React.render(<App />,document.getElementsByTagName('body')[0])








