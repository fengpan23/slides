$(document).ready(function(){
	var tag = '', //查找标签
		page = 1, //当前显示页数
		limit = 6, //每页显示条数
		totalCount = 0,
		order = '{"outwardTime": -1}';
	var uid = null;
	var indexAutoShow = null, maxIndex = 0;
	var previewSrc = '/preview_export/impress.html#/';
	var $input = $('.search-bar > input');
	var $indexBar = $('.paging-bar');
	// alert(navigator.userAgent);
	function renderDeck(data){
		var $listbar = $('.list-bar');
		$listbar.empty();
		// console.log(data);
		$.each(data, function(i, item){
			var shtml = '<div class="listitem"><div class="display" id="'+ item._id +'"></div><div class="itemHeader">';
				if(item.uname){
					// shtml += '<span>'+ item.uid +'</span></div>';
					shtml += '<span class="header" title="' + item.uname + '"></span>';
				}else{
					shtml += '<span class="header" title="' + item.uid + '"></span>';
				}
				if(!item.filename){
					shtml += '<span class="item-filename">未命名</span>';
				}else{
					shtml += '<span class="item-filename" title="'+ item.filename +'">'+ item.filename + '</span>';
				}
				shtml += '<span class="loveCount" title='+ item.loveCount +'></span></div>';

				if(!item.picture){
					shtml += '<img src="piazza/styles/img/default.jpg"/>';
				}else{
					shtml += '<img src="'+ item.picture +'"/>'
				}
				// if(item.last_modified){
				// 	shtml += '<span>更新时间('+ item.last_modified +')</span>';
				// }else{
				// 	// shtml += '<span>更新时间('+ item.last_modified +')</span>';
				// }
				shtml += '<div class="overInfo">';
				shtml += 	'<span class="comments" title="查看评论"><i></i>('+ item.comments.length +')</span>';
				shtml += 	'<span class="viewCount"><i></i>('+ item.viewCount +')</span>';
				shtml += '</div>';
				// if(item.uid){
				// 	// shtml += '<span>'+ item.uid +'</span></div>';
				// }
				shtml += '</div>';
				$listbar.append(shtml);
		})
	};
	function renderPageIndex(){
		$indexBar.empty();
		var pageCount = Math.ceil(totalCount / limit);
		var showPages = paging(pageCount, page, 5);
		for (var i = 0; i < showPages.length; i++) {
			var $pageBtn = $('<a class="circle-btn" href="#">'+ showPages[i]+'</a>');
			$indexBar.append($pageBtn);
			if(showPages[i] === page){
				$pageBtn.addClass('active');
			}
		};
	};
	/**
	*	@param totalPage //总页数
	*			currrentPage //当前显示的页数
	*			showPageCount //显示的页码个数
	*
	**/
	function paging(totalPage, currrentPage, showPageCount){
		var pages = [];
		if(currrentPage > totalPage){
			console.log('currrent page can not greater than total page');
			return pages;
		}
		if(totalPage <= showPageCount){
			for(var i=1; i<=totalPage; i++){
				pages.push(i);
			}
			return pages;
		}
		for(var i=1; i<= showPageCount; i++){
			pages.push(currrentPage - Math.floor(showPageCount/2) - 1 + i);
		}
		pages = judgeNnmber(pages);
		return pages;

		function judgeNnmber(pages){
			if(Math.min.apply(null, pages) < 1){
				pages = pages.slice(1);
				pages.push(Math.max.apply(null, pages) + 1);
				return judgeNnmber(pages);
			}
			if(Math.max.apply(null, pages) > totalPage){
				pages = pages.slice(0, showPageCount - 1);
				pages.unshift(Math.min.apply(null, pages) - 1);
				return judgeNnmber(pages);
			}
			return pages;
		}
	};
	function fetchDeck(){
		var data = {page: page, tag: tag, limit: limit, order: order};
		if(tag === 'user'){
			data.uid = uid;
		}
		$.ajax({
			url: '/piazza/search',
			type: 'GET',
			data: data,
		}).done(function(result){
			totalCount = result.count;
			if(result.data){
				renderDeck(result.data);
			}
			renderPageIndex();
			// console.log("success");
		}).fail(function() {
			console.log("error");
		}).always(function() {
			// console.log("complete");
		});
	};
	function userInfo(){
		$.ajax({
			url: '/userInfo',
			type: 'GET',
		}).done(function(user) {
			if(user.userName){
				uid = user.userId;
				var $loginBar = $('.login-bar');
				$loginBar.find('.btn').hide();
				$loginBar.find('.username').html(user.userName);
				$loginBar.find('.logged').show();
				userfolder();
			};
			// console.log("success");
		}).fail(function() {
			console.log("error");
		}).always(function() {
			// console.log("complete");
		});
	};
	function userfolder(){
		$.ajax({
			url: '/pmc/userfolders',
			type: 'GET',
		}).done(function(folders) {
			console.log(folders);
			if(folders.length > 0){
				var $folders = $('.folders');
				folders.forEach(function(folder){
					if(folder.folderName !== 'trash'){
						$folders.append('<option value ="'+ folder._id +'">'+ folder.folderName +'</option>');
					}else{
						uid = folder.uid;
					}
				});
			};
		}).fail(function() {
			console.log("error");
		}).always(function() {
			// console.log("complete");
		});
	};
	function renderComments(comments, add){
		var $comments = $('.comments-show');
		if(!add){
			$comments.empty();
		}

		comments.forEach(function(item){
			if(item){
				var text = '<div class="comments-item"><img src="styles/img/head.png">';
					text += '<div class="user">' + item.username + ':</div>';
					text += '<div class="message">' + item.message + '</div>';
				if(item.ctime){
					var t2 = new Date(item.ctime);
					var ctime = t2.toLocaleTimeString();
					text += '<span class="ctime">' + ctime + '</span>';
				}
					text += '</div>';
				$comments.prepend(text);
			}
		});
	};
	userInfo();
	fetchDeck();
	$('.theme-ico').on('click', function(event) {
		var cuIndex = parseInt($(this).attr('data-index'));
		var random = Math.floor(Math.random()*10);
		if(random !== cuIndex){
			$('body').css('background-image', 'url(/piazza/styles/img/theme'+ random +'.jpg)');
			$(this).attr('data-index', random);
		}else{
			$(this).click();
		}
	});
	$('.theme-ico').click();
	
	$('.type').on('click', function(event) {
		event.preventDefault();
		tag = $(event.currentTarget).attr('data-type');
		fetchDeck();
	});
	$('.search').on('click', function(event) {
		event.preventDefault();
		page = 1;
		tag = $input.val();
		fetchDeck();
	});

	var $collectBar = $('.collect').find('.collect-bar');
	var $reportBar = $('.report').find('.report-bar');
	var $shareBar = $('.share').find('.share-bar');
	$('.collect').on('click', function(event) {
		// event.preventDefault();
		event.stopPropagation();
		$reportBar.hide(200);
		$shareBar.hide(200);
		if(!uid){
			$collectBar.find('.message').html('请先登录~！').show();
			$collectBar.find('.collect-btn').attr('disabled', 'disabled');
		}else{
			$collectBar.find('.collect-btn').removeAttr('disabled');
			$collectBar.find('.message').hide().empty();
		}
		$collectBar.show(200);
	});
	$(document).on('click', '.love', function(event) {
		event.preventDefault();
		$(this).find('.loveing').show().animate({top: "20px"}, "slow").hide(200);
		$(this).removeClass('love').addClass('loved');
		var deckId = $(this).parents('.toolbar').attr('data-id');
		$.ajax({
			url: '/piazza/love',
			type: 'POST',
			data: {deckId: deckId},
		}).done(function() {
			// $shareBar.find('.message').html('分享成功').show(200).delay(2000).hide(200);
			// $shareBar.delay(2000).hide(200);
		}).fail(function() {
			console.log("error");
		}).always(function() {
			console.log("complete");
		});
	});
	$('.share').on('click', function(event) {
		event.stopPropagation();
		// event.preventDefault();
		$collectBar.hide(200);
		$reportBar.hide(200);
		$shareBar.show(200);
	});
	$('.report').on('click', function(event) {
		// event.preventDefault();
		event.stopPropagation();
		$collectBar.hide(200);
		$shareBar.hide(200);
		$reportBar.show(200);
	});
	$('.cancel').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		$collectBar.hide(200);
		$reportBar.hide(200);
		$shareBar.hide(200);
	});
	$shareBar.on('click', '.share-btn', function(event) {
		event.preventDefault();
		event.stopPropagation();
		var deckId = $('.toolbar').attr('data-id');
		var toEmail = $shareBar.find('input[name="toEmail"]').val();
		var _this = this;
		$.ajax({
			url: '/piazza/share',
			type: 'POST',
			data: {deckId: deckId, toEmail: toEmail},
			beforeSend: function(){
				$(_this).attr('disabled', 'disabled');
			},
		}).done(function() {
			console.log("success");
			$shareBar.find('.message').html('分享成功').show(200).delay(2000).hide(200);
			$shareBar.delay(2000).hide(200);
		}).fail(function() {
			console.log("error");
		}).always(function() {
			console.log("complete");
			$(_this).removeAttr('disabled');
		});
	});
	$reportBar.on('click', '.report-btn', function(event) {
		event.preventDefault();
		event.stopPropagation();
		var deckId = $('.toolbar').attr('data-id');
		var message = $reportBar.find('textarea[name="message"]').val();
		var type = $reportBar.find('select[name="type"]').val();
		var _this = this;
		$.ajax({
			url: '/piazza/report',
			type: 'POST',
			data: {deckId: deckId, message: message, type: type},
			beforeSend: function(){
				$(_this).attr('disabled', 'disabled');
			},
		}).done(function() {
			console.log("success");
			$reportBar.find('.message').html('举报成功').show(200).delay(2000).hide(200);
			$reportBar.delay(2000).hide(200);
		}).fail(function() {
			console.log("error");
		}).always(function() {
			$(_this).removeAttr('disabled');
		});
	});
	$collectBar.on('click', '.collect-btn', function(event) {
		event.preventDefault();
		var deckId = $('.toolbar').attr('data-id');
		var folderId = $('.folders').val();
		var _this = this;
		$.ajax({
			url: '/piazza/collect',
			type: 'POST',
			dataType: 'json',
			data: {deckId: deckId, folderId: folderId, uid: uid},
			beforeSend: function(){
				$(_this).attr('disabled', 'disabled');
			},
		}).done(function(data) {
			console.log(data);
			if(data.status){
				$collectBar.find('.message').html('收藏成功').show(200).delay(2000).hide(200);
				$collectBar.delay(2000).hide(200);
			}else{
				$collectBar.find('.message').html('课件已满').show(200).delay(2000).hide(200);
			}
		}).fail(function() {
			console.log("error");
		}).always(function() {
			$(_this).removeAttr('disabled');
		});
	});
	$(document).on('click', '.fullscreen', function(event) {
		$(this).removeClass('fullscreen').addClass('exit-full-screen').siblings('iframe').css({
			position: 'fixed',
			top: '0px',
			left: '0px',
			width: '100%',
			height: '100%',
			"z-index": 1,
		});
	});
	$(document).on('click', '.exit-full-screen', function(event) {
		$(this).removeClass('exit-full-screen').addClass('fullscreen').siblings('iframe').removeAttr('style');
	});
	$('.pre-page').on('click', function(event) {
		event.preventDefault();
		var $iframe = $(this).siblings('iframe');
		var currentURL = $iframe[0].contentDocument.URL;
        var tag = currentURL.substring(currentURL.lastIndexOf('/') + 1);
        if(tag === "overview"){
             $iframe.attr('src', previewSrc + 'step-' + maxIndex);
        }else{
            var tagNum = tag.substring(tag.indexOf('-') + 1);
            if(tagNum == 1){
                 $iframe.attr('src', previewSrc + 'overview');
            }else{
                 $iframe.attr('src', previewSrc + 'step-' + (parseInt(tagNum) - 1));
            }
        }
        $iframe.focus();
	});
	$('.next-page').on('click', function(event) {
		event.preventDefault();
		var $iframe = $(this).siblings('iframe');
		var currentURL = $iframe[0].contentDocument.URL;
        var tag = currentURL.substring(currentURL.lastIndexOf('/') + 1);
        if(tag === "overview"){
            $iframe.attr('src', previewSrc + 'step-1');
        }else{
            var tagNum = tag.substring(tag.indexOf('-') + 1);
            if(tagNum == maxIndex){
                 $iframe.attr('src', previewSrc + 'overview');
            }else{
                 $iframe.attr('src', previewSrc + 'step-' + (parseInt(tagNum) + 1));
            }
        }
        $iframe.focus();
	});
	function pageIndexShow(){
		var $iframe = $('.preview-bar').find('iframe');
        var currentURL = $iframe[0].contentDocument.URL;
        var tag = currentURL.substring(currentURL.lastIndexOf('/') + 1);
        $('.pageIndex').html(tag + "/" + maxIndex);
        indexAutoShow = setTimeout(function(){
            pageIndexShow();
        }, 1000);
    };
	$('.comment-btn').on('click', function(event) {
		event.preventDefault();
		if(!uid){
			$('.comments-message').html('您还没有登录~！').show(200).delay(3000).hide(200);
			return;
		}
		var message = $.trim($(this).prev().val());
		var deckId = $('.toolbar').attr('data-id');
		var username = $('.username').html();

		var comment = {username: username, message: message};

		var _this = this;
		if(message){
			$.ajax({
				url: '/piazza/addComment',
				type: 'POST',
				dataType: 'json',
				data: {deckId: deckId, comment: comment},
				beforeSend: function(){
					$(_this).attr('disabled', 'disabled');
				}
			}).done(function(result) {
				console.log(result);
				// var oneComment = [];
				// oneComment.push(comment);
				// renderComments(oneComment, true);
				renderComments(result.comments);
				$('.comments-input').find('textarea').val('');
				$('.comments-message').html('评论成功~！').show(200).delay(3000).hide(200);
			}).fail(function() {
				console.log("error");
			}).always(function() {
				$(_this).removeAttr('disabled');
			});
		}
	});
	$(document).on('click', '.circle-btn', function(event) {
		event.preventDefault();
		var index = parseInt($(event.currentTarget).html());
		if(index !== page){
			$('.circle-btn').removeClass('active');
			$(event.currentTarget).addClass('active')
			page = index;
			fetchDeck();
		}
	});
	$('.close-btn').on('click', function(event) {
		event.preventDefault();
		fetchDeck();
		clearTimeout(indexAutoShow);
		$('.preview-bar').hide();
		$('.preview-bar').find('iframe').attr('src', '');
		localStorage.removeItem('preview-string');
	});
	$('input:radio').on('click', function(event) {
		var orderType = $(this).val();
		order = '{"' + orderType + '": -1}';
		fetchDeck();
	});
	$(document).on('click', '.comments', function(event) {
		$(this).parents('.overInfo').siblings('.display').click();
	});
	$(document).on('click', '.display', function(event) {
		event.preventDefault();
		var url = "/preview_export/impress.html#/overview";
	 	var deckId = this.id;
        $.ajax({
        	url: '/piazza/preview',
        	type: 'GET',
        	data: {deckId: deckId},
        }).done(function(data) {
        	// console.log(data);
        	maxIndex = data.slides.length;
        	renderComments(data.comments);
			localStorage.setItem('preview-string', data.previewText);
			$('.loved').removeClass('loved').addClass('love').find('.loveing').removeAttr('style');
			$('.preview-name').html(data.filename);
        	$('.preview-bar > iframe').attr('src', url);
        	$('.preview-bar').find('.toolbar').attr('data-id', data._id);

        	setTimeout(function(){
                pageIndexShow();
            }, 1000);
        	$('.preview-bar').show();
        	if(data.uid === uid){
				$('.toolbar').css("visibility","hidden");
			}else{
				$('.toolbar').css("visibility","visible");
			}
        }).fail(function() {
        	console.log("error");
        }).always(function() {
        	console.log("complete");
        });
	});
	$('.preview-bar').on('scroll', function(event) {
		event.preventDefault();
		if(this.scrollTop + $(this).height() >= 1300){
			$(this).find('.back-top').animate({right: '50px'}, 200);	
		}else{
			$(this).find('.back-top').animate({right: '-80px'}, 200);	
		}
	});

	$('.username').on('mouseover', function(event) {
		event.preventDefault();
		$(this).siblings('.usermenu').show(200);
	});
	$('.usermenu').on('mouseleave', function(event) {
		event.preventDefault();
		$('.usermenu').hide(200);
	});
	// this.$iframe[0].contentDocument.URL;
});