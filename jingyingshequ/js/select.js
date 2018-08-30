$(document).ready(function(){
	//第二模块选择
	$("#message").find("#content-cum-right-list").find(".content-cum-right-item").css({
		"transition": "all 2s",
	});
	$("#message").find("#content-row-left-list").find(".content-row-left-item").on('click',function(){
		var list=$("#message").find("#content-row-left-list").find(".content-row-left-item");
		var index_li=list.index(this);
		//判断当前是否是激活
		if($(this).hasClass("content-row-left-item-active")){
			return;
		}else{
			//循环查找其他同级元素，删除激活类名
			for(var i=0;i<$(this).siblings().length;i++){
				if($(this).siblings().eq(i).hasClass("content-row-left-item-active")){
					$(this).siblings().eq(i).removeClass("content-row-left-item-active");
				}
			}
			//给当前点击添加类名
			$(this).addClass("content-row-left-item-active");
			//对应的内容进行切换
			var item=$("#message").find("#content-cum-right-list").find(".content-cum-right-item");
			for(var i=0;i<item.length;i++){
				if(item.eq(i).hasClass("content-cum-right-item-active")){
					item.eq(i).removeClass("content-cum-right-item-active");
				}
			}
			item.eq(index_li).addClass("content-cum-right-item-active");
		}
	})
	
	//第三模块选择
	$("#strategy").find("#strategy-content-main").find(".strategy-content-main-list").css({
		"transition": "all 2s",
	});
	$("#strategy").find("#strategy-content-nav").find(".strategy-content-nav-item").on('click',function(){
		var list=$("#strategy").find("#strategy-content-nav").find(".strategy-content-nav-item");
		var index_li=list.index(this);
		//判断当前是否是激活
		if($(this).hasClass("strategy-content-nav-item-active")){
			return;
		}else{
			//循环查找其他同级元素，删除激活类名
			for(var i=0;i<$(this).siblings().length;i++){
				if($(this).siblings().eq(i).hasClass("strategy-content-nav-item-active")){
					$(this).siblings().eq(i).removeClass("strategy-content-nav-item-active");
				}
			}
			//给当前点击添加类名
			$(this).addClass("strategy-content-nav-item-active");
			//对应的内容进行切换
			var item=$("#strategy").find("#strategy-content-main").find(".strategy-content-main-list");
			for(var i=0;i<item.length;i++){
				if(item.eq(i).hasClass("strategy-content-main-list-active")){
					item.eq(i).removeClass("strategy-content-main-list-active");
				}
			}
			item.eq(index_li).addClass("strategy-content-main-list-active");
		}
	})
	//第四模块选择
	$("#proforma").find("#proforma-content-right").find(".content-cum-right-item").css({
		"transition": "all 2s",
	});
	$("#proforma").find("#proforma-content-left").find(".proforma-content-left-item").on('click',function(){
		var list=$("#proforma").find("#strategy-content-nav").find(".proforma-content-left-item");
		var index_li=list.index(this);
		//判断当前是否是激活
		if($(this).hasClass("proforma-content-left-item-active")){
			return;
		}else{
			//循环查找其他同级元素，删除激活类名
			for(var i=0;i<$(this).siblings().length;i++){
				if($(this).siblings().eq(i).hasClass("proforma-content-left-item-active")){
					$(this).siblings().eq(i).removeClass("proforma-content-left-item-active");
				}
			}
			//给当前点击添加类名
			$(this).addClass("proforma-content-left-item-active");
			//对应的内容进行切换
			var item=$("#proforma").find("#proforma-content-right").find(".content-cum-right-item");
			for(var i=0;i<item.length;i++){
				if(item.eq(i).hasClass("content-cum-right-item-active")){
					item.eq(i).removeClass("content-cum-right-item-active");
				}
			}
			item.eq(index_li).addClass("content-cum-right-item-active");
		}
	})
	//第五模块选择
	$("#immigrant").find("#immigrant-content-main").find(".immigrant-main-list").css({
		"transition": "all 2s",
	});
	$("#immigrant").find("#immigrant-content-nav").find(".immigrant-content-nav-item").on('click',function(){
		var list=$("#immigrant").find("#immigrant-content-nav").find(".immigrant-content-nav-item");
		var index_li=list.index(this);
		//判断当前是否是激活
		if($(this).hasClass("immigrant-content-nav-item-active")){
			return;
		}else{
			//循环查找其他同级元素，删除激活类名
			for(var i=0;i<$(this).siblings().length;i++){
				if($(this).siblings().eq(i).hasClass("immigrant-content-nav-item-active")){
					$(this).siblings().eq(i).removeClass("immigrant-content-nav-item-active");
				}
			}
			//给当前点击添加类名
			$(this).addClass("immigrant-content-nav-item-active");
			//对应的内容进行切换
			var item=$("#immigrant").find("#immigrant-content-main").find(".immigrant-main-list");
			for(var i=0;i<item.length;i++){
				if(item.eq(i).hasClass("immigrant-main-list-active")){
					item.eq(i).removeClass("immigrant-main-list-active");
				}
			}
			item.eq(index_li).addClass("immigrant-main-list-active");
		}
	})
})
