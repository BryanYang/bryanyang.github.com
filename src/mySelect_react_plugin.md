# React select插件
## 用react写的js选择插件。支持二级目录
-------
效果图：
![效果图](build/img/myselect.gif)首先，插件大概分为几个小部分，最上方的input. 用来用户输入。当用户输入的同时。下方的select 选项浮现。接着当用户点击选项后。最下方的部分将显示用户所勾选的选项。同时，当用户在最下方取消勾选后。选项框中的对应的项目也会取消勾选。
说到这里，其实选项框中的项目跟下方显示的其实是一个model.从结构上看，我们的插件大体由三部分组成：
```
var MySelect = React.createClass({
   render: function() {
        return (
            <div>
                <MySelect.Input ref="input"  clickEvent={this.handleInputChange}/>
                <MySelect.Items ref="list" items={this.state.items} cityClick={this.handleCityClick} 
                    shopCheck={this.handleShopSelect} show={this.state.show}/>
                <MySelect.Selected items={this.state.items} cancelEvent={this.handleCancelSelect}/>
            </div>
          );
    }
});
```

接下来需要分辨写每个子项的渲染逻辑。`MySelect.Input`很简单，只是一个`&lt;input&gt;`而已。
```
MySelect.Input = React.createClass({
    render:function(){
        return(
            <input type="text" className="u_input" onChange={this.props.clickEvent}/>
            )
    }
});
```
第二部分，选项。需要从父元素传进来数据进行渲染。另外由于我们是2层结构。父项点击时候，子项才会显示。任何时候只有一个父项的子项被显示。我们将完全由子组件控制的逻辑，写在子逻辑中。比如这里的二级目录显示由隐藏，应该是由子插件自己的状态来控制。我们用状态`show` 来表示当前显示的选项。在渲染时，循环父选项,当`show==父选项`时，渲染复选项的子选项。
子选项我们用一个子组件`MySelect.Shops`来表示.这样也对应了model的数据结构。父选项只需要将数组作为数据源传递给子控件即可。 
```
MySelect.Items = React.createClass({
  getInitialState:function(){
    return {show:''}
  },
  handleItemClick:function(event){
    this.setState({show: $(event.target).attr('id')});
  },
    render:function(){ 

            if(this.props.show){
              return(
                <ul>
                  {
                    this.props.items.map(function(item){
                      return (
                        <li key={item.city} name={item.city}>
                          <div>
                            <label id={item.city} onClick={this.handleItemClick}>{item.city}</label>
                            <input type="checkbox" value={item.city} checked={item.checked} onChange={this.props.cityClick} />
                          </div>
                          {this.state.show == item.city ? <MySelect.Shops shops={item.shops} clickEvent={this.props.shopCheck}/> : ''}
                        </li>
                        )
                    }.bind(this))
                  }
                </ul>
              ) 
            }else{
              return null;
            }
            
}});
```
子控件`MySelect.Shops`的渲染很简单，一个label 加 一个 checkbox:
```
MySelect.Shops = React.createClass({
    render:function(){
        if(this.props.shops.length == 0){
            return null;
        }else{
            return(
                    <div className="shops">
                        {
                            this.props.shops.map(function(shop){
                                return(
                                    <div>
                                    <label htmlFor={shop.id} > {shop.name} </label>
                                    <input type="checkbox" value={shop.id} checked={shop.checked} onChange={this.props.clickEvent}/>
                                    </div>
                                    )
                        }.bind(this))
                    }
                    </div>
                )
        }
        
    }
});
```

最后一部分。`MySelect.Selected`，组成也很简单，选项跟一个用来取消的'x'.
```
MySelect.Selected = React.createClass({
    render:function(){
    var selected=[];
    this.props.items.forEach(function(city){
       var array = city.shops.filter(function(c){
          return c.checked == true;
       });
       selected = selected.concat(array);
    })
    return (
        <div className="selectedDiv">
        {
            selected.map(function(item){
            return (
                <div key={item.id} className="selected">
                        <span>{item.name}</span>
                        <span className="cha" id={item.id} onClick={this.props.cancelEvent}>×</span>
                    </div>)
            }.bind(this))
        }
        </div>
    )
    }
})
```

任何建议或者意见请联系作者 :) [yangggao@hotmail.com](Mailto:yangggao@hotmail.com)
   

