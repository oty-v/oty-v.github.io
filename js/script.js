! function(a, b) {
	"function" == typeof define && define.amd ? define(["jquery"], b) : b("object" == typeof exports ? require("jquery") : a.jQuery)
}(this, function(a) {
	"use strict";

	function b(a) {
		var b, c, d, e, f, g, h, i = {};
		for (f = a.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ",").split(","), h = 0, g = f.length; h < g && (c = f[h], c.search(/^(http|https|ftp):\/\//) === -1 && c.search(":") !== -1); h++) b = c.indexOf(":"), d = c.substring(0, b), e = c.substring(b + 1), e || (e = void 0), "string" == typeof e && (e = "true" === e || "false" !== e && e), "string" == typeof e && (e = isNaN(e) ? e : +e), i[d] = e;
		return null == d && null == e ? a : i
	}

	function c(a) {
		a = "" + a;
		var b, c, d, e = a.split(/\s+/),
			f = "50%",
			g = "50%";
		for (d = 0, b = e.length; d < b; d++) c = e[d], "left" === c ? f = "0%" : "right" === c ? f = "100%" : "top" === c ? g = "0%" : "bottom" === c ? g = "100%" : "center" === c ? 0 === d ? f = "50%" : g = "50%" : 0 === d ? f = c : g = c;
		return {
			x: f,
			y: g
		}
	}

	function d(b, c) {
		var d = function() {
			c(this.src)
		};
		a('<img src="' + b + '.gif">').on("load", d), a('<img src="' + b + '.jpg">').on("load", d), a('<img src="' + b + '.jpeg">').on("load", d), a('<img src="' + b + '.png">').on("load", d)
	}

	function e(c, d, e) {
		if (this.$element = a(c), "string" == typeof d && (d = b(d)), e ? "string" == typeof e && (e = b(e)) : e = {}, "string" == typeof d) d = d.replace(/\.\w*$/, "");
		else if ("object" == typeof d)
			for (var f in d) d.hasOwnProperty(f) && (d[f] = d[f].replace(/\.\w*$/, ""));
		this.settings = a.extend({}, g, e), this.path = d;
		try {
			this.init()
		} catch (i) {
			if (i.message !== h) throw i
		}
	}
	var f = "vide",
		g = {
			volume: 1,
			playbackRate: 1,
			muted: !0,
			loop: !0,
			autoplay: !0,
			position: "50% 50%",
			posterType: "detect",
			resizing: !0,
			bgColor: "transparent",
			className: ""
		},
		h = "Not implemented";
	e.prototype.init = function() {
		var b, e, f = this,
			g = f.path,
			i = g,
			j = "",
			k = f.$element,
			l = f.settings,
			m = c(l.position),
			n = l.posterType;
		e = f.$wrapper = a("<div>").addClass(l.className).css({
			position: "absolute",
			"z-index": -1,
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			overflow: "hidden",
			"-webkit-background-size": "cover",
			"-moz-background-size": "cover",
			"-o-background-size": "cover",
			"background-size": "cover",
			"background-color": l.bgColor,
			"background-repeat": "no-repeat",
			"background-position": m.x + " " + m.y
		}), "object" == typeof g && (g.poster ? i = g.poster : g.mp4 ? i = g.mp4 : g.webm ? i = g.webm : g.ogv && (i = g.ogv)), "detect" === n ? d(i, function(a) {
			e.css("background-image", "url(" + a + ")")
		}) : "none" !== n && e.css("background-image", "url(" + i + "." + n + ")"), "static" === k.css("position") && k.css("position", "relative"), k.prepend(e), "object" == typeof g ? (g.mp4 && (j += '<source src="' + g.mp4 + '.mp4" type="video/mp4">'), g.webm && (j += '<source src="' + g.webm + '.webm" type="video/webm">'), g.ogv && (j += '<source src="' + g.ogv + '.ogv" type="video/ogg">'), b = f.$video = a("<video>" + j + "</video>")) : b = f.$video = a('<video><source src="' + g + '.mp4" type="video/mp4"><source src="' + g + '.webm" type="video/webm"><source src="' + g + '.ogv" type="video/ogg"></video>');
		try {
			b.prop({
				autoplay: l.autoplay,
				loop: l.loop,
				volume: l.volume,
				muted: l.muted,
				defaultMuted: l.muted,
				playbackRate: l.playbackRate,
				defaultPlaybackRate: l.playbackRate
			})
		} catch (o) {
			throw new Error(h)
		}
		b.css({
			margin: "auto",
			position: "absolute",
			"z-index": -1,
			top: m.y,
			left: m.x,
			"-webkit-transform": "translate(-" + m.x + ", -" + m.y + ")",
			"-ms-transform": "translate(-" + m.x + ", -" + m.y + ")",
			"-moz-transform": "translate(-" + m.x + ", -" + m.y + ")",
			transform: "translate(-" + m.x + ", -" + m.y + ")",
			visibility: "hidden",
			opacity: 0
		}).one("canplaythrough.vide", function() {
			f.resize()
		}).one("playing.vide", function() {
			b.css({
				visibility: "visible",
				opacity: 1
			}), e.css("background-image", "none")
		}), k.on("resize.vide", function() {
			l.resizing && f.resize()
		}), e.append(b)
	}, e.prototype.getVideoObject = function() {
		return this.$video[0]
	}, e.prototype.resize = function() {
		if (this.$video) {
			var a = this.$wrapper,
				b = this.$video,
				c = b[0],
				d = c.videoHeight,
				e = c.videoWidth,
				f = a.height(),
				g = a.width();
			g / e > f / d ? b.css({
				width: g + 2,
				height: "auto"
			}) : b.css({
				width: "auto",
				height: f + 2
			})
		}
	}, e.prototype.destroy = function() {
		delete a[f].lookup[this.index], this.$video && this.$video.off(f), this.$element.off(f).removeData(f), this.$wrapper.remove()
	}, a[f] = {
		lookup: []
	}, a.fn[f] = function(b, c) {
		var d;
		return this.each(function() {
			d = a.data(this, f), d && d.destroy(), d = new e(this, b, c), d.index = a[f].lookup.push(d) - 1, a.data(this, f, d)
		}), this
	}, a(document).ready(function() {
		var b = a(window);
		b.on("resize.vide", function() {
			for (var b, c = a[f].lookup.length, d = 0; d < c; d++) b = a[f].lookup[d], b && b.settings.resizing && b.resize()
		}), b.on("unload.vide", function() {
			return !1
		}), a(document).find("[data-vide-bg]").each(function(b, c) {
			var d = a(c),
				e = d.data("vide-options"),
				g = d.data("vide-bg");
			d[f](g, e)
		})
	})
});
$(function() {
	$(document).on("mousemove", function(e) {
		$(".first").css({
			left: -e.pageX / 40 - 10,
			top: -e.pageY / 20 - 10
		})
	})
}), $("#nav-but").click(function() {
	$(".nav-bar").toggleClass("hide-nav"), $(".nav").toggleClass("close-nav"), $("#nav-but").toggleClass("nav-but-open"), $("#arrow").toggleClass("arrow-open")
}), $("#container-h1-one").click(function() {
	$(".info, .contact, #container-h1-two").toggleClass("hide-element"), $(".projects").toggleClass("projects-open"), $(".bord-slash").toggleClass("hide-slash"), $(".work").toggleClass("open-element")
}), $("#container-h1-two").click(function() {
	$(".work, .contact").toggleClass("hide-element"), $(".bord-slash").toggleClass("hide-slash"), $(".info").toggleClass("open-element"), $(".service").toggleClass("service-open"), $(".about").toggleClass("about-open")
}), $("#container-h1-three").click(function() {
	$(".info, .work, .contact-one, .contact-two, .contact-three, .contact-four, .contact-five, .contacts").toggleClass("hide-element"), $(".bord-slash").toggleClass("hide-slash"), $(".contact").toggleClass("open-element"), $("#services-three").toggleClass("services-open"), $("#container-h3-three").toggleClass("container-h3-open"), $("#functional-three").toggleClass("functional-open")
}), $("#container-h2-one").click(function() {
	$("#container-h2-two, #container-h1-two, .services, .service-open, .my-info, #container-h3-one, #my-photo, #container-h3-about, #skills, #front, #frame, #progs").toggleClass("hide-element"), $("h3").toggleClass("container-h1"), $("h4").toggleClass("container-h2")
}), $("#container-h2-two").click(function() {
	$("#container-h2-one, #container-h1-two, .services, .about-open").toggleClass("hide-element"), $("h3").toggleClass("container-h1"), $("h4").toggleClass("container-h2")
}), $("#container-h3-one").click(function() {
	$("#container-h2-two").toggleClass("hide-element"), $("#services-one").toggleClass("services-open"), $("#container-h3-one").toggleClass("container-h3-open"), $("#functional-one").toggleClass("functional-open")
}), $(".container-h1-one").click(function() {
	$("#services-one").addClass("hide-element"), $("#services-one").removeClass("services-open"), $("#container-h3-one").removeClass("container-h3-open"), $("#functional-one").removeClass("functional-open"), $("#container-h2-one").removeClass("hide-element"), $(".projects").addClass("projects-open"), $(".services, .my-info, #my-photo, #container-h3-about, #skills, #front, #frame, #progs").addClass("hide-element"), $("#container-h2-two, #container-h1-two, #container-h3-one, .about-open, .service-open").removeClass("hide-element"), $("h3").removeClass("container-h1"), $("h4").removeClass("container-h2"), $(".contact-one, .contact-two, .contact-three, .contact-four, .contact-five, .contacts").addClass("hide-element"), $(".contact").removeClass("open-element"), $("#services-three").removeClass("services-open"), $("#container-h3-three").removeClass("container-h3-open"), $("#functional-three").removeClass("functional-open"), $(".work").removeClass("hide-element"), $(".info").removeClass("open-element"), $(".service").removeClass("service-open"), $(".about").removeClass("about-open"), $(".info, .contact, #container-h1-two").addClass("hide-element"), $(".bord-slash").addClass("hide-slash"), $(".work").addClass("open-element")
}), $(".logo").click(function() {
	$("#services-one").addClass("hide-element"), $(".projects").removeClass("projects-open"), $("#services-one").removeClass("services-open"), $("#container-h3-one").removeClass("container-h3-open"), $("#functional-one").removeClass("functional-open"), $("#container-h2-one").removeClass("hide-element"), $(".services, .my-info, #my-photo, #container-h3-about, #skills, #front, #frame, #progs").addClass("hide-element"), $("#container-h2-two, #container-h1-two, #container-h3-one, .about-open, .service-open").removeClass("hide-element"), $("h3").removeClass("container-h1"), $("h4").removeClass("container-h2"), $(".contact-one, .contact-two, .contact-three, .contact-four, .contact-five, .contacts").addClass("hide-element"), $(".contact").removeClass("open-element"), $("#services-three").removeClass("services-open"), $("#container-h3-three").removeClass("container-h3-open"), $("#functional-three").removeClass("functional-open"), $(".work").removeClass("hide-element"), $(".info").removeClass("open-element"), $(".service").removeClass("service-open"), $(".about").removeClass("about-open"), $(".info, .contact, #container-h1-two").removeClass("hide-element"), $(".work").removeClass("open-element"), $(".bord-slash").removeClass("hide-slash")
}), $(".container-h1-two").click(function() {
	$("#services-one").addClass("hide-element"), $(".projects").removeClass("projects-open"), $("#services-one").removeClass("services-open"), $("#container-h3-one").removeClass("container-h3-open"), $("#functional-one").removeClass("functional-open"), $("#container-h2-one").removeClass("hide-element"), $(".services, .my-info, #my-photo, #container-h3-about, #skills, #front, #frame, #progs").addClass("hide-element"), $("#container-h2-two, #container-h1-two, #container-h3-one, .about-open, .service-open").removeClass("hide-element"), $("h3").removeClass("container-h1"), $("h4").removeClass("container-h2"), $(".contact-one, .contact-two, .contact-three, .contact-four, .contact-five, .contacts").addClass("hide-element"), $(".contact").removeClass("open-element"), $("#services-three").removeClass("services-open"), $("#container-h3-three").removeClass("container-h3-open"), $("#functional-three").removeClass("functional-open"), $(".info, .contact, #container-h1-two").removeClass("hide-element"), $(".work").removeClass("open-element"), $(".work, .contact").addClass("hide-element"), $(".bord-slash").addClass("hide-slash"), $(".info").addClass("open-element"), $(".service").addClass("service-open"), $(".about").addClass("about-open")
}), $(".container-h1-three").click(function() {
	$("#services-one").addClass("hide-element"), $(".projects").removeClass("projects-open"), $("#services-one").removeClass("services-open"), $("#container-h3-one").removeClass("container-h3-open"), $("#functional-one").removeClass("functional-open"), $("#container-h2-one").removeClass("hide-element"), $(".services, .my-info, #my-photo, #container-h3-about, #skills, #front, #frame, #progs").addClass("hide-element"), $("#container-h2-two, #container-h1-two, #container-h3-one, .about-open, .service-open").removeClass("hide-element"), $("h3").removeClass("container-h1"), $("h4").removeClass("container-h2"), $(".info, .contact, #container-h1-two").removeClass("hide-element"), $(".work").removeClass("open-element"), $(".work").removeClass("hide-element"), $(".info").removeClass("open-element"), $(".service").removeClass("service-open"), $(".about").removeClass("about-open"), $(".info, .work").addClass("hide-element"), $(".contact-one, .contact-two, .contact-three, .contact-four, .contact-five, .contacts").removeClass("hide-element"), $(".bord-slash").addClass("hide-slash"), $(".contact").addClass("open-element"), $("#services-three").addClass("services-open"), $("#container-h3-three").addClass("container-h3-open"), $("#functional-three").addClass("functional-open")
}), $(".container-h2-one").click(function() {
	$("#services-one, .service-open").addClass("hide-element"), $(".projects").removeClass("projects-open"), $("#services-one").removeClass("services-open"), $("#container-h3-one").removeClass("container-h3-open"), $("#functional-one").removeClass("functional-open"), $("#container-h2-one").removeClass("hide-element"), $(".info, .contact, #container-h1-two").removeClass("hide-element"), $(".work").removeClass("open-element"), $(".work, .contact").addClass("hide-element"), $(".bord-slash").addClass("hide-slash"), $(".info").addClass("open-element"), $(".service").addClass("service-open"), $(".about").addClass("about-open"), $(".contact-one, .contact-two, .contact-three, .contact-four, .contact-five, .contacts").addClass("hide-element"), $(".contact").removeClass("open-element"), $("#services-three").removeClass("services-open"), $("#container-h3-three").removeClass("container-h3-open"), $("#functional-three").removeClass("functional-open"), $(".services, .my-info, #my-photo, #container-h3-about, #skills, #front, #frame, #progs,  .about-open").removeClass("hide-element"), $("#container-h2-two, #container-h1-two, #container-h3-one").addClass("hide-element"), $("h3").addClass("container-h1"), $("h4").addClass("container-h2")
}), $(".container-h2-two").click(function() {
	$("#services-one,  .about-open").addClass("hide-element"), $(".projects").removeClass("projects-open"), $("#services-one").removeClass("services-open"), $("#container-h3-one").removeClass("container-h3-open"), $("#functional-one").removeClass("functional-open"), $(".services, .my-info, #my-photo, #container-h3-about, #skills, #front, #frame, #progs").addClass("hide-element"), $("#container-h2-two, #container-h1-two, #container-h3-one, .service-open").removeClass("hide-element"), $(".contact-one, .contact-two, .contact-three, .contact-four, .contact-five, .contacts").addClass("hide-element"), $(".contact").removeClass("open-element"), $("#services-three").removeClass("services-open"), $("#container-h3-three").removeClass("container-h3-open"), $("#functional-three").removeClass("functional-open"), $(".info, .contact, #container-h1-two").removeClass("hide-element"), $(".work").removeClass("open-element"), $(".work, .contact").addClass("hide-element"), $(".bord-slash").addClass("hide-slash"), $(".info").addClass("open-element"), $(".service").addClass("service-open"), $(".about").addClass("about-open"), $("#container-h2-one, #container-h1-two").addClass("hide-element"), $(".services").removeClass("hide-element"), $("h3").addClass("container-h1"), $("h4").addClass("container-h2")
}), $(".container-h3-one").click(function() {
	$("#services-one").addClass("hide-element"), $(".projects").removeClass("projects-open"), $(".services, .my-info, #my-photo, #container-h3-about, #skills, #front, #frame, #progs, .about-open").addClass("hide-element"), $("#container-h2-two, #container-h1-two, #container-h3-one").removeClass("hide-element"), $(".contact-one, .contact-two, .contact-three, .contact-four, .contact-five, .contacts").addClass("hide-element"), $(".contact").removeClass("open-element"), $("#services-three").removeClass("services-open"), $("#container-h3-three").removeClass("container-h3-open"), $("#functional-three").removeClass("functional-open"), $(".info, .contact, #container-h1-two").removeClass("hide-element"), $(".work").removeClass("open-element"), $(".work, .contact").addClass("hide-element"), $(".bord-slash").addClass("hide-slash"), $(".info").addClass("open-element"), $(".service").addClass("service-open"), $(".about").addClass("about-open"), $("#container-h2-one, #container-h1-two").addClass("hide-element"), $(".services").removeClass("hide-element"), $("h3").addClass("container-h1"), $("h4").addClass("container-h2"), $("#container-h2-two").addClass("hide-element"), $("#services-one").addClass("services-open"), $("#container-h3-one").addClass("container-h3-open"), $("#functional-one").addClass("functional-open")
}), $("#en").click(function() {
	$("#nav-txt").html("NAVIGATION"), $("#container-h1-one").html("Projects"), $(".container-h1-one").html("Projects"), $("#container-h1-two").html("Information"), $(".container-h1-two").html("Information"), $("#container-h2-one").html("About me"), $(".container-h2-one").html("About me"), $("#container-h3-about h4").html("Hey there<br>My name's Michael. I'm a programmer, engaged in layout, graphics, animation and interaction for sites. I live in Ukraine now. I have been working in the field of web programming since 2018, and currently I'm mostly immersed in javascript / html / css for the external interface. I am always looking for interesting projects."), $("#container-h3-skills").html("Skills"), $("#container-h3-progs").html("Tools"), $("#container-h2-two").html("Services"), $(".container-h2-two").html("Services"), $("#container-h3-one").html("Business card website & Landing page"), $(".container-h3-one").html("Business card website & Landing page"), $("#business-h4-one").html("Installing a website on a hosting"), $("#business-h4-two").html("Technical support 1 month"), $("#business-h4-three").html("Multilingual"), $("#business-h4-four").html("Adaptive version of the site"), $("#business-h4-five").html("Feedback form"), $("#business-h4-six").html("Statistics of site visits"), $("#business-h4-seven").html("Interactive Google Map"), $("#business-h4-eight").html("Site Admin Panel"), $("#business-h4-nine").html("Individual design"), $("#business-one").html("Registration of a hosting, installation of the website on a hosting, binding to the domain."), $("#business-two").html("Includes telephone advice in case of difficulties when working with instructions, fix minor bugs that have arisen as a result of editing the site by the client."), $("#business-three").html("Installing the module that allows the user to switch the site content to a convenient language."), $("#business-four").html("An adaptive version of the site is being developed for all possible sizes of the user's screen."), $("#business-five").html("Installation of the feedback form module for maximum convenience of communication with customers."), $("#business-six").html("Setting the tracking code of the statistics of visits to the site Google Analytics."), $("#business-seven").html("Install a google map with the exact address marker of your company."), $("#business-eight").html("Installation of a content management system (CMS) with which you can edit text and graphic information located on the pages of the website."), $("#business-nine").html("Development of individual design taking into account your wishes, as well as the latest trends in the field of web design."), $("#container-h1-three").html("Сontact"), $(".container-h1-three").html("Сontact")
}), $("#ru").click(function() {
	$("#nav-txt").html("НАВИГАЦИЯ"), $("#container-h1-one").html("Работы"), $(".container-h1-one").html("Работы"), $("#container-h1-two").html("Информация"), $(".container-h1-two").html("Информация"), $("#container-h2-one").html("Обо мне"), $(".container-h2-one").html("Обо мне"), $("#container-h3-about h4").html("Привет всем<br>Меня зовут Михаил. Я программист, занимающийся вёрсткой, графикой, анимацией и взаимодействием для веб-сайтов. В настоящее время я живу в Украине. Я работаю в сфере веб-программирования с 2018 года, и в настоящее время я в основном погружаюсь в JavaScript / HTML / CSS для фронтенд-разработки. Я всегда в поиске интересных проектов."), $("#container-h3-skills").html("Навыки"), $("#container-h3-progs").html("Инструменты"), $("#container-h2-two").html("Услуги"), $(".container-h2-two").html("Услуги"), $("#container-h3-one").html("Сайт визитка и Одностраничный cайт"), $(".container-h3-one").html("Сайт визитка и Одностраничный cайт"), $("#business-h4-one").html("Установка веб-сайта на хостинг"), $("#business-h4-two").html("Техническая поддержка 1 месяц"), $("#business-h4-three").html("Мультиязычность"), $("#business-h4-four").html("Адаптивная версия сайта"), $("#business-h4-five").html("Форма обратной связи"), $("#business-h4-six").html("Статистика посещений сайта"), $("#business-h4-seven").html("Интерактивная карта Google"), $("#business-h4-eight").html("Административная панель сайта"), $("#business-h4-nine").html("Индивидуальный дизайн"), $("#business-one").html("Регистрация хостинга, установка сайта на хостинг, привязка к домену."), $("#business-two").html("Включает в себя телефонные консультации в случае трудностей при работе с инструкцией, исправление мелких багов, возникших в результате редактирования сайта клиентом."), $("#business-three").html("Установка модуля, позволяющего пользователю переключать контент сайта на удобный ему язык."), $("#business-four").html("Разрабатывается адаптивная версия сайта под все возможные размеры экрана пользователя."), $("#business-five").html("Установка модуля формы обратной связи для максимального удобства общения с клиентами."), $("#business-six").html("Установка кода отслеживания статистики посещений сайта Google Analytics."), $("#business-seven").html("Установка карты Google с маркером адреса точного вашей компании."), $("#business-eight").html("Установка системы управления сайтом (CMS) с помощью которой редактируется текстовая и графическая информация расположенная на страницах веб-сайта."), $("#business-nine").html("Разработка индивидуального дизайна с учетом ваших пожеланий, а также последних тенденций в сфере веб-дизайна."), $("#container-h1-three").html("Связь"), $(".container-h1-three").html("Связь")
});
