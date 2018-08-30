$(document).ready(function() {
	//基本数据配置
	var configData = {
		top: {
			"communtiyTop": null,
			"messageTop": null,
			"strategyTop": null,
			"proformaTop": null,
			"immigrantTop": null
		},
		height: {
			"communtiyHeight": null,
			"messageHeight": null,
			"strategyHeight": null,
			"proformaHeight": null,
			"immigrantHeight": null
		},
		bottom: {
			"communtiyBottom": null,
			"messageBottom": null,
			"strategyBottom": null,
			"proformaBottom": null,
			"immigrantBottom": null
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
			"communtiy": false,
			"message": false,
			"strategy": false,
			"proforma": false,
			"immigrant": false
		}

	}
	//获取初始化数据
	//各个模块距离顶部距离
	configData.top.communtiyTop = $("#communtiy").offset().top;
	configData.top.messageTop = $("#message").offset().top;
	configData.top.strategyTop = $("#strategy").offset().top;
	configData.top.proformaTop = $("#proforma").offset().top;
	configData.top.immigrantTop = $("#immigrant").offset().top;
	//各个模块高度
	configData.height.communtiyHeight = $("#communtiy").height();
	configData.height.messageHeight = $("#message").height();
	configData.height.strategyHeight = $("#strategy").height();
	configData.height.proformaHeight = $("#proforma").height();
	configData.height.immigrantHeight = $("#immigrant").height();
	//各个模块底部距离window顶部距离
	configData.bottom.communtiyBottom = configData.top.communtiyTop + configData.height.communtiyHeight;
	configData.bottom.messageBottom = configData.top.messageTop + configData.height.messageHeight;
	configData.bottom.strategyBottom = configData.top.strategyTop + configData.height.strategyHeight;
	configData.bottom.proformaBottom = configData.top.proformaTop + configData.height.proformaHeight;
	configData.bottom.immigrantBottom = configData.top.immigrantTop + configData.height.immigrantHeight;
	//滚动距离
	configData.initial.scrollTop = $(document).scrollTop();
	//获取文档高度
	configData.initial.documentHeight = $(document).height();
	//获取游览器高度
	configData.initial.windowHeight = $(window).height();
	//初始化区间
	configData.changeData.startData = $(document).scrollTop() + configData.initial.windowHeight / 3;
	configData.changeData.endData = configData.initial.windowHeight + configData.initial.scrollTop - configData.initial.windowHeight / 3;
	//监控滚动变化
	$(document).on('scroll', function(e) {
		configData.initial.scrollTop = $(document).scrollTop();
		configData.changeData.startData = configData.initial.scrollTop + configData.initial.windowHeight / 3;
		configData.changeData.endData = configData.initial.windowHeight + configData.initial.scrollTop - configData.initial.windowHeight / 3;
		//		console.log(configData);
		trigger.init();

	})
	//滚动加载动画
	var trigger = {
		init: function() {
			//简化变量，bool值
			var communtiyb = configData.bools.communtiy;
			var messageb = configData.bools.message;
			var strategyb = configData.bools.strategy;
			var proformab = configData.bools.proforma;
			var immigrantb = configData.bools.immigrant;
			//顶部距离简化
			var communtiys = configData.top.communtiyTop;
			var messages = configData.top.messageTop;
			var strategys = configData.top.strategyTop;
			var proformas = configData.top.proformaTop;
			var immigrants = configData.top.immigrantTop;
			//底部距离简化
			var communtiye = configData.bottom.communtiyBottom;
			var messagee = configData.bottom.messageBottom;
			var strategye = configData.bottom.strategyBottom;
			var proformae = configData.bottom.proformaBottom;
			var immigrante = configData.bottom.immigrantBottom;
			//触发距离简化
			var startData = configData.changeData.startData;
			var endData = configData.changeData.endData;
			//判断是否加载第一模块
			if(!communtiyb) {
				if((communtiys >= startData && communtiys <= endData) || (communtiye >= startData && communtiye <= endData) || (communtiys <= startData && communtiye >= endData)) {
					this.oneModal();
					configData.bools.communtiy=true;
				}
			}
			if(!messageb) {
				if((messages >= startData && messages <= endData) || (messagee >= startData && messagee <= endData) || (messages <= startData && messagee >= endData)) {
					this.twoModal();
					configData.bools.messageb=true;
				}
			}
			if(!strategyb) {
				if((strategys >= startData && strategys <= endData) || (strategye >= startData && strategye <= endData) || (strategys <= startData && strategye >= endData)) {
					this.threeModal();
					configData.bools.strategyb=true;
				}
			}
			if(!proformab) {
				if((proformas >= startData && proformas <= endData) || (proformae >= startData && proformae <= endData) || (proformas <= startData && proformae >= endData)) {
					this.fourModal();
					configData.bools.proformab=true;
				}
			}
			if(!immigrantb) {
				if((immigrants >= startData && immigrants <= endData) || (immigrante >= startData && immigrante <= endData) || (immigrants <= startData && immigrante >= endData)) {
					this.fiveModal();
					configData.bools.immigrants=true;
				}
			}
		},
		oneModal: function() {
			//			var a = {
			//				"#communtiy": { //第一模块,精英社区主题
			//					"#main-title": {
			//						"h2": "h2",
			//						"h1": "h1",
			//						"h3": "h3"
			//					},
			//					"#main-subtitle": {
			//						"img": "img",
			//						"p": "p"
			//					}
			//				}
			//			}
			$("#communtiy").children("#main-title").children("h1").css({
				"transition": "all 2s",
				"transform": "rotateZ(360deg)"
			})
			$("#communtiy").children("#main-title").children("h2").css({
				"transition": "all 2s",
				"transform": "rotateX(360deg)"
			})
			$("#communtiy").children("#main-title").children("h3").css({
				"transition": "all 2s",
				"transform": "rotateY(360deg)"
			})
			$("#communtiy").children("#main-subtitle").css({
				"transition": "all 2s",
				"padding-top": "42px",
				"opacity": "1",
				"padding-bottom": " 38px"
			})
			configData.bools.communtiy = true;
		},
		twoModal: function() {
			//			"#message": { //第二模块 留学资讯
			//			".content-xp": {
			//				"h2": "留学资讯（标题）",
			//				".main-title-block": {
			//					".content_title-warp": {
			//						"span": "英文名称"
			//					}
			//				},
			//				"#content-row-xp": {
			//					"#content-row-left-list": {
			//						".content-row-left-item": ".content-row-left-item",
			//						".content-row-left-item-active": ".content-row-left-item-active"
			//					},
			//					"#content-cum-right-list": {
			//						".content-cum-right-item": {
			//							"#message-swiper-contaier1": "message信息轮播图id1",
			//							".message-content-right": "右边信息"
			//						},
			//						".content-cum-right-item-active": ".content-cum-right-item-active"
			//					}
			//				},
			//				".warp-content-bottom": {
			//					"a": "更多链接"
			//				}
			//			}
			//		},
			$("#message").children(".content-xp").children("h2").css({
				"opacity": "1",
				"transition": "all 2s",
				"transform": "rotateX(360deg)"
			})
			$("#message").children(".content-xp").children(".main-title-block").css({
				"opacity": "1",
				"transition": "all 2s"
			})
			$("#message").children(".content-xp").children(".warp-content-bottom").css({
				"opacity": "1"
			})
			$("#message").find("#content-row-xp").css({
				"opacity": "1",
				"transition": "all 1s"
			})
			var a = setTimeout(function() {
				$("#message").find("#content-row-xp").children("#content-row-left-list").css({
					"opacity": "1",
					"transition": "all 1.5s",
					"transform": "rotateY(0deg)"
				})
				clearTimeout(a);
				var b = setTimeout(function() {
					$("#message").find("#content-row-xp").children("#content-cum-right-list").css({
						"opacity": "1",
						"transition": "all 1.5s"
					})
					clearTimeout(b);
				}, 300)
			}, 300);

		},
		threeModal: function() {
			/* 
			"#strategy": { //第三模块 留学攻略
				".content-xp": {
					"h2": "留学攻略（标题）",
					".main-title-block": {
						".content_title-warp": {
							"span": "英文名称"
						}
					},
					"#strategy-content-main": {
						"#strategy-content-nav": {
							"#strategy-content-nav-list": {
								".strategy-content-nav-item": ".strategy-content-nav-item",
								".strategy-content-nav-item-ative": ".strategy-content-nav-item-ative"
							}
						},
						"#strategy-content-main": {
							".strategy-content-main-list": "透明度0",
							".strategy-content-main-list-active": "透明度1"
						}
					},
					".warp-content-bottom": {
						"a": "更多链接"
					}
				}
			},
			 */
			$("#strategy").children(".content-xp").children("h2").css({
				"opacity": "1",
				"transition": "all 2s",
				"transform": "rotateX(360deg)"
			})
			$("#strategy").children(".content-xp").children(".main-title-block").css({
				"opacity": "1",
				"transition": "all 2s"
			})
			$("#strategy").children(".content-xp").children(".warp-content-bottom").css({
				"opacity": "1"
			})
			var a = setTimeout(function() {
				$("#strategy").find("#strategy-content-main").children("#strategy-content-nav").css({
					"opacity": "1",
					"transition": "all 1.5s"
				})
				clearTimeout(a);
				var b = setTimeout(function() {
					$("#strategy").find("#strategy-content-main").children("#strategy-content-main").css({
						"opacity": "1",
						"transition": "all 1.5s"
					})
					clearTimeout(b);
				}, 300)
			}, 300);
		},
		fourModal: function() {
			$("#proforma").children(".content-xp").children("h2").css({
				"opacity": "1",
				"transition": "all 2s",
				"transform": "rotateX(360deg)"
			})
			$("#proforma").children(".content-xp").children(".main-title-block").css({
				"opacity": "1",
				"transition": "all 2s"
			})
			$("#proforma").children(".content-xp").children(".warp-content-bottom").css({
				"opacity": "1"
			})
			var a = setTimeout(function() {
				$("#proforma").find("#proforma-content-main").children("#proforma-content-left").css({
					"opacity": "1",
					"transform": "rotateX(0deg)",
					"transition": "all 1.5s"
				})
				clearTimeout(a);
				var b = setTimeout(function() {
					$("#proforma").find("#proforma-content-main").children("#proforma-content-right").css({
						"opacity": "1",
						"transition": "all 1.5s"
					})
					clearTimeout(b);
				}, 300)
			}, 300);
		},
		fiveModal: function() {
			/*"
			#immigrant": { //第五模块 留学移民
				".content-xp": {
					"h2": "留学移民（标题）",
					".main-title-block": {
						".content_title-warp": {
							"span": "英文名称"
						}
					},
					"#immigrant-content": {
						"#immigrant-content-nav": {
							"#immigrant-content-nav-list": {
								".immigrant-content-nav-item": ".immigrant-content-nav-item",
								".immigrant-content-nav-item-ative": ".immigrant-content-nav-item-ative"
							}
						},
						"#immigrant-content-main": {
							".immigrant-main-list": ".immigrant-main-list",
							".immigrant-main-list-acitve": ".immigrant-main-list-active",
							"sub": {
								".immigrant-main-item": {
									"img": "图片",
									".immigrant-item-content": "内容"
								}
							}
						}
					},
					".warp-content-bottom": {
						"a": "更多链接"
					}
				}
			}
			 */
			$("#immigrant").children(".content-xp").children("h2").css({
				"opacity": "1",
				"transition": "all 2s",
				"transform": "rotateX(360deg)"
			})
			$("#immigrant").children(".content-xp").children(".main-title-block").css({
				"opacity": "1",
				"transition": "all 2s"
			})
			$("#immigrant").children(".content-xp").children(".warp-content-bottom").css({
				"opacity": "1"
			})
			var a = setTimeout(function() {
				$("#immigrant").find("#immigrant-content").children("#immigrant-content-nav").css({
					"opacity": "1",
					"transition": "all 1.5s"
				})
				clearTimeout(a);
				var b = setTimeout(function() {
					$("#immigrant").find("#immigrant-content").children("#immigrant-content-main").css({
						"opacity": "1",
						"transform": "rotateY(0deg)",
						"transition": "all 1.5s"
					})
					clearTimeout(b);
				}, 300)
			}, 300);
		}
	}

	trigger.init()
	//监控window视窗宽高变化
	$(window).on('resize', function() {
		configData.initial.windowHeight = $(window).height();
		configData.changeData.startData = configData.initial.scrollTop + configData.initial.windowHeight / 3;
		configData.changeData.endData = configData.initial.windowHeight + configData.initial.scrollTop - configData.initial.windowHeight / 3;
		trigger.init();
		//		console.log(configData)
	})

	var domLevel = {
		"#message": { //第二模块 留学资讯
			".content-xp": {
				"h2": "留学资讯（标题）",
				".main-title-block": {
					".content_title-warp": {
						"span": "英文名称"
					}
				},
				"#content-row-xp": {
					"#content-row-left-list": {
						".content-row-left-item": ".content-row-left-item",
						".content-row-left-item-active": ".content-row-left-item-active"
					},
					"#content-cum-right-list": {
						".content-cum-right-item": {
							"#message-swiper-contaier1": "message信息轮播图id1",
							".message-content-right": "右边信息"
						},
						".content-cum-right-item-active": ".content-cum-right-item-active"
					}
				},
				".warp-content-bottom": {
					"a": "更多链接"
				}
			}
		},
		"#strategy": { //第三模块 留学攻略
			".content-xp": {
				"h2": "留学攻略（标题）",
				".main-title-block": {
					".content_title-warp": {
						"span": "英文名称"
					}
				},
				"#strategy-content-main": {
					"#strategy-content-nav": {
						"#strategy-content-nav-list": {
							".strategy-content-nav-item": ".strategy-content-nav-item",
							".strategy-content-nav-item-ative": ".strategy-content-nav-item-ative"
						}
					},
					"#strategy-content-main": {
						".strategy-content-main-list": "透明度0",
						".strategy-content-main-list-active": "透明度1"
					}
				},
				".warp-content-bottom": {
					"a": "更多链接"
				}
			}
		},
		"#proforma": { //第四模块，留学备考
			".content-xp": {
				"h2": "留学备考（标题）",
				".main-title-block": {
					".content_title-warp": {
						"span": "英文名称"
					}
				},
				"#proforma-content-main": {
					"#proforma-content-left": {
						"#proforma-content-left-list": {
							".proforma-content-left-item": ".proforma-content-left-item",
							".proforma-content-left-item-ative": ".proforma-content-left-item-ative"
						}
					},
					"#proforma-content-right": {
						"#content-cum-right-list": {
							".content-cum-right-item": "透明度0",
							".content-cum-right-item-active": "透明度1",
							"sub": {
								"#proforma-swiper-container1": "proforma信息轮播图id1",
								".message-content-right": "信息"
							}
						}
					}
				},
				".warp-content-bottom": {
					"a": "更多链接"
				}
			}
		},
		"#immigrant": { //第五模块 留学移民
			".content-xp": {
				"h2": "留学移民（标题）",
				".main-title-block": {
					".content_title-warp": {
						"span": "英文名称"
					}
				},
				"#immigrant-content": {
					"#immigrant-content-nav": {
						"#immigrant-content-nav-list": {
							".immigrant-content-nav-item": ".immigrant-content-nav-item",
							".immigrant-content-nav-item-ative": ".immigrant-content-nav-item-ative"
						}
					},
					"#immigrant-content-main": {
						".immigrant-main-list": ".immigrant-main-list",
						".immigrant-main-list-acitve": ".immigrant-main-list-active",
						"sub": {
							".immigrant-main-item": {
								"img": "图片",
								".immigrant-item-content": "内容"
							}
						}
					}
				},
				".warp-content-bottom": {
					"a": "更多链接"
				}
			}
		}
	}
});