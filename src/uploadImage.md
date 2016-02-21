## JavaScript 上传图片带预览，React版本
网上有一些例子是上传到server之后，预览。但是觉得有些麻烦。js是支持预览，以及图片格式，大小判断的。本地预览的话，减少了网络请求。同时服务端更轻量。主要代码如下。通过H5的FileReader来读取input上传的文件。FileReader通多流读取，给它绑定回调。将读取后的Base64字符串当作Image的src.然后将Image加入到Dom中，即可完成预览。同时，如果Image的大小，格式符合要求，将它上传到服务器。为了简单，我用的ajaxFileUpload.
> Tip:为了使用第三方样式，可以将原生的input 元素隐藏，然后在另一个元素的点击时。唤起input的点击事件。算是个常用的小技巧吧。

```
	imgSel(e){
		var img = new Image();//构造JS的Image对象 
		let self = this;
		img.onload =()=>{
			if(img.height != 360 || img.width != 640){
				message.error('请上传640*360的图片');
				return false;
			}else{
				$(img).css('height',64);
				$(ReactDom.findDOMNode(this.refs.preview)).html('').append(img);
				$.ajaxFileUpload(
		            {
		                url: '/brand/bigbrandCate/uploadImage',
		                secureuri: false, //是否需要安全协议，一般设置为false
		                fileElementId: 'img', //文件上传域的ID
		                dataType: 'json', //返回值类型 一般设置为json
		                success: function (res, status){  //服务器成功响应处理函数
		                	if(res.status == 0){
		                		message.success(res.msg);
		                		self.setState({dataUrl:res.data});
		                	}else{
		                		message.error('上传失败');
		                	}
		                },
		                error: function (data, status, e)//服务器响应失败处理函数
		                {
		                    message.error('status');
		                }
		            }
		        );
			}
		};
		var reader = new FileReader();
    	reader.onload = (evt)=> {img.src = evt.target.result;};
        //console.log(e.target.files[0].size);
    	reader.readAsDataURL(e.target.files[0]);	
	}
```
更新：
在上面的上传中，需要使用jquery的`ajaxFileUpload`库。后来发现浏览器内置的`FormData`对象也能做同样的事情，并且不需要依赖第三方库。代码如下，通过构建一个form对象，将图片`append`到form中。然后`post`到服务器即可。
```
	imgSel(e){
		var img = new Image();//构造JS的Image对象 
		let self = this;
		img.onload =()=>{
			if(img.height != 360 || img.width != 640){
				message.error('请上传640*360的图片');
				return false;
			}else{
				$(img).css('height',64);
				$(ReactDom.findDOMNode(this.refs.preview)).html('').append(img);

				var form = new FormData();
				form.append('image',$('#img'+this.props.id)[0].files[0]);
				$.ajax({
				  url: '/brand/bigbrandCate/uploadImage',
				  type: 'POST',
				  data: form,
				  processData: false,  // 告诉jQuery不要去处理发送的数据
				  contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
				  success:(res)=>{
					if(res.status == 0){
                		message.success(res.msg);
                		self.setState({dataUrl:res.data});
                	}else{
                		message.error('上传失败');
                	}
				  }
				});
			}
		};
		var reader = new FileReader();
    	reader.onload = (evt)=> {img.src = evt.target.result;};
        //console.log(e.target.files[0].size);
    	reader.readAsDataURL(e.target.files[0]);	
	}
```
React 的 `Render()` 的部分代码
```
<FormItem
      label="背景图："
      labelCol={{span: 8}}
      wrapperCol={{span: 16}}
      required>
      <input type="file" id="img" name="image" accept="image/*" ref="upload" style={{width:0,height:0}} onChange={this.imgSel.bind(this)}/>
      <Button type="ghost" onClick={this.uploadClick.bind(this)}>
          <Icon type="upload"  /> 点击上传
      </Button>
    </FormItem>
    <FormItem label="预览：" labelCol={{span: 8}} wrapperCol={{span: 16}}>
     <span ref="preview"></span>
</FormItem>
```
