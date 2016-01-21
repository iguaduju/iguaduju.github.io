if (jQuery) {
	jQuery.noConflict();
	jQuery.userAgent = daumtools.userAgent();
} else {
	alert("jQuery를 로드해주세요");
}

window.B = {
	version: "0.1",
	cookie: {
		firstPublishShare: "firstPublishShare",
		firstDraftSave: "firstDraftSave"
	},

	preSettings: {
		"minScrollWidth": 940
	},

	localStorageKey: {
		viewArticleUid: 'viewArticleUid',
		referrer: 'listViewReferrer',
		feed: {
			listData: 'feedArticleList',
			clickArticleUid: 'feedClickArticleUid',
			lastTime: 'feedLastCreateTimeParam'
		},
		home: {
			listData: 'homeArticleList',
			clickArticleUid: 'homeClickArticleUid',
			lastTime: 'homeLastCreateTimeParam'
		},
		magazine: {
			listData: 'magazineArticleList',
			clickArticleUid: 'magazineClickArticleUid',
			lastTime: 'magazineLastCreateTimeParam'
		},
		now: {
			listData: 'nowArticleList',
			clickArticleUid: 'nowClickArticleUid',
			lastTime: 'nowLastCreateTimeParam'
		},
		likeit: {
			listData: 'likeitArticleList',
			lastTime: 'likeitLastCreateTimeParam',
			clickArticleUid: 'likeitClickArticleUid'
		}
	},

	headerMenu: {
		"$serviceHeader": jQuery('.service_header'),
		$btnSearch: jQuery('#btnServiceMenuSearch'),
		$searchQuery: jQuery('#searchQuery'),
		$btnToggleArticleMoreAction: jQuery('#btnToggleArticleMoreAction'),
		$writeButton: jQuery('.service_header .btn_write'),
		classNames: {
			headerHeadMenubar: 'header_head_menubar',
			scrollBeyond: 'beyond_content',
			toggleArticleMoreAction: 'show_more_action'
		},

		init: function () {
			this.$btnSearch.on('click', jQuery.proxy(this.showSearchArea, this));
		},

		showSearchArea: function (e) {
			var $button = jQuery(e.target);
			var $input = this.$searchQuery;
			if ($button.parent().hasClass('show')) {
				this.$searchQuery.focus();
				return false;
			}
			this.animateForm($button, $input);
		},

		animateForm: function($button, $input) {
			jQuery('#searchQuery').css("opacity", "0");
			$button.parent().addClass('show');
			this.$writeButton.addClass('show');
			$button.css("margin-right", "17px");
			$input.css("margin-left", "80px");
			$button.animate({
					"margin-right": 172 + "px"
				}, 200,
				function () {
					jQuery('#searchQuery').css("opacity", "1");
				}
			);
			$input.animate({
					"margin-left": 37 + "px"
				}, 300,
				function () {
				}
			);
			this.$searchQuery.focus();
		},

		initArticleMoreAction: function() {
			this.$btnToggleArticleMoreAction.on('click', jQuery.proxy(this.toggleArticleMoreActionClassName, this));
			jQuery('#btnDeleteArticle').on('click', jQuery.proxy(B.Article.deleteArticle, B.Article));
			jQuery('#btnPrivateArticle').on('click', jQuery.proxy(B.Article.privateArticle, B.Article));
			jQuery('#btnPublishArticle').on('click', jQuery.proxy(B.Article.publishArticle, B.Article));
		},

		toggleArticleMoreActionClassName: function() {
			this.$btnToggleArticleMoreAction.parent().toggleClass(this.classNames.toggleArticleMoreAction);
		},

		initScrollMenuForPage: function (menubarType) {
			jQuery(window).on('scroll', jQuery.proxy(this.controlScroll, this, menubarType));
		},

		controlScroll: function(menubarType) {
			var headerClassTypeObj = {home: 1, ready: 1, history: 1, setting: 1, stats: 1, feed: 1, search: 1, magazine:1, now: 1};
			if (menubarType in headerClassTypeObj) {
				var contentY = jQuery('.' + this.classNames.headerHeadMenubar).height();
			}
			if (menubarType == 'subscription') {
				var contentY = jQuery('.header_head_menubar').offset().top;
			}
			if (menubarType == 'likeUsers') {
				var contentY = jQuery('.header_head_menubar').offset().top;
			}
			if (menubarType == 'write') {
				var contentY = jQuery('.wrap_cover').height();
			}
			if (menubarType == "stats") {
				var contentY = jQuery('.cont_statistic').offset().top;
			}
			if (menubarType == "search") {
				var contentY = jQuery('.cont_search').offset().top;
			}
			if (menubarType == "top") {
				var contentY = jQuery('.editor_pic').offset().top;
			}

			if (jQuery(window).scrollTop() >= contentY) {
				this.$serviceHeader.addClass(this.classNames.scrollBeyond);
				if (menubarType == "search") jQuery(".wrap_btn_search").addClass("show");
			} else {
				this.$serviceHeader.removeClass(this.classNames.scrollBeyond);
				if (menubarType == "search") jQuery(".wrap_btn_search").removeClass("show");
			}
		}
	},

	sideMenu: {
		$serviceHeader: jQuery('.service_header'),
		$btnServiceMenu: jQuery('#btnServiceMenu'),
		$wrapSideMenu: jQuery('#wrapSideMenu'),
		$btnCloseSideMenu: jQuery('#btnCloseSideMenu'),

		init: function () {
			this.$btnServiceMenu.on('click', jQuery.proxy(this.openSideMenu, this));
			this.$btnCloseSideMenu.on('click', jQuery.proxy(this.closeSideMenu, this));
			jQuery(window).on('resize load', jQuery.proxy(this.resizeMenuHeight, this));
			jQuery(window).on('keydown', jQuery.proxy(this.keydownHandler, this));
			jQuery(window).on('mousedown touchend', jQuery.proxy(this.mousedownHandler, this));
			this.initSetLoginOutUrl();
			this.checkNewAlert();
			this.initRemoveLocalStorageData();
		},

		openSideMenu: function () {
			this.$wrapSideMenu.addClass('open');
		},

		closeSideMenu: function () {
			this.$wrapSideMenu.removeClass('open');
		},

		initSetLoginOutUrl: function () {
			var serviceArray = ['facebook', 'twitter', 'kakao'];
			var urlPath = '/auth/';
			var locationPath = location.pathname;
			var returnUrl = encodeURIComponent('/signin/finish?url=' + encodeURIComponent(locationPath));
			var urls = {};

			for (var i = 0, l = serviceArray.length; i < l; i++) {
				var serviceName = serviceArray[i];
				urls[serviceName] = urlPath + serviceName + '?url=' + returnUrl;
			}

			jQuery('#facebookLoginButton').attr('href', urls.facebook);
			jQuery('#twtterLoginButton').attr('href', urls.twitter);
			jQuery('#kakaoLoginButton').attr('href', urls.kakao);

			jQuery('#sideMenuLogoutButton').attr('href', '/signout?url=%2F');

			jQuery('#rememberMe').on('change', function(evt){
				var checked = !!evt.target.checked;
				jQuery.cookie('IRM', checked ? "1" : "0");
				if(checked) {
					jQuery("#rememberMeLabel .ico_brunch").addClass('ico_choiced');
				} else {
					jQuery("#rememberMeLabel .ico_brunch").removeClass('ico_choiced');
				}
			});

			if(jQuery.cookie('IRM') == 1) {
				jQuery('#rememberMe').attr('checked', true);
			} else {
				jQuery('#rememberMe').attr('checked', false);
			}
			jQuery('#rememberMe').trigger('change');
		},

		resizeMenuHeight: function(e) {
			var windowHeight = jQuery(window).height();
			var $wrap = jQuery('#wrapSideMenu .wrap_side_service_menu');
			var $menu = jQuery('#wrapSideMenu .wrap_side_setting');
			if (windowHeight < 700) {
				$menu.css('position', 'inherit');
				var gap = 700 - windowHeight;
				var height = 427 - gap;
				if (height >= 276) {
					$wrap.height(height);
				}
			} else {
				$menu.css('position', 'absolute');
			}
		},

		keydownHandler: function(e) {
			// ESC keyCode is 27
			if (e && e.keyCode && e.keyCode == 27) {
				this.closeSideMenu();
			}
		},

		mousedownHandler: function(e) {
			var $target = jQuery(e.target);
			if ($target.closest('#wrapSideMenu').length == 0) {
				this.closeSideMenu();
			}
		},

		checkNewAlert: function () {
			if (!(B.User && B.User.userId) || window.location.href.indexOf('/me/history') > -1) return;

			var self = this;
			B.Util.ajax({
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				type: "GET",
				url: B.Config.apiUrl + '/v1/history/new',
				success: function (r) {
					if (r.data && r.data.count > 0) {
						self.showNewAlert();
					} else {
						self.hideNewAlert();
					}
				},

				error: function (err) {
					console.error(err);
					return true;
				}
			})
		},

		hideNewAlert: function () {
			this.$serviceHeader.removeClass('new');
			this.$btnServiceMenu.removeClass('new');
			this.$wrapSideMenu.removeClass('new');
		},

		showNewAlert: function () {
			this.$serviceHeader.addClass('new');
			this.$btnServiceMenu.addClass('new');
			this.$wrapSideMenu.addClass('new');
		},

		initRemoveLocalStorageData: function() {
			jQuery('.wrap_side_service_menu .brunchHomeLink').on('click', function() {
				B.Util.localStorage.remove(B.localStorageKey.home.listData);
			});
			jQuery('.wrap_side_service_menu .brunchFeedLink').on('click', function() {
				B.Util.localStorage.remove(B.localStorageKey.feed.listData);
			});
			jQuery('.wrap_side_service_menu .brunchNowLink').on('click', function() {
				B.Util.localStorage.remove(B.localStorageKey.now.listData);
			});
			jQuery('.wrap_side_service_menu .brunchLikeLink').on('click', function() {
				B.Util.localStorage.remove(B.localStorageKey.likeit.listData);
			});
		}
	},

	// 모바일 JS
	M: {},

	// 글 뷰에 대한 JS
	Post: {},

	Comment: {},

	Home: {},

	Magazine: {},

	// 연관글
	Related: {},

	// 템플릿
	Template: {},

	// 알림 JS
	History: {},

	// 설정
	Config: {},

	Sign: {},

	User: null,

	getUser: function (callback, force) {

		var callback = callback || function (user, error) {
			};
		var self = this;

		if (this.data && !force) {
			if (B.isDebug()) {
				console.log('Already exist!!', this.data);
			}
			callback(this.data);
			return;
		}

		B.Util.ajax({
			url: B.Config.apiUrl + '/v1/me',
			type: 'get',
			success: function (result) {
				B.User = result.data;
				if (B.isDebug()) console.log(result.data);
				callback(result.data);
			},

			error: function (error) {
				if (B.isDebug()) console.log(error);
				callback(null, error);
			}
		});
	},

	isDebug: function () {
		return B.Config.active == 'dev' || B.Config.active == 'local';
	}
};

jQuery(function () {
	if (jQuery.userAgent.platform != 'mobile') {
		B.headerMenu.init();
		B.sideMenu.init();
	}
});

(function(){
try {
	var console = {
		error: function(){},
		log: function(){},
		debug: function(){},
		info: function(){},
		warn: function(){},
		group: function(){},
		groupCollapsed: function(){},
		groupEnd: function(){}
	};

	window.console = window.console || console;
	for(var p in console) {
		if(!window.console[p]) {
			window.console[p] = console[p];
		}
	}

} catch(e) {

}
}) ();

window.onerrora = function(errorMsg, url, linenum){
	var event = window.event || {};
	var stack = errorMsg + '\nat ' + url + ':' + linenum + ':1';

	if(event.errorUrl){
		stack = event.errorMessage + '\nat '
		+ event.errorUrl + ':'
		+ event.errorLine + ':'
		+ event.errorCharacter;
	}

	var ex = {message: event.errorMessage||errorMsg, stack: stack};

	if(B.isDebug()){
		console.error(errorMsg, url, linenum);
	} else {
		Tico.getInstance().send(ex, 'GLOBAL_ERROR', {
			TYPE: Tico.TYPE.GLOBAL_ERROR
		});
	}

	return true;
};
