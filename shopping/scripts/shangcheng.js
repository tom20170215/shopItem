$(function() {
	var $li = $("#skin li");
	$li.click(function() {
		switchSkin(this.id);
	});
	//获取cookie
	var cookie_skin = $.cookie("MyCssSkin");
	if (cookie_skin) {
		switchSkin(cookie_skin);
	}
	//搜索框
	$("#inputSearch").focus(function() {
		$(this).addClass("focus");
		if ($(this).val() == this.defaultValue) {
			$(this).val("");
		}
	}).blur(function() {
		if ($(this).val() === "") {
			$(this).removeClass("focus");
			$(this).val(this.defaultValue);
		}
	}).keyup(function(e) {
		if (e.which == 13) {
			alert("正在搜索！");
		}
	});

	//nav显示、隐藏
	$("#nav li").hover(function() {
		$(this).find(".jnNav").show();
	}, function() {
		$(this).find(".jnNav").hide();
	});


	//首页大屏广告效果
	var $Rolls = $("#jnImageroll div a");
	var index = 0;
	var len = $Rolls.length;
	var adTimer = null;
	$Rolls.mouseover(function() {
		index = $Rolls.index(this);
		showImg(index);
	}).eq(0).mouseover();
	var imgroll = $("#jnImageroll");
	imgroll.hover(function() {
		if (adTimer) {
			clearTimeout(adTimer);
		}
	}, function() {
		adTimer = setInterval(function() {
			showImg(index);
			index++;
			if (index == len) {
				index = 0;
			}
		}, 3000);
	}).trigger("mouseleave");

	//brandlist的滚动显示
	$("#jnBrandTab li a").click(function() {
		$(this).parent().addClass("chos").siblings().removeClass("chos");
		var index = $("#jnBrandTab li a").index(this);
		showbrandList(index);
		return false;
	}).eq(0).click();


	//小图切换大图
	$("#jnProitem ul.imgList li a").bind("click", function() {
		var imgSrc = $(this).find("img").attr("src");
		var i = imgSrc.lastIndexOf(".");
		var unit = imgSrc.substring(i);
		imgSrc = imgSrc.substring(0, i);
		var imgSrc_big = imgSrc + "_big" + unit;
		$("#thickImg").attr("href", imgSrc_big);
	});


	//tab选项卡标签
	var $div_li = $("div.tab_menu ul li");
	$div_li.click(function() {
		$(this).addClass("selected").siblings().removeClass("selected");
		var index = $(this).index();
		$("div.tab_box > p").eq(index).show().siblings().hide();
	}).hover(function() {
		$(this).addClass("hover");
	}, function() {
		$(this).removeClass("hover");
	});



	//颜色切换
	$(".color_change ul li img").click(function() {
		$(this).addClass("hover").parent().siblings().find("img").removeClass("hover");
		var imgSrc = $(this).attr("src");
		var i = imgSrc.lastIndexOf(".");
		var unit = imgSrc.substring(i);
		imgSrc = imgSrc.substring(0, i);
		var imgSrc_small = imgSrc + "_one_small" + unit;
		var imgSrc_big = imgSrc + "_one_big" + unit;
		$("#bigImg").attr("src", imgSrc_small);
		$("#thickImg").attr("href", imgSrc_big);
		var title = $(this).attr("alt");
		$(".color_change strong").text(title);
		var newImgSrc = imgSrc.replace("images/pro_img/", "");
		$("#jnProitem .imgList li").hide();
		$("#jnProitem .imgList").find(".imgList_" + newImgSrc).show();
		//防止切换颜色后，放大图片还是原来的颜色
		$("#jnProitem .imgList").find(".imgList_" + newImgSrc).eq(0).find("a").click();
	});


	//尺寸选择
	$(".pro_size li").click(function() {
		$(this).addClass("cur").siblings().removeClass("cur");
		$(this).parents("ul").siblings("strong").text($(this).text());
	});

	//数量和价格联动
	var $span = $(".pro_price strong");
	var price = $span.text();
	$("#num_sort").change(function() {
		var num = $(this).val();
		var amount = num * price;
		$span.text(amount);
	});

	//打星评分
	$("ul.rating li a").click(function() {
		var level = $(this).parent().attr("class");
		$(this).parent().parent().removeClass().addClass("rating " + level + "star");
		return false;
	});

	var $product = $("#jnDetails");
	$("#cart").click(function() {
		var pro_name = $product.find("h4:first").text();
		console.log(pro_name);
		var pro_size = $product.find(".pro_size strong").text();
		var pro_color = $product.find(".color_change strong").text();
		var pro_num = $product.find(".pro_num #num_sort").val();
		var pro_price = $product.find(".pro_price strong").text();
		var dialog = "感谢您的购买。<div style = 'font-size:12px;font-weight:400;'>您购买的产品是：" + pro_name + "；尺寸是：" + pro_size + "；颜色是：" + pro_color + "；数量是" + pro_num + "；总价是：" + pro_price + "元。</div>";
		$("#jnDialogContent").html(dialog);
		$("#basic-dialog-ok").modal();
		return false;
	});
});


//更换皮肤
function switchSkin(skinName) {
	$("#" + skinName).addClass("selected")
		.siblings().removeClass("selected");
	$("#cssfile").attr("href", "styles/skin/" + skinName + ".css");
	$.cookie("MyCssSkin", skinName, {
		path: '/',
		expires: 10
	}); //创建cookie
	// console.log($.cookie("MyCssSkin"));
}


//显示不同的幻灯片
function showImg(index) {
	var rollist = $("#jnImageroll div a");
	var newhref = rollist.eq(index).attr("href");
	$("#JS_imgWrap").attr("href", newhref).find("img").eq(index).stop(true, true).fadeIn().siblings().fadeOut();
	rollist.eq(index).addClass("chos").css("opacity", "1").siblings().removeClass("chos");
}


//显示不同的Brand
function showbrandList(index) {
	var $brandlist = $("#jnBrandList");
	var itemwidth = $brandlist.find("li").outerWidth();
	itemwidth = itemwidth * 4; //一个版面的宽度
	$brandlist.stop(true, false).animate({
		left: -itemwidth * index
	}, 1000);
}