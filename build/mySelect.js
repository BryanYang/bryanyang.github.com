;Array.prototype.insert = function(index, item) {
    this.splice(index, 0, item);
};

if(!Array.prototype.find){
    Array.prototype.find = function(fun){
        for(var i=0;i< this.length;i++){
            if(fun(this[i])){
                return this[i];
            }else{
                continue;
            }
        }
    }
}

Array.prototype.remove=function(dx) {
    //删除索引项
    if(typeof dx == 'number'){
        if (isNaN(dx) || dx > this.length) {
            return false;
        }
        for (var i = 0, n = 0; i < this.length; i++) {
            if (this[i] != this[dx]) {
                this[n++] = this[i]
            }
        }
        this.length -= 1;
    }
    //删除查找的对象
    else if(typeof dx == 'object'){
        var find = false;
        for (var i = 0, n = 0; i < this.length; i++) {
            var equal = true;
            var keys = _keys(dx);
            for(j=0;j<keys.length;j++){

                var k =keys[j];
                if(dx[k] != this[i][k]) equal = false;
            }
            if (!equal) {
                this[n++] = this[i];
            }else{
                find=true;
            }
        }
        if(find)this.length -= 1;
    }
};

Array.prototype.clone=function(){ return [].concat(this); } //或者 Array.prototype.clone=function(){ return this.concat(); } 

//[],'piazzas','shops',{id:''}
Array.prototype.children =function(){
  var args = arguments;
  var array1 = [];
  if(args[0] instanceof Array){
      var indexArray = args[0];
      indexArray.forEach(function(i){
        array1.push(this[i]);
      })

      if(indexArray.length == 0){
        array1=this;
      }
  }else{
    for (var i = 0;i < this.length; i++) {
            var equal = true;
            var keys = _keys(args[0]);
            for(j=0;j<keys.length;j++){
                var k =keys[j];
                if(args[0][k] != this[i][k]) equal = false;
            }
            if (equal) {
               array1.push(this[i]);
            }
        }
  }

  var args2 = args[1];
  var array2 = [];
  if((typeof args2) == 'string'){
   array1.forEach(function(item){
      array2 = array2.concat(item[args2]);
    })
  }
  if(args.length ==2){
    return array2;
  }
 
  var args3 = args[2];
  var array3 = [];

  if((typeof args3) == 'string'){
  array2.forEach(function(items){
      array3 = array3.concat(items[args3]);
    })
  }
  if(args.length ==3){
    return array3;
  }

  var array4 = [];
  var args4 = args[3];
  if(typeof args4 == 'object'){
    for (var i = 0;i < array3.length; i++) {
            var equal = true;
            var keys = _keys(args4);
            for(j=0;j<keys.length;j++){
                var k =keys[j];
                if(args4[k] != array3[i][k]) equal = false;
            }
            if (equal) {
               array4.push(array3[i]);
            }
        }
  }
  return array4;
}

var _keys = function(obj) {
    var array = [];
    for (i in obj) {
        if (obj.hasOwnProperty(i)) {
            array.push(i);
        }
    }
    return array;
};

var MySelect = React.createClass({displayName: "MySelect",
	getInitialState: function() {
    	return {
    		show:false,
    		items:[],
    		selected:[],
        query:{
          shopName:'',
          cityId:''
        }
    	};
  	},
    componentDidMount:function(){
      setTimeout(function(){
        this.setState({items:[
         {city:'北京',id:'bj',checked:false,piazzas:[
          {id:'001',name:'通州万达',shops:[
            {id:'s01',name:'啊迪达斯',checked:false},
            {id:'s02',name:'耐克',checked:false},
             {id:'s03',name:'啊迪达斯',checked:false},
              {id:'s04',name:'啊迪达斯',checked:false},
               {id:'s05',name:'啊迪达斯',checked:false},
                {id:'s06',name:'啊迪达斯',checked:false},
                 {id:'s07',name:'啊迪达斯',checked:false},
                  {id:'s08',name:'啊迪达斯',checked:false},
                   {id:'s09',name:'啊迪达斯',checked:false},
                    {id:'s10',name:'啊迪达斯',checked:false},
                     {id:'s11',name:'啊迪达斯',checked:false},
                      {id:'s12',name:'啊迪达斯',checked:false},
                       {id:'s13',name:'啊迪达斯',checked:false},
                        {id:'s14',name:'啊迪达斯',checked:false},
                         {id:'s15',name:'啊迪达斯',checked:false}
          ]},
          {id:'002',name:'石景山万达',shops:[{id:'s18',name:'啊迪达斯',checked:false},{id:'s16',name:'耐克',checked:false}]},
          {id:'003',name:'CBD万达',shops:[{id:'s19',name:'啊迪达斯',checked:false},{id:'s17',name:'耐克',checked:false}]}
         ]},
         {city:'上海',id:'sh',checked:false,piazzas:[
           {id:'004',name:'上海万达1',shops:[{id:'s20',name:'啊迪达斯',checked:false},{id:'s29',name:'耐克',checked:false}]},
           {id:'005',name:'上海万达2',shops:[{id:'s21',name:'啊迪达斯',checked:false},{id:'s30',name:'耐克',checked:false}]},
           {id:'006',name:'上海万达3',shops:[{id:'s22',name:'啊迪达斯',checked:false},{id:'s31',name:'耐克',checked:false}]},
           {id:'007',name:'上海万达4',shops:[{id:'s23',name:'啊迪达斯',checked:false},{id:'s32',name:'耐克',checked:false}]},
           {id:'008',name:'上海万达5',shops:[{id:'s24',name:'啊迪达斯',checked:false},{id:'s33',name:'耐克',checked:false}]},
           {id:'009',name:'上海万达6',shops:[{id:'s25',name:'啊迪达斯',checked:false},{id:'s34',name:'耐克',checked:false}]},
           {id:'010',name:'上海万达7',shops:[{id:'s26',name:'啊迪达斯',checked:false},{id:'s35',name:'耐克',checked:false}]},
           {id:'011',name:'上海万达8',shops:[{id:'s27',name:'啊迪达斯',checked:false},{id:'s36',name:'耐克',checked:false}]},
           {id:'012',name:'上海万达9',shops:[{id:'s28',name:'啊迪达斯',checked:false},{id:'s37',name:'耐克',checked:false}]}
         ]}
        ]});
      }.bind(this),1000);
    
    },
  	handleInputChange:function(event){
  
  	},
  	handleCityClick:function(event){
        var _items = this.state.items;
        var item = _items.find(function(item){return item.city == event.target.value});

        if(event.target.checked){
          item.checked = true;
          item.shops.forEach(function(c){
              c.checked = true;
          })
        }else{
           item.checked = false;
           item.shops.forEach(function(c){
              c.checked = false;
          })
        }
        this.setState({items:_items});
  	},
  	handleShopSelect:function(event){
  		  var _items = this.state.items;
        var target = $(event.target);
        var cid = target.parents('tr').attr('name');
        var pid = target.parents('tr').attr('id');
        var sid = target.val();
       
        var city = _items.find(function(c){return c.id == cid});
        var piazza = city.piazzas.find(function(p){return p.id == pid});
        var s = piazza.shops.find(function(c){return c.id == sid});
        s.checked = event.target.checked;
        this.setState({items:_items});
  	},
  	handleCancelSelect:function(event){
      var _items = this.state.items;
       _items.children([],'piazzas','shops',{id:event.target.id})[0].checked = false;
       this.setState({items:_items});
  	},
    handleSelectAll:function(){
      var cityId = this.state.query.cityId;
      var _items = this.state.items;
      if(cityId == ''){
        _items.children([],'piazzas','shops').forEach(function(shop){shop.checked = event.target.checked});
      }else{
        _items.children({id:cityId},'piazzas','shops').forEach(function(shop){shop.checked = event.target.checked});
      }
      this.setState({items:_items});
    },
    handleSearch:function(){
     var input = this.refs.input.getDOMNode();
     var shopName = $(input).find('.u_input').val();
     var cityId = $(input).find('select').val();
     this.setState({
        query:{
          shopName:shopName,
          cityId:cityId
        },
        show:true
     })
    },
    render: function() {
        return (
        	React.createElement("div", {className: "select_dom"}, 
        		React.createElement(MySelect.Input, {ref: "input", clickEvent: this.handleInputChange, searchClick: this.handleSearch}), 
        		React.createElement(MySelect.Items, {ref: "list", items: this.state.items, query: this.state.query, cityClick: this.handleCityClick, selectAll: this.handleSelectAll, shopCheck: this.handleShopSelect, show: this.state.show}), 
        		React.createElement(MySelect.Selected, {items: this.state.items, cancelEvent: this.handleCancelSelect})
        	)
          );
    }
});


MySelect.Input = React.createClass({displayName: "Input",
  getInitialState:function(){
    return{
      cities:[{id:'bj',name:'北京'},{id:'sh',name:'上海'}]
    }
  }
	,render:function(){
		return(
      React.createElement("div", {className: "search_head"}, 
        React.createElement("label", null, "门店名称"), 
  			React.createElement("input", {type: "text", className: "u_input", onChange: this.props.clickEvent}), 
        React.createElement("label", null, "门店地区"), 
        React.createElement("select", null, 
          React.createElement("option", {value: ""}, "全部"), 
          
           this.state.cities.map(function(city){
            return React.createElement("option", {value: city.id}, city.name)
           })
         
        ), 
        React.createElement("input", {type: "button", value: "查询", onClick: this.props.searchClick})
      )
			)
	}
});

MySelect.Items = React.createClass({displayName: "Items",
  getInitialState:function(){
    return null;
  },
  handleItemClick:function(event){
    this.setState({show: $(event.target).attr('id')});
  },
  fliterItems:function(query){
    var shopName = query?query.shopName:'';
    var cityId = query?query.cityId:'';
    var ci = this.props.items;
    if(cityId != ''){
      ci = this.props.items.filter(function(item){
        return item.id == cityId;
      });
    }
     
   
    var pizArray = ci.map(function(c){
        var p = c.piazzas;
        c.piazzas.forEach(function(p){
          p.cid = c.id;
        })
        return c.piazzas;
    });

    var _pizs = [];
    pizArray.forEach(function(pizs){
      //pizs [{id,shops:[]},{id,shops:[]}]
        pizs.forEach(function(p){
          //p= {id,shops:[]}
          var _p = p.shops.filter(function(s){
            return s.name.indexOf(shopName) >= 0;
          })
      
          if(_p.length >0){
           _pizs = _pizs.concat({id:p.id,cid:p.cid,name:p.name,shops:_p});
          }
        })
    });
    return _pizs;
  },
	render:function(){   
     var pizs = this.fliterItems(this.props.query);
     var allSelected = pizs.children([],'shops').every(function(shop){return shop.checked});
     var html =  pizs.map(function(p){
        return(
          React.createElement("table", {className: "piz"}, 
          React.createElement("tr", {id: p.id, name: p.cid, key: p.id}, 
            React.createElement("td", {className: "td1"}, p.name), 
            React.createElement("td", {className: "td2"}, React.createElement(MySelect.Shops, {shops: p.shops, clickEvent: this.props.shopCheck}))
            )
          )
          )
       }.bind(this));
     return (React.createElement("div", {className: "shop_list"}, 
            React.createElement("div", {className: "selectAllDiv"}, React.createElement("label", null, "全选"), React.createElement("input", {type: "checkbox", checked: allSelected, onChange: this.props.selectAll})), 
            html
            ));
  }
});

MySelect.Shops = React.createClass({displayName: "Shops",
	render:function(){
		if(this.props.shops.length == 0){
			return null;
		}else{
			return(
					React.createElement("div", {className: "shops"}, 
						
							this.props.shops.map(function(shop){
								return(
									React.createElement("div", null, 
									React.createElement("label", {htmlFor: 'shop_'+shop.id}, shop.name), 
									React.createElement("input", {type: "checkbox", id: 'shop_'+shop.id, value: shop.id, checked: shop.checked, onChange: this.props.clickEvent})
									)
									)
						}.bind(this))
					
					)
				)
		}
		
	}
});

MySelect.Selected = React.createClass({displayName: "Selected",
  getInitialState:function(){
    return {
      toogle:-1
    }
  },
  toogle:function(){
    this.setState({toogle:this.state.toogle*-1});
  },
	render:function(){
    var selected=[];
    this.props.items.forEach(function(city){
       city.piazzas.forEach(function(piz){
          var array = piz.shops.filter(function(c){
            return c.checked == true;
          });
          selected = selected.concat(array);
       })
    });
    var clas = "selectedDiv " + (this.state.toogle>0?'':'toogleUp');
		return (
				React.createElement("div", {className: clas}, 
         React.createElement("div", {className: "title"}, "已选：", 
          React.createElement("span", null, selected.length), 
          React.createElement("i", {className: "icon-angle-down more", onClick: this.toogle}, "^")
         ), 
				
					selected.map(function(item){
						return (
							React.createElement("div", {key: item.id, className: "selected"}, 
								React.createElement("span", null, item.name), 
								React.createElement("span", {className: "cha", id: item.id, onClick: this.props.cancelEvent}, "×")
							))
					}.bind(this)), 
				
        React.createElement("div", {className: "clear"})
				)
			)
	}
})


