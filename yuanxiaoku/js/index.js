$(document).ready(function() {
	$.ajax({
		type:"get",
		url:"http://apis.map.qq.com/ws/district/v1/list?key=RNRBZ-CDGW4-VLYU5-DENJF-NEKIZ-WRF3Q",
		async:false,
		success:function(){
			console.log("s")
		},
		error:function(){
			console.log("e")
		}
	});
	$.ajax({
        type : "get",
        async: false,
        url : "http://apis.map.qq.com/ws/district/v1/list?key=RNRBZ-CDGW4-VLYU5-DENJF-NEKIZ-WRF3Q",
        dataType: "jsonp",
        jsonp:"callback", //请求php的参数名
        jsonpCallback: "jsonhandle",//要执行的回调函数
        success : function(data) {
            console.log(data);
        },
		error:function(){
			console.log("e")
		}

    });
	$("#content-nav").children("#nav-list").children(".nav-item").on('click',function(){
		if($(this).hasClass("nav-item-active")){
			return ;
		}else{
			var indexs=$("#content-nav").children("#nav-list").children(".nav-item").index(this);
			for(var i=0;i<$(this).siblings().length;i++){
				if($(this).siblings().eq(i).hasClass("nav-item-active")){
					$(this).siblings().eq(i).removeClass("nav-item-active")
				}
			}
			$(this).addClass("nav-item-active");
			var uls=$("#main-content").children("#content-list").find(".content-ul-list").eq(indexs);
			for(var i=0;i<uls.siblings().length;i++){
				if(uls.siblings().eq(i).hasClass("content-ul-list-active")){
					uls.siblings().eq(i).removeClass("content-ul-list-active")
				}
			}
			uls.addClass("content-ul-list-active");
			
		}
	})
	
	
	//  ========== 
	//  = 滚动加载 = 
	//  ========== 
	//基础数据
	var configData = {
		top: {
			"titleTop": null,
			"guideTop": null,
			"toolTop": null,
			"hotTop": null
		},
		height: {
			"titleHeight": null,
			"guideHeight": null,
			"toolHeight": null,
			"hotHeight": null
		},
		bottom: {
			"titleBottom": null,
			"guideBottom": null,
			"toolBottom": null,
			"hotBottom": null
		},
		initial: {
			scrollTop: null,
			documentHeight: null,
			windowHeight: null
		},
		changeData: {
			startData: null,
			endData: null
		},
		bools: {
			"title": false,
			"guide": false,
			"tool": false,
			"hot": false
		}
	}
	//获取初始化数据
	//各个模块距离顶部距离
	configData.top.titleTop = $("#title").offset().top;
	configData.top.guideTop = $("#guide").offset().top;
	configData.top.toolTop = $("#tool").offset().top;
	configData.top.hotTop = $("#hot").offset().top;
	//各个模块高度
	configData.height.titleHeight = $("#title").height();
	configData.height.guideHeight = $("#guide").height();
	configData.height.toolHeight = $("#tool").height();
	configData.height.hotHeight = $("#hot").height();
	//各个模块底部距离window顶部距离
	configData.bottom.titleBottom = configData.top.titleTop + configData.height.titleHeight;
	configData.bottom.guideBottom = configData.top.guideTop + configData.height.guideHeight;
	configData.bottom.toolBottom = configData.top.toolTop + configData.height.toolHeight;
	configData.bottom.hotBottom = configData.top.hotTop + configData.height.hotHeight;
	//滚动距离
	configData.initial.scrollTop = $(document).scrollTop();
	//获取文档高度
	configData.initial.documentHeight = $(document).height();
	//获取游览器高度
	configData.initial.windowHeight = $(window).height();
	//初始化区间
	configData.changeData.startData = $(document).scrollTop() + configData.initial.windowHeight / 3;
	configData.changeData.endData = configData.initial.windowHeight + configData.initial.scrollTop - configData.initial.windowHeight / 3;
	//监听滚动事件
	$(document).on('scroll', function(e) {
		configData.initial.scrollTop = $(document).scrollTop();
		configData.changeData.startData = configData.initial.scrollTop + configData.initial.windowHeight / 3;
		configData.changeData.endData = configData.initial.windowHeight + configData.initial.scrollTop - configData.initial.windowHeight / 3;
		//		console.log(configData);
		trigger.init();

	})

	//监控window视窗宽高变化
	$(window).on('resize', function() {
		configData.initial.windowHeight = $(window).height();
		configData.changeData.startData = configData.initial.scrollTop + configData.initial.windowHeight / 3;
		configData.changeData.endData = configData.initial.windowHeight + configData.initial.scrollTop - configData.initial.windowHeight / 3;
		trigger.init();
		//		console.log(configData)
	})
	//滚动加载动画
	var trigger = {
		init: function() {
			//简化变量，bool值
			var communtiyb = configData.bools.title;
			var messageb = configData.bools.guide;
			var strategyb = configData.bools.tool;
			var proformab = configData.bools.hot;
			//顶部距离简化
			var communtiys = configData.top.titleTop;
			var messages = configData.top.guideTop;
			var strategys = configData.top.toolTop;
			var proformas = configData.top.hotTop;
			//底部距离简化
			var communtiye = configData.bottom.titleBottom;
			var messagee = configData.bottom.guideBottom;
			var strategye = configData.bottom.toolBottom;
			var proformae = configData.bottom.hotBottom;
			//触发距离简化
			var startData = configData.changeData.startData;
			var endData = configData.changeData.endData;
			//判断是否加载第一模块
			if(!communtiyb) {
				if((communtiys >= startData && communtiys <= endData) || (communtiye >= startData && communtiye <= endData) || (communtiys <= startData && communtiye >= endData)) {
					this.oneModal();
					configData.bools.title = true;
				}
			}
			if(!messageb) {
				if((messages >= startData && messages <= endData) || (messagee >= startData && messagee <= endData) || (messages <= startData && messagee >= endData)) {
					this.twoModal();
					configData.bools.guide = true;
				}
			}
			if(!strategyb) {
				if((strategys >= startData && strategys <= endData) || (strategye >= startData && strategye <= endData) || (strategys <= startData && strategye >= endData)) {
					this.threeModal();
					configData.bools.tool = true;
				}
			}
			if(!proformab) {
				if((proformas >= startData && proformas <= endData) || (proformae >= startData && proformae <= endData) || (proformas <= startData && proformae >= endData)) {
					this.fourModal();
					configData.bools.hot = true;
				}
			}
		},
		oneModal: function() {
			$("#title").children(".title").children("h1").css({
				"transition": "all 2s",
				"transform": "rotateZ(360deg)"
			})
			$("#title").children(".title").children("h2").css({
				"transition": "all 2s",
				"transform": "rotateX(360deg)"
			})
			$("#title").children(".title").children("h3").css({
				"transition": "all 2s",
				"transform": "rotateY(360deg)"
			})
			$("#title").children(".sub-title").css({
				paddingTop: "42px",
				paddingBottom: "38px",
				opacity: "1"
			})
		},
		twoModal: function() {
			$("#guide").find(".warp-header").find("h3").css({
				transform: "rotateX(360deg)",
				opacity: "1"
			});
			$("#guide").find(".warp-footer").css({
				opacity: "1"
			});
			var a = setTimeout(function() {
				$("#guide").find("#frist").css({
					opacity: "1"
				})
				clearTimeout(a);
				var b = setTimeout(function() {
					$("#guide").find("#second").css({
						opacity: "1"
					})
					clearTimeout(b);
				}, 500)
			}, 500)

		},
		threeModal: function() {
			$("#tool").find(".warp-header").find("h3").css({
				transform: "rotateX(360deg)",
				opacity: "1"
			});
			$("#tool").find(".warp-footer").css({
				opacity: "1"
			});
			var a = setTimeout(function() {
				$("#tool").find(".main").css({
					opacity: "1",
					transform: "rotateY(0deg)"
				})
				clearTimeout(a);
			}, 500)
		},
		fourModal: function() {
			$("#hot").find(".warp-header").find("h3").css({
				transform: "rotateX(360deg)",
				opacity: "1"
			});
			$("#hot").find(".warp-footer").css({
				opacity: "1"
			});
			var a = setTimeout(function() {
				$("#hot").find("#search-form").css({
					opacity: "1",
					transform: "rotateY(0deg)"
				})
				clearTimeout(a);
			}, 300)
			var b = setTimeout(function() {
				$("#hot").find("#content-nav").css({
					opacity: "1"
				})
				clearTimeout(b);
				var c = setTimeout(function() {
					$("#hot").find("#content-list").css({
						opacity: "1"
					})
					clearTimeout(c);

				}, 300)
			}, 500)
		}
	};
	//初始调用
	trigger.init()
})