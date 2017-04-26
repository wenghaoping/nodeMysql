/*
*2017/1/16
*Bywhp
*中英文特殊字符分组
*arr:访问数组["我","2","A"]
*/
function pySegSort(arr,empty) {
	if(!String.prototype.localeCompare)
	return null;

	var letters ="*abcdefghjklmnopqrstwxyz".split('');
	var chinese ="啊把差大额发噶哈级卡啦吗那哦爬器然啥他哇西呀咋".split('');

	var segs = [];
	var curr;
	//判断是否符合正则表达式判断是否为英文
	var reg= /^[A-Za-z]+$/;		
	$.each(letters, function(i){
		curr = {letter: this, data:[]};
		$.each(arr, function() {
			if(reg.test(this)){
				if((letters[i]==this.charAt(0).toLocaleLowerCase()) || (letters[i]==this.toLocaleUpperCase())) {
					curr.data.push(this);
				}				
			}else{
				if((!chinese[i-1] || chinese[i-1].localeCompare(this) <= 0) && this.localeCompare(chinese[i]) == -1){
					curr.data.push(this);
				}
			}			
		});
		if(empty || curr.data.length) {
			segs.push(curr);
			curr.data.sort(function(a,b){
				return a.localeCompare(b);
			});
		}
	});
	return segs;
}



/**
 * 验证IP地址是否合法
 */
function isIP(ip){
	var re =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
	return re.test(ip);
}

/*
* 非空判断,找到ID下的所有的输入框
* */
function verify(id){
	var rtn = new Object();
		// input中IP的值元素的值
		$("#"+id).find("input[name='ip']").each(function () {
			if (!isIP($(this).val())) {
				rtn.ip='false';
			}			
		})
		// input元素的值
		$("#"+id).find("input[type='text']").each(function () {
	        if ($(this).val() == "" || $(this).val() == null ) {
	        	rtn.text='false';
	        }
	    })
    	$("#"+id).find("input[type='password']").each(function () {
	        if ($(this).val() == "" || $(this).val() == null ) {
	        	rtn.password='false';
	        }
	    })
	    // 获取checkbox的值
    	$("#"+id).find("input[type='checkbox']").each(function () {
	        if ($(this).val() == "" || $(this).val() == null ) {
	        	rtn.checkbox='false';
	        }
	    })		
	    // 获取checkbox的值
    	$("#"+id).find("textarea").each(function () {
	        if ($(this).val() == "" || $(this).val() == null ) {
	        	rtn.textarea='false';
	        }
	    })
	    // 获取select值
    	$("#"+id).find("select").each(function () {
	        if ($(this).val() == "" || $(this).val() == null ) {
	        	rtn.select='false';
	        }
	    })
	    if(jQuery.isEmptyObject(rtn)){
	    	return true
	    }
		for(key in rtn){
			if(rtn['ip']=='false'){			
				alert('ip地址输入错误')
				break;
			}else if(rtn[key]=='false'){
				alert('输入框不能为空')
				break;
			}
			
		}
}