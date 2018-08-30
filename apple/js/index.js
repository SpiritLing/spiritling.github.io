$(document).ready(function() {
	var shuxing = navigator.userAgent
	var re = /Windows/;
	window.onresize = function() {
		var he = $(window).width();
		if(he < 750) {
			p_a();
		} else {
			pc_a()
		}
	}

	if(re.test(shuxing)) {
		//电脑
		pc_a();
	} else {
		//手机
		p_a();
	}

	function pc_a() {
		if($("#top_two ul").hasClass("phone_ul")) {
			$("#top_two ul").removeClass("phone_ul")
		}
		$(".pho").css({
			"display": "none"
		})
	}

	function p_a() {
		if($("#top_two ul").hasClass("phone_ul")) {} else {
			$("#top_two ul").addClass("phone_ul")
		}

		$(".pho").css({
			"display": "flex"
		})
		$("#top_two .colls").on('click', function() {
			if($("#top_two .colls").hasClass("colls_active")) {
				$("#top_two .colls").removeClass("colls_active")
				$("#top_two .phone_ul li").css({
					"height": "0",
					"opacity":"0",
					"border-bottom":"none"
				})
			} else {
				$("#top_two .colls").addClass("colls_active")
				$("#top_two .phone_ul li").css({
					"height": "60px",
					"opacity":"1",
					"border-bottom":"1px solid rgba(255, 255, 255, 0.7)"
				})
			}
		})
	}

	$("#jindu").css({
		"width": "90%",
		"transition": "all 3.5s"
	})
	var s = 0;
	var bg_height = $("#img_bg img").height();
	var wenzi_height = $("#wenzi").height()
	var top_height = $("#top_nav").height() - $("#top_three").height();
	var li_height = $("#div_ul ul li").eq(0).height();
	var frist_soc = $(window).scrollTop();
	var scrolls = [];
	scrolls.push(frist_soc)

	function up_or_down(data) {
		if(scrolls.length == 2) {
			scrolls.shift();
			scrolls.push(data)
		} else if(scrolls.length == 1) {
			scrolls.push(data)
		}
	}

	$(window).scroll(function() {
		//第三导航定位
		var scroll = $(window).scrollTop();
		var scro = Number(scroll.toFixed(0))
		up_or_down(scro);
		//
		var offs = $("#top_three").offset().top;
		var offset = Number(offs.toFixed(0));
		if(scro > top_height) {
			$("#top_three").css({
				"position": "fixed",
				"top":"0"
			})
		} else {
			$("#top_three").css({
				"position": "relative"
			})
		}
		//第一图缩放
		if(scro >= 0) {

			if(scro < bg_height) {
				var oneh = $("#top_one").height();
				var twoh = $("#top_two").height();
				var threeh = $("#top_three").height();
				var bili = 90
				var line_w = bili / bg_height;
				if(scro == 0) {
					$("#img_bg img").css({
						"width": "1" + bili + "%",
						"transition": "all 0.5s"
					})
				}
				var temp = bili - Number(scro * line_w);
				var temps = temp.toString()
				var str = "";

				if(temps.indexOf(".") == 1) {
					str = "10" + temps + "%";

				} else {
					str = "1" + temps + "%";
				}
				$("#img_bg img").css({
					"width": str,
					"transition": "all 0s"
				})
			}

		}
		//列表动画
		if(Number(scrolls[0] - scrolls[1]) < -2) {
			//向下滚动
			for(var i = 0; i < 4; i++) {
				list_gun(scro, i, true)
			}
		} else if(Number(scrolls[0] - scrolls[1]) > 2) {
			//向上滚动
			for(var i = 0; i < 4; i++) {
				list_gun(scro, i, false)
			}
		}
		//动态显示更多
		var ul_height = li_height * 4 + wenzi_height + $(".ul_bottom").height() + 10;
		if(scro > ul_height && s == 0) {
			var temp = $(".ul_bottom").height() + ul_height + bg_height;
			if(temp > scro) {
				$("#div_ul .ul_bottom a").css({
					"width": "120px"
				})
				setTimeout(function() {
					$("#div_ul .ul_bottom a .other").css({
						"display": "inline-block",
						"opacity": "1"
					})
					$("#div_ul .ul_bottom a").css({
						"justify-content": "space-between"
					})
				}, 1000)
			}

		}

	});
	//跟随滚动图片上下移动
	function list_gun(scro, num, bool) {
		var prev = 0
		if(num == 0) {
			prev = Number(bg_height);
		} else {
			prev = Number((li_height) * (num) + bg_height)
		}
		var next = Number((li_height) * (num + 1) + bg_height);
		//		console.log("prev"+prev)
		//		console.log("scro"+scro)
		//		console.log("next"+next)
		var temp_heig = 3;
		if(bool) {
			if(prev > scro) {
				return
			} else if(scro < next) {

				$("#div_ul ul li div img").eq(num).css({
					"margin-top": temp_heig + "%"
				})
			} else {
				return
			}
		} else {
			if(prev > scro) {
				return
			} else if(scro < next) {
				var temp_heigs = 5 + temp_heig;
				$("#div_ul ul li div img").eq(num).css({
					"margin-top": temp_heigs + "%"
				})
			} else {
				return
			}
		}

	}

})