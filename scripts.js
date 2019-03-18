var errorUnload = true, scroll = true;

function isMobile(){
	var userAgent = navigator.userAgent.toLowerCase();
	if( userAgent.search(/(android|iPhone|iPad|iPod|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i)!= -1 ){
		return true;
	}

}
//esconde menu notificacoes
function escondeObj(){
	$(".popMenu").each(function(){
		var obj = $(this);
		if(obj.is(":visible")){
			obj.fadeOut(150);
			$("li.li-settings").removeClass("active");
		}
	});
}

//abre menu config
function menuConfig(obj, ativaCom, focusTokenInput){
	if(ativaCom == "hover"){
		$(document).on("mouseenter", obj, function(){
			escondeObj();
			$(obj).find(".popMenu li:first").addClass("primeiro");
			$(obj).find(".popMenu li:last").addClass("ultimo");
			$(this).find(".popMenu").stop().fadeIn(150);
		});
		$(document).on("mouseleave", obj, function(){
			$(obj).find(".popMenu").stop().fadeOut(150);
		});
		$(document).on("click", obj + " a", function(e){
			e.stopPropagation();
		});
		$(document).on("click", obj, function(e){
			e.stopPropagation();
			if($(obj).find(".popMenu").is(":visible")){
				return false;
			}
		});
	}else if(ativaCom == "click"){
		$(document).on("click", obj, function(e){
			e.preventDefault();
			e.stopPropagation();
			$(obj).find(".popMenu > ul li:first").addClass("primeiro");
			$(obj).find(".popMenu > ul li:last").addClass("ultimo");
			escondeObj();
			if($(this).find(".popMenu").length > 0){
				$(this).find(".popMenu").stop().fadeIn(150, function(){
					if(focusTokenInput){
						setTimeout(function(){
							$(obj).find('ul.token-input-list').addClass('token-input-focused', function(){
								$(obj).find('.token-input-input-token > input').focus();
							});
						}, 100);
					}
				});
			}else{
				$(this).parent().find(".popMenu").stop().fadeIn(150, function(){
					if(focusTokenInput){
						//setTimeout(function(){
							$(obj).find('ul.token-input-list').addClass('token-input-focused', function(){
								$(obj).find('.token-input-input-token > input').focus();
							});
						//}, 100);
					}
				})
			}
		});
		if(isMobile()){
			$(document).on("click", ".popMenu li > a", function(e){
				e.stopPropagation();
			});
		}
	}
}

//regex url e img
var __urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
var __imgRegex = /\.(?:jpe?g|gif|png|ico|bmp|webp|svg)$/i;
var __docRegex = /([^\s]+(?=\.(txt|rtf|doc|docx|log|odt|mpp|csv|xls|xlsx|xlsm|xltm|ppt|pptx|pps|ppsx|pdf|rar|zip|tar|gz|7zip|jmx|json|sql|conf|html|htm|xml|css|scss|sass|styl|js|jsx|ejs|php|asp|aspx|cpp|rake|rb|java|jar|jsp|jspa|kt|cer|gantter|swift|xib|plist|p12|apk|gradle|pro|cdr|ipa|indd|ai|eps|psd|raw|postman_collection))\.\2)/gm;
var __docRegexNoHTML = /([^\s]+(?=\.(txt|rtf|doc|docx|log|odt|mpp|csv|xls|xlsx|xlsm|xltm|ppt|pptx|pps|ppsx|pdf|rar|zip|tar|gz|7zip|jmx|json|sql|conf|xml|css|scss|sass|styl|jsx|ejs|php|asp|aspx|cpp|rake|rb|java|jar|kt|cer|gantter|swift|xib|plist|p12|apk|gradle|pro|cdr|ipa|indd|ai|eps|psd|raw|postman_collection))\.\2)/gm;

function parseURL($string){
	if(!$string) {
		return "";
	}
    var exp = __urlRegex;
    return $string.replace(exp,function(match){
            __imgRegex.lastIndex=0;
            if(__imgRegex.test(match)){
                return '<a href="'+match+'" class="fancybox"><img src="'+match+'" class="thumb" /></a>';
            }
            else{
                return '<a href="'+match+'" target="_blank">'+match+'</a>';
            }
        }
    );
}

function base64ToBlob(base64, mime){
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
        var slice = byteChars.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: mime});
}

(function($){
    $(window).load(function(){

    	if($(".recent-files, .itauHome, .itauPost").mCustomScrollbar){
    		$('.recent-files, .itauHome, .itauPost').mCustomScrollbar({theme:"minimal-dark"});
    	}

    	if($('.tooltip').tooltipster){
	        $('.tooltip').tooltipster({
	        	contentAsHTML: true,
	        	multiple: true
	        });
    	}
        
    	if($(".tooltip-livecom").tooltipster){
	        $(".tooltip-livecom").tooltipster({
	        	contentAsHTML: true,
	        	multiple: true,
	        	theme: 'tooltipster-livecom'
	        });
    	}

		if($('.tooltip-livecom-grupo-virtual').tooltipster){
			$('.tooltip-livecom-grupo-virtual').tooltipster({
				contentAsHTML: true,
	        	interactive: true,
	        	theme: 'tooltipster-livecom',
	        	content:'<p class="sbold">Grupos Virtuais/Físicos:</p><br/>'+
	        				'<p class="sbold">Virtual:</p><p>é composto apenas de sub-grupos e não pode conter usuários.</p><br/>'+
	        				'<p class="sbold">Físico:</p><p>é composto apenas de usuários e não pode conter sub-grupos.</p>'
			});
		}
        
    	if($(".tooltip-livecom-tipo-grupo").tooltipster){
	        //tooltip tipo grupo
	        $(".tooltip-livecom-tipo-grupo").tooltipster({
	        	contentAsHTML: true,
	        	interactive: true,
	        	theme: 'tooltipster-livecom',
	        	content:'<p class="sbold">Tipos de Grupo:</p><br/>'+
	        				'<p class="sbold">Privado:</p><p>Admin adiciona usuários no grupo. Usuários não podem sair.</p><br/>'+
	        				'<p class="sbold">Privado Opcional:</p><p>Admin adiciona usuários no grupo. Usuário recebe email/notificação para aceitar entrar no grupo ou não.<br/>Usuário pode sair do grupo a qualquer momento.</p><br/>'+
	        				'<p class="sbold">Aberto:</p><p>Qualquer usuário pode ver o grupo e solicitar a participação. Usuário pode sair do grupo a qualquer momento.</p><br/>'+
	        				'<p class="sbold">Aberto com aprovação:</p><p>Idem anterior, mas admin precisa aprovar a entrada no grupo.</p>'
	        });
    	}

    	if($(".tooltip-livecom-origem-cadastro").tooltipster){
	        //tooltip convidar v2 origem cadastro
	        $(".tooltip-livecom-origem-cadastro").tooltipster({
	        	contentAsHTML: true,
	        	interactive: true,
	        	theme: 'tooltipster-livecom',
	        	content:'<p class="sbold">Origem do cadastro:</p><br/>'+
	        				'<p class="sbold">Importado:</p><p>Usuários que foram cadastrados no Livecom através de uma importação</p><br/>'+
	        				'<p class="sbold">WEB:</p><p>Usuários que foram cadastrados no Livecom pela WEB</p>'
	        });
    	}

    	if($(".tooltip-livecom-status").tooltipster){
	        //tooltip convidar v2 status
	        $(".tooltip-livecom-status").tooltipster({
	        	contentAsHTML: true,
	        	interactive: true,
	        	theme: 'tooltipster-livecom',
	        	content:'<p class="sbold">Status: </p><br/>'+
	        				'<p class="sbold">Novo:</p><p>Foi cadastrado recentemente, e ainda não foi enviado o convite</p><br/>'+
	        				'<p class="sbold">Enviado Convite:</p><p>Enviado o convite mas ainda não se logou</p><br/>'+
	        				'<p class="sbold">Ativo:</p><p>Fez login no sistema e salvou o cadastro</p>'
	        });
    	}

    	if($(".tooltip-livecom-conector").tooltipster){
	        //tooltip convidar v2 conector
	        $(".tooltip-livecom-conector").tooltipster({
	        	contentAsHTML: true,
	        	interactive: true,
	        	theme: 'tooltipster-livecom',
	        	content:'<p class="sbold">Conector: </p><br/>'+
	        				'<p class="sbold">Livecom:</p><p>Acesso através de conta no Livecom</p><br/>'+
	        				'<p class="sbold">LDAP:</p><p>Acesso através de LDAP</p>'
	        });
    	}
    });
})(jQuery);

function geraStack(tabela){
	$(tabela).stacktable({myClass:'tabelaPequena'});
}

function isIos(){
	if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){
		return true;
	}
}

function formatBytes(bytes,decimals) {
   if(bytes == 0) return '0 Byte';
   var k = 1000;
   var dm = 1;
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   var i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// tab dias trabalhados 
function fillDays(id){
	jsHttp.get(urlContext + "/rest/v1/expediente/" + id,{
		success : function(data) {
			cleanTableHour();
			var daysArray = ["segunda","terca","quarta","quinta","sexta","sabado","domingo"];
			for(var i in daysArray){
				var day = daysArray[i].toString();
				dayCheck(day,i);
			}
			// coloca icone se dia for true
			function dayCheck(day,i){
				var a = parseInt(i) + 1;
				if(data[day]){
					$(".tabelaHorario tbody td:nth-child("+ a +")").html('<div class="holder"><i class="fa fa-check font-blue"></i></div>');
				}
			}
		}
	});
	// remove os icones da tabela
	function cleanTableHour(){
		$(".tabelaHorario  tbody td").html("<div class='holder'></div>");
	};
}

//callAjaxPost
function callAjaxPost(paramsPost, form, obj, isDraft){
	jQuery.ajax({
		type: "post",
		url: urlContext+"/ws/postComunicado.htm?mode=json&form_name=form",
	 	dataType: "json",
	 	data: paramsPost,
        beforeSend: function(){
        	if(!isDraft){
	    		$(".interacoesMural").find("input, textarea").attr("disabled", "disabled");
	    	}
        	$('.btPostarComunicado.publicar').addClass('disabled').html('<i class="fa fa-spinner fa-spin fa-fw"></i>');
        },
	 	success: function( data ) {
	 		if(isDraft){
	 			draftID = data.post.id;
	 		}else{
	 			if(obj){
		 			obj.addClass("ac_loading").attr("disabled", "disabled");
		 		}
		 		$(".interacoesMural").find("input, textarea").removeAttr("disabled");

		 		obj.closest(".interacoesMural").find(".willSlide").slideUp(150, function(){
					obj.closest(".interacoesMural").removeClass("aberto").find(" > a").removeClass("ativo");
					$(".interacoesMural").find(".btPostarComunicado").removeClass("disabled").html('Publicar');
					$("#titulo").val("").attr("placeholder", "Publicando...");

					setTimeout(function(){
						$('.cancelarForm').click();
					}, 100);
				});
		 		if(data.post){

		 			if(obj){
			 			if(paramsPost.rascunho) {
			 				if(urlAtual.lastIndexOf('meusRascunhos')){
			 					window.location.href = urlContext + "/pages/meusRascunhos.htm";
			 				}else{
			 					LiveMural.createPost(data.post);
			 				}
			 			} else if(jQuery.trim(form.find("#idPost").val())) {
			 				window.location.href = urlContext + "/pages/post.htm?id=" + jQuery.trim(form.find("#idPost").val());
			 			} else if(PARAMS.GRUPO_SELECIONADO) {
			 				window.location.href = urlContext + "/pages/mural.htm?grupo=" + PARAMS.GRUPO_SELECIONADO;
			 			} else if(PARAMS.CATEGORIA_SELECIONADA) {
			 				window.location.href = urlContext + "/pages/mural.htm?categoria=" + PARAMS.CATEGORIA_SELECIONADA;
			 			} else if(PARAMS.TAG_SELECIONADA) {
			 				window.location.href = urlContext + "/pages/mural.htm?tag=" + PARAMS.TAG_SELECIONADA;
			 			} else {
			 				if($(location).attr('href').indexOf("postComunicado.htm?id") > -1){
								var id = parseUri($(location).attr('href')).queryKey["id"];
								//window.location.href=urlContext+"/pages/mural.htm#postId-"+id;
								window.location.href=urlContext+"/pages/mural.htm";
							}else{
								LiveMural.createPost(data.post);
							}
			 			}
		 			}
		 		}else if(data.mensagem.status == "ERROR"){
		 			msgErro = "Ocorreu um erro ao salvar.";
		 			jAlert(msgErro, 'Opps...', null);
		 		}else if(data.mensagem.status == "NOK"){
		 			msgErro = data.mensagem.mensagem;
		 			jAlert(msgErro, 'Opps...', null);
		 		}else if(data.mensagem.status == "Exception"){
		 			msgErro = data.mensagem.mensagem;
		 			jAlert(msgErro, 'Opps...', null);
		 		}
	 		}

	 		var paramsNotification = {
				data: {
					user_id: SESSION.USER_INFO.USER_ID,
				},
				isBadges: true,
				isClear: true,
				isScroll: true,
				isShowTabNotification: false,
				isFlipAnimation: false,
				isSpinner: true,
				isMenuConfig: false,
			};
	 		notifications.getNotifications(paramsNotification);
		}
	 });
}

//confirma anexo
function ajaxPost(paramsPost, form, obj){
	if($('#htmlPost').val() != ''){
		if(!paramsPost.html){
			var value = $('#htmlPost').val() == 'true' ? 1 : 0;
			paramsPost.html = value;
		}else{
			if(PARAMS.MURAL_WEBVIEW_ON == '1' || $('#htmlPost').val() == 'true'){
				if(!tinymce.activeEditor.isDirty()){
					paramsPost.mensagem = '';
				}
			}
		}
	}else{
		if(PARAMS.MURAL_WEBVIEW_ON == '1'){
			paramsPost.html = 1;

			var mensagem = paramsPost.mensagem,
				css = '<link rel="stylesheet" type="text/css" href="'+urlContext + '/assets/css/tinymce.css" />',
				inline = '<style>body { margin: 0; font-family: "Open Sans", Arial, "Helvetica-Neue-Light", sans-serif, verdana; font-size: 14px; line-height: 18px; } body p{ font-size: 14px; line-height: 18px; } @media only screen and (min-device-width : 375px) and (max-device-width : 667px){ p{ font-size: 18px; line-height: 28px; } body{ margin: 0; } } @media only screen and (min-device-width : 320px) and (max-device-width : 568px){ p{ font-size: 18px; line-height: 28px; } body{ margin: 0; } } @media only screen and (min-device-width : 414px) and (max-device-width : 736px){ p{ font-size: 18px; line-height: 28px; } }</style>',
				position = mensagem.lastIndexOf('<head>') + 7;
			var output = [mensagem.slice(0, position), css, inline, mensagem.slice(position)].join('');
			paramsPost.mensagem = output
		}
	}

	/* if(paramsPost.post_id && paramsPost.post_id != ''){
		if(PARAMS.PUSH_POST_CREATE_NOTIFICATION_UPDATE == 1){
			//enviar push ao atualizar
			paramsPost.push = 1;
		}
	} */

	if((paramsPost.mensagem.indexOf('anexo') > -1 || paramsPost.mensagem.indexOf('anexos') > -1) && paramsPost.arquivo_ids == ""){
		jConfirm('Você escreveu "anexo" na mensagem mas não anexou nenhum arquivo. Deseja realizar a postagem mesmo assim?', 'Atenção', null, function(e) {
			if(e) {
				callAjaxPost(paramsPost, form, obj);
			} else {
				$('.btn-publicar, .btPostarComunicado').removeClass('disabled').html('Publicar');
				return false;
			}
		});
	}else{
		callAjaxPost(paramsPost, form, obj);
	}
}

//reseta filtro mural
function resetFilterMural(obj){
	$(obj.parent).slideUp('normal', function(){
		if(obj.isRemoveParent){
			$(this).remove();
		}
		if(obj.isResetMural){
			if(!modeMural || typeof modeMural == "undefined" || modeMural == null){
				modeMural = "expandido";
			}
			LiveMural.buscaPosts('', true, modeMural);
		}

		if(obj.isRedirectMural){
			window.location = urlContext+'/pages/mural.htm';
		}
	});
}

//atualiza notificações
function updateNotifications(){
	var isTabNotificationVisible = $('#sideBox-notify_solicita').hasClass('active');

	var paramsNotifications = {
		data: {
			user_id: SESSION.USER_INFO.USER_ID,
		},
		isBadges: true,
		isClear: true,
		isScroll: true,
		isFlipAnimation: false,
		isSpinner: true,
		isMenuConfig: false,
	};

	if(isTabNotificationVisible){
		paramsNotifications.isShowTabNotification = false;
	}

	notifications.getNotifications(paramsNotifications);
}

function __abrirPostar(obj, isComunicados){
	/* if(isComunicados)
		$('.formPost #categoria').val(1); */
	if($('.interacoesMural .formPost .willSlide').is(':visible')) return false;

	obj.parent(".campoPost").next(".willSlide").slideDown(150, function(){
		obj.attr("placeholder", i18n('mural.titulo.placeholder'));
		$("#categoria").width("").trigger('render');
		$("#titulo").focus();
		$(".formPost .charNum.countTitulo, .formPost .charNum.countResumo").show();
		clearTagsUsuarioPost();
		
//		if(btn_rlt_on != "" && btn_rlt_on == "1"){
//            getStatusRDD();
//        }

		if($('.radio-visibilidade:checked').hasClass('radio-grupos')){
			$('.campoPost.campo-post-grupos-hide').slideDown();
		}else{
			$('.campoPost.campo-post-grupos-hide').hide();
		}

		if($('.radio-visibilidade:checked').hasClass('radio-tags')){
			$('.campoPost.campo-post-tags-user-hide').slideDown();
		}else{
			$('.campoPost.campo-post-tags-user-hide').hide();
		}

		if(PARAMS.MURAL_TAGS_POST_USER_ON == '1')
			getTagsUsuarioAvailable();
	});
}

$(document).ready(function(){
	
	$('.bs-tooltip').tooltip({ html: true, });
	$('.bs-tooltip-bottom').tooltip({ html: true, placement: 'bottom' });
	$('.bs-tooltip-left').tooltip({ html: true, placement: 'left' });

	$('body').on('mouseover', '.rate-content .avalia-post', function(event){
		var index = $(this).index(),
			parent = $(this).parent(),
			estrela = $(this).find('i');

		for(var i = 0; i < 5; i++){
			var fixIdx = i + 1;
			if(i <= index){
				$('.rate-content').addClass('js-handler');
				$('.rate-content .avalia-post:nth-child('+fixIdx+') > i').addClass('fa-star').removeClass('fa-star-o');
			}else{
				$('.rate-content .avalia-post:nth-child('+fixIdx+') > i').addClass('fa-star-o').removeClass('fa-star');
			}
		}
		
		
	}).on('mouseleave', '.rate-content .avalia-post', function(event){
		$('.rate-content').removeClass('js-handler');
	});

	//marcar usuários em comentários
	/* $("body").on("keyup", ".comentario > textarea.mentions", function(e){
		var obj = $(this);
		var value = obj.val();
		if(value.indexOf('@') != -1){
			var url = urlContext+'/ws/usuariosAutoComplete.htm?mode=json&form_name=form&wsVersion='+wsVersion+'&wstoken='+SESSION.USER_INFO.USER_WSTOKEN;
			//obj.mentionsInput({ source: url });
			value = value.substr(value.lastIndexOf('@') + 1);
			jQuery.ajax({
				type : "post",
				url : urlContext+'/ws/usuariosAutoComplete.htm?mode=json&form_name=form&wsVersion='+wsVersion+'&wstoken='+SESSION.USER_INFO.USER_WSTOKEN,
				dataType : "json",
				data : {
					q: value
				},
				success: function(obj, data){
					$(".mentions").mention({
						delimiter: '@',
					    sensitive : true,
					    queryBy: ['login', 'nome'],
					    users: data
					});
				}
			});
		}
	}); */
	
	if(isMobile() && isIos()){
		$(".interacoesMural, .clear.comentar, .clear.comentarios, .textComentario, .clear").find(".uploaderNovo").hide();
		$(".headerArquivos").find(".fileUpload").hide();
	}

	// tabela expediente
	$(".tabelaHorario tbody td input").prop('disabled', true);
	$("#form_expediente").on("change",function(){
		    var id = $(this).val();
		    if(id){
		    	fillDays(id);
		    }
	});
	var id = $("#form_expediente option:selected").val();
	if(id){
		fillDays(id);
	}
	
	$(".portlet-toggle").on("click",function(e){
		e.preventDefault();
		icon = $(this).find(".actions i");
		$(this).closest(".portlet.light").find(".portlet-body").slideToggle(180);
		if(icon.hasClass("fa-chevron-down")){
			icon.addClass("fa-chevron-up");
			icon.removeClass("fa-chevron-down");
		}else{
			icon.addClass("fa-chevron-down");
			icon.removeClass("fa-chevron-up");
		}
	});
	
	$('ul.icones-header li').click(function(){
		$(this).tooltip('hide');
	});
	
	//esconde dropdown
	 if(urlAtual == "mural.htm" || urlAtual.lastIndexOf('jsessionid')+1 != 0 || (urlAtual == "mural.htm?clear=true") ||
		urlAtual.lastIndexOf('?grupo=')+1 != 0 || urlAtual.lastIndexOf('?categoria=')+1 != 0 || urlAtual.lastIndexOf('?user_post_id=')+1 != 0 ||
		urlAtual.lastIndexOf('?tag=')+1 != 0 || urlAtual == "favoritos.htm" || urlAtual == "meusPosts.htm" || urlAtual == "meusRascunhos.htm"||
		urlAtual == "post.htm" || urlAtual.lastIndexOf("post.htm?") > -1 || urlAtual.lastIndexOf('?tab=tab') > -1){
		 if($(window).width() < 1190){
			 $('ul.icones-header li').click(function(){
				 var window = $(window).width();
				 var offset = $('.sideBox').offset().left;

				 if(offset > window){
					$(".sideBox").animate({"margin-right": "0px"}, 150);
				 }else{
					$(".sideBox").animate({"margin-right": "-390px"}, 150);
					$('#content>.container-fluid>.row>.main').css({'min-width':'100%', 'max-width':'100%'});
				 }
			 });
		 }

		$(".header-links.notificacoes, .icones-header .li-tutorial, #footer").addClass("mural-located");
		if(urlAtual.indexOf('post.htm') == -1){
			if($(window).width() > 580){
				$(".fundo-busca .icones.dropdown").fadeIn();
			}
		}

		if(SESSION.PERFILS.PERFIL_isRoot){
			$('li.exibicao-feed').hide();
		}
	}else{
		$("a.ver-todas-notificacoes").attr("href", urlContext+"/pages/mural.htm?tab=tabNotificacoes");
		$('li.exibicao-feed').hide();
	}

	 if(jQuery(location).attr('href').lastIndexOf('postComunicado.htm') > -1){
		 $('#footer').addClass('mural-located');
	 }

	//busca header
	$(".fundo-busca .icones.busca").click(function(e){
		var obj = $(this);
		var input = $(".fundo-busca input#busca");
		var dropdown = $(".fundo-busca .icones.dropdown");
		var fundoBusca = $(".fundo-busca");
		var li = $("ul.nav.navbar-nav.navbar-right.icones-header > li:not(.li-tags, .li-users, .li-links, .li-arquivos)");
		if($(window).width() <= 580){
			fundoBusca.toggleClass("using");
			if(fundoBusca.hasClass("using")){
				li.hide();
				dropdown.show();
				input.show().trigger("focus");
				$(".navbar-search").animate({ width: "70%" }, 50 );
				fundoBusca.addClass("using");
			}else{
				$(".filtroPosts").hide();
				$(".navbar-search").removeAttr("style");
				fundoBusca.removeClass("using");
				dropdown.hide();
				input.hide();
				setTimeout(function(){ li.show(); input.show(); }, 360);
			}
			
			$('body').click(function(event){
				var clickPosition = $(event.target).attr('class');
				var a = $(event.target);
				
				if (a.hasClass('icones') || a.hasClass('ui-autocomplete-input')){
					return false;
				}else if( a.hasClass('mascaraLabel') || a.hasClass('hasCustomSelect') || a.hasClass('placeholder') ){
					return true;
				}else{
					$(".navbar-search").removeAttr("style");
					$(".filtroPosts").hide();
					fundoBusca.removeClass("using");
					dropdown.hide();
					setTimeout(function(){input.hide();li.fadeIn();}, 360);
				}
			});
			
		}else{
			dropdown.click();
		}
	});
	
	//layout grid e tabela
	$("a.table-view, a.grid-view").click(function(){
		var cl = $(this).attr("class");
		if(cl == "table-view"){
			$(".view-tabela").fadeIn();
			$(".view-grid").hide();
		}else{
			$(".view-grid").fadeIn();
			$(".view-tabela").hide();
		}
	});
	
	//layout grid e tabela modal
	$("a.table-view-modal, a.grid-view-modal").click(function(){
		var cl = $(this).attr("class");
		if(cl == "table-view-modal"){
			$(".view-tabela-modal").fadeIn();
			$(".view-grid-modal").hide();
		}else{
			$(".view-grid-modal").fadeIn();
			$(".view-tabela-modal").hide();
		}
	});
	
	if($(window).width() <= 768){
		if(isBuildTypeCetip()) {
			$(".icones.busca").removeClass('buscaCetip');
		}
	}
	
	function isBuildTypeCetip() {
		return buildType == 'cetip';
	}
	
	$(window).resize(function(){
		if($(window).width() >= 768){
			if(isBuildTypeCetip()) {
				$(".icones.busca").addClass('buscaCetip');
			}
			$(".buscaMobile").removeClass("ativo").hide();
		} else {
			if(isBuildTypeCetip()) {
				$(".icones.busca").removeClass('buscaCetip');
			}
		}
		calculaPositionChats();

		if($("#leftMenu").length > 0){
			if($("#leftMenu").offset().left < 0){
				if($(window).width() > 870){
					$("#leftMenu").animate({"margin-left": "0px"}, 150);
				}
			}else{
				if($(window).width() <= 870){
					$("#leftMenu").animate({"margin-left": "-270px"}, 150);
				}
			}
		}
		
		if($(window).width() > 570){
			$(".fundo-busca input#busca, .fundo-busca .icones.busca, ul.nav.navbar-nav.navbar-right.icones-header > li").removeAttr("style");
		}
		
		if($(window).width() < 581){
			$(".fundo-busca .icones.dropdown").removeAttr("style");
		}else{
			if(urlAtual == "mural.htm" || urlAtual == "favoritos.htm" || urlAtual == "meusPosts.htm" || urlAtual == "meusRascunhos.htm"){
				$(".fundo-busca .icones.dropdown").fadeIn();
			}
			$(".navbar-search").removeAttr("style");
			$(".fundo-busca").removeClass("using");
		}
	});
	
	//mostra menu mobile
	$(".navbar-inverse > .container-fluid > .navbar-header > a").click(function(e){
		e.preventDefault();
		if($(window).width() <= 870){
			if($("#leftMenu").offset().left == 0){
				$(this).removeClass("ativo");
				$("#leftMenu").animate({"margin-left": "-270px"}, 150);
			}else{
				$(this).addClass("ativo");
				$("#leftMenu").animate({"margin-left": "0px"}, 150);
			}
		}else{
			location.href=$(this).attr("href");
		}
	});
	
	//esconde menu mobile
	$("body").click(function(){
		var leftMenu = $("#leftMenu").css("margin-left");
		if($(window).width() <= 870 && leftMenu == "0px"){//verificar tamanho
			$(".navbar-inverse > .container-fluid > .navbar-header > a").addClass("ativo");
			$("#leftMenu").animate({"margin-left": "-270px"}, 150);
		}
	});

	$(document).on('keyup', function(event){
		var code = event.which || event.keyCode;
		if(code === 27)
			escondeObj();
	})

	//menu hover ou click
	if(isMobile()){
		menuConfig(".interacoesPost .botaoConfig", "click");
		menuConfig(".botaoConfigMini", "click");
		menuConfig(".configItem", "click");
		menuConfig(".infoPost", "click");
		menuConfig(".opcoes-post", "click");
	}else{
		menuConfig(".interacoesPost .botaoConfig", "hover");
		menuConfig(".botaoConfigMini", "hover");
		menuConfig(".configItem", "hover");
		menuConfig(".infoPost", "hover");
		menuConfig(".opcoes-post", "click");
	}

	if($(".datepicker").pickadate){
		$(".datepicker").pickadate({
			monthsFull: [ 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ],
			monthsShort: [ 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez' ],
			weekdaysFull: [ 'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado' ],
			weekdaysShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab' ],
			today: 'Hoje',
			clear: 'Limpar',
			close: 'Fechar',
			formatSubmit: 'dd/mm/yyyy',
			format: 'dd/mm/yyyy',
			onSet: function(context) {
				if(this.$node.val()!=""){
					this.$node.parent().find(".mascaraLabel").hide();
				}else{
					this.$node.parent().find(".mascaraLabel").show();
				}
				this.$node.parent().find(".popPlaceholder").fadeOut();
			},
			onClose: function() {
				$(document.activeElement).blur();
			}
		});
	}
	
	if($("#form_dataPublicacao[type='text']").pickadate){
		$("#form_dataPublicacao[type='text']").pickadate({
			monthsFull: [ 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ],
			monthsShort: [ 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez' ],
			weekdaysFull: [ 'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado' ],
			weekdaysShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab' ],
			today: 'Hoje',
			clear: 'Limpar',
			close: 'Fechar',
			//min: true,
			formatSubmit: 'dd/mm/yyyy',
			format: 'dd/mm/yyyy',
			onSet: function(context) {
				if(this.$node.val()!=""){
					this.$node.parent().find(".mascaraLabel").hide();
				}else{
					this.$node.parent().find(".mascaraLabel").show();
				}
				this.$node.parent().find(".popPlaceholder").fadeOut();
			},
			onClose: function() {
				$(document.activeElement).blur();
			}
		});
	}
	
	if($("#form_dataReminder[type='text']").pickadate){
		$("#form_dataReminder[type='text']").pickadate({
			monthsFull: [ 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ],
			monthsShort: [ 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez' ],
			weekdaysFull: [ 'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado' ],
			weekdaysShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab' ],
			today: 'Hoje',
			clear: 'Limpar',
			close: 'Fechar',
			//min: true,
			formatSubmit: 'dd/mm/yyyy',
			format: 'dd/mm/yyyy',
			onSet: function(context) {
				if(this.$node.val()!=""){
					this.$node.parent().find(".mascaraLabel").hide();
				}else{
					this.$node.parent().find(".mascaraLabel").show();
				}
				this.$node.parent().find(".popPlaceholder").fadeOut();
			},
			onClose: function() {
				$(document.activeElement).blur();
			}
		});
	}

	if($(".datepickerUsa").pickadate){
		$(".datepickerUsa").pickadate({
			monthsFull: [ 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ],
			monthsShort: [ 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez' ],
			weekdaysFull: [ 'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado' ],
			weekdaysShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab' ],
			today: 'Hoje',
			clear: '',
			close: 'Fechar',
			formatSubmit: 'yyyy-mm-dd',
			format: 'yyyy-mm-dd'
		});
	}
	
	if($(".inputHorario").pickatime){
		$(".inputHorario").pickatime({
			format : 'H:i',
			interval: 15,
			clear: 'Limpar',
			close: 'Fechar',
			container: '.interacoesMural',
			onSet: function(context) {
				if(this.$node.val()!=""){
					this.$node.parent().find(".mascaraLabel").hide();
				}else{
					this.$node.parent().find(".mascaraLabel").show();
				}
				this.$node.parent().find(".popPlaceholder").fadeOut();
			},
			onClose: function() {
				$(document.activeElement).blur();
			}
		});
	}
		
	/*
	//Máscara
	if($(window).width() >= 768){
		placeholder(".fundo-busca #busca", "#82d3e8");
	}
	placeholder(".placeholder", "#c5c5c5");
	
	*/
	
	//IMPLEMENTA A FUNÇÃO DO SELECT
	if($('select:not(.form-control)').customSelect){
		$('select:not(.form-control)').customSelect();
		$(window).resize(function(){
			setTimeout("$('select').trigger('update')",500);
		});
	}
	
	//MASCARA PARA INPUTS COM CLASSE TELEFONE
	if($("input.telefone").mask || $("input.data").mask || $("input.dddTelefone").mask){
		$("input.telefone").mask("+99 (99) 9999-9999");
		$("input.data").mask("99/99/9999");
		$("input.dddTelefone").mask("99");
		$("body").on("keyup", "input", function(){
			if($(this).hasClass("error")){
				$(this).removeClass("error");
			}
		}).on("change", "select", function(){
			if($(this).hasClass("error")){
				$(this).parent().find(".customSelect").removeClass("error");
			}
		});
	}
	
	//IMPLEMENTA O FILE INPUT
	$('.file-wrapper input[type=file]').change(function() {
		var val = $(this).val();
		switch(val.substring(val.lastIndexOf('.') + 1).toLowerCase()){
			case 'gif': case 'jpg': case 'png':
				break;
			default:
				$(this).val('');
				jAlert("Selecione um arquivo válido.", "Atenção", null);
				return false;
				break;
		}
	}).bind('change focus click', SITE.fileInputs);
	
	//text area autosize
	if($('.textAutoSize').autosize){
		$('.textAutoSize').autosize();
	}
	
	//FANCYBOX
	if($(".fancybox").fancybox){
		$(".fancybox").fancybox({
			type: 'image',
			openEffect	: 'elastic',
			closeEffect	: 'elastic',
			maxHeight	: '90%',
			loop		: false,
			helpers     : {
	            overlay : {
	                closeClick: true,
	                locked: false
	            }
	        }
		});
	}
	
	//fancybox para mp4/mp3
	$("body").on("click", ".fancyJwplayer", function(e) {
		e.preventDefault();
		var myVideo = $(this).attr('data-link');
		$.fancybox({
//			maxWidth	: 900,
//			maxHeight	: 700,
			fitToView	: false,
			width		: '100%',
			height		: '100%',
			openEffect	: 'elastic',
			closeEffect	: 'elastic',
		    content: '<div id="video_jwplayer"><div id="video_content">Carregando vídeo</div></div>', // create temp content
		    scrolling: 'no', // don't show scrolling bars in fancybox
		    helpers     : {
	            overlay : {
	                closeClick: false,
	                locked: false
	            },
	            title:  null
	        },
	        afterShow: function(){
	            jwplayer("video_content").setup({ 
	                file: myVideo,
				    image: urlContext + "/js/player.swf",
				    width: '100%',
				    heigth: '100%',
				    fallback: 'false',
				    autostart: 'true',
				    controls: 'true',
				    skin: 'stormtrooper'
	            });
	        }
		});
	});
	
	//fancybox para videos
	$('a.fancyboxYoutube').each(function() {
		var obj = $(this);
		processURL(this.href, function(thumb_url){
			if(thumb_url == '0'){
				obj.removeClass("comVideo");
				return false;
			}else{
				obj.html("");
			    $('<img src="'+thumb_url+'" />').appendTo(obj);
			}
		});
		urlVimeo(this.href, function(link){
			if(link == '0'){
				return false;
			}else{
				obj.attr("href", link);
			}
		});
	});
	if($(".fancyboxYoutube").fancybox){
		$(".fancyboxYoutube").fancybox({
			maxWidth	: 800,
			maxHeight	: 600,
			fitToView	: false,
			type		: "iframe",
			width		: '70%',
			height		: '70%',
			autoSize	: false,
			openEffect	: 'elastic',
			closeEffect	: 'elastic',
			helpers     : {
	            overlay : {
	                closeClick: false,
	                locked: false
	            },
	            title:  null
	        },
	        beforeLoad  : function(){
	        	var url= $(this.element).attr("href");
	        	if (url.indexOf('youtu.be') > -1) {
	        		url = url.replace('http://', '');
	        		url = url.split('?')[0];
	        		var v = url.split('/')[1];
	        		url = "http://www.youtube.com/v/"+v;
	                this.href = url;
	        	}else if(url.indexOf("vimeo.com") == -1){
	                var v = parseUri(url).queryKey["v"];
	                url = "http://www.youtube.com/v/"+v;
	                this.href = url;
	            }else{
	            	this.href = url;
	        	}
	        }
		});
	}
	
	if($(".fancyboxIframe").fancybox){
		$(".fancyboxIframe").fancybox({
			type: 'iframe',
			padding: 6,
			helpers     : {
	            overlay : {
	                closeClick: false,
	                locked: false
	            }
	        },
	        keys : {
	            close  : null
	        },
			closeBtn: false,
			beforeLoad : function() {
				if(this.href.indexOf("width") == -1){
					var largura = 600;
				}else{
					var largura = parseInt(this.href.match(/width=[0-9]+/i)[0].replace('width=',''));
				}
				if(this.href.indexOf("height") == -1){
					var altura = 600;
				} else{
					var altura = parseInt(this.href.match(/height=[0-9]+/i)[0].replace('height=',''));
				}
				this.width = largura;
				this.height = altura;
			}
		});
	}

	
	$(".fakeCheck").each(function(){
		fakeCheck($(this), $(this).attr("rel"));
	});
	
	//checkbox e inputs
	$("input[type='checkbox']:not('.bootstrap, .crop-destaque, .no-icheck'), input[type='radio']:not('.bootstrap, .no-icheck')").iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
        increaseArea: '20%'
    });
	
	//formata data
	$(".dataPost").each(function(){
		var obj = $(this);
		var timestamp = parseInt(obj.attr("rel"),10);
		var texto = obj.text();
		if(timeVerify(timestamp)){
			obj.timeago();
		}
		obj.attr("title", texto);
	});
	
	$(".dataMensagens").each(function(){
		var obj = $(this);
		var timestamp = parseInt(obj.attr("rel"),10);
		var texto = obj.text();
		if(timeVerify(timestamp)){
			obj.timeago();
		}
		obj.attr("title", texto);
	});
	$(".dataConversa").each(function(){
		var obj = $(this);
		var timestamp = parseInt(obj.attr("rel"),10);
		var texto = obj.text();
		if(timeVerify(timestamp)){
			obj.timeago();
		}
		obj.attr("title", texto);
	});
	
	/***INSERIR ANEXOS***/
	chamaUploader($(".multiplefileuploader"));
	$(document).on("click", ".ajax-upload-dragdrop span .icones", function(){
		$(this).closest(".ajax-upload-dragdrop").hide();
	});
	
	
	/******************************************
	 POST COMUNICADO
	*******************************************/
	$('.btPostarComunicado').click(function(e){
		e.preventDefault();
		errorUnload = false;
		var obj = $(this), form = $(this).closest('form');

		var msgErro = "", tituloErro = "Atenção", errorForm = false, erroImagem = false;

		if(PARAMS.MURAL_POST_TITULO_OBRIGATORIO_ON && PARAMS.MURAL_POST_TITULO_OBRIGATORIO_ON == 1){
			if(form.find("#titulo").val() == ""){
				msgErro += "Insira um título para sua publicação";
				errorForm = true;
			}
		}

		if(form.find("#idsFakeTags").val() != ""){
			var conteudoTags = form.find("#idsFakeTags").val();
		}

		if(form.find(".uploaderNovo .ajax-file-upload-abort:visible").length > 0){
			msgErro += "Aguarde o upload dos anexos! </br>";
			errorForm = true;
		}
		if($(".interacoesMural .anexos li").length <= 0 && jQuery.trim(form.find(".liveurl .url").text()) == ""){
			erroImagem = true;			
		}
		if(jQuery.trim(form.find("#titulo").val()) == "" && jQuery.trim(form.find("#mensagem").val()) == "" && erroImagem){
			tituloErro = "Postagem vazia.";
			msgErro += "Você precisa inserir um título, ou uma mensagem, ou um anexo para postar!</br>";
			errorForm = true;
		}
		if(jQuery.trim(form.find("#categoria").val()) == ""){
			msgErro += "Selecione alguma categoria</br>";
			errorForm = true;
		}

		if($('.radio-visibilidade:checked').hasClass('radio-grupos') && jQuery.trim(form.find("#idsGrupos").val()) == ""){
			msgErro += "Selecione algum grupo</br>";
			errorForm = true;
		}

		var tagsEmpty = false,
			tagsCount = $('body').find('.token-input-tags-user').length,
			emptyCount = 0;

		$('body').find('.token-input-tags-user').each(function(){
			if(jQuery.trim($(this).val()) == '' )
				emptyCount++;
		});

		if(emptyCount == tagsCount)
			tagsEmpty = true;

		if(PARAMS.MURAL_TAGS_USUARIO_ON == '1' && ( $('.radio-visibilidade:checked').val().toLowerCase() == 'tags' && tagsEmpty )){
			msgErro += "Selecione pelo menos uma tag/usuário";
			errorForm = true;
		}

		if (form.find("#titulo").length > 0 && form.find("#titulo").val().length > form.find("#titulo").attr("maxlength")){
			msgErro += "O título inserido ultrapassa o limite permitido</br>";
			errorForm = true;
		}
		if (form.find("#resumo").length > 0 && form.find("#resumo").val().length > form.find("#resumo").attr("maxlength")){
			msgErro += "O resumo inserido ultrapassa o limite permitido</br>";
			errorForm = true;
		}
		
		var urlVideo = "", urlSite = "", urlImagem = "", destaqueTituloURL = "";
		var arquivosIds = jQuery.trim($("#modalInsertMediaMural .inputAnexos").val()) + jQuery.trim($("#modalInsertMediaMural #copiarAnexos").val());
		
		if(arquivosIds == ""){
			arquivosIds = $(".uploaderNovo #anexosId").val();
		}
		
		var isDestaque = "";
		var isRascunho = "";
		
		if(errorForm == true){
			toastr.error(msgErro, tituloErro);
			return false;
		}
		
		if($("#isDestaque").is(":checked")){
			isDestaque = 1;
		}
		
		if($(this).hasClass("rascunho")){
			isRascunho = 1;
		}else{
			isRascunho = 0;
		}
		
		var liveUrl = form.find(".liveurl.postarLinkModal");
		if(liveUrl.find("#tipoUrl").val() != ""){
			tipo = liveUrl.find("#tipoUrl").val();
		}
		
		var tituloPost = form.find("#titulo").val();

		urlSite = liveUrl.find(".inner .url").html();
		destaqueTituloURL = form.find(".liveurl .inner .title").html();

		if(destaqueTituloURL && destaqueTituloURL.length > 250){
			destaqueTituloURL = tituloPost;
		}

		if(liveUrl.find(".image").is(":visible")){
			if(tipo == 1){
				urlVideo = liveUrl.find(".inner .url").html();
				urlImagem = liveUrl.find(".inner .image.active img").attr("src");
			}else if(tipo == 2 && liveUrl.find(".inner .url").html() != ""){
				urlImagem = liveUrl.find(".inner .url").html();
			}else if(tipo == 3){
				urlImagem = liveUrl.find(".inner .image.active img").attr("src");
			}
		}else{
			urlImagem = "";
			urlVideo = "";
		}
		
		var visibilidade = $('.radio-visibilidade').length > 0 ? parseInt($('.radio-visibilidade:checked').data('visibilidade')) : 0;

		if (visibilidade == 0) {
			var gruposIdTrim = (form.find("#idsGrupos").val()).replace(/\s+/g, '');
		}else{
			var gruposIdTrim = '';
		}

		var mensagem = form.find("#mensagem").val();
		if(mensagem == "" || mensagem == null) {
			if($('#idPost').val() != ''){
				if($('htmlPost').val() == 'true'){
					mensagem = mensagem;
				}else{
					mensagem = CKEDITOR.instances.mensagem.getData();
				}
			}else{
				if(PARAMS.MURAL_WEBVIEW_ON == '1'){
					mensagem = tinyMCE.activeEditor.getContent();
				}else{
					mensagem = CKEDITOR.instances.mensagem.getData();
				}
			}
		}

		var postID = jQuery.trim(form.find("#idPost").val());
 		
 		var tagsCadastro = "";
 		var numTags = $('.lista-tags-post').find('.campoPost').length;
 		for(var i = 0; i < numTags; i++){
 			var elm = $('.lista-tags-post').find('.campoPost')[i];
 			var idElm = $(elm).attr('data-id');
 			tagsCadastro += $('.lista-tags-post').find('#idsTagsUsuario-'+idElm).val();
 		}
 		
 		var arquivoDestaque = $('.recent-files .arquivos li.destaque').length > 0 ? $('.recent-files .arquivos li.destaque').data('arquivo-id') : $('.recent-files .arquivos li').first().data('arquivo-id'),
			embutirHtml = $('#cboxEmbutir').is(":checked") ? 1 : 0,
			paramsPost = {
				post_id: postID,
		 		user: userLogin,
		 		titulo: tituloPost,
		 		tags: jQuery.trim(conteudoTags),
		 		tagsCadastro: jQuery.trim(tagsCadastro),
		 		mensagem: mensagem,
		 		urlSite: urlSite,
		 		webview: embutirHtml,
		 		urlImagem: urlImagem,
		 		urlVideo: urlVideo,
		 		destaqueTituloUrl: destaqueTituloURL,
		 		destaqueDescricaoUrl: form.find(".liveurl .inner .description").html(),
		 		destaqueTipo: jQuery.trim(form.find("#tipoUrl").val()),
		 		grupo_ids: gruposIdTrim,
		 		arquivo_ids: arquivosIds,
		 		categoria: jQuery.trim(form.find("#categoria").val()),
		 		resumo: jQuery.trim(form.find("#resumo").val()),
		 		chapeu: jQuery.trim(form.find("#chapeu").val()),
		 		destaque: isDestaque,
		 		push: 0,
		 		twittar:0,
		 		visibilidade: visibilidade,
		 		rascunho: isRascunho,
		 		wsVersion: wsVersion,
		 		wstoken:SESSION.USER_INFO.USER_WSTOKEN,
		 		arquivo_destaque_id: arquivoDestaque
	        };
 		
 		if(PARAMS.POST_PRIORITARIO_ON == '1'){
 			if($('#postPrioritario').is(':checked')){
 				paramsPost.prioritario = 1;
 			}
 		}

 		if($("#dataPubli").length > 0 && $("#dataExp").length > 0){
			var splitDtPubli = jQuery.trim(form.find("#dataPubli").val()).split(" ");
			var splitDtExp = jQuery.trim(form.find("#dataExp").val()).split(" ");
			var dataPublicacao = splitDtPubli[0];
			var horaPublicacao = splitDtPubli[1];
			var dataExpiracao = splitDtExp[0];
			var horaExpiracao = splitDtExp[1];
			paramsPost.dataPublicacao = dataPublicacao;
			paramsPost.horaPublicacao = horaPublicacao;
			paramsPost.dataExpiracao = dataExpiracao;
			paramsPost.horaExpiracao = horaExpiracao;}

 		if($("#dataReminder").length > 0){
 			var splitDtReminder = jQuery.trim(form.find("#dataReminder").val()).split(" ");
 			var dataReminder = splitDtReminder[0];
 			var horaReminder = splitDtReminder[1];

			paramsPost.dataReminder = dataReminder;
			paramsPost.horaReminder = horaReminder;
		}

//		if(OBJ_RLT.rlt){
//            paramsPost.dataInicio = OBJ_RLT.dataInicial;
//            paramsPost.dataFim = OBJ_RLT.dataFinal;
//            paramsPost.horaInicial = OBJ_RLT.horaInicial;
//            paramsPost.horaFinal = OBJ_RLT.horaFinal;
//            paramsPost.impacto = OBJ_RLT.impacto;
//            paramsPost.ticket = OBJ_RLT.ticket;
//            paramsPost.statusId = OBJ_RLT.status;
//            paramsPost.produtoId = OBJ_RLT.produto;
//            paramsPost.subprodutoId = OBJ_RLT.subproduto;
//            paramsPost.resumoIncidente = OBJ_RLT.resumo;
//            paramsPost.rlt = OBJ_RLT.rlt;
//        }

 		if(PARAMS.PUSH_CHECK_ON){
			if($("#isPush").is(":checked")){
				if($("#isPush").attr("data-push") == "true"){
					$.alerts.okButton="Sim";
					$.alerts.cancelButton="Não";
					jConfirm("Este push já foi enviado no dia <strong>"+dateConverter($("#isPush").attr("data-data"))+"</strong>, deseja reenviar o push?", "Atenção.", null, function(r){
						if(r){
							paramsPost.push = 1;
							ajaxPost(paramsPost, form, obj);
						}else{
							$(".btPostarComunicado ").removeClass("disabled").html("Publicar");
						}
					});
					$.alerts.okButton = "Ok";
				}else{
					paramsPost.push = 1;
					ajaxPost(paramsPost, form, obj);
				}
			}else{
				paramsPost.push = 0;
				ajaxPost(paramsPost, form, obj);
			}
		}else if(PARAMS.TWITTER_ON) {
			if($("#isTwitter").is(":checked")){
				paramsPost.twittar = 1;
				ajaxPost(paramsPost, form, obj);
			}else{
				paramsPost.twittar = 0;
				ajaxPost(paramsPost, form, obj);
			}
		} else {
			paramsPost.push = 1;
			ajaxPost(paramsPost, form, obj);
		}
		
	});
	
	
	//campo de comentarios
	$(document).on("keydown", ".abreComentarios .textAutoSize", function (e) {
		var $this = $(this);
		var idText = $this.attr("id");        
        if (e.keyCode === 10 || e.keyCode  == 13 && e.ctrlKey) {            
            var el = document.getElementById(idText),
                allText = $this.val(),
                currentPos = getCaret(el),
                beforeText = allText.substr(0, currentPos),
                afterText = allText.substr(currentPos);
            
            $this.val(beforeText + '\n' + afterText).trigger('autosize.resize');
            
            setCaretPosition(el, currentPos+1);
        }
	}).on("keypress", ".abreComentarios .textAutoSize", function(e){
		var obj = $(this);
		if(e.keyCode  == 13 && ! e.ctrlKey && ! e.shiftKey){
        	e.preventDefault();
        	submitComentario(obj);
        	return false;
        }
	});
	
	//botao enviar comentario mesma ação que apertar enter.
	$(document).on("click",".enviarComentario", function(e){
		e.preventDefault();
		submitComentario($(this).closest(".textComentario").find(".textAutoSize"));
	});
	
	//botao enviar comentario EDITADO mesma ação que apertar enter.
	$(document).on("click", ".enviarComentarioEditado", function(e){
		e.preventDefault();
		submitComentario($(this).closest(".textoComentario").find(".textAutoSize.editando"));
	});
	
	if($.ui && $.ui.autocomplete){
		$.extend($.ui.autocomplete.prototype.options, {
			open: function(event, ui) {
				$(this).autocomplete("widget").css({
		            "width": ($(this).outerWidth() + "px")
		        });
		    }
		});
	}

	/* editar e excluir incidente */
	$('body').on('click', '.editar-incidente, .excluir-incidente', function(event){
		event.preventDefault();
		event.stopPropagation();
		var postId = $(this).attr('data-incidente-id');

		if($(this).hasClass('editar-incidente')){
			if(PARAMS.INTEGRACAO_POSTAR_INCIDENTE != ''){
				SESSION.USER_INFO.IS_EDITING_INCIDENTE = true;
				var fI = PARAMS.INTEGRACAO_POSTAR_INCIDENTE + '?u='+SESSION.USER_INFO.USER_ID+'&c='+PARAMS.CATEGORIA_INCIDENTES_ID+'&postId='+postId;
				$('.incidentes-wrapper').attr('src', fI);
				$('#modal-incidente-b3').modal('show');
			}
		}else{
			swal({
				type: 'warning',
				title: 'Atenção',
				text: 'Você irá deletar essa publicação. Deseja continuar?',
				type: "warning",
				showCancelButton: true,
				html: true,
				confirmButtonColor: "#D91E18",
				confirmButtonText: "Deletar",
				cancelButtonText: "Cancelar",
				closeOnConfirm: false,
				closeOnCancel: true,
				showLoaderOnConfirm: true,
			}, function(){
				jQuery.ajax({
					type: "post",
					url: urlContext+"/ws/deletar.htm?mode=json&form_name=form",
				 	dataType: "json",
				 	data: {
				 		user: userLogin,
				 		id: postId,
				 		tipo: "post",
				 		wsVersion: wsVersion,
				 		wstoken:SESSION.USER_INFO.USER_WSTOKEN
					},
					success: function(resp){
						if(resp.mensagem.status == 'OK'){
							jQuery.ajax({
								type: 'DELETE',
								url: PARAMS.INTEGRACAO_DELETAR_INCIDENTE + postId,
								data: {'_method': 'delete'},
								success: function(resp){
									$('ul.listaMural li[data-id="'+postId+'"]').slideUp(function(){
							 			$(this).remove();
							 			swal.close();
							 			toastr.success('A publicação foi excluída com sucesso');
							 		});
								}
							});
						}else{
							swal('Opss...', resp.mensagem.mensagem, 'warning');
						}
					}
				});
			})
		}
	});

	/*excluir post*/
	$(document).on( "click", ".listaMural .excluirPost", function(e) {
		e.preventDefault();
		var obj = $(this);
		swal({
			title: 'Atenção!',
			text: 'Deseja realmente excluir essa publicação?',
			type: "warning",
			showCancelButton: true,
			html: true,
			confirmButtonColor: "#D91E18",
			confirmButtonText: "Deletar",
			cancelButtonText: "Cancelar",
			closeOnConfirm: false,
			closeOnCancel: true,
			showLoaderOnConfirm: true,
		}, function(){
			jQuery.ajax({
				type: "post",
				url: urlContext+"/ws/deletar.htm?mode=json&form_name=form",
			 	dataType: "json",
			 	data: {
			 		user: userLogin,
			 		id: obj.attr("data-post"),
			 		tipo: "post",
			 		wsVersion: wsVersion,
			 		wstoken:SESSION.USER_INFO.USER_WSTOKEN
		        },
		        beforeSend: function(){
		        	obj.closest(".botaoConfig").find(".ico-config").addClass("ac_loading");
		        },
			 	success: function( data ) {
			 		if(data.mensagem.status == "OK"){
			 			obj.closest(".interacoesPost").parent().slideUp(function(){
				 			$(this).remove();
				 			swal.close();
				 			toastr.success('A publicação foi excluída com sucesso');
				 		});
			 		}else{
			 			obj.closest(".botaoConfig").find(".ico-config").removeClass("ac_loading");
			 			msgErro = "Erro ao excluir.";
			 			swal(msgErro, 'Opss...', 'warning');
			 		}
				}
			});
		});
	});
	
	$('.btn-mural-postar-comunicado').click(function(){
		$('#modal-tipo-post').modal('hide');
		__abrirPostar($('#titulo'), true);
	});

	//abre os campos para postar
	$("#titulo").click(function(event){
		event.preventDefault();
		var input = $(this);

		if(PARAMS.MURAL_POSTAR_INCIDENTE_ON == '1' && urlAtual.lastIndexOf('postComunicado') == -1 && !$('.formPost .willSlide').is(':visible')){
			$('#modal-tipo-post').modal('show');
		}else{
			if(input.hasClass("ativo") && !$(".formPost").hasClass("formPost")){
				$(".cancelarForm").click();
				return false;
			}else{
				if(input.parent().hasClass("aberto") && $(".filtrarPosts").hasClass("ativo")){
					$(".filtroPosts").slideUp(150, function(){
						$(".filtrarPosts").removeClass("ativo");
						__abrirPostar(input);
					});
				}else{
					__abrirPostar(input);
				}
			}
		}
	});

	$(".cancelarForm").click(function(e){
		e.preventDefault();
		errorUnload = false;
		var form = $(".interacoesMural"), obj = $(this);
		var placeholder_titulo = PARAMS.MURAL_PLACEHOLDER_TITULO_POST != "" ? PARAMS.MURAL_PLACEHOLDER_TITULO_POST : 'Escrever uma publicação';
		
		$('#titulo').attr("placeholder", placeholder_titulo);
		$(".formPost, .interacoesMural").removeClass("aberto");
		$("#cke_1_contents").css("border","none");
		$(".postarTexto").removeClass("ativo");
		$(".willSlide").slideUp("fast");
		$(".charNum, .limparInputs").hide();
		$("#titulo, #resumo, #dataPubli, #dataExp, #dataReminder, #anexosId, #copiarAnexos").val("");
		$(".btPostarComunicado.publicar").html("Publicar").removeClass('disabled');
		$('.postarLink.inserirLinkNovo').removeClass('disabled');
		$('#isDestaque, #postPrioritario').iCheck('uncheck');

		$('#modalInsertMediaMural').modal('hide');
		$('#modalInsertMediaMural a[href="#insertMediaUpload"]').click();

		$('.last-uploads .col-xs-2').remove();
		$('.last-uploads').addClass('empty');
		$('.recent-files .arquivos > li:not(.already-uploaded)').remove();
		
		//reestruturar datas
		$('.datas-post input#dataPubli').attr('placeholder', 'Agendar');
		$('.datas-post-slider').slideUp();
		$('.datas-post').css('padding-bottom', '');
		
		//limpar tags
		if($('.campoPost .inputHolder.post-tags input#tags').length > 0){
			$('.campoPost .inputHolder.post-tags input#tags').tokenInput("clear");
			$('.campoPost .inputHolder.post-tags input#idsFakeTags').val("");
			$('.campoPost .inputHolder.post-tags input#idsTags').val("");
		}
		
		//limpar tags de usuario
		if($('.lista-tags-post .campo-post-tags-user-hide .input').length > 0){
			var tagsUsuario = $('.lista-tags-post .campo-post-tags-user-hide .input'),
				idsTagsUsuario = $('.lista-tags-post .campo-post-tags-user-hide .input-tags-usuario'),
				tam = tagsUsuario.length;
			for(var i = 0; i < tam; i++){
				$(tagsUsuario[i]).tokenInput("clear");
				$(idsTagsUsuario[i]).val("");
			}
		}

		if(obj.hasClass("voltar")){
			history.go(-1);
		}else{
			form.find(".ajax-file-upload-statusbar").remove();
			
			$(".contentModal .listaArquivos").html("");
			$(".contentModal .paginaAtual").attr("data-page", 0);
			$(".contentModal .item").removeClass("ativo");
			$(".contentModal #output").html("");
			$(".contentModal #copiarAnexos, #url_postar_link").val("");
			if($('#tags').length > 0)
				$('#tags').tokenInput('clear');
			
			form.find('.token-input-tags-user').each(function(){
				var id = $(this).attr('id');
				$('#'+id).tokenInput('clear');
			});
			
			form.find("#titulo, #mensagem, #tags, #idsFakeTags, #idsTags, .input-tags-user").val("");
			form.find(".liveurl").hide().find(".image").empty();
			form.find(".liveurl").hide().find(".image").removeClass('active');
			form.find(".liveurl").find(".title, .description, .url").html("");
			form.find('.liveurl-info').remove();
			hideBox(true, false);

			if(PARAMS.MURAL_WEBVIEW_ON == '1' || $('#htmlPost').val() == 'true'){
				tinyMCE.activeEditor.setContent('');
			}else{
				_editor.setData("");
			}
		}
	});
	
	/*textarea liveURL*/
	var objTextUrl = $(".textUrl");
	var curImages = new Array();
	
	if(objTextUrl.length > 0){
		var tipo = "0";
		objTextUrl.liveUrl({
	        loadStart : function(){
	        	objTextUrl.parent().find(".loadingLinkUrl").show();
	        },
	        loadEnd : function(){
	        	objTextUrl.parent().find(".loadingLinkUrl").hide();
	        },
	        success : function(data) {
	            // TIPO
	            // 1-vídeo
	            // 2-imagem
	            // 3-link
	        	var expression = /([^\s]+(?=\.(jpg|gif|png|ico|jpeg|webp|svg|\|bmp|JPG|GIF|PNG|JPEG|BMP|ICO|WEBP|SVG))\.\2)/gm;
	            var expressionVideo = /([^\s]+(?=\.(mp3|mp4|avi|cam|m1v|m2v|m4v|mmv|wma|midi|wav|AAC|\|WebM|FLV|MP3|MP4|WEBM|AVI|CAM|M1V|M2V|M4V|MMV|WMA|MIDI|WAV))\.\2)/gm;
	            if(data.url.match(expression)){
	            	tipo = "2";
	            	var textoTemp = objTextUrl.val();
	            	textoTemp = textoTemp.replace($.trim(data.url), "");
	            	objTextUrl.val(textoTemp);
	            	jQuery.ajax({
						type: "post",
						url: urlContext+"/ws/uploadFile.htm?mode=json&form_name=form",
					 	dataType: "json",
					 	data: {
					 		user: userLogin,
					 		dir: 'arquivos',
					 		fileUrl: data.url,
				        	descricao: '',
				        	tipo: '1',
				        	user_id: userId,
				        	wsVersion: wsVersion,
					 		wstoken:SESSION.USER_INFO.USER_WSTOKEN
				        },
					 	success: function( data ) {
					 		if(data.mensagem){
					 			jAlert(data.mensagem.mensagem, "Atenção", null);
					 		}else{
				        		var ext = ((data.file.file).split('.').pop()).toLowerCase();
				        		var classePlayer = "";
								if(ext == "mp3" || ext == "mp4" || ext == 'mov'){
									classePlayer = "fancyJwplayer";
								}
				        		var conteudo = '<li data-id="'+data.file.id+'">'+
								            		'<a href="'+urlContext+'/ws/deletar.htm?mode=json&form_name=form&id='+data.file.id+'&tipo=arquivo" class="icones ico-remover"></a>'+
								            		'<div class="thumbnail">'+
								            			'<i class="icones ico-arquivo '+ext+'">'+ext+'</i>'+
								            		'</div>'+
								            		'<div class="nomeAnexo"><a href="'+data.file.url+'" class="'+classePlayer+'" target="_blank">'+data.file.file+'&nbsp;<span>('+(data.file.length/1024).toFixed(2)+' kb)</span></a></div>'+
								            	'</li>';
				                $(".interacoesMural .anexos").not("#outputAnexos").show().append(conteudo);
				                
				                var idsAnexos = $(".uploaderArquivos .inputAnexos").val();
				                $(".uploaderArquivos .inputAnexos").val(idsAnexos +" "+data.file.id+",");
					 		}
						}
					 });
	            }else if(data.url.match(expressionVideo)){
	            	tipo = "1";
		        }else{
	            	tipo = "3";
	            }
	            if (data.video != null) {  
	            	if (data.url.indexOf('youtube.com') > -1 || data.url.indexOf('youtu.be') > -1 || data.url.indexOf('vimeo.com') > -1) {
	            		tipo = "1";
	            	}
	                /*var ratioW        = data.video.width  /350;
	                data.video.width  = 350;
	                data.video.height = data.video.height / ratioW;
	
	                var video = 
	                '<object width="' + data.video.width  + '" height="' + data.video.height  + '">' +
	                    '<param name="movie"' +
	                          'value="' + data.video.file  + '"></param>' +
	                    '<param name="allowScriptAccess" value="always"></param>' +
	                    '<embed src="' + data.video.file  + '"' +
	                          'type="application/x-shockwave-flash"' +
	                          'allowscriptaccess="always"' +
	                          'width="' + data.video.width  + '" height="' + data.video.height  + '"></embed>' +
	                '</object>';
	                output.find('.video').html(video).show();*/
	            }
	            
	            if(tipo != 2 && tipo != 4){
	            	var output = $(".formPost #form").find('.liveurl');

	            	if(data.title) {
	            		var titulo = $("#titulo").val();
	            		if(!titulo || titulo == "") {
	            			$("#titulo").val(data.title.trim());
	            		}
	            	}

		            output.find('.title').text(data.title);
		            output.find('.description').text(data.description);
		            output.find('.url').text(data.url);
		            output.find('.image').empty();
		            output.slideDown();
	            }
	            
	            $("#tipoUrl").val(tipo);
	            
	        },
	        addImage : function(image){   
	            var output  = $(".formPost #form").find('.liveurl');
	            var jqImage = $(image);
	            jqImage.attr('alt', 'Preview');
	            
	            if ((image.width / image.height)  > 7 
	            ||  (image.height / image.width)  > 4 ) {
	                // we dont want extra large images...
	                return false;
	            } 
	
	            curImages.push(jqImage.attr('src'));
	            output.find('.image').append(jqImage);
	            
	            
	            if (curImages.length == 1) {
	                // first image...
	                
	                output.find('.thumbnail .current').text('1');
	                output.find('.thumbnail').show();
	                output.find('.image').show();
	                jqImage.addClass('active');
	                
	            }
	            
	            if (curImages.length == 2) {
	                output.find('.controls .next').removeClass('inactive');
	            }
	            
	            output.find('.thumbnail .max').text(curImages.length);
	        }
	    });
	}
	
	/**abas detalhe**/
	$(".botaoUsuario").click(function(e){
		e.preventDefault();
		var obj = $(this);
		var id=obj.attr("href");
		if(obj.hasClass("selecionado") || id == "#" || id == ""){
			return false;
		}else{
			obj.closest("div").find(".botaoUsuario").removeClass("selecionado");
			obj.addClass("selecionado");
			$(".abreAbas").slideUp(200, function(){
				$(id).slideDown(200, function(){
					$(window).scrollTop(1).scrollTop(0);
				});
			});
		}
	});
	
	
	function split( val ) {
      return val.split( /,\s*/ );
    }
    function extractLast( term ) {
      return split( term ).pop();
    }
    
	
	//FILE UPLOAD COMUNICADO
	$('.interacoesMural .fileupload input').each(function () {
		var regex = '/(\.|\/)('+PARAMS.UPLOAD_ALLOWED_EXTENSIONS+')$/i';
		var obj = $(this);
		obj.fileupload({
	        dataType: 'json',
	        acceptFileTypes: regex,
	        maxFileSize: PARAMS.UPLOAD_FILE_SIZE_MAX, // 10 MB
	        url: urlContext+'/ws/uploadFile.htm',
	        add: function (e, data) {
	        	//$(this).parent().hide().closest(".botoesComentar").find(".progress").show();
	            data.submit();
	        },
	        done: function (e, data) {
	        	if(data.result.mensagem && data.result.mensagem.status != "OK"){
	        		jAlert(data.result.mensagem.mensagem, data.result.mensagem.status, null);
	        	}else{
	        		jQuery.each(data.result, function (index, file) {
		        		var ext = ((file.file).split('.').pop()).toLowerCase();
		        		var classePlayer = "";
						if(ext == "mp3" || ext == "mp4" || ext == 'mov'){
							classePlayer = "fancyJwplayer";
						}
		        		var conteudo = '<li  data-id="'+file.id+'">'+
						            		'<a href="'+urlContext+'/ws/deletar.htm?mode=json&form_name=form&id='+file.id+'&tipo=arquivo" class="icones ico-remover"></a>'+
						            		'<div class="thumbnail">'+
						            			'<i class="icones ico-arquivo '+ext+'">'+ext+'</i>'+
						            		'</div>'+
						            		'<div class="nomeAnexo"><a href="'+file.url+'" class="'+classePlayer+'" target="_blank">'+file.file+'&nbsp;<span>('+(file.length/1024).toFixed(2)+' kb)</span></a></div>'+
						            	'</li>';
		                $(".interacoesMural .anexos").show().append(conteudo);
		            });
	        	}
	        	
	        },
	        fail: function(e, data){
				//alert(data.errorThrown+" - "+data.textStatus+" - "+data.jqXHR);
			},
			progress:function (e, data) {
			    /*var progress = parseInt(data.loaded / data.total * 100, 10);
			    if (data.loaded == data.total){
			    	alert();
			    }*/
			},
	        progressall: function (e, data) {
	        	//alert(e);
	            var progress = parseInt(data.loaded / data.total * 100, 10);
	            $(".interacoesMural .progress").show().find(".bar").css('width', progress + '%');
	            if(progress == 100){
	            	$(".interacoesMural .progress").hide();
	            }
	        }
	    }).bind('fileuploadsubmit', function (e, data) {	    	
	        data.formData = {
	        	dir: 'arquivos',
	        	descricao: '',
	        	tipo: '1',
	        	user_id: userId,
	        	post_id: obj.attr("data-postId"),
	        	comentario_id: obj.attr("data-commentId"),
	        	msg_inbox_id: obj.attr("data-msgId"),
	        	nome: obj.val().split('\\').pop(),
	        	mode: 'json',
	        	form_name: 'form'
	        };
	    });
	});
	
	
	//*Editar Comentario
	$(".listaMural").on("click", ".editarComentario", function(e){
		e.preventDefault();
		var obj = $(this);
		var prt = $(obj).parent('div.comentario');
		if(prt.find('textarea').length == 0 && !obj.hasClass('cancelar')){
			if(obj.parent(".comentario").closest("li").find(".editando").length > 0){
				return false;
			}else{
				obj.html('cancelar').addClass('cancelar');
				var linkUrl;
				obj.parent(".comentario").find("pre a").filter(function(){
					linkUrl = this.innerHTML;
					return this.innerHTML;
				}).replaceWith(linkUrl);
				var texto = obj.parent(".comentario").find("> pre").html();
				var textarea = '<textarea class="textAutoSize editando" data-usuario="'+ obj.attr("data-usuario") +'" data-post="'+ obj.attr("data-post") +'" data-comment="'+ obj.attr("data-comment") +'" style="overflow: hidden; word-wrap: break-word; resize: none; height: 40px;">'+texto+'</textarea>';
				prt.find("pre").hide().after(textarea);
				prt.closest("li").find(".textAutoSize").focus().autosize().trigger('autosize.resize');
				var idsAnexosEditar = "";
				if(prt.closest("li").find(".anexos li").length > 0){
					var listaAnexos = '';
					prt.closest("li").find(".anexos li").each(function(){
						var item = $(this);
						idsAnexosEditar += " "+item.attr("data-id")+",";
						var link = '<a href="'+urlContext+'/ws/deletar.htm?mode=json&form_name=form&id='+item.attr("data-id")+'&tipo=arquivo" class="icones ico-remover"></a>';
						item.prepend(link);
					});
				}else{
					var listaAnexos = '<ul class="anexos"></ul>';
				}


				var btAnexos = '<div class="uploaderNovo clearfix">'+
									'<input type="hidden" id="anexosId_'+obj.attr("data-comment")+'" name="anexosId_'+obj.attr("data-comment")+'" class="inputAnexos" value="'+idsAnexosEditar+'"/>'+
									'<div id="fileupload_comment_'+obj.attr("data-comment")+'" class="multiplefileuploader tooltip" data-postId="" data-commentId="'+obj.attr("data-comment")+'" data-msgId="" title="Inserir Anexo"></div>'+
								'</div>';

				obj.parent(".comentario").closest("li").find(".botaoLikeMini").after(btAnexos + listaAnexos);

				//FILE UPLOAD COMENTARIO EDITAR
				if(!isMobile() && !isIos()){
					chamaUploader(obj.closest(".comentario").find(".multiplefileuploader"));
				}
			}
		}else{
			obj.html('editar').removeClass('cancelar');
			prt.find("pre").show();
			prt.find(".enviarComentarioEditado, textarea.editando, .progress, .uploaderNovo").remove();
			if(obj.parent().find(".anexos li").length <= 0){
				prt.find(".anexos").remove();
			}else{
				prt.find(".anexos li .ico-remover").remove();
			}
			findUrls(prt.find("pre"));
		}
	});
	
	// Excluir comentario
	$(".listaMural").on("click", ".excluirComentario", function(e){
		e.preventDefault();
		var obj = $(this);
		$.alerts.okButton = "Excluir";
		$.alerts.cancelButton = "Cancelar";
		jConfirm('Deseja excluir este comentário?', 'Alerta', "deletar", function(r) {
		    if(r == true){
				jQuery.ajax({
					type: "post",
					url: obj.attr("href"),
					data:{
						user: userLogin,
						wsVersion: wsVersion,
				 		wstoken:SESSION.USER_INFO.USER_WSTOKEN
					},
				 	dataType: "json",
			        beforeSend: function(){
			        	obj.parent(".comentario").addClass("ac_loading");
			        },
				 	success: function( data ) {
				 		if(data.mensagem.status == "OK"){		 			
				 			var qtd = parseInt(obj.closest(".interacoesPost").find(".botaoComentarios > span").html());
				 			var span = obj.closest(".interacoesPost").find(".botaoComentarios > span"); 
				 			span.html(qtd-1);
					 		if(span.html() == 0){
					 			obj.closest(".interacoesPost").find(".botaoComentarios > span").hide();
					 		}
					 		obj.parent(".comentario").closest("li").remove();
					 		
				 		}else{
				 			jAlert(data.mensagem.mensagem ,"Atenção", null);
				 			obj.parent(".comentario").removeClass("ac_loading");
				 		}
					}
				 });
		    }
		    $.alerts.okButton = "Ok";
		});
	});
	
	//Cancela comentario
	$(document).on("keyup", "ul.listaComentarios li .comentario textarea.editando", function(event){
		var obj = $(this);
		if(event.keyCode == 27){
			obj.parent().find("pre").show();
			obj.parent().find(".enviarComentarioEditado").remove();
			obj.parent().find(".progress").remove();
			obj.parent().find(".uploaderNovo").remove();
			if(obj.parent().find(".anexos li").length <= 0){
				obj.parent().find(".anexos").remove();
			}else{
				obj.parent().find(".anexos li .ico-remover").remove();
			}
			findUrls(obj.parent().find("pre"));
			obj.remove();
			$('.inline-link.editarComentario').html('editar').removeClass('cancelar');
        	event.preventDefault();
        	return false;
        }
	});

	$(document).on('keyup', 'ul.listaComentarios li .comentario > textarea', function(event){
		var textarea = $(this);
		if(event.keyCode == 27){
			textarea.parent().find('.uploaderNovo .new-attachments .ajax-file-upload-statusbar').remove();
			textarea.parent().find('.uploaderNovo .new-attachments .ajax-file-upload-more').hide();
			textarea.parent().find('.uploaderNovo .new-attachments input.inputAnexos').val('');
			textarea.val('');
			event.preventDefault();
			return false;
		}
	})

	//mostra texto do mural
	$(".listaMural").on("click", ".verMaisPost", function(e){
		e.preventDefault();
		var pai = $(this).closest("li"),
			postId = pai.data('id');
		
		if($(this).hasClass("abreDescricao")){
			if(pai.find(".semResumo").is(":visible")){
				$(this).removeClass("minimizar").html('<i class="icones ico-mais"></i>ver mais');
				pai.find(".semResumo").slideUp(function(){
					pai.find(".resumoPost").removeClass("aberto");
				});
			}else{
				$(this).addClass("minimizar").html('<i class="icones ico-menos"></i>minimizar');
				pai.find(".semResumo").slideDown();
				pai.find(".resumoPost").addClass("aberto");
			}
		}else{
			var maxHeight = 170;
			var altura = pai.find(".mensagemPost").outerHeight();
			if(pai.find(".degrade").is(":visible")){
				$(this).addClass("minimizar").html('<i class="icones ico-menos"></i>minimizar');
				pai.find(".alturaMensagem").css({"height":maxHeight, "max-height":"none"}).animate({"height":altura}, function(){
					pai.find(".alturaMensagem").css({"height":"auto"});
				});
				pai.find(".degrade").hide();
				
				markPostAsRead({ user: SESSION.USER_INFO.USER_ID, post: postId });
			}else{
				$(this).removeClass("minimizar").html('<i class="icones ico-mais"></i>ver mais');
				pai.find(".alturaMensagem").animate({"height":maxHeight}, function(){
					$(this).css({"height":"auto", "max-height":maxHeight});
					pai.find(".degrade").show();
				});
			}
		}
	});
	
	
	//abre os comentarios
	$(".listaMural").on("click", ".botaoComentarios", function(e){
		e.preventDefault();
		var requestAjax,
			obj = $(this);
		if(obj.closest(".interacoesPost").find("div.abreComentarios").is(":visible")){
			obj.children("i").removeClass("ativo");
    		obj.removeClass("ativo");
    		if(requestAjax && requestAjax.state() == "pending"){
    			requestAjax.abort();
            }
    		obj.closest(".interacoesPost").find("div.abreComentarios").slideUp(function(){
    			if(parseInt(obj.find(">span").html()) <= 0){
    				obj.closest(".interacoesPost").find(".listaComentarios:first").html('');
    			}else{
    				obj.closest(".interacoesPost").find(".listaComentarios:first").html('<li class="loading"></li>');
    			}
    		});
		}else{
			obj.addClass("ativo");
			obj.children("i").addClass("ativo");
			if(parseInt(obj.find(">span").html()) <= 0){
				obj.closest(".interacoesPost").find(".listaComentarios:first").html('');
			}
			if(urlAtual.indexOf('post.htm?id=') > -1){
				carregarComentarios(20, 0, userId, obj.attr("data-post"), obj);
			}else{
				carregarComentarios(5, 0, userId, obj.attr("data-post"), obj);
			}
		}

		$(this).closest('li[data-id="'+$(this).data('post')+'"]').find('.ajax-file-upload-more').hide();
	});
	
	$("body").on("click", ".btVerComentarios", function(e){
		e.preventDefault();
		var obj = $(this);
		obj.addClass("ac_loading");
		if(urlAtual.indexOf('post.htm?id=') > -1){
			carregarComentarios(20, obj.attr("data-page"), userId, obj.attr("data-post"), obj);
		}else{
			carregarComentarios(5, obj.attr("data-page"), userId, obj.attr("data-post"), obj);
		}
	});
	
	//favoritar
	
		
	$(".listaMural").on("click", ".botaoFavoritoMural", function(e){
		e.preventDefault();		
		var obj = $(this);
		if(obj.hasClass("enviando")){
			return false;
		}else{
			obj.addClass("enviando");
			jQuery.ajax({
				type: "post",
				url: urlContext+"/ws/favorito.htm?mode=json&form_name=form",
			 	dataType: "json",
			 	data: {
			 		user: userLogin,
			 		user_id: obj.attr("data-usuario"),
		            post_id: obj.attr("data-post"),
		            favorito: obj.attr("data-favorito"),
		            wsVersion: wsVersion,
			 		wstoken:SESSION.USER_INFO.USER_WSTOKEN
		        },
		        beforeSend: function(){
		        	if(obj.attr("data-favorito") == 1){
		     			obj.attr("data-favorito","0").find(">i").addClass("favoritado");
		     			$("#tooltip").html("Remover Favorito");
		     		}else{
		     			obj.attr("data-favorito","1").find(">i").removeClass("favoritado");
		     			$("#tooltip").html("Favoritar");
		     		}
		        },
			 	success: function( data ) {
			 		if(data.favorito.favorito == 0){
			 			var valor = 1;
			 			if(jQuery.trim(urlAtual) == "favoritos.htm"){
		     				obj.closest("#postId-"+obj.attr("data-post")).slideUp(function(){
		     					$(this).remove()
		     				});
		     			}
			 		}else{
			 			var valor = 0;
			 		}
			 		obj.attr("data-favorito", valor);
			 		obj.removeClass("enviando");
			 		updateNotifications();
				}
			 });	
		}
	});
	

	/**** filtro *******/
	//AbreFiltro
	$(".linkFiltro").click(function(e){
		e.preventDefault();
		if($(this).hasClass("icone ico-remover")){
			e.stopPropagation();
			$(this).removeClass("icone ico-remover").parent().removeClass("aberto").parent().find(".abreFiltros").slideUp();
			$(this).closest(".filtroPosts").find(".textoFiltro").html($(".textoFiltro").attr("rel"));
			$(this).closest(".filtroPosts").find("input[type='text']").val("").blur();
			$(this).closest(".filtroPosts").find(".fakeCheck").each(function(){
				var obj = $(this);
				if(obj.find("input").val() == 1){
					obj.click();
				}
			});
			$(this).closest(".filtroPosts").find(".selectFake").each(function(){
				var obj = $(this);
				clearFakeSelect(obj);
			});
			$(this).closest(".filtroPosts").find(".abreDatasFiltro").slideUp();
			
		}
	});

	$(".fundo-busca .icones.dropdown").click(function(e){
		e.preventDefault();
		var obj = $(this);
		$(".fundo-busca input#busca").focus();

		function abreFiltro(){
			obj.addClass("ativo");
			obj.next(".filtroPosts").stop().slideDown(150, function(){
				//placeholder(".campoPost .placeholder", "#c5c5c5");
			});
			$("#filtroData, #filtroCategoria_id").width("").trigger('render');
		}

		if(obj.hasClass("ativo")){
			obj.next(".filtroPosts").stop().slideUp(150, function(){
				obj.removeClass("ativo");
				$(".interacoesMural").removeClass("aberto");
			});
		}else{
			if(obj.parent().hasClass("aberto") && $(".postarTexto").hasClass("ativo")){
				$(".formPost").slideUp(150, function(){
					$(".postarTexto").removeClass("ativo");
					abreFiltro();
				});
			}else{
				abreFiltro();
			}
		}
	});
	
	$(".btCancelarFiltro").click(function(e){
		e.preventDefault();
		$(".filtroPosts").slideUp(150);
	});
	
	if($("#filtroNome").length > 0){
		
		var idUserFiltroURL = getURLParameter("user_post_id");
		var arrayUserFiltroHeader = [];
		if(idUserFiltroURL && PARAMS.FILTER_NAME_SIDEBOX){
			arrayUserFiltroHeader.push({
				id: idUserFiltroURL,
				nome: PARAMS.FILTER_NAME_SIDEBOX
			});

			$('#filtroUser_post_id').val(idUserFiltroURL);
		}

		jsHttp.filtroTokenInput("#filtroNome",urlContext+"/ws/usuariosAutoComplete.htm?mode=json&form_name=form&wsVersion="+wsVersion+"&wstoken="+SESSION.USER_INFO.USER_WSTOKEN, {
			method: 'POST',
			jsonContainer: 'list',
			queryParam: 'q',
			propertyToSearch: "nome",
			tokenLimit: 1,
			placeholder: i18n('mural.filtro.autor.placeholder'),
			preventDuplicates: true,
			onAdd: function(item) {
				$("#filtroUser_post_id").val(item.id);
			},
	        onDelete: function (item) {
	        	$("#filtroUser_post_id").val("");	
	        },
	        prePopulate: arrayUserFiltroHeader
		});
	}
	
	$(document).on("click", ".mascaraLabel", function(){
		if($(this).parent().find(".token-input-list").length > 0){
			$(this).parent().find("ul input").focus();
		}
	});
	$(document).on("focus", ".token-input-list input", function(){
		$(this).closest(".inputHolder").find(".mascaraLabel").hide();
	}).on("blur", ".token-input-list input", function(){
		if($(this).closest(".inputHolder").find(".token-input-token").length <= 0){
			$(this).closest(".inputHolder").find(".mascaraLabel").show();
		}
	});
	
	if($('#filtroCategoria_id').length > 0){
		var idCategFiltroURL = getURLParameter("categoria");
		if(idCategFiltroURL){
			$('#filtroCategoria_id option[value="'+idCategFiltroURL+'"]').attr('selected','selected');
			$('#filtroCategoria_id').change();
		}
	}


	if($("#filtroTags").length > 0){
    	function getTagsURL(){
    		return urlContext+"/ws/tags.htm?mode=json&form_name=form&not_tag_ids="+$("#idsFakeTagsFiltro").val()+"&wsVersion="+wsVersion+"&wstoken="+SESSION.USER_INFO.USER_WSTOKEN;
    	}

    	var idTagFiltroURL = getURLParameter("tag");
    	var arrayTagFiltroHeader = [];
    	if(idTagFiltroURL && PARAMS.FILTER_NAME_SIDEBOX){
    		arrayTagFiltroHeader.push({
    			id: idTagFiltroURL,
    			nome: PARAMS.FILTER_NAME_SIDEBOX
    		});

    		$('#idsTagsFiltro, #idsFakeTagsFiltro').val(idTagFiltroURL);
    	}

    	$("#filtroTags").tokenInput(getTagsURL, {
    		method: "POST",
    		jsonContainer : "list",
    		queryParam: "nome",
    		hintText: "Comece a digitar para buscar.",
            noResultsText: "Nenhum item encontrado",
            searchingText: "Carregando...",
            placeholder: i18n('mural.filtro.contem.tags.placeholder'),
            preventDuplicates: true,
            minChars: 0,
            propertyToSearch: "nome",
            onAdd: function (item) {
            	var ids = $("#idsTagsFiltro").val();
				$("#idsTagsFiltro").val(ids+" "+item.nome+",");
				var idsFake = $("#idsFakeTagsFiltro").val();
				$("#idsFakeTagsFiltro").val(idsFake+" "+item.id+",");
            },
            onDelete: function (item) {
            	var idRemove = " "+item.nome+",";
        	 	var ids = $("#idsTagsFiltro").val();
        	 	ids = ids.replace(idRemove,"");
        		$("#idsTagsFiltro").val(ids);
        		
        		var idRemoveFake = " "+item.id+",";
        	 	var idsFake = $("#idsFakeTagsFiltro").val();
        	 	idsFake = idsFake.replace(idRemoveFake,"");
        		$("#idsFakeTagsFiltro").val(idsFake);
            },
            prePopulate: arrayTagFiltroHeader
        });
	}
	
	if($("#filtroTagsUser").length > 0){
    	function getTagsUserURL(){
    		return urlContext+"/rest/v1/tag/find?notIn="+$("#idsFakeTagsUserFiltro").val()+"&wsVersion="+wsVersion+"&wstoken="+SESSION.USER_INFO.USER_WSTOKEN;
    	}

    	var idTagUserFiltroURL = getURLParameter("tagUser");
    	var arrayTagUserFiltroHeader = [];
    	if(idTagUserFiltroURL && PARAMS.FILTER_NAME_SIDEBOX){
    		arrayTagUserFiltroHeader.push({
    			id: idTagUserFiltroURL,
    			nome: PARAMS.FILTER_NAME_SIDEBOX
    		});

    		$('#idsTagsUserFiltro, #idsFakeTagsUserFiltro').val(idTagFiltroURL);
    	}

    	$("#filtroTagsUser").tokenInput(getTagsUserURL, {
    		method: "GET",
    		jsonContainer : null,
    		queryParam: "search",
    		hintText: "Comece a digitar para buscar.",
            noResultsText: "Nenhum item encontrado",
            searchingText: "Carregando...",
            placeholder: i18n('mural.filtro.contem.tags.usuario.placeholder'),
            preventDuplicates: true,
            minChars: 0,
            propertyToSearch: "nome",
            onAdd: function (item) {
            	var ids = $("#idsTagsUserFiltro").val();
				$("#idsTagsUserFiltro").val(ids+" "+item.nome+",");
				var idsFake = $("#idsFakeTagsUserFiltro").val();
				$("#idsFakeTagsUserFiltro").val(idsFake+" "+item.id+",");
            },
            onDelete: function (item) {
            	var idRemove = " "+item.nome+",";
        	 	var ids = $("#idsTagsUserFiltro").val();
        	 	ids = ids.replace(idRemove,"");
        		$("#idsTagsUserFiltro").val(ids);
        		
        		var idRemoveFake = " "+item.id+",";
        	 	var idsFake = $("#idsFakeTagsUserFiltro").val();
        	 	idsFake = idsFake.replace(idRemoveFake,"");
        		$("#idsFakeTagsUserFiltro").val(idsFake);
            },
            prePopulate: arrayTagUserFiltroHeader
        });
	}
	
	//APAGA O CHAPEU QUANDO MUDA A CATEGORIA NO FILTRO
	$(".filtroPosts #filtroCategoria_id").change(function(e){
		if($(".filtroPosts #filtroChapeuFake").length > 0){
			$(".filtroPosts #filtroChapeuFake").tokenInput("clear");
			$(".filtroPosts #filtroChapeuFake").parent().find(".mascaraLabel").show();
		}
	});
	
	//BUSCA O CHAPEU
	if($("#filtroChapeuFake").length > 0){
    	function getChapeusURL(){
    		return urlContext+"/ws/chapeus.htm?mode=json&form_name=form&categoria_id="+$("#filtroCategoria_id").val()+"&wsVersion="+wsVersion+"&wstoken="+SESSION.USER_INFO.USER_WSTOKEN;
    	}
    	$("#filtroChapeuFake").tokenInput(getChapeusURL, {
    		method: "POST",
    		jsonContainer : "list",
    		queryParam: "nome",
    		hintText: "Comece a digitar para buscar.",
            noResultsText: "Nenhum item encontrado para esta Categoria",
            searchingText: "Carregando...",
            placeholder: 'Contém o chapéu',
            preventDuplicates: true,
            minChars: 0,
            tokenLimit: 1,
            propertyToSearch: "nome",
            onAdd: function (item) {
				$("#filtroChapeu").val(item.id);
            },
            onDelete: function (item) {
            	$("#filtroChapeu").val("");
            	
            }
        });
	}
   
	//Select data Filtro
	$("#filtroData").change(function(e){
		var today = new Date();
		var dd = ("0" + today.getDate()).slice(-2);
		var mm = ("0" + (today.getMonth() + 1)).slice(-2);
		var yyyy = today.getFullYear();
		today = dd+"/"+mm+"/"+yyyy;

		var yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		var ydd = ("0" + yesterday.getDate()).slice(-2);
		var ymm = ("0" + (yesterday.getMonth() + 1)).slice(-2);
		var yyyyy = yesterday.getFullYear();
		yesterday = ydd+"/"+ymm+"/"+yyyyy;
		
		var lastWeek = new Date();
		lastWeek.setDate(lastWeek.getDate() - 7);
		var ldd = ("0" + lastWeek.getDate()).slice(-2);
		var lmm = ("0" + (lastWeek.getMonth() + 1)).slice(-2);
		var lyyyy = lastWeek.getFullYear();
		lastWeek = ldd+"/"+lmm+"/"+lyyyy;
		
		var mdd = "01";
		var mmm = ("0" + (mm-1)).slice(-2);
		var myyyy = yyyy;
		if(mmm == "00"){
			myyyy == myyyy-1;
			mmm == "12";
		}
		var lastMonth = mdd+"/"+mmm+"/"+myyyy;
		var dateLastMonth = new Date(myyyy, mmm, 0);
		var dayLastMonth = ("0" + dateLastMonth.getDate()).slice(-2);
		var LastMonthTo = dayLastMonth+"/"+mmm+"/"+myyyy;
		
		var thisMonth = "01/"+mm+"/"+yyyy;
		
		var item = $(this);
		if(item.val() != 5){
			$(".abreDatasFiltro").slideUp();
		}
		$(".abreDatasFiltro #filtroDataFinal").val(today).blur();
		if(item.val() == ""){
			$(".abreDatasFiltro #filtroDataInicial").val("").blur();
			$(".abreDatasFiltro #filtroDataFinal").val("").blur();
		}else if(item.val() == 1){
			$(".abreDatasFiltro #filtroDataInicial").val(today).blur();
		}else if(item.val() == 6){
			$(".abreDatasFiltro #filtroDataInicial").val(thisMonth).blur();
		}else if(item.val() == 2){
			$(".abreDatasFiltro #filtroDataInicial").val(yesterday).blur();
			$(".abreDatasFiltro #filtroDataFinal").val(yesterday).focus().select().blur();
		}else if(item.val() == 3){
			$(".abreDatasFiltro #filtroDataInicial").val(lastWeek).blur();
		}else if(item.val() == 4){
			$(".abreDatasFiltro #filtroDataInicial").val(lastMonth).blur();
			$(".abreDatasFiltro #filtroDataFinal").val(LastMonthTo).blur();
		}else if(item.val() == 5){
			$(".abreDatasFiltro").slideDown(200, function(){
				//placeholder(".campoPost .placeholder", "#c5c5c5");
				$(".abreDatasFiltro #filtroDataInicial").val("").focus();
				$(".abreDatasFiltro #filtroDataFinal").val("").blur();
			});
			
		}
	});
	
	//GRUPOS DO FILTRO
	function getGruposFiltroURL(){
		return urlContext+"/ws/gruposAutoComplete.htm?mode=json&form_name=form&not_grupo_ids="+$("#filtroGrupoIds").val()+"&user_id="+userId+"&wsVersion="+wsVersion+"&wstoken="+SESSION.USER_INFO.USER_WSTOKEN;
	}
	var idGrupoFiltroURL = getURLParameter("grupo");
	var arrayGruposFiltroHeader = [];
	if(idGrupoFiltroURL && PARAMS.FILTER_NAME_SIDEBOX){
		arrayGruposFiltroHeader.push({
			id: idGrupoFiltroURL,
			nome: PARAMS.FILTER_NAME_SIDEBOX
		});

		$('#filtroGrupoIds').val(idGrupoFiltroURL);
	}

	if($("#filtroGrupo").tokenInput){
		$("#filtroGrupo").tokenInput(getGruposFiltroURL, {
			method: "POST",
			jsonContainer : "list",
			queryParam: "q",
			hintText: "Comece a digitar para buscar.",
	        noResultsText: "Nenhum item encontrado",
	        searchingText: "Carregando...",
	        placeholder: i18n('mural.filtro.grupo.postagem.placeholder'),
	        preventDuplicates: true,
	        propertyToSearch: "nome",
	        onAdd: function (item) {
	        	var filtroGruposIds = $("#filtroGrupoIds").val();
	        	filtroGruposIds += " "+item.id+",";
		 		$("#filtroGrupoIds").val(filtroGruposIds);
	        },
	        onDelete: function (item) {
	        	var filtroGruposIds = $("#filtroGrupoIds").val();
	        	filtroGruposIds = filtroGruposIds.replace(" "+item.id+",", "");
		 		$("#filtroGrupoIds").val(filtroGruposIds);
	        },
	        prePopulate: arrayGruposFiltroHeader
	    });
	}
	
	
	$(document).on("click", ".filtroFiltrar", function(e) {
		$('#contentcolumn > .paginaAtual').attr('data-page', -1);
		var obj = $(this);
		var formFiltro = $(".filtroPosts");
		if(jQuery.trim(urlAtual) == "meusPosts.htm"){
			var postsDe = userId;
			var soFavoritos = "";
		}else if(jQuery.trim(urlAtual) == "favoritos.htm"){
			var postsDe = formFiltro.find("#filtroUser_post_id").val();
			var soFavoritos = "1";
		}else{
			var postsDe = formFiltro.find("#filtroUser_post_id").val();
			var soFavoritos = "";
		}
		
		if(formFiltro.find("#filtroAnexo").is(":checked")){
			var temAnexo = 1;
		}else{
			var temAnexo = 0;
		}
		if(formFiltro.find("#filtroDestaque").is(":checked")){
			var isDestaque = 1;
		}else{
			var isDestaque = 0;
		}
		
		var filtro = {
			user: userLogin,
	 		user_id: userId,
	 		texto: formFiltro.find("#filtroTexto").val(),
	 		user_post_id: postsDe,
	 		grupo_ids: jQuery.trim($("#filtroGrupoIds").val()),
	 		meusFavoritos: soFavoritos,
	 		conteudo: $('#filtroConteudo').val(),
	 		categoria_id: formFiltro.find("#filtroCategoria_id").val(),
	 		tags: formFiltro.find("#idsFakeTagsFiltro").val(),
	 		tagsCadastro: formFiltro.find('#idsFakeTagsUserFiltro').val(),
	 		dataInicial: formFiltro.find("#filtroDataInicial").val(),
	 		dataFinal: formFiltro.find("#filtroDataFinal").val(),
	 		comAnexo: temAnexo,
	 		destaque: isDestaque,
	 		buscaUsuarios: 0,
	 		buscaGrupos: 0,
	 		buscaPosts: 1,
	 		chapeu_id:formFiltro.find("#filtroChapeu").val(),
	 		maxRows: 10,
	 		buscaResumida: 0,
	 		wsVersion: wsVersion,
	 		wstoken:SESSION.USER_INFO.USER_WSTOKEN,
	 		page: 0
		}
		
		jQuery.ajax({
			type: "post",
			url: urlContext+"/ws/buscaPostsUsuarios.htm?mode=json&form_name=form",
		 	dataType: "json",
		 	data: filtro,
	        beforeSend: function(){
	        	obj.attr("disabled", "disabled");
	        	formFiltro.find(".abreFiltros").slideUp();
	        	formFiltro.find(".clicaFiltro ").removeClass("aberto").find(".linkFiltro").removeClass("icone ico-remover");
	        	$(".listaMural").html("");
	        },
		 	success: function(data) {
		 		$('.paginaAtual').attr('data-page', -1);
		 		obj.removeAttr("disabled");
		 		formFiltro.slideUp(150);
		 		$(".filtrarPosts").click();
		 		$(".icones.dropdown").removeClass("ativo");
		 		exibeBuscaPost(data, null, "buscaAdv", filtro);
		 		$(".paginaAtual").removeClass("loading").attr("data-page", parseInt($(".paginaAtual").attr("data-page"))+1);
			}
		 });
	});
	
	
	//like do post
	$(document).on("click", ".botaoLike, .botaoLikeMini", function(e){
		e.preventDefault();	
		e.stopPropagation();
		var obj = $(this);
		if(obj.hasClass("enviando")){
			return false;
		}else{
			obj.addClass("enviando").tooltip('destroy');
			jQuery.ajax({
				type: "post",
				url: urlContext+"/ws/like.htm?mode=json&form_name=form",
			 	dataType: "json",
			 	data: {
			 		user: userLogin,
			 		user_id: obj.attr("data-usuario"),
		            post_id: obj.attr("data-post"),
		            comentario_id: obj.attr("data-comentario"),
		            favorito: obj.attr("data-favorito"),
		            wsVersion: wsVersion,
			 		wstoken:SESSION.USER_INFO.USER_WSTOKEN
		        },
		        beforeSend: function(){
		        	$("body").find(".popMenu.popMenu-likes").remove();

		        	var qtd = parseInt(obj.find(">span").html());
		        	if(obj.find(">i").hasClass("active")){
		        		obj.removeClass("used").attr("title","Curtir");
		        		obj.find(">i").removeClass("active");
		    			$("#tooltip").html("Curtir");
		    			obj.find(">span").html(qtd-1);
		    			if(parseInt(obj.find(">span").html()) == 0){
		    				obj.find(">span").hide();
				 		}
		    		}else{
		    			obj.addClass("used").attr("title","Curtir (Desfazer)");
		    			obj.find(">i").addClass("active");
		    			$("#tooltip").html("Curtir (Desfazer)");
		    			obj.find(">span").show().html(qtd+1);
		    		}
		        },
			 	success: function( data ) {
			 		var conteudo = "";
			 		var qtd = parseInt(obj.find(">span").html());
			 		if(data.like.favorito == 0){
			 			var valor = 1;
			 			if(qtd < 1){
			 				obj.find(".popMenu").remove();
			 			}else{
			 				obj.find("ul #userId-"+data.like.userId).remove();
			 			}
			 		}else{
			 			var valor = 0;
			 			if(qtd >= 1){
			 				obj.find('ul li#userid-'+data.like.userId).remove();
				 			conteudo += '<li id="userId-'+data.like.userId+'"><a href="'+urlContext+'/usuario.htm?id='+data.like.userId+'">'+
				 						'<div class="fotoUsuario mini"><div class="centraliza"><img src="'+data.like.urlFotoUsuario+'" alt="Foto do '+data.like.userNome+'" /></div></div>'+data.like.userNome+'</a></li>';
				 			obj.find("ul").append(conteudo);
			 			}else{
			 				conteudo += '<div class="popMenu top popMenu-likes"><div class="overflowPop overflowLikes"><ul>'+
						 				'<li id="userId-'+data.like.userId+'"><a href="'+urlContext+'/usuario.htm?id='+data.like.userId+'">'+
										'<div class="fotoUsuario mini"><div class="centraliza"><img src="'+data.like.urlFotoUsuario+'" alt="Foto do '+data.like.userNome+'" /></div></div>'+data.like.userNome+'</a></li>';
			 				obj.append(conteudo);
			 			}
			 		}
			 		obj.attr("data-favorito", valor).removeClass("enviando");
			 		obj.find("li").removeClass("primeiro").removeClass("ultimo");
			 		obj.find("ul>li:first").addClass("primeiro");
					obj.find("ul>li:last").addClass("ultimo");
					obj.tooltip({ html: true, placement: 'bottom' });

					updateNotifications();
				}
			 });	
		}
	});
	$(document).on("mouseenter", ".botaoLike, .botaoLikeMini", function(){
		var obj = $(this);
		if(obj.find(">span").is(":visible") && !obj.find(">i").hasClass("ac_loading")){
			jQuery.ajax({
				type: "post",
				url: urlContext+"/ws/buscaQuemCurtiu.htm?mode=json&form_name=form",
			 	dataType: "json",
			 	data: {
			 		user: userLogin,
		            post_id: obj.attr("data-post"),
		            comentario_id: obj.attr("data-comentario"),
		            wsVersion: wsVersion,
			 		wstoken:SESSION.USER_INFO.USER_WSTOKEN
		        },
		        beforeSend: function(){
		        	obj.find(">i").addClass("ac_loading");
		        },
			 	success: function( data ) {
			 		if(data.list && data.list.length > 0){
			 			var conteudo = '<div class="popMenu top popMenu-likes"><div class="overflowPop overflowLikes"><ul>';
			 			for (var l=0; l < data.list.length;l++){ 
			 				conteudo += '<li id="userId-'+data.list[l].userId+'"><a href="'+urlContext+'/usuario.htm?id='+data.list[l].userId+'">'+
			 							'<div class="fotoUsuario mini"><div class="centraliza"><img src="'+data.list[l].urlFotoUsuario+'" alt="Foto do '+data.list[l].userNome+'" /></div></div>'+data.list[l].userNome+'</a></li>';
			 			}
			 			conteudo += '</ul></div></div>';

			 			var dll = data.list.length;
			 			var sl = obj.children('span');
			 			var st = sl.html();
			 			if(dll > st){
			 				sl.html(dll);
			 			}
			 		}else{
			 			var conteudo = "";
			 		}
			 		obj.append(conteudo).find(">i").removeClass("ac_loading");
			 		obj.find("li").removeClass("primeiro").removeClass("ultimo")
			 		obj.find("ul > li:first").addClass("primeiro");
					obj.find("ul > li:last").addClass("ultimo");
				}
			});
		}
	}).on("mouseleave", ".botaoLike, .botaoLikeMini", function(){
		var obj = $(this);
		obj.find(">i").removeClass("ac_loading");
		obj.find(".popMenu").remove();
		$("body").find(".popMenu.popMenu-likes").remove();
	});
	$(document).on("click", ".botaoLike ul li a, .botaoLikeMini ul li a", function(e){
		e.preventDefault();
		e.stopPropagation();
		location.href = $(this).attr("href");
	});
	
	//abre modal de fotos quando tem mais que 3
	$(document).on("click", ".linkFancyFotos", function(e){
		e.preventDefault();		
		var obj = $(this);	
		obj.closest("ul").find("li.first > div > a").trigger("click");
	});
	
	$("body").on( "click",".ajax-file-upload-statusbar-erro",function(e){
		e.preventDefault();
		$(this).remove();
	});
	

	//Adicionar Descriçao do arquivo
	$(document).on("click", ".adicionarDescricao", function(e){
		e.preventDefault();
		var obj = $(this);
		if(obj.hasClass("descricaoInfo")){
			var idArquivo = obj.attr("data-id");
		}else{
			var idArquivo = obj.closest(".alterarNome").attr("data-id");
		}
		var descricaoAtual = "";
		if(obj.closest(".alterarNome").find(".descricaoUpload").length > 0){
			descricaoAtual = obj.closest(".alterarNome").find(".descricaoUpload").html();
			//descricaoAtual = descricaoAtual.substring(1, (descricaoAtual.length - 1));
		}
		jPrompt('Digite a descrição do arquivo.<span class="charNum countDescricao"></span>', descricaoAtual, 'Descrição do Arquivo', null, function(descricao) {
		    if( descricao ){
		    	if(descricao.length > PARAMS.QTD_DESCRICAO_ARQUIVO){
		    		jAlert("O resumo inserido ultrapassa o limite permitido.", "Atenção", null);
		    	}else{
		    		jQuery.ajax({
						type: "post",
						url: urlContext+"/ws/updateFile.htm?mode=json&form_name=form",
					 	dataType: "json",
					 	data:{
					 		id: idArquivo,
					 		user_id: userId,
					 		descricao: descricao,
					 		wsVersion: wsVersion,
					 		wstoken:SESSION.USER_INFO.USER_WSTOKEN
					 	},
				        beforeSend: function(){
			        		
				        },
					 	success: function(data) {
					 		if(data.mensagem && data.mensagem.status == "OK"){
					 			if(obj.hasClass("descricaoInfo")){
					 				obj.closest(".infoArquivoUpload").find(".descricaoInfoArquivo").html(descricao);
					 			}else{
					 				if(obj.closest(".alterarNome").find(".descricaoUpload").length > 0){
						 				obj.closest(".alterarNome").find(".descricaoUpload").html(descricao);
						 			}else{
						 				obj.closest(".alterarNome").find(".adicionarDescricao").before('<span class="descricaoUpload">'+descricao+'</span>');
						 			}
					 			}
					 			$("#modalInsertMediaMural .listaArquivos .item[data-id='"+idArquivo+"'], .recent-files .arquivos li[data-arquivo-id='"+idArquivo+"']").attr("data-descricao", descricao);
				 				$("#output .ajax-file-upload-statusbar[data-id='"+idArquivo+"']").attr("data-descricao", descricao).find(".ajax-file-upload-filename .adicionarDescricao").before('<span class="descricaoUpload"> '+descricao+' </span>');

				 				if(PARAMS.MURAL_UPLOAD_CROP_ON == '1'){
				 					$('body').find('p.crop-img-description[data-file-id="'+idArquivo+'"]').text(descricao);
				 				}
					 			
					 			return;
					 		}else if(data.mensagem){
					 			jAlert(data.mensagem.mensagem, data.mensagem.status, null);
					 		}
						}
					});
		    	}
		    	
		    }
		});
		countChar(jQuery("#popup_container #popup_prompt"), "#popup_container .charNum.countDescricao", PARAMS.QTD_DESCRICAO_ARQUIVO);
	});
	
	$(document).on("click", ".carregarMensagensAnteriores", function(e){
		e.preventDefault();
		var obj = $(this);
		if(obj.hasClass("ac_loading")){
			return false;
		}else{
			obj.addClass("ac_loading");
			buscaConversaChat(obj.attr("data-conversa"), obj.attr("data-page"), obj.closest("ul"));
		}
		
	});
	
	//remover arquivo anexado
	$("body").on("click", ".anexos .ico-remover:not(.remove-cropped-file)", function(e){
		e.preventDefault();
		e.stopPropagation();
		var obj = $(this);
		var idAnexo = getLinkParameter("id",obj.attr("href"));
		var tipoAnexo = getLinkParameter("tipo",obj.attr("href"));
		var idsAnexos;
		
		if(obj.closest("ul").hasClass("anexosAntigo")){
			idsAnexos = $(".uploaderArquivos .inputAnexos").val();
			idsAnexos = idsAnexos.replace(" "+idAnexo+",","");
			$(".uploaderArquivos .inputAnexos").val(idsAnexos);
		}else if(obj.closest("ul").parent().hasClass("comentario")){
			idsAnexos = obj.closest(".comentario").find(".inputAnexos").val();
			idsAnexos = idsAnexos.replace(" "+idAnexo+",","");
			obj.closest(".comentario").find(".inputAnexos").val(idsAnexos);
		}else{
			idsAnexos = obj.closest(".uploaderNovo").find("#anexosId").val();
			idsAnexos = idsAnexos.replace(" "+idAnexo+",","");
			obj.closest(".uploaderNovo").find("#anexosId").val(idsAnexos);
		}

		obj.closest("li").fadeOut(function(){
			$(this).remove();
		});

		/* var qtd = obj.closest(".anexos").find("li:not(.ajax-file-upload-more):visible").length;
		if(qtd <= 1){
			//obj.closest(".anexos").hide();
			$('.mural-postar-wrapper .ajax-file-upload-more').fadeOut(function(){
				$(this).remove();
				$('.mural-postar-wrapper .post-label-anexos').removeClass('active');
			})
		} */
		$('.recent-files .arquivos > li[data-arquivo-id="'+idAnexo+'"]').remove();
	});
	
	$('body').on('keypress', 'input, textearea', function(event){
		//adicionar exceções, como sql page e afins
		event = event || window.event;
		var charCode = event.which || event.keyCode,
			charStr = String.fromCharCode(charCode);

		if (charStr == "<" || charStr == ">") {
			return false;
		}
	});

});//FIM DOCUMENT.READY

function colorPicker(color, input){
	$('#colorSelector').ColorPicker({
		color: '#'+color,
		onShow: function (colpkr) {
			$(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			$('#colorSelector div').css('backgroundColor', '#' + hex);
			$(input).val(hex);
		},
		onSubmit: function(hsb, hex, rgb, el) {
			$(el).ColorPickerHide();
		}
	});
}

function fechaModalNotificacao(id){
	setTimeout(function(){$(".modalNumero"+id).fadeOut(function(){$(this).remove();});}, 8000);
}
var countModalNotificacao = 0;
function exibeNotificacao(data){
	if(data.userId != userId){
		if(data.tipo != "mensagem" && data.tipo != "newPost"){
			countModalNotificacao += 1;
			//adiciona a e remove a notificação no canto esquerdo
			buscaFotoUsuario(data.userId);
			var titulo = (data.title).replace(/\[/g, "<strong>").replace(/\]/g, "</strong>");
			var modal = '<div class="modalNotificacao modalNumero'+countModalNotificacao+' animated bounceInLeft">'+
							'<i href="#" class="icones ico-remover"></i>'+
							'<a href="'+urlContext+'/pages/post.html?id='+data.postId+'">'+
								'<div class="fotoUsuario pequena"><div class="centraliza"><img class="foto'+data.userId+'" style="display:none;" alt="Foto do '+data.userId+'" src=""></div></div>'+
								'<div class="textoNotificacao">'+
									'<p>'+titulo+'</p>'+
								'</div>'+
							'</a>'+
						'</div>';
			
			$("#contentNotificacoes").append(modal);
			fechaModalNotificacao(countModalNotificacao);
		
			//soma e treme a notificação no header
			var qtdAtual = parseInt($(".menuNotificacao.alerta").closest(".header-links").find(">span").html());
			if($(".menuNotificacao.alerta").closest(".header-links").find(">span").length > 0){
				$(".menuNotificacao.alerta").closest(".header-links").find(">span").html(qtdAtual+1);
			}else{
				var conteudo = '<span>1</span>';
				$(".menuNotificacao.alerta").closest(".header-links").addClass("ativo").prepend(conteudo);
			}
			animateCss($(".menuNotificacao.alerta").closest(".header-links"), "shake");
			$('#chatAudio')[0].play();
		}else if(data.tipo == "newPost"){
			jQuery.ajax({
				type: "post",
				url: urlContext+"/ws/post.htm?mode=json&form_name=form",
			 	dataType: "json",
			 	data: {
			 		user: userId,
			 		id: data.postId,
			 		wsVersion: wsVersion,
			 		wstoken:SESSION.USER_INFO.USER_WSTOKEN
		        },
		        beforeSend: function(){
		        },
			 	success: function( data ) {
			 		exibeBuscaPost(data, "newPost", null, null);
			 		var paramsNotification = {
						data: {
							user_id: SESSION.USER_INFO.USER_ID,
						},
						isBadges: true,
						isClear: true,
						isScroll: true,
						isShowTabNotification: false,
						isFlipAnimation: false,
						isSpinner: true,
						isMenuConfig: false,
					};
			 		notifications.getNotifications(paramsNotification);
				}
			 });
		}
	}
}

//conta caracteres
function countChar(campo, printResult, qtdChars) {
	if(campo.length > 0){
		var qtdChars = parseInt(qtdChars);
		var obj = $(campo);
		var len = obj.val().length;
		$(printResult).text(qtdChars - len);
		obj.val((obj.val()).substring(0, qtdChars));
		obj.on('keyup focusout paste cut',function(event){
			    if(event.type == 'keyup' || event.type == 'focusout'){
			    	len = obj.val().length;
			    	if (len <= qtdChars) {
			    		$(printResult).html(qtdChars - len);
					}else {
						obj.val((obj.val()).substring(0, qtdChars));
				    	$(printResult).text(0);
				    }
			    }else if(event.type == 'paste' || event.type == 'cut') {
					setTimeout(function(){
						len = obj.val().length;
						if (len <= qtdChars) {
				    		$(printResult).html(qtdChars - len);
						}else {
					    	$(printResult).text(0);
					    	obj.val((obj.val()).substring(0, qtdChars));
					    }
					},10);
				}
		}).attr("maxlength", qtdChars);
	}
}

function calculaPositionChats(){
	var larguraTela = $(window).width();
	var larguraJanela = 260;
	$("#chatsAtivos .janelaChat").each(function(){
		var obj = $(this);
		var position = obj.index();
		obj.css({"right":(larguraJanela * position)});
		if(larguraTela < ((larguraJanela * position) + larguraJanela)){
			obj.hide();
		}else{
			obj.show();
		}
	});
} 

function animateCss(obj, animation){
	var effect = "animated "+animation;
	obj.addClass(effect).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		obj.removeClass(effect);
	});
}

//pisca chat
function blinkChat(obj) {
	obj.toggleClass("blinkChat");
}

var chatsObj = {}; 
var chatName = 'chat';

var chatIdentifier = 0;
//enviar mensagem no chat e na página de mensagens
function submitChat(obj){
	if(jQuery.trim(obj.val()) == ''){
		jAlert("Digite algum texto para enviar.", 'Atenção.', null);
		return false;
	}else{
		chatIdentifier += 1;
		var texto = obj.val();
		var date = new Date();
		var horario = ("0" + date.getHours()).slice(-2)+":"+("0" + date.getMinutes()).slice(-2);
		//função do websocket.js
		sendMessage(obj, texto, chatIdentifier);
 		obj.val("").blur().focus().parent().find(".ico-enviarMensagem").hide();
 		
 		
		var conteudo = '<li class="mine" ><p class="enviado" data-id="'+ chatIdentifier +'">'+texto+' <span class="dataMensagem">'+horario+'</span></p></li>';
		//chat
		if($(".janelaChat[data-id='"+obj.attr("data-conversa")+"']").length > 0){
			if($(".janelaChat[data-id='"+obj.attr("data-conversa")+"'] .conversaChat > ul > li:last").hasClass("mine")){
				conteudo = '<p class="enviado" data-id="'+ chatIdentifier +'">'+texto+' <span class="dataMensagem">'+horario+'</span></p>';
				$(".janelaChat[data-id='"+obj.attr("data-conversa")+"'] .conversaChat > ul > li:last").append(conteudo).closest("ul").scrollTop(5000);
			}else{
				$(".janelaChat[data-id='"+obj.attr("data-conversa")+"'] .conversaChat > ul").append(conteudo).scrollTop(5000);
			}
			findUrls($(".conversaChat > ul > li:last > p:last"));
		}
		//mensagens
		if($(".conversa[data-id='"+obj.attr("data-conversa")+"']").length > 0){
			$(".conversa[data-id='"+obj.attr("data-conversa")+"'] > ul > li.muralVazio").remove();
			if($(".conversa[data-id='"+obj.attr("data-conversa")+"'] > ul > li:last").hasClass("mine")){
				conteudo = '<p class="enviado" data-id="'+ chatIdentifier +'">'+texto+' <span class="dataMensagem">'+horario+'</span></p>';
				$(".conversa[data-id='"+obj.attr("data-conversa")+"'] >ul > li:last").append(conteudo).closest("ul").scrollTop(5000);
			}else{
				$(".conversa[data-id='"+obj.attr("data-conversa")+"'] >ul").append(conteudo).scrollTop(5000);
			}
			findUrls($(".conversa > ul > li:last > p:last"));
		}
		if($(".listaMensagens").length > 0){
			var horaAtual = new Date().getTime();
			$(".listaMensagens #idConversa-"+obj.attr("data-conversa")).prependTo(".listaMensagens");
			$(".listaMensagens #idConversa-"+obj.attr("data-conversa")).removeClass("last");
			$(".listaMensagens #idConversa-"+obj.attr("data-conversa")+" .mensagemConversa").html(texto);
			$(".listaMensagens #idConversa-"+obj.attr("data-conversa")+" .dataMensagem").attr("rel", horaAtual).attr("title", timeConverter(horaAtual)).html(texto, dateConverter(horaAtual)).timeago();
		}
		
	}
}


//FUNÇÃO QUE BUSCA FOTO DO USUÁRIO PELO ID
function buscaFotoUsuario(idUsuario){
	jQuery.ajax({
		type: "post",
		url: urlContext+"/ws/usuario.htm?mode=json&form_name=form",
		data:{
			user: idUsuario,
			wsVersion: wsVersion,
	 		wstoken:SESSION.USER_INFO.USER_WSTOKEN
		},
	 	dataType: "json",
        beforeSend: function(){},
	 	success: function(data) {
	 		$(".foto"+idUsuario).attr("src", data.user.urlFotoUsuarioThumb).show();
		}
	 });	
}

//função que tira o typing do chat e das mensagens
function limpaTyping(conversaId){
	if($(".janelaChat[data-id='"+conversaId+"']").length > 0){
		if($(".janelaChat[data-id='"+conversaId+"']").hasClass("minimize")){
			$(".janelaChat[data-id='"+conversaId+"'] .headerChat > p > span").remove();
		}else{
			$(".janelaChat[data-id='"+conversaId+"'] textarea").attr("rel", "Escreva uma resposta");
			placeholder(".janelaChat[data-id='"+conversaId+"'] textarea", "#c5c5c5");
		}
	}
	if($(".conversa[data-id='"+conversaId+"']").length > 0){
		$(".conversa[data-id='"+conversaId+"'] textarea").attr("rel", "Escreva uma resposta");
		placeholder(".conversa[data-id='"+conversaId+"'] textarea", "#c5c5c5");
	}
	if($(".listaMensagens #idConversa-"+conversaId).length > 0){
		$(".listaMensagens #idConversa-"+conversaId+" .dataMensagem").timeago();
	}
}
//função que o websocket chama para adicionar e atualizar o status da msg (enviado, recebido, lido)
var timerTyping;
function atualizaMsgChat(msg){
	var msgContent = msg.content;
	if (msg.code == "serverReceivedMessage"){
		if(msgContent.status == "Ok"){
			//chat
			$(".conversaChat").find('li > p[data-id="'+msgContent.identifier+'"]').attr("data-id", msgContent.messsageID ).removeClass("enviado").addClass("recebido");
			//mensagens
			$(".conversa").find('li > p[data-id="'+msgContent.identifier+'"]').attr("data-id", msgContent.messsageID ).removeClass("enviado").addClass("recebido");
		}else{
			jAlert("Mensagem não enviada.", "Atenção.", null);
		}
	}else if (msg.code == "messageReachDestination"){
		if(msgContent.status == "Ok"){
			$(".conversaChat").find('li > p[data-id="'+msgContent.messageID+'"]').removeClass("recebido").addClass("lido");
			$(".conversa").find('li > p[data-id="'+msgContent.messageID+'"]').removeClass("recebido").addClass("lido");
		}else{
			jAlert("Mensagem não chegou ao destino id:"+msgContent.identifier, "Atenção.", null);
		}
	}else if (msg.code == "receivedMessage"){
		var horario = (msgContent.date).slice(-8);
			horario = horario.substring(0, 5);
		var conteudo = '<li class="yours"><p data-id="'+msgContent.messageID+'">'+msgContent.msg+' <span class="dataMensagem">'+horario+'</span></p></li>';
		limpaTyping(msgContent.conversationID);
		if($(".janelaChat[data-id='"+msgContent.conversationID+"']").length > 0){
			if($(".janelaChat[data-id='"+msgContent.conversationID+"'] .conversaChat > ul > li:last").hasClass("mine")){
				$(".janelaChat[data-id='"+msgContent.conversationID+"'] .conversaChat > ul").append(conteudo).scrollTop(5000);
			}else{
				conteudo = '<p data-id="'+msgContent.messageID+'">'+msgContent.msg+' <span class="dataMensagem">'+horario+'</span></p>';
				$(".janelaChat[data-id='"+msgContent.conversationID+"'] .conversaChat > ul > li:last").append(conteudo).closest("ul").scrollTop(5000);
			}
			findUrls($(".janelaChat[data-id='"+msgContent.conversationID+"'] .conversaChat > ul > li > p:last"));
			var obj = $(".janelaChat[data-id='"+msgContent.conversationID+"']");
			clearInterval(chatsObj[chatName + msgContent.conversationID]);
			chatsObj[chatName + msgContent.conversationID] = setInterval(function(){ blinkChat(obj);}, 300);
		}
		if($(".conversa[data-id='"+msgContent.conversationID+"']").length > 0){
			if($(".conversa[data-id='"+msgContent.conversationID+"'] > ul > li:last").hasClass("mine")){
				$(".conversa[data-id='"+msgContent.conversationID+"'] > ul").append(conteudo).closest("ul").scrollTop(5000);
			}else{
				conteudo = '<p data-id="'+msgContent.messageID+'">'+msgContent.msg+' <span class="dataMensagem">'+horario+'</span></p>';
				$(".conversa[data-id='"+msgContent.conversationID+"'] > ul > li:last").append(conteudo).closest("ul").scrollTop(5000);
			}
			findUrls($(".conversa[data-id='"+msgContent.conversationID+"'] > ul > li > p:last"));
		}
		if($(".listaMensagens").length > 0){
			var nomeConversa = false;
			var fotoConversa = "";
			var hideFoto = 'style="display:none;"';
			if($(".listaMensagens #idConversa-"+msgContent.conversationID).length > 0){
				nomeConversa = $(".listaMensagens #idConversa-"+msgContent.conversationID+" .nomeConversa").html();
				fotoConversa = $(".listaMensagens #idConversa-"+msgContent.conversationID+" .fotoUsuario img").attr("src");
				hideFoto = "";
				$(".listaMensagens #idConversa-"+msgContent.conversationID).remove();
				
			}else{
				var fotoUsuario = urlContext+"/imagens/loading.gif";
				buscaFotoUsuario(msgContent.fromUserID);
			}
			var ativo = "";
			if(msgContent.conversationID == getURLParameter("id")){
				ativo = "ativa";
			}
			var conteudo = '<li class="clearfix '+ativo+'" id="idConversa-'+msgContent.conversationID+'">'+
								'<div class="configItem">'+
									'<i class="icones ico-configLista"></i>'+
									'<div class="popMenu bottom"><ul>'+
										'<li class="primeiro ultimo"><a class="btApagarConversa" data-id="'+msgContent.conversationID+'" href="'+urlContext+'/ws/deletar.htm?tipo=conversa&id='+msgContent.conversationID+'&mode=json&form_name=form">Apagar Conversa</a></li>'+
							        '</ul></div>'+
								'</div>'+
								'<a class="clearfix" href="'+urlContext+'/pages/mensagens.htm?id='+msgContent.conversationID+'">'+
									'<div class="fotoUsuario media"><div class="centraliza"><img class="foto'+msgContent.fromUserID+'" '+hideFoto+' alt="Foto" src="'+fotoConversa+'"></div></div>'+
									'<div class="infoMensagem">'+
										'<p class="nomeConversa">';
										if(nomeConversa){
				conteudo += 				nomeConversa;
										}else{
				conteudo += 				msgContent.fromUserName;
										}
										conteudo += '</p>'+
										'<p class="mensagemConversa">'+msgContent.msg+'</p>'+
										'<span rel="'+msgContent.timestamp+'" title="'+timeConverter(msgContent.timestamp)+'" class="bs-tooltip dataMensagem">'+msgContent.date+'</span>'+
									'</div>'+
								'</a>'+
							'</li>';
			$(".listaMensagens").prepend(conteudo);
			$(".listaMensagens #idConversa-"+msgContent.conversationID+" .dataMensagem").timeago();
		}
		
		
		//coloca a notificação no header se tiver chat e mensagens fechado
		var qtdAtual = parseInt($(".menuNotificacao.mensagem").closest(".header-links").find(">span").html());
		if($(".janelaChat[data-id='"+msgContent.conversationID+"']").length <= 0 && $(".conversa[data-id='"+msgContent.conversationID+"']").length <= 0){	
			if($(".menuNotificacao.mensagem").closest(".header-links").find(">span").length > 0){
				var qtd = 0;
				$(".menuNotificacao.mensagem > ul > li").not(".primeiro").not(".ultimo").each(function(){
					var link = $(this).find(">a").attr("href");
					if(link.indexOf(msgContent.conversationID) > 0){
						qtd += 1;
					}
				});
				if(qtd == 0){
					$(".menuNotificacao.mensagem").closest(".header-links").find(">span").html(qtdAtual+1);
				}
			}else{
				var conteudo = '<span>1</span>';
				$(".menuNotificacao.mensagem").closest(".header-links").addClass("ativo").prepend(conteudo);
			}
		
			animateCss($(".menuNotificacao.mensagem").closest(".header-links"), "shake");
		}
		$('#chatAudio')[0].play();
	}else if (msg.code == "typingStatus"){
		window.clearTimeout(timerTyping);
		timerTyping = window.setTimeout(function(){limpaTyping(msgContent.conversationID);},2000);
		if(msgContent.status){
			if($(".janelaChat[data-id='"+msgContent.conversationID+"']").length > 0){
				if($(".janelaChat[data-id='"+msgContent.conversationID+"']").hasClass("minimize")){
						if($(".janelaChat[data-id='"+msgContent.conversationID+"'] .headerChat > p > span").length <= 0){
							$(".janelaChat[data-id='"+msgContent.conversationID+"'] .headerChat > p").append('<span class="bs-tooltip" title="'+msgContent.fromUserName+' está digitando">...<span/>').html();
						}
				}else{
					$(".janelaChat[data-id='"+msgContent.conversationID+"'] .headerChat > p > span").remove();
					$(".janelaChat[data-id='"+msgContent.conversationID+"'] textarea").attr("rel", msgContent.fromUserName+" está digitando...");
					placeholder(".janelaChat[data-id='"+msgContent.conversationID+"'] textarea", "#c5c5c5");
				}
			}
			if($(".conversa[data-id='"+msgContent.conversationID+"']").length > 0){
				$(".conversa[data-id='"+msgContent.conversationID+"'] textarea").attr("rel", msgContent.fromUserName+" está digitando...");
				placeholder(".conversa[data-id='"+msgContent.conversationID+"'] textarea", "#c5c5c5");
			}
			if($(".listaMensagens #idConversa-"+msgContent.conversationID).length > 0){
				var textoAtual = $(".listaMensagens #idConversa-"+msgContent.conversationID+" .dataMensagem").html();
				$(".listaMensagens #idConversa-"+msgContent.conversationID+" .dataMensagem").attr("data-texto", textoAtual).html(msgContent.fromUserName+" está digitando...");
			}
		}
	}
	
}

//conversor de timestamp para data
function timeConverter(UNIX_timestamp){
	 var a = new Date(parseInt(UNIX_timestamp,10));
     var year = a.getFullYear();
     var month = a.getMonth()+1;
     	 month = ("0" + month).slice(-2);
     var date = a.getDate();
     	 date = ("0" + date).slice(-2);
     var hour = a.getHours();
     	 hour = hour = ("0" + hour).slice(-2);
     var min = a.getMinutes();
     	 min = min = ("0" + min).slice(-2);
     var sec = a.getSeconds();
     	 sec = sec = ("0" + sec).slice(-2);
     var time = year+"-"+month+'-'+date+' '+hour+':'+min+':'+sec ;
     return time;
 }
// conversor de data 2
function dateConverter(UNIX_timestamp){
	var a = new Date(parseInt(UNIX_timestamp,10));
    var months=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    var month = a.getMonth();
    var date = a.getDate();
    	date = ("0" + date).slice(-2);
    var hour = a.getHours();
    	hour = hour = ("0" + hour).slice(-2);
    var min = a.getMinutes();
    	min = min = ("0" + min).slice(-2);
    var time = date+' '+months[month]+'&nbsp;&nbsp;&nbsp;'+hour+'h'+min ;
    return time;
}
//conversor de timestamp para data
function onlyDateConverter(UNIX_timestamp){
	 var a = new Date(parseInt(UNIX_timestamp,10));
     var year = a.getFullYear();
     var month = a.getMonth()+1;
     	 month = ("0" + month).slice(-2);
     var date = a.getDate();
     	 date = ("0" + date).slice(-2);
     var time = date+"/"+month+'/'+year;
     return time;
 }

//verifica a data
function timeVerify(UNIX_timestamp){
	var a = new Date(parseInt(UNIX_timestamp,10));
	var b = new Date();
	var dateA = a.getDate();
	var dateB = b.getDate();
	var mesA = a.getMonth();
	var mesB = b.getMonth();
	var anoA = a.getFullYear();
	var anoB = b.getFullYear();
	if(dateA == dateB && mesA == mesB && anoA == anoB){
	  	 return true;
	}
}

//compara datas
function timeCompare(timeStampA, timeStampB){
	var a = new Date(parseInt(timeStampA,10));
	var b = new Date(parseInt(timeStampB,10));
	var dateA = a.getDate();
	var dateB = b.getDate();
	var mesA = a.getMonth();
	var mesB = b.getMonth();
	var anoA = a.getFullYear();
	var anoB = b.getFullYear();
	if(dateA == dateB && mesA == mesB && anoA == anoB){
	  	 return true;
	}
}

//fakeChack
function fakeCheck(obj, val){
	var obj = obj;
	var val = jQuery.trim(val);
	var valInicial = jQuery.trim(obj.find("input").val());
	obj.click(function(e){
		e.preventDefault();
		if(jQuery.trim(obj.find("input").val()) == ""){
			obj.find(".icone").addClass("ativo");
			obj.find("input").val(val);
		}else{
			obj.find(".icone").removeClass("ativo");
			obj.find("input").val("");
		}
	});
	if(valInicial != ""){
		obj.find(".icone").addClass("ativo");
	}
}


// FUNCAO QUE MUDA O FILE INPUT
var SITE = SITE || {};
SITE.fileInputs = function() {
  var $this = $(this),
      $val = $this.val(),
      valArray = $val.split('\\'),
      newVal = valArray[valArray.length-1],
      $button = $this.siblings('.button');
  if(newVal !== '') {
    $button.text(newVal);
  }
};

// FUNCAO PRA PEGAR IMG DO YOUTUBE
function processURL(url, callback){
	var id;
	if (url.indexOf('youtube.com') > -1) {
		url = url.replace('http://', '');
	    id = url.split('v=')[1].split('&')[0];
	    return processYouTube(id, callback);
	} else if (url.indexOf('youtu.be') > -1) {
		url = url.replace('http://', '');
		url = url.split('?')[0];
		id = url.split('/')[1];
	    return processYouTube(id, callback);
	} else if (url.indexOf('vimeo.com') > -1) {
		vimeo_Reg = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
		id = url.match(vimeo_Reg);
		if (id){
			$.ajax({
		        url: 'http://www.vimeo.com/api/v2/video/' + id[3] + '.json',
		        dataType: 'jsonp',
		        success: function(data) {
		        	callback(data[0].thumbnail_large);
		        }
		    });
		}else{
			callback('0');
		}
	} else {
		callback('0');
	    //throw new Error('Unrecognised URL');
	}
	function processYouTube(id, callback) {
	    if (!id) {
	        throw new Error('Unsupported YouTube URL');
	    }
	    callback('http://i2.ytimg.com/vi/' + id + '/hqdefault.jpg');
	}
}

function urlVimeo(url, callback){
	var id;
	if (url.indexOf('vimeo.com') > -1) {
		vimeo_Reg = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
		id = url.match(vimeo_Reg);
		if (id){
			callback('http://player.vimeo.com/video/' + id[3]);
		}else{
			callback('0');
		}
	}
}

//funçao para redimensionar imagens dos posts
function redimensionaImg(img){
	var larguraImg = img.width();
	var alturaImg = img.height();
	var larguraPai = img.closest(".imagemPost").width();
	var alturaPai = img.closest(".imagemPost").height();
	
	if(img.closest(".imagemPost").hasClass("umMeio") || img.closest(".imagemPost").hasClass("umTerco")){
		img.css({"height":alturaPai, "width":"auto", "left":"50%", "top":"50%"});
		larguraImg = img.width();
		alturaImg = img.height();
		if(larguraImg <= larguraPai){
			img.css({"width":larguraPai, "height":"auto"});
			larguraImg = larguraPai;
			alturaImg = img.height();
		}
		if(img.hasClass("alterada") || !img.is(":visible")){
			return false;
		}else{
			img.addClass("alterada").css({"margin":"-"+ (alturaImg/2) +"px 0 0 -" + larguraImg/2 +"px"}).closest(".imagemPost").css({"background":"#FFFFFF"});
		}		
	}else{
		if(img.hasClass("alterada") || !img.is(":visible")){
			return false;
		}else{
			img.addClass("alterada").css({"left":"50%", "top":"50%", "margin":"-"+ (alturaImg/2) +"px 0 0 -" + larguraImg/2 +"px"}).closest(".imagemPost").css({"background":"#FFFFFF"});
		}
	}
	

}

//funcões para o textarea de comentario
function getCaret(el) { 
    if (el.selectionStart) { 
        return el.selectionStart; 
    } 
    
    // ^ Above doesn't work in IE - Fix below
    else if (document.selection) { 
        el.focus();
        var r = document.selection.createRange(); 
        if (r == null) { 
          return 0; 
        } 
        var re = el.createTextRange(), 
            rc = re.duplicate(); 
        re.moveToBookmark(r.getBookmark()); 
        rc.setEndPoint('EndToStart', re); 
        return rc.text.length; 
    }
    return 0; 
}

function setCaretPosition(el, caretPos) {
    if(el != null) {
        if(el.createTextRange) {
            var range = el.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(el.selectionStart) {
                el.focus();
                el.setSelectionRange(caretPos, caretPos);
            }
            else
                el.focus();
        }
    }
}

function testUrl(value) {
    if(value.indexOf("http") == -1){
        value = "http://"+value;
    }
	return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
}

function findUrls( elemento, isFindIframe ){
	var obj = $(elemento);
	//var regexToken = /((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
	var regexToken = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s\[]{2,}|www\.[^\s]+\.[^\s\[\<]{2,})/g;
	
	obj.each(function(){
		var text = $(this).html();
		var result = text.match(regexToken);
		var textNew = text.replace(regexToken, "{--{$1}--}");
		var conteudo = "";

		if(result){
			for (var i=0; i < result.length; i++){

				var newUrl = result[i].replace(/\.+$/, '');
				textNew = textNew.replace("{--{"+result[i]+"}--}", "{--{" + newUrl + "}--}");
				result[i] = newUrl;

				if(result[i].indexOf("http") != -1 && result[i].indexOf("ftp") == -1){
					if(testUrl(result[i])){
						textNew = textNew.replace("{--{"+result[i]+"}--}", '<a href="'+result[i]+'" target="_blank">'+result[i]+'</a>');
					}else{
						textNew = textNew.replace("{--{"+result[i]+"}--}", result[i]);
					}
				}else{
					if(testUrl(result[i])){
						textNew = textNew.replace("{--{"+result[i]+"}--}", '<a href="http://'+result[i]+'" target="_blank">'+result[i]+'</a>');
					}else{
						textNew = textNew.replace("{--{"+result[i]+"}--}", result[i]);
					}
				}

				if(isFindIframe){
					if((newUrl.indexOf('docs.google.com') > -1 && newUrl.indexOf('/forms/') > -1) || (newUrl.indexOf('goo.gl') > -1 && newUrl.indexOf('/forms/') > -1)){
						conteudo += '<iframe class="iframe medium" src="'+newUrl+'">Carregando...</iframe>';
					}
				}
			}

			$(this).html(textNew);
			if(isFindIframe){
				if(conteudo != ""){
					$(this).closest('.alturaMensagem').addClass('iframe');
					$(this).append(conteudo);
				}
			}
		}
	});
}

//postar comentario
function submitComentario(obj){
	var arquivosIds = jQuery.trim(obj.closest(".comentario").find(".inputAnexos").val());
	if(obj.closest(".comentario").find(".uploaderNovo .ajax-file-upload-abort:visible").length > 0){
		jAlert("Aguarde o upload dos anexos! </br>", 'Atenção.', null);
		return false;
	}
	jQuery.ajax({
		type: "post",
		url: urlContext+"/ws/comentar.htm?mode=json&form_name=form",
	 	dataType: "json",
	 	data: {
	 		user: userLogin,
	 		user_id: obj.attr("data-usuario"),
            post_id: obj.attr("data-post"),
            comment_id: obj.attr("data-comment"),
            arquivo_ids: arquivosIds,
            comentario: obj.val(),
            wsVersion: wsVersion,
	 		wstoken:SESSION.USER_INFO.USER_WSTOKEN
        },
        beforeSend: function(){
        	obj.addClass("ac_loading").attr("disabled", "disabled");
        },
	 	success: function( data ) {
	 		if(data.mensagem){
	 			jAlert(data.mensagem.mensagem, data.mensagem.status, null);
	 			obj.removeClass("ac_loading").removeAttr("disabled");
	 			return false;
	 		}
	 		//var texto = parseURL(obj.val());
	 		var texto = obj.val();
	 		if(arquivosIds != "" || obj.closest(".comentario").find(".anexos li").length > 0 ){
 				var anexos = "";
				for (var a=0; a < data.comentario.arquivos.length;a++){ 
					var classePlayer = "";
					if(FILE_EXTENSIONS.video[data.comentario.arquivos[a].extensao.toLowerCase()])
						classePlayer = "fancyJwplayer";

					var linkAnexo = '';
					anexos = anexos+'<li class="comentario-anexo" data-id="'+data.comentario.arquivos[a].id+'">';
						anexos += '<div class="anexo-preview">';
							if(FILE_EXTENSIONS.image[data.comentario.arquivos[a].extensao.toLowerCase()]){
								anexos += '<div class="fotoUsuario grande no-radius">';
									anexos += '<a href="'+data.comentario.arquivos[a].url+'" class="centraliza fancybox" target="_blank">';
										anexos += '<img src="'+data.comentario.arquivos[a].url+'" alt="'+data.comentario.arquivos[a].file+'" onload="this.classList.add(\'loaded\'); this.parentNode.parentNode.classList.add(\'loaded\');" />';
									anexos += '</a>';
								anexos += '</div>';
							}else{
								anexos += '<i class="file-extensions-icons-big '+data.comentario.arquivos[a].extensao.toLowerCase()+'"></i>';
								anexos += '<span class="extension">'+data.comentario.arquivos[a].extensao.toLowerCase()+'</span>';
							}

							anexos += '<div class="anexo-overlay">';
								if(FILE_EXTENSIONS.image[data.comentario.arquivos[a].extensao.toLowerCase()]){
									anexos += '<a href="'+data.comentario.arquivos[a].url+'" class="anexo-nome fancybox" target="_blank" rel="lvcmcmt'+data.comentario.id+'">'+data.comentario.arquivos[a].file+'</a>';
								}else{
									anexos += '<a class="previewFile" data-name="'+data.comentario.arquivos[a].name+'" data-url="'+data.comentario.arquivos[a].url+'" data-link="'+data.comentario.arquivos[a].url+'" data-ext="'+data.comentario.arquivos[a].toLowerCase()+'">'+data.comentario.arquivos[a].file+'</a>';
								}
								anexos += '<p class="anexo-length">'+data.comentario.arquivos[a].lengthHumanReadable+'</p>';
								if(data.comentario.arquivos[a].descricao && data.comentario.arquivos[a].descricao != ''){
									anexos += '<p class="anexo-descricao anexo-editar-descricao" title="Clique para editar a descrição" data-arquivo-id="'+data.comentario.arquivos[a].id+'">'+data.comentario.arquivos[a].descricao+'</p>';
								}else{
									anexos += '<a class="anexo-editar-descricao" data-arquivo-id="'+data.comentario.arquivos[a].id+'">editar descrição</a>';
								}
							anexos += '</div>';
						anexos += '</div>';

						if(data.comentario.arquivos[a].descricao){
							anexos+=' <p class="descricaoUpload">'+data.comentario.arquivos[a].descricao+'</p>';
						}
 					anexos += '</li>';
				}
				
				var listaAnexos = '<ul class="anexos">'+anexos+'</ul>';
 			}else{
 				var listaAnexos = '';
 			}
	 		if(obj.hasClass("editando")){
	 			obj.closest("li").find(".comentario > pre").html(texto).show();
	 			obj.closest("li").find(".enviarComentarioEditado").remove();
				obj.closest("li").find(".progress").remove();
				obj.closest("li").find(".uploaderNovo").remove();
				obj.closest("li").find(".ico-remover").remove();
				//obj.closest("li").find(".anexos").remove();
				obj.closest("li").find(".botaoConfigMini").after(listaAnexos);
				findUrls(obj.closest("li").find(".comentario > pre"));
	 			obj.remove();
	 		}else{
		 		obj.removeClass("ac_loading").removeAttr("disabled").val("");

		 		if(SESSION.PERMISSOES.CURTIR_COMENTARIOS == 'true'){
		 			var likeComentario = '<a href="#" class="botaoLikeMini" data-favorito="1" data-usuario="'+userId+'" data-comentario="'+data.comentario.id+'"><i class="linear-icons icone-likeNewMini tooltip-livecom" title="'+i18n('curtir.label')+'"></i><span style="display:none;">0</span></a>';
		 		}else{
		 			var likeComentario = '';
		 		}


		 		var conteudo = '<li class="clearfix">'+
					            	'<div class="fotoUsuario pequena" data-nome="'+data.comentario.nome+'" data-foto="'+data.comentario.urlFotoThumb+'" data-id="'+data.comentario.userId+'"><a href="'+urlContext+'/usuario.htm?id='+userId+'"><img src="'+SESSION.USER_INFO.USER_FOTO+'" alt="Foto do '+SESSION.USER_INFO.USER_NOME+'" /></a></div>'+
					                '<div class="comentario clearfix">'+
					                    '<a class="nomeUsuario" data-nome="'+data.comentario.nome+'" data-foto="'+data.comentario.urlFotoThumb+'" data-id="'+data.comentario.userId+'" href="'+urlContext+'/usuario.htm?id='+userId+'">'+SESSION.USER_INFO.USER_NOME+'</a>'+
					                    '<span class="dataPost timeago bs-tooltip" title="'+timeConverter(data.comentario.timestamp)+'" rel="'+data.comentario.timestamp+'">'+data.comentario.data+'</span>'+
					                    '<a href="#" class="inline-link editarComentario" data-usuario="'+data.comentario.userId+'" data-post="'+data.comentario.postId+'" data-comment="'+data.comentario.id+'">'+i18n("comentar.editar.link")+'</a>'+
					                    '<a href="'+urlContext+'/ws/deletar.htm?mode=json&form_name=form&id='+data.comentario.id+'&tipo=comentario" class="inline-link excluirComentario">'+i18n("comentar.excluir.link")+'</a>'+
					                    '<pre>'+texto+'</pre>'+
					                    listaAnexos + likeComentario+
					                '</div>'+
					            '</li>';
				
				obj.closest(".interacoesPost").find(".listaComentarios:first").append(conteudo);
				obj.closest(".comentario").find(".anexos").hide().find("li").remove();
				obj.closest(".comentario").find(".ajax-file-upload-statusbar").remove();
				obj.closest(".comentario").find(".inputAnexos").val("");
				findUrls(obj.closest(".interacoesPost").find(".listaComentarios:first li:last .comentario > pre"));
		 		var qtd = parseInt(obj.closest(".interacoesPost").find(".botaoComentarios > span").html());
		 		obj.closest(".interacoesPost").find(".botaoComentarios > span").show().html(qtd+1);
	 		}
	 		
	 		obj.closest(".interacoesPost").find(".listaComentarios:first > li .dataPost").each(function(){
 				var obj = $(this);
 				var timestamp = parseInt(obj.attr("rel"),10);
 				if(timeVerify(timestamp)){
 					obj.timeago();
 				}
 			});
	 		$(".comentario textarea").removeAttr("style");
	 		$('.comentario .ajax-file-upload-more').hide();
	 		$('.inline-link.editarComentario').html('editar').removeClass('cancelar');
			tooltipNomeUsuario($('#postId-'+data.comentario.postId+' .fotoUsuario.pequena'));
			tooltipNomeUsuario($('#postId-'+data.comentario.postId+' .nomeUsuario'));
	 	}
	});
}

function submitMensagem(obj){
	var arquivosIds = jQuery.trim(obj.closest(".responder").find(".inputAnexos").val());
	if($("#checkEnviarEmail").is(":checked")){
		var check = true;
	}else{
		var check = false;
	}
	if(obj.closest(".responder").find(".uploaderNovo .ajax-file-upload-abort:visible").length > 0){
		jAlert("Aguarde o upload dos anexos! </br>", 'Atenção.', null);
		return false;
	}
	if(jQuery.trim(obj.val()) == ''){
		jAlert("Digite algum texto para enviar.", 'Atenção.', null);
 		$(".responder").find(".btnEnviarMensagem").val("Enviar");
 		$(".responder").find(".btnEnviarMensagem").removeAttr("disabled");	
		return false;
	}
	jQuery.ajax({
		type: "post",
		url: urlContext+"/ws/postMensagem.htm?mode=json&form_name=form",
	 	dataType: "json",
	 	data: {
	 		user: userLogin,
	 		user_from_id: jQuery.trim(obj.attr("data-from")),
	 		user_to_id: jQuery.trim(obj.attr("data-to")),
            conversa_id: jQuery.trim(obj.attr("data-conversa")),
            titulo: obj.attr("data-titulo"),
            checkEnviarEmail: check,
            arquivo_ids: arquivosIds,
            msg: obj.val(),
            wsVersion: wsVersion,
	 		wstoken:SESSION.USER_INFO.USER_WSTOKEN
        },
        beforeSend: function(){
        	obj.addClass("ac_loading").attr("disabled", "disabled");
        },
	 	success: function( data ) {
	 		var texto = obj.val();
	 		obj.removeClass("ac_loading").removeAttr("disabled").val("");
	 		
	 		var lastUserTo = $(".conversa > ul > li:last").attr("data-user-to");

	 		var conteudoAnexos = '';
	 		if(arquivosIds != ""){
	 			var qtdImagens = 0;
	 			conteudoAnexos = conteudoAnexos+ '<ul class="anexos">';
	 			for (var a=0; a < data.msg.arquivos.length;a++){ 
					var extensao = (data.msg.arquivos[a].extensao).toLowerCase();
					if(extensao != "png" && extensao != "jpg" && extensao != "gif" && extensao != "jpeg" && extensao != "bmp"){
						var classePlayer = "";
						if(extensao == "mp3" || extensao == "mp4" || extensao == "mov"){
							classePlayer = "fancyJwplayer";
						}
						conteudoAnexos = conteudoAnexos+ 
						'<li data-id="'+data.msg.arquivos[a].id+'">'+
	 						'<div class="thumbnail">'+
	 							'<i class="icones ico-arquivo '+extensao+'">'+extensao+'</i>'+
	 						'</div>'+
	 						'<div class="nomeAnexo"><a href="'+data.msg.arquivos[a].url+'" class="'+classePlayer+'" target="_blank">'+data.msg.arquivos[a].file;
							conteudoAnexos+='<span>('+(data.msg.arquivos[a].length/1024).toFixed(2)+'kb)</span></a></div>';
							if(data.msg.arquivos[a].descricao){
								conteudoAnexos+=' <p class="descricaoUpload">'+data.msg.arquivos[a].descricao+'</p>';
							}
	 					'</li>';
	 				}
	 			}
	 			conteudoAnexos = conteudoAnexos+ '</ul>';
	 			
	 			for (var a=0; a < data.msg.arquivos.length;a++){ 
	 				var extensao = (data.msg.arquivos[a].extensao).toLowerCase();
	 				if(FILE_EXTENSIONS.image[extensao]){
	 					qtdImagens = qtdImagens + 1;
	 				}
	 			}
	 			
	 			if(qtdImagens == 1){
	 				conteudoAnexos += 	'<div class="imagensPost uma"><ul>';
										for (var a=0; a < data.msg.arquivos.length;a++){ 
											var extensao = (data.msg.arquivos[a].extensao).toLowerCase();
											if(FILE_EXTENSIONS.image[extensao]){
												conteudoAnexos += 	'<li><a href="'+data.msg.arquivos[a].url+'" class="fancybox" rel="mensagem-'+data.msg.id+'"><img src="'+data.msg.arquivos[a].urlThumb+'"  alt="'+data.msg.arquivos[a].file+'"/></a></li>';
											}
										}
					conteudoAnexos += 	'</ul></div>';
				}
	 			if (qtdImagens >= 2){
					if(qtdImagens == 2){
						var itens = "duas";
					}else if(qtdImagens == 3){
						var itens = "tres";
					}else if(qtdImagens >= 4){
						var itens = "quatro";
					}
					conteudoAnexos += '<div class="imagensPost '+itens+'"><ul>';
						var position = 0;
						for (var a=0; a < data.msg.arquivos.length;a++){ 
							var extensao = (data.msg.arquivos[a].extensao).toLowerCase();
							if(FILE_EXTENSIONS.image[extensao]){
			 					if(position == 0 && qtdImagens > 1){
			 						var left = ' first';
			 					}else{
			 						var left = '';
			 					} 
			 					if(position >= 3){
			 						var showHide = 'style="display:none"';
			 					}else{
			 						var showHide = '';
			 					}
			 					conteudoAnexos = conteudoAnexos + '<li class="'+ left+'" '+showHide+'><a href="'+data.msg.arquivos[a].url+'" class="fancybox" rel="mensagem-'+data.msg.id+'"><img src="'+data.msg.arquivos[a].urlThumb+'"  alt="'+data.msg.arquivos[a].file+'"/></a></li>';
			 					position = position + 1;
			 				}
						}
						conteudoAnexos += '</ul></div>';
				}
	 		}	

	 		var configItem = '';
	 		
	 		if(data.msg.lida == 0){
	 			var lidaNaoLida = 'naoLida';
	 		}else{
	 			var lidaNaoLida = '';
	 		}
	 		if($(".conversa .muralVazio").length > 0){
	 			$(".muralVazio").closest("li").remove();
	 		}
	 		
	 		if(lastUserTo == data.msg.toId){
	 			var conteudo = '<p data-id="'+data.msg.id+'" data-lida="'+data.msg.lida+'">'+data.msg.msg+'</p>'+
	 							conteudoAnexos;
	 			obj.closest(".conversa").find(">ul>li:last .textoConversa").append(conteudo);
	 		}else{
	 			var conteudo = '<li id="idMsg-'+data.msg.id+'" class="clearfix mine '+lidaNaoLida+'" data-id="'+data.msg.id+'" data-user-to="'+data.msg.toId+'" data-user-from="'+data.msg.fromId+'" data-status="'+data.msg.lida+ '">'+
									configItem+
								'<div class="textoConversa">'+
									'<div class="fotoUsuario pequena"><a href="'+urlContext+'/usuario.htm?id='+userId+'"><img alt="Foto do '+SESSION.USER_INFO.USER_NOME+'" src="'+SESSION.USER_INFO.USER_FOTO+'"></a></div>'+
									'<span class="dataMensagem bs-tooltip" title="'+timeConverter(data.msg.timestamp)+'" rel="'+data.msg.timestamp+'">'+dateConverter(data.msg.timestamp)+'</span>'+
									'<a href="'+urlContext+'/usuario.htm?id='+userId+'" class="nomeConversa">'+SESSION.USER_INFO.USER_NOME+'</a>'+
									'<p data-id="'+data.msg.id+'" data-lida="'+data.msg.lida+'">'+data.msg.msg+'</p>'+
									conteudoAnexos+
								'</div>'+
							'</li>';
				obj.closest(".conversa").find(">ul").append(conteudo);
	 		}
	 		
			obj.closest(".responder").find(".ajax-file-upload-statusbar").remove();
			obj.closest(".responder").find(".inputAnexos").val("");
	 				 		
			findUrls($(".conversa > ul > li:last").find(".textoConversa p"));
	 		$(".conversa > ul > li:last").find(".dataMensagem").each(function(){
 				var obj = $(this);
 				var timestamp = parseInt(obj.attr("rel"),10);
 				if(timeVerify(timestamp)){
 					obj.timeago();
 				}
 			});
	 		$(".responder").find(".btnEnviarMensagem").val("Enviar");
	 		$(".responder").find(".btnEnviarMensagem").removeAttr("disabled");
	 		$(".conversa > ul").scrollTop(100000);
		}
	 });
}
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}
function getLinkParameter(name, link) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(link)||[,""])[1].replace(/\+/g, '%20'))||null;
}

var contPost = 0;
var dataCount = 0;
function exibeBuscaPost(result, tipoPost, tipoBusca, filtro){
	var conteudo = "";
	if(tipoPost){
		var tipoPost = tipoPost;
	}else{
		var tipoPost = false;
	}
	contPost = 0;
	$(".muralVazio").html("").hide();
	$(".stream-mural").slideUp();
	var isPost = false;
	if(result.busca){
		var data = result.busca;
	}else if(result.post){
		isPost = true;
		var data = {};
		posts = [];
		posts.push(result.post);
		data["posts"] = posts;
	}
	if(data && data.posts.length > 0){
		contPost = 1;
		
		var urlTag = getURLParameter("tag");
		var urlCateg = getURLParameter("categoria");
		
		if(urlTag ||urlCateg || tipoBusca){
			if(urlTag != null || urlCateg != null){
				if(urlTag){
					var filtroName = "tags";
					var filtroId = filtroTagUrl;
				}
				if(urlCateg){
					var filtroName = "categoria_id";
					var filtroId = filtroCategoriaUrl;
				}

				conteudo += '<li class="infoFilter">';
					conteudo += '<div class="alturaMensagem">';
						conteudo += '<div class="mensagemPost">';
							conteudo += '<i class="fa fa-info-circle font-blue" aria-hidden="true"></i>&nbsp;';
							if(urlTag){
								conteudo += '<span class="descricaoPost">Mostrando posts que contém a tag: <a class="sbold" data-id="'+filtroId+'" data-filtro="'+filtroName+'">'+PARAMS.FILTER_NAME_SIDEBOX+'</a></span>';
							}else{
								conteudo += '<span class="descricaoPost">Mostrando posts da categoria: <a class="sbold uppercase" data-id="'+filtroId+'" data-filtro="'+filtroName+'">'+PARAMS.FILTER_NAME_SIDEBOX+'</a></span>';
							}
							conteudo += '<i class="fa fa-close mural-close-icon reset-filtro-mural" aria-hidden="true"></i>';
						conteudo += '</div>';
					conteudo += '</div>';
				conteudo += '</li>';
			}
			
			if(tipoBusca == "buscaAdv" && ((filtro.tags && filtro.tags != "") || (filtro.user_post_id && filtro.user_post_id != "") || (filtro.categoria_id && filtro.categoria_id != "")
					|| (filtro.grupo_ids && filtro.grupo_ids != ""))){
				conteudo += '<li class="infoFilter hidden">';
					conteudo += '<div class="alturaMensagem">';
						conteudo += '<div class="mensagemPost">';
							conteudo += '<i class="fa fa-info-circle font-blue" aria-hidden="true"></i>&nbsp;';
							if(filtro.tags && filtro.tags != ""){
								var tags = "";
								var tagsCount = $(".filtroPosts .campoPost .post-tags > ul.token-input-list > li.token-input-token").length;
								var i = 1;

								var filtroName = "tags";
								var filtroId = $('#idsFakeTagsFiltro').val();

								$(".filtroPosts .campoPost .post-tags > ul.token-input-list > li.token-input-token").each(function(){
									tags += '<a class="sbold" data-id="'+filtroId+'" data-filtro="'+filtroName+'">'+$(this).children("p").text()+'</a>';
									i++;
									if(i <= tagsCount){
										tags += ", ";
									}
								});
								conteudo += '<span class="descricaoPost">Mostrando posts que contém a(s) tag(s): '+tags+'</span>';
							}else if(filtro.user_post_id && filtro.user_post_id != ""){
								var users = "";
								var usersCount = $(".filtroPosts .campoPost .post-users > ul.token-input-list > li.token-input-token").length;
								var i = 1;

								var filtroName = "user_post_id";
								var filtroId = $('#filtroUser_post_id').val();

								$(".filtroPosts .campoPost .post-users > ul.token-input-list > li.token-input-token").each(function(){
									users += '<a class="sbold" data-id="'+filtroId+'" data-filtro="'+filtroName+'">'+$(this).children("p").text()+'</a>';
									i++;
									if(i <= usersCount){
										users += ", ";
									}
								});
								conteudo += '<span class="descricaoPost">Mostrando posts do(s) usuário(s): '+users+'</span>';
							}else if(filtro.categoria_id && filtro.categoria_id != ""){
								var categ = $(".filtroPosts .campoPost #filtroCategoria_id option:selected").text();

								var filtroName = "categoria_id";
								var filtroId = $('#filtroCategoria_id').val();

								conteudo += '<span class="descricaoPost">Mostrando posts da categoria: <a class="sbold uppercase" data-id="'+filtroId+'" data-filtro="'+filtroName+'">'+categ+'</a></span>';
							}else if(filtro.grupo_ids && filtro.grupo_ids != ""){
								var groups = "";
								var groupsCount = $(".filtroPosts .campoPost .post-groups > ul.token-input-list > li.token-input-token").length;
								var i = 1;

								var filtroName = "grupo_ids";
								var filtroId = $('#filtroGrupoIds').val();

								$(".filtroPosts .campoPost .post-groups > ul.token-input-list > li.token-input-token").each(function(){
									groups += '<a class="sbold" data-id="'+filtroId+'" data-filtro="'+filtroName+'">'+$(this).children("p").text()+'</a>';
									i++;
									if(i <= groupsCount){
										groups += ", ";
									}
								});
								conteudo += '<span class="descricaoPost">Mostrando posts do(s) grupo(s): '+groups+'</span>';
							}
							conteudo += '<i class="fa fa-close mural-close-icon reset-filter-mural" aria-hidden="true"></i>';
						conteudo += '</div>';
					conteudo += '</div>';
				conteudo += '</li>';
			}
		}

		for (var i = 0; i < data.posts.length; ++i) {
			var imagensPost = ""
				anexosPost = "";
	 		
	 		contPost += 1;
	 		if(data.posts[i].favorito == 0){
	 			var fav = 1;
	 			var favoritado = "";
	 			var textoFav = i18n("favoritar.label");
			}else{
	 			var fav = 0;
	 			var favoritado = i18n("mural.post.favoritado");
	 			var textoFav = i18n("mural.post.remover.favorito.label");
			}
	
	 		if(data.posts[i].like == 0){ 
	 			var curtir = 1;
	 			var curtido = "";
	 			var textoCurtir = i18n('curtir.label');
	 			var used = "";
			}else{
	 			var curtir = 0;
	 			var curtido = "active";
	 			var textoCurtir = i18n('comentar.descurtir.label');
	 			var used = "used";
			}

	 		var isDestaque = data.posts[i].checkDestaque == 1 ? "destaque" : "",
				isRascunho = data.posts[i].rascunho ? true : false,
 				prioritario = data.posts[i].prioritario ? 'prioritario' : '',
				task = data.posts[i].postTask && data.posts[i].postTask.id ? 'task' : '';

			if(data.posts[i].arquivos && data.posts[i].arquivos.length > 0){
	 			var qtdImagens = 0;
	 				
	 			anexosPost += '<ul class="anexos">';
	 			for (var a=0; a < data.posts[i].arquivos.length;a++){ 
					var extensao = (data.posts[i].arquivos[a].extensao).toLowerCase();
					if(!FILE_EXTENSIONS.image[extensao]){
						var classePlayer = "";
						if(FILE_EXTENSIONS.video[extensao]){
							classePlayer = "fancyJwplayer";
						}
						anexosPost = anexosPost;

						anexosPost += '<li data-id="'+data.posts[i].arquivos[a].id+'">';
							if(FILE_EXTENSIONS.image[extensao]){
								anexosPost += '<div class="thumbnail preview">';
									anexosPost += '<div class="fotoUsuario media no-radius>';
										anexosPost += '<a class="centraliza">';
											anexosPost += '<img src="'+data.posts[i].arquivos[a].url+'" alt="'+data.posts[i].arquivos[a].file+'" />';
										anexosPost += '</a>';
									anexosPost += '</div>';
								anexosPost += '</div>';
							}else{
								anexosPost += '<div class="thumbnail">';
									anexosPost += '<i class="file-extensions-icons-medium '+extensao+'"></i>';
									anexosPost += '<span class="extension">'+extensao+'</span>';
								anexosPost += '</div>';
							}

							anexosPost += '<div class="nomeAnexo">';
								anexosPost += '<a class="'+classePlayer+'" data-name="'+data.posts[i].arquivos[a].file+'" data-url="'+data.posts[i].arquivos[a].url+'" data-link="'+data.posts[i].arquivos[a].url+'" data-ext="'+extensao+'">'+data.posts[i].arquivos[a].file;
									anexosPost+='<span>('+(data.posts[i].arquivos[a].length/1024).toFixed(2)+'kb)</span>';
								anexosPost += '</a>';

								if(data.posts[i].arquivos[a].descricao){
		 							anexosPost+=' <span class="descricaoUpload">'+data.posts[i].arquivos[a].descricao+'</span>';
		 						}

							anexosPost += '</div>';

						anexosPost += '</li>';
	 				}
					if(FILE_EXTENSIONS.image[extensao]){
	 					qtdImagens = qtdImagens + 1;
	 				}
	 			}
	 			anexosPost += '</ul>';
				
				if(qtdImagens == 1){
					imagensPost += 	'<div class="imagensPost uma clearfix"><ul>';
										for (var a=0; a < data.posts[i].arquivos.length;a++){ 
											var descricao = "";
											if(data.posts[i].arquivos[a].descricao){
												descricao = data.posts[i].arquivos[a].descricao + " -";
											}else{
												descricao = "";
											}
											var extensao = (data.posts[i].arquivos[a].extensao).toLowerCase();

											if(FILE_EXTENSIONS.image[extensao]){
												imagensPost += 	'<li><div><a href="'+data.posts[i].arquivos[a].url+'" class="fancybox" title="'+descricao+' '+data.posts[i].arquivos[a].file+'" rel="categoria-'+data.posts[i].id+'">';
													imagensPost += '<img src="'+data.posts[i].arquivos[a].url+'"  alt="'+data.posts[i].arquivos[a].file+'" onload="this.classList.add(\'loaded\'); this.parentNode.parentNode.classList.add(\'loaded\');" />';
												imagensPost += '</a></div>'

												if(data.posts[i].arquivos[a].descricao){
													imagensPost += 	'<span class="nomeImagem">'+data.posts[i].arquivos[a].descricao+'</span>';
												}
												imagensPost += 	'</li>';
											}
										}
					imagensPost += 	'</ul></div>';
				}
				
				if (qtdImagens >= 2){
					if(qtdImagens == 2){
						var itens = "duas";
					}else if(qtdImagens == 3){
						var itens = "tres";
					}else if(qtdImagens == 4){
						var itens = "quatro";
					}else if(qtdImagens == 5){
						var itens = "cinco";
					}else{
						var itens = "seis";
					}
					imagensPost += '<div class="imagensPost clearfix '+itens+'"><ul>';
						var position = 0;
						for (var a=0; a < data.posts[i].arquivos.length;a++){ 
							var descricao = "";
							if(data.posts[i].arquivos[a].descricao){
								descricao = data.posts[i].arquivos[a].descricao + " -";
							}else{
								descricao = "";
							}
							var extensao = (data.posts[i].arquivos[a].extensao).toLowerCase();

							if(FILE_EXTENSIONS.image[extensao]){
			 					if(position == 0 && qtdImagens > 1){
			 						var left = 'first';
			 					}else if(position == 1 && qtdImagens > 2){
			 						var left = 'second';
			 					}else if(position == 2 && qtdImagens > 3 && qtdImagens != 4){
			 						var left = 'third';
			 					}else if(position == 2 && qtdImagens == 4){
			 						var left = 'third noMargin';
			 					}else if(position == 3 && qtdImagens == 4){
			 						var left = 'fourth';
			 					}else if(position == 3 && qtdImagens > 4 && qtdImagens != 5){
			 						var left = 'fourth noMargin';
			 					}else if(position == 3 && qtdImagens == 5){
			 						var left = 'fourth half';
			 					}else if(position == 4 && qtdImagens == 5){
			 						var left = 'fifth';
			 					}else if(position == 5 && qtdImagens > 6){
			 						//var left = 'sixth';		//dataCount = qtd imagens mostradas no post
			 						dataCount = 6;
			 						var count = (qtdImagens - dataCount);
			 						imagensPost += '<li class="linkFancyFotos">+ '+count+'</li>';
			 					}else{
			 						var left = '';
			 					}
			 					if(position >= 6){
			 						var showHide = 'style="display:none"';
			 					}else{
			 						var showHide = '';
			 					}
			 					imagensPost = imagensPost+ 
			 						'<li class="'+left+'" '+showHide+'><div><a href="'+data.posts[i].arquivos[a].url+'" class="fancybox" title="'+descricao+' '+data.posts[i].arquivos[a].file+'" rel="categoria-'+data.posts[i].id+'">';
		 								imagensPost += '<img src="'+data.posts[i].arquivos[a].url+'"  alt="'+data.posts[i].arquivos[a].file+'" onload="this.classList.add(\'loaded\'); this.parentNode.parentNode.classList.add(\'loaded\');" />';
				 					imagensPost += '</a></div>';

			 						if(data.posts[i].arquivos[a].descricao){
			 							imagensPost += '<span class="nomeImagem">'+data.posts[i].arquivos[a].descricao+'</span>';
			 						}
								imagensPost += 	'</li>';
			 					position = position + 1;
			 				}
						}
						imagensPost += '</ul></div>';
				}
	 		}
			
			var mensagemConteudo;
			var tema = "";
			var titulo = "";
			
			var isLink = 0;
			var isDoc = 0;

			if(data.posts[i].titulo){
				var textTitulo = data.posts[i].titulo.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
				var titulo = '<a href="'+urlContext+'/pages/post.htm?id='+data.posts[i].id+'">'+textTitulo+'</a>';
			}

			if(data.posts[i].mensagem){
				if(PARAMS.WORDPRESS_ON == "1") {
					tema = "themeWordPress";
					mensagemConteudo = {};
					mensagemConteudo.html = data.posts[i].mensagem;
				} else {
					mensagemConteudo = 	XBBCODE.process({
					    text: data.posts[i].mensagem,
					    removeMisalignedTags: false
					});
				}
			}

			conteudo += '<li id="postId-'+data.posts[i].id+'" class="'+data.posts[i].statusPubStr+' '+isDestaque+' '+prioritario+' '+task+'" data-id="'+data.posts[i].id+'">';
							if(data.posts[i].statusPubStr == "agendado"){
			conteudo += 		'<div class="status-publicacao-wrapper"><div class="status-publicacao-shadow"></div><div class="icone-status-publicacao bs-tooltip" title="Post agendado para: '+data.posts[i].dataPubStr+'"><i class="fa fa-calendar"></i></div></div>';
							}
							if(data.posts[i].status == "expirado"){
			conteudo += 		'<div class="status-publicacao-wrapper"><div class="status-publicacao-shadow"></div><div class="icone-status-publicacao bs-tooltip" title="Post expirado em: '+data.posts[i].dataExpStr+'"><i class="fa fa-calendar-times-o"></i></div></div>';
							}
							if(data.posts[i].prioritario){
			conteudo += 		'<div class="status-publicacao-wrapper"><div class="status-publicacao-shadow"></div><div class="icone-status-publicacao bs-tooltip" title="Post prioritário"><i class="fa fa-flag"></i></div></div>';
							}
							if(data.posts[i].postTask && data.posts[i].postTask.id){
			conteudo += 		'<div class="status-publicacao-wrapper"><div class="status-publicacao-shadow"></div><div class="icone-status-publicacao bs-tooltip" title="Post tarefa"><i class="fa fa-clipboard"></i></div></div>';
							}

				conteudo += '<div class="fotoUsuario pequena" data-nome="'+data.posts[i].usuarioNome+'" data-foto="'+data.posts[i].urlFotoUsuarioThumb+'" data-id="'+data.posts[i].usuarioId+'">';
					conteudo += '<a href="'+urlContext+'/usuario.htm?id='+data.posts[i].usuarioId+'" class="nome"><img src="'+data.posts[i].urlFotoUsuarioThumb+'" alt="'+data.posts[i].usuarioNome+'"/></a></div>';
				conteudo +=		'<div class="nomeGrupo">';
					conteudo +=		'<a class="nomeUsuario" data-nome="'+data.posts[i].usuarioNome+'" data-foto="'+data.posts[i].urlFotoUsuarioThumb+'" data-id="'+data.posts[i].usuarioId+'" href="'+urlContext+'/usuario.htm?id='+data.posts[i].usuarioId+'">'+data.posts[i].usuarioNome+'</a>';

						if(data.posts[i].grupos){
							conteudo +=	'<span class="gruposPost">&nbsp; para &nbsp;';
								if(data.posts[i].grupos.length > 0) {
									var contGrupo = 1;
									for(var a = 0; a < data.posts[i].grupos.length; a++){
										conteudo +=	'<a class="post-grupo" data-nome="'+data.posts[i].grupos[a].nome+'" data-tipo="'+data.posts[i].grupos[a].tipo+'" data-foto="'+data.posts[i].grupos[a].urlFotoThumb+'" data-virtual="'+data.posts[i].grupos[a].virtual+'" data-id="'+data.posts[i].grupos[a].id+'" href="'+urlContext+'/pages/mural.htm?grupo='+data.posts[i].grupos[a].id+'">'+data.posts[i].grupos[a].nome+'</a>';
										if(contGrupo < data.posts[i].grupos.length){
											conteudo +=	', ';
											contGrupo++;
										}
									}
								} else {
									if(data.posts[i].visibilidade.toLowerCase() == 'somente eu') {
										conteudo +=	'<a href="'+urlContext+'/pages/mural.htm?somenteEu=true">Somente Eu</a>';
									} else if(data.posts[i].visibilidade.toLowerCase() == 'tags') {
										conteudo +=	'Tags';
									} else {
										conteudo +=	'<a href="'+urlContext+'/pages/mural.htm?meusAmigos=true">Minhas conexões</a>';
									}
								}
							conteudo +=	'</span>';
						}

						if(data.posts[i].chapeu || data.posts[i].categoria){
							conteudo += '<p class="chapeuPost" style="color:#'+data.posts[i].categoria.cor+'">';
								conteudo += '<a class="uppercase" style="color:#'+data.posts[i].categoria.cor+'" href="mural.htm?categoria='+data.posts[i].categoria.id+'">';
									if(data.posts[i].categoria && data.posts[i].categoria.nome){
										conteudo +=	data.posts[i].categoria.nome;
									}
									if(data.posts[i].chapeu && data.posts[i].chapeu.nome){
										conteudo +=	" / "+data.posts[i].chapeu.nome;
									}
								conteudo +=	'</a>';
							conteudo +=	'</p>';
						}else{
							conteudo += '<p class="chapeuPost"><a></a></p>';
						}

			conteudo +=	'</div>';//fim nomeGrupo

			//ultima atualizacao
			if((PARAMS.MURAL_ULTIMA_ATUALIZACAO_POST_ON == '1') && (data.posts[i].timestampEdit && data.posts[i].timestampEdit != data.posts[i].timestamp)){
				conteudo +=	'<p class="dataPost data-update">';
					conteudo += '<span class="bs-tooltip timeago" title="Publicado em:<br/>'+dateConverter(data.posts[i].timestampPub)+'<br/><br/>Atualizado em:<br/>'+dateConverter(data.posts[i].timestampEdit)+'" rel="'+data.posts[i].timestampEdit+'">'+dateConverter(data.posts[i].timestampEdit)+'</span>';
					conteudo += '<span>Última atualização</span>';
				conteudo += '</p>';
			}else{
				conteudo +=	'<p class="dataPost timeago bs-tooltip" title="'+timeConverter(data.posts[i].timestampPub)+'" rel="'+data.posts[i].timestampPub+'">'+dateConverter(data.posts[i].timestampPub)+'</p>';
			}

			conteudo +=		'<div class="alturaTitulo"></div>';
							
			conteudo += 	'<h3 class="tituloPost">'+titulo+'</h3>';
			
							if(data.posts[i].resumo){
								var style = data.posts[i].statusPost ? 'style= "color: ' + data.posts[i].statusPost.cor + '"' : "";
			conteudo += 		'<p class="resumoPost" '+ style +'>'+data.posts[i].resumo+'</p>';
							}

							if(SESSION.PERMISSOES.VISUALIZAR_CONTEUDO == 'true'){
								if(data.posts[i].mensagem && !data.posts[i].resumo){
									conteudo +=	'<div class="alturaMensagem">';
										conteudo +=	'<div class="degrade"></div>';
										conteudo +=	'<div class="mensagemPost '+tema+'">';
											if(data.posts[i].html && data.posts[i].mensagem.lastIndexOf('<meta') > -1){
												conteudo += '<iframe class="webview" id="webview-post-'+data.posts[i].id+'" data-post-id="'+data.posts[i].id+'"></iframe>';
											}else{
												var body = '';
												
												if(!data.posts[i].html){
													body = XBBCODE.process({ text: data.posts[i].mensagem, removeMisalignedTags: false });
													body = body.html
												}else{
													var parser = new DOMParser(),
														parsed = parser.parseFromString(data.posts[i].mensagem, 'text/html'),
														head = parsed.head.innerHTML;
													
													body = parsed.body.innerHTML;
												}
												
												conteudo += '<article class="entry-content" data-post-id="'+data.posts[i].id+'">'+body+'</article>';
											}
										conteudo +=	'</div>';
									conteudo +=	'</div>';
									conteudo +=	'<a class="verMaisPost" href="#"><i class="icones ico-mais"></i>ver mais</a>';
								}else if(data.posts[i].mensagem && data.posts[i].resumo){
									conteudo += '<div class="mensagemPost">';
										conteudo += '<div class="descricaoPost semResumo">';
											if(data.posts[i].html && data.posts[i].mensagem.lastIndexOf('<meta') > -1){
												conteudo += '<iframe class="webview" id="webview-post-'+data.posts[i].id+'" data-post-id="'+data.posts[i].id+'"></iframe>';
											}else{
												var body = '';
												
												if(!data.posts[i].html){
													body = XBBCODE.process({ text: data.posts[i].mensagem, removeMisalignedTags: false });
													body = body.html
												}else{
													var parser = new DOMParser(),
														parsed = parser.parseFromString(data.posts[i].mensagem, 'text/html'),
														head = parsed.head.innerHTML;
													
													body = parsed.body.innerHTML;
												}
												
												conteudo += '<article class="entry-content" data-post-id="'+data.posts[i].id+'">'+body+'</article>';
											}
										conteudo += '</div>';
									conteudo += '</div>';
									conteudo +=	'<a class="verMaisPost abreDescricao" href="#"><i class="icones ico-mais"></i>ver mais</a>';
								}

								if(PARAMS.MURAL_LAYOUT_ANEXOS_REDUZIDO_ON == '1'){
									if(data.posts[i].arquivos){
										conteudo += '<div class="clearfix anexos anexos-reduzidos">';
											conteudo += '<ul>';
												for(var a in data.posts[i].arquivos){
													var arquivo = data.posts[i].arquivos[a],
														extensao = data.posts[i].arquivos[a].extensao.toLowerCase();
													
													conteudo += '<li>';
														conteudo += '<div class="thumbnail">';
															if(FILE_EXTENSIONS.image[extensao]){
																conteudo += '<div class="fotoUsuario media no-radius">';
																	conteudo += '<a class="fancybox" href="'+arquivo.url+'" target="_blank" rel="anexos-thumb-'+data.posts[i].id+'">';
																		conteudo += '<img src="'+arquivo.url+'" alt="'+arquivo.file+'" />';
																	conteudo += '</a>';
																conteudo += '</div>';
															}else{
																conteudo += '<i class="file-extensions-icons-medium '+extensao+'"></i>';
																conteudo += '<span class="extension">'+extensao+'</span>';
															}
															conteudo += '</div>';
														
															conteudo += '<div class="nomeAnexo alterarNome">';
															if(FILE_EXTENSIONS.image[extensao]){
																conteudo += '<a class="fancybox" href="'+arquivo.url+'" target="_blank" rel="anexos-name-'+data.posts[i].id+'">';
																	conteudo += arquivo.file + '<span>('+arquivo.lengthHumanReadable+')</span>';
																conteudo += '</a>';
																
																if(arquivo.descricao && arquivo.descricao != ''){
																	conteudo += '<span class="descricaoUpload">'+arquivo.descricao+'</span>';
																}
															}else{
																conteudo += '<a data-link="'+arquivo.url+'" data-url="'+arquivo.url+'" data-ext="'+extensao+'" data-name="'+arquivo.file+'" class="previewFile">'+arquivo.file;
																	conteudo += '<span>'+arquivo.lengthHumanReadable+'</span>';
																conteudo += '</a>';
																
																if(arquivo.descricao && arquivo.descricao != ''){
																	conteudo += '<span class="descricaoUpload">'+arquivo.descricao+'</span>';
																}
															}
														conteudo += '</div>';
													conteudo += '</li>';
												}
											conteudo += '</ul>';
										conteudo += '</div>';
									}
								}else{
									conteudo +=	imagensPost;
								}
				
				
								if(data.posts[i].destaque && data.posts[i].destaque.tipo != 0 && data.posts[i].destaque.tipo!= 2 && (data.posts[i].urlVideo || data.posts[i].urlSite)){
									if(data.posts[i].urlVideo){
										var linkUrlDestaque = data.posts[i].urlVideo;
										var classVideo = "comVideo";
										var classFancy = 'class="fancyboxYoutube"';
									}else{
										var linkUrlDestaque = data.posts[i].urlSite;
										var classVideo = "";
										var classFancy = 'target="_blank"';
									}

									var detailsStyle = data.posts[i].urlImagem ? '' : 'style="width: 100%";';

				conteudo +=			'<div class="liveurl active">'+
										'<div class="inner">';
											if(data.posts[i].urlImagem){
				conteudo +=					'<div class="image active '+classVideo+'"><a href="'+linkUrlDestaque+'" '+classFancy+'><img src="'+data.posts[i].urlImagem+'" alt="'+data.posts[i].destaque.titulo+'" class="active"></a></div>';
											}else if(data.posts[i].destaque.tipo == 1){
				conteudo +=					'<div class="image active '+classVideo+'"><a href="'+linkUrlDestaque+'" class="fancyJwplayer"><img src="'+urlContext+'/img/blank.gif" alt="'+data.posts[i].destaque.titulo+'" class="active"></a></div>';
											}else{
				conteudo +=					'<div class="image hide"></div>';
											}
				conteudo +=					'<div class="details" '+detailsStyle+'><div class="info">'+
												'<div class="title"><a href="'+linkUrlDestaque+'" target="_blank">'+data.posts[i].destaque.titulo+'</a></div>'+
												'<div class="url"><a href="'+linkUrlDestaque+'" target="_blank">'+linkUrlDestaque+'</a></div>'+
												'<div class="description">'+data.posts[i].destaque.descricao+'</div>'+
											'</div></div>'+
										'</div>'+
									'</div>';

									if(data.posts[i].webview && data.posts[i].destaque){
										conteudo += '<p class="liveurl-info"><small class="font-blue sbold">Este link foi embutido como HTML</small></p>';
									}
								}




				conteudo +=			anexosPost;
				conteudo +=			'<div class="clear"></div>';
								
								//	tags post
									if(data.posts[i].tags){
				conteudo += 			'<ul class="tagsList">'
										var contTags = 1;
											for(var a=0; a < data.posts[i].tagsList.length; a++){
						conteudo +=				'<li class="tagName"><a href="'+urlContext+'/pages/mural.htm?tag='+data.posts[i].tagsList[a].id+'">'+data.posts[i].tagsList[a].nome+'</a></li>';
											contTags += 1;
											}
				conteudo += 			'</ul>';
								}
									if(data.posts[i].tagsCadastroList){
					conteudo +=	'<div class="clear"></div>';
					conteudo +=	'<ul class="clearfix tagsList tagsUsuario tags-filhas-content">';
											for(var t=0; t < data.posts[i].tagsCadastroList.length; t++){
//						conteudo +=	'<span class="label label-primary tag-token-input">'+data.posts[i].tagsCadastroList[t].nome+'</span>';
						conteudo +=	'<li class="tagName tagUsuario tag-token-input bs-tooltip" title="'+data.posts[i].tagsCadastroList[t].tagPai.nome+'"><a href="'+urlContext+'/pages/mural.htm?tagUser='+data.posts[i].tagsCadastroList[t].id+'">'+data.posts[i].tagsCadastroList[t].nome+'</li>';
											}
					conteudo +=	'</ul>';
									}
									//interacao post
									if(data.posts[i].audiencia){
										if(urlAtual.indexOf("post.htm") > -1){
					conteudo += 			'<div class="campoPost postInfo view-count">';
						conteudo +=				'<label>Post visto por '+data.posts[i].audiencia.iteracao+' de '+data.posts[i].audiencia.total+' pessoas</label>';
						conteudo += 			'<div class="progress audiencia">';
							conteudo += 			'<a class="clearfix"';
													if(SESSION.PERMISSOES.VISUALIZAR_RELATORIOS == 'true'|| SESSION.USER_INFO.USER_ID == data.posts[i].usuarioId){
														conteudo += ' href="'+urlContext+'/report/detalhesAudienciaReport.htm?id='+data.posts[i].id+'"';
													}

								conteudo += 			'><div class="progress-bar" role="progressbar" data-iteracao="'+data.posts[i].audiencia.iteracao+'" style="width:'+(data.posts[i].audiencia.iteracao / data.posts[i].audiencia.total) * 100+'%"></div>'
							conteudo +=				'</a>';
						conteudo += 			'</div>';
					conteudo +=				'</div>';
										}
									}
							}//final visualizarConteudo
		
						if((data.posts[i].usuarioId == userId || (SESSION.PERMISSOES.EDITAR_PUBLICACAO == 'true' || SESSION.PERMISSOES.EXCLUIR_PUBLICACAO == 'true')) && PARAMS.WORDPRESS_ON != 1){
			conteudo +=			'<ul class="interacoesPost clearfix">';
						}else{
			conteudo +=			'<ul class="interacoesPost four clearfix">';
						}
								
								if(SESSION.PERMISSOES.CURTIR_PUBLICACAO == 'true'){
									if(data.posts[i].likeable){
					conteudo +=			'<li class="interactions"><a href="#" class="clearfix botaoLike '+used+' bs-tooltip-bottom" data-post="'+data.posts[i].id+'" data-usuario="'+userId+'" data-favorito="'+curtir+'" title="'+textoCurtir+'"><i class="linear-icons icone-likeNew '+curtido+'"></i><span ';
										if(!data.posts[i].likeCount || data.posts[i].likeCount <= 0){
					conteudo +=				'style="display:none;"';
										}
					conteudo +=			'>';
										if(!data.posts[i].likeCount){
					conteudo +=				0;
										}else{
					conteudo +=				data.posts[i].likeCount;
										}
					conteudo +=			'</span></a></li>'; //final 1a li
									}
								}//end if permissaoCurtir == 'true'
								
								if(SESSION.PERMISSOES.COMENTAR == 'true' || SESSION.PERMISSOES.VISUALIZAR_COMENTARIOS == 'true'){
									if(data.posts[i].likeable){
					conteudo +=			'<li class="interactions">';
									if(SESSION.PERMISSOES.COMENTAR == 'false' && (!data.posts[i].commentCount || data.posts[i].commentCount <= 0)){
										conteudo += '<span></span>';
									}else{
										conteudo += '<a href="#" class="clearfix botaoComentarios bs-tooltip-bottom" data-post="'+data.posts[i].id+'" data-usuario="'+userId+'" title="'+i18n('comentar.label')+'"><i class="linear-icons icone-comentarioNew"></i><span ';
											if(!data.posts[i].commentCount || data.posts[i].commentCount <= 0){
												conteudo +=	' style="display:none;" ';
											}
											conteudo +=	'>';
											if(!data.posts[i].commentCount){
												conteudo +=	0;
											}else{
												conteudo +=	data.posts[i].commentCount;
											}
										conteudo +=	'</span></a>';
									}

					conteudo += '</li>'; //final 2a li
									}
								}//end if comentario
								
								if(SESSION.PERMISSOES.CURTIR_PUBLICACAO == 'true'){
									if(data.posts[i].likeable){
				conteudo +=				'<li class="interactions"><a href="#" class="clearfix botaoFavoritoMural bs-tooltip-bottom" data-post="'+data.posts[i].id+'" data-usuario="'+userId+'" data-favorito="'+fav+'" title="'+textoFav+'"><i class="linear-icons icone-favoritoNew '+favoritado+'"></i></a></li>';
									}
								}
								//final 3a li

								if((data.posts[i].usuarioId == userId || (SESSION.PERMISSOES.EDITAR_PUBLICACAO == 'true' || SESSION.PERMISSOES.EXCLUIR_PUBLICACAO == 'true' || SESSION.PERMISSOES.ALL_GRUPOS == 'true')) && PARAMS.WORDPRESS_ON != 1){
				conteudo +=			'<li class="interactions right no-margin-right"><div class="botaoConfig">'+
										'<i class="linear-icons icone-postConfigNew"></i>'+
										'<div class="popMenu top';
										if(data.posts[i].categoria){
											if(data.posts[i].categoria.id == PARAMS.CATEGORIA_INCIDENTES_ID){
												conteudo += ' incidentes';
											}
										}
										conteudo += '">';
										conteudo += '<ul>';
											if(data.posts[i].usuarioId == userId || SESSION.PERMISSOES.EDITAR_PUBLICACAO == 'true' || SESSION.PERMISSOES.ALL_GRUPOS == 'true'){
												conteudo +=	'<li>';
													if(data.posts[i].categoria){
														if(data.posts[i].categoria.id == PARAMS.CATEGORIA_INCIDENTES_ID){
															conteudo +=	'<a class="editar-incidente" data-incidente-id="'+data.posts[i].id+'">Editar Incidente</a>';
														}else{
															conteudo +=	'<a href="'+urlContext+'/pages/postComunicado.htm?id='+data.posts[i].id+'" class="postEdit">Editar Post</a>';
														}
													}else{
														conteudo +=	'<a href="'+urlContext+'/pages/postComunicado.htm?id='+data.posts[i].id+'" class="postEdit">Editar Post</a>';
													}
												conteudo += '</li>'
											}
											if(data.posts[i].usuarioId == userId || SESSION.PERMISSOES.EXCLUIR_PUBLICACAO == 'true'){
												conteudo +=	'<li>';
													if(data.posts[i].categoria){
														if(data.posts[i].categoria.id == PARAMS.CATEGORIA_INCIDENTES_ID){
															conteudo +=	'<a class="excluir-incidente" data-incidente-id="'+data.posts[i].id+'">Excluir Incidente</a>';
														}else{
															conteudo +=	'<a href="#" class="excluirPost" data-post="'+data.posts[i].id+'">Excluir Post</a>';
														}
													}else{
														conteudo +=	'<a href="#" class="excluirPost" data-post="'+data.posts[i].id+'">Excluir Post</a>';
													}
												conteudo += '</li>'
											}
					conteudo +=			'</ul></div>'+ //popMenu top
									'</div></li>';//final 4a li
								}//enf id editar e excluir post
								
				conteudo +=			'<li class="interactions right no-margin-right"><div class="infoPost"><i class="linear-icons icone-infoNew"></i>';

					conteudo += 	'<div class="popMenu top"><ul>';
										
										if(data.posts[i].titulo){
					conteudo +=				'<li class="paddingInfoPost cinza tituloInfoPost"><a class="post-title sbold" href="'+urlContext+'/pages/post.htm?id='+data.posts[i].id+'">'+textTitulo+'</a></li>';
										}else{
					conteudo +=				'<li class="paddingInfoPost cinza tituloInfoPost"><a class="post-title sbold" href="'+urlContext+'/pages/post.htm?id='+data.posts[i].id+'">Sem título</a></li>';
										}
										
										if(data.posts[i].categoria){
					conteudo +=				'<li class="paddingInfoPost"><span class="spandarker">Categoria:</span> ';
					conteudo +=					'<a href="'+urlContext+'/pages/mural.htm?categoria='+data.posts[i].categoria.id+'" class="blue" style="color:#'+data.posts[i].categoria.cor+'">'+data.posts[i].categoria.nome+'</a></li>';
					conteudo +=				'</li>';
										}
										if(data.posts[i].grupos){
											//popMenu infoPost - li grupo
					conteudo +=				'<li class="paddingInfoPost"><span class="spandarker">Para:</span> ';
											var contGrupo = 1;
											for(var a=0; a < data.posts[i].grupos.length; a++){
						conteudo +=				'<a href="'+urlContext+'/pages/mural.htm?grupo='+data.posts[i].grupos[a].id+'" class="blue">'+data.posts[i].grupos[a].nome+'</a>';
												if(contGrupo < data.posts[i].grupos.length){
						conteudo +=					', ';
												}
												contGrupo += 1;
											}
					conteudo +=				'</li>';
										}
										if(SESSION.PERFILS.PERFIL_isAdmin){
											//popMenu infoPost - li ID Post
					conteudo +=				'<li class="paddingInfoPost"><span class="spandarker">ID Post: </span>'+'<a class="blue" href="'+urlContext+'/pages/post.htm?id='+data.posts[i].id+'">'+data.posts[i].id+'</a></li>';
										}
										if(data.posts[i].tags){
											//popMenu infoPost - li Tags
					conteudo +=				'<li class="paddingInfoPost"><span class="spandarker">Tags:</span> ';
											var contTags = 1;
											for(var a=0; a < data.posts[i].tagsList.length; a++){
						conteudo +=				'<a href="'+urlContext+'/pages/mural.htm?tag='+data.posts[i].tagsList[a].id+'" class="blue">'+data.posts[i].tagsList[a].nome+'</a>';
												if(contTags < data.posts[i].tagsList.length){
						conteudo +=					', ';
												}
												contTags += 1;
											}
										}
					conteudo +=				'</li>';
											
											//popMenu infoPost - li Datas
					conteudo +=				'<li class="paddingInfoPost">';
					
												//status publicacao
												if(data.posts[i].statusPubStr){
						conteudo +=					'<b>'+i18n("convidar.status.label")+'</b>'+data.posts[i].statusPubStr+' ';  
												}
											
												//data criacao
												if(data.posts[i].timestamp){
						conteudo +=					'<br/><b>Data Criação :</b> '+dateConverter(data.posts[i].timestamp)+'';
												}else{
						conteudo +=					'<b>Data Criação:</b> -';										
												}

												//data publicacao
												if(data.posts[i].timestampPub){
						conteudo +=					'<br/><b>Data Publicação:</b> '+dateConverter(data.posts[i].timestampPub)+' ';
													if(data.posts[i].timestampPub && data.posts[i].statusPubStr == "agendado"){
							conteudo +=				 	' - agendado';
													}
												}else{
													'<br/><b>Data Publicação:</b> - ';
												}
												
												//data edicao
												if(data.posts[i].timestampEdit && data.posts[i].timestampEdit != data.posts[i].timestamp){
						conteudo +=					'<br/><b>Data Atualização:</b> '+dateConverter(data.posts[i].timestampEdit)+' ';
												}else{
						conteudo +=					'<br/><b>Data Atualização:</b> -';
												}
												
												//data expiração
												if(data.posts[i].timestampExp){
						conteudo +=					'<br/><b>Data Expiração:</b> '+dateConverter(data.posts[i].timestampExp)+'';
													if(data.posts[i].timestampExp && data.posts[i].status == "expirado"){
						conteudo +=						' - expirado';
													}
												}else{
						conteudo +=					'<br/><b>Data Expiração:</b> -';										
												}
					conteudo +=			'</li>'; //popMenu infoPost - li Datas
												
					conteudo +=         '<li class="paddingInfoPost">';
						conteudo +=			'<b>Criado por:</b> <a class="blue" href="'+urlContext+'/usuario.htm?id='+data.posts[i].usuarioId+'">'+data.posts[i].usuarioNome+'</a><br/>';
											if(data.posts[i].usuarioUpdateId && data.posts[i].usuarioUpdateId != data.posts[i].usuarioId){
						conteudo +=				'<b>Atualizado por:</b> <a class="blue" href="'+urlContext+'/usuario.htm?id='+data.posts[i].usuarioUpdateId+'">'+data.posts[i].usuarioNomeUpdate+'</a>';
												}//else{
						//conteudo +=				'<b>Atualizado por:</b> -';											
												//}
					conteudo +=			'</li>'; //popMenu infoPost - li criado e atualizado
			
											if(PARAMS.PUSH_CHECK_ON && data.posts[i].dataPushTimestamp){
					conteudo += 				'<li class="paddingInfoPost">Push enviado dia: <strong>'+dateConverter(data.posts[i].dataPushTimestamp)+'</strong> </li>';
											}else{
					conteudo += 				'<li class="paddingInfoPost">Push não enviado.</li>';									
											}//li push enviado
											
									//if((PARAMS.USUARIO_PERMISSAO_RELATORIO && PARAMS.USUARIO_PERMISSAO_RELATORIO == 'true') || SESSION.USER_INFO.IS_ADMIN == 'true' || SESSION.USER_INFO.USER_ID == data.posts[i].usuarioId){
									if(SESSION.PERMISSOES.VISUALIZAR_RELATORIOS == 'true' || SESSION.USER_INFO.USER_ID == data.posts[i].usuarioId){
					conteudo +=			'<li class="paddingInfoPost">';
					conteudo +=				'<a class="blue" href="'+urlContext+'/report/detalhesAudienciaReport.htm?id='+data.posts[i].id+'">Relatório de Audiência</a>';
					conteudo +=			'</li>'; //li audienciaPost
									}
					
				conteudo +=			'</ul></div></li>';
		
			conteudo += '</li>'; //final 5a li

			//li rlt
//            if(data.posts[i].idRlt){
//                conteudo += '<li class="interactions">';
//                    conteudo += '<a class="visualizar-rlt" data-rlt="'+data.posts[i].idRlt+'">';
//                        conteudo += '<i class="iconesNovos icone-rlt tooltip" title="Ver RLT"></i>';
//                    conteudo += '</a>';
//                conteudo += '</li>';
//            }

			if(PARAMS.MURAL_POST_OPCOES && PARAMS.MURAL_POST_OPCOES == "1"){
				var classeLink = data.posts[i].sendNotification ? 'silenciar-post' : 'ressoar-post';
				var classeIcone = data.posts[i].sendNotification ? 'icone-bell-gray' : 'icone-bell-gray-slash';
				var title = data.posts[i].sendNotification ? 'Silenciar notificações' : 'Ativar notificações';
				conteudo +=	'<li class="interactions right no-margin-right">';
					conteudo += '<a class="clearfix post-notifications-options '+classeLink+' bs-tooltip-bottom" title="'+title+'" data-post-id="'+data.posts[i].id+'">';
						conteudo += '<i class="linear-icons '+classeIcone+'"></i>';
					conteudo += '</a>';
				conteudo += '</li>';
			}
			if(PARAMS.MURAL_POST_TASK && PARAMS.MURAL_POST_TASK == "1"){
				var classeIcone = data.posts[i].postTask ? 'icone-task-ativo' : 'icone-task';
				var classeLink = data.posts[i].postTask ? 'desativar-task' : 'ativar-task';
				var title = data.posts[i].postTask ? 'Desativar tarefa' : 'Ativar tarefa';
				conteudo +=	'<li class="interactions right no-margin-right">';
					conteudo += '<a class="clearfix post-task-options '+classeLink+' bs-tooltip-bottom" title="'+title+'" data-post-id="'+data.posts[i].id+'"'
					if(data.posts[i].postTask) { conteudo += ' data-task-id="'+ data.posts[i].postTask.id +'" '; }
						conteudo += '><i class="linear-icons '+classeIcone+'"></i>';
					conteudo += '</a>';
				conteudo += '</li>';
			}

			conteudo +=		'<div class="abreComentarios">'+
								'<ul class="listaComentarios">'+
							    	'<li class="loading"></li>'+
							    '</ul>';
								if(SESSION.PERMISSOES.COMENTAR == 'true'){
							    conteudo += '<ul class="listaComentarios comentar">'+
							        '<li class="clearfix">'+
							        	'<div class="fotoUsuario pequena" data-nome="'+data.posts[i].usuarioNome+'" data-foto="'+data.posts[i].urlFotoUsuarioThumb+'" data-id="'+data.posts[i].usuarioId+'">'+
							        	'<a><img src="'+SESSION.USER_INFO.USER_FOTO+'" alt="Foto do '+SESSION.USER_INFO.USER_NOME+'" /></a></div>'+
							            '<div class="comentario clearfix">';
							conteudo += '<textarea nome="comentario_'+data.posts[i].id+'" id="comentario_'+data.posts[i].id+'" data-post="'+data.posts[i].id+'" data-usuario="'+userId+'" class="placeholder textAutoSize" placeholder="'+i18n('comentar.escreva.seu.comentario.placeholder')+'"></textarea>';
											if(buildType != "cielo"){
												conteudo += '<div class="uploader-hold-icon"><i class="linear-icons icone-clip-grey tooltip-livecom" title="'+i18n('comentar.inserir.arquivo.button')+'"></i></div>';
							            		conteudo +=	'<div class="uploaderNovo">';
							            			conteudo += '<div class="new-attachments">';
								            			conteudo +=	'<input type="hidden" id="anexosId_'+data.posts[i].id+'" name="anexosId_'+data.posts[i].id+'" class="inputAnexos" value=""/>';
								            			conteudo +=	'<div class="multiplefileuploader" data-postId="" data-commentId="" data-msgId="" class="tooltip" title="'+i18n('comentar.inserir.anexo.button')+'"></div>';
								            			conteudo += '<div class="ajax-file-upload-more" style="display: none;"><i class="fa fa-plus-square-o"></i><p>'+i18n('comentar.continuar.adicionando.button')+'</p></div>';
							            			conteudo +=	'</div>';
							            		conteudo +=	'</div>';
											}
							conteudo +=		'<ul class="anexos"></ul>';
							            '</div>'+
							        '</li>'+
							    '</ul>';
								}
					conteudo += '</div>'; //final abreComentarios
			conteudo += '</ul>'; //final interacoesPost
		conteudo += '</li>'; //final li post
			
			if(tipoPost == "newPost"){
				$(".listaMural:not(.preview)").prepend(conteudo);
				animateCss($("#postId-"+data.posts[i].id), "bounceInDown");
			}else{
				$(".listaMural:not(.preview)").append(conteudo);
			}
			
			$('.bs-tooltip').tooltip({ html: true, container: 'body' });
			$('.bs-tooltip-bottom').tooltip({ html: true, placement: 'bottom' });
			tooltipGrupoMural($('#postId-'+data.posts[i].id+' .post-grupo'));
			tooltipNomeUsuario($('#postId-'+data.posts[i].id+' .fotoUsuario.pequena'));
			tooltipNomeUsuario($('#postId-'+data.posts[i].id+' .nomeUsuario'));
			
			$("#postId-"+data.posts[i].id).each(function(){
				var obj = $(this);
				if($(obj).find('iframe').length > 0){
					var iframe = $(obj).find('iframe'), doc = iframe && iframe[0] ? iframe[0].contentWindow.document : null;
					if(doc != null){
						doc.open();
						doc.write(data.posts[i].mensagem);
						doc.close();
					}
					
					iframe.contents().find('body').css({
						'margin': 0,
					});
				}

				verMaisPost(obj);


				if(obj.find(".mensagemPost").hasClass("themeWordPress")){
					var msg = obj.find(".mensagemPost");
					msg.find("img").each(function(){
						var img = $(this);
						if(img.closest("a")){
							img.closest("a").addClass("fancybox");
						}
					});
				}
				
				obj.find(".timeago").each(function(){
	 				var obj = $(this);
	 				var timestamp = parseInt(obj.attr("rel"),10);
	 				if(timeVerify(timestamp)){
	 					obj.timeago();
	 				}else{
	 					obj.html(dateConverter(timestamp)).removeAttr("title");
	 				}
	 			});
			});
			
			$('.textAutoSize').autosize();
			chamaUploader($("#postId-"+data.posts[i].id+" .multiplefileuploader"));
	    	findUrls("#postId-"+data.posts[i].id+" .descricaoPost", true);
	    	findUrls("#postId-"+data.posts[i].id+" .mensagemPost article", true);
	    	conteudo = "";
	    	if(isPost && tipoPost != "newPost"){
	    		$(".botaoComentarios").click();
	    	}
		}
	}else{
		if(contPost == 0 && $(".listaMural li").length <= 0){
			$(".muralVazio").html("Nenhum resultado encontrado").show();
		}else if(!isPost){
			$(".muralVazio").html("Fim das postagens").show();
		}
		$("#contentcolumn .paginaAtual").hide();
	}
	if(data && data.posts.length < 10){
		if(contPost == 0 && $(".listaMural li").length <= 0){
			$(".muralVazio").html("Nenhum resultado encontrado").show();	
		}else if(!isPost){
			$(".muralVazio").html("Fim das postagens").show();
		}
		$("#contentcolumn .paginaAtual").hide();
	}else{
		$("#contentcolumn .paginaAtual").show();
	}
	if(result.mensagem){
		$("#contentcolumn .paginaAtual").hide();
		jAlert(result.mensagem.mensagem, result.mensagem.status, null);
	}

	var textFilter = $(".infoFilter .mensagemPost").text();
	if(textFilter != ""){
		$(".infoFilter").removeClass("hidden");
	}
}

function verMaisPost(obj){
	setTimeout(function(){
		if(obj.find(".mensagemPost").length > 0){
			var altura = obj.find(".mensagemPost").height();
			if(altura > 170 || obj.find(".mensagemPost .descricaoPost").hasClass('semResumo')){
				obj.find(".verMaisPost").show();
				obj.find(".degrade").show();
			}else{
				obj.find(".verMaisPost").hide();
				obj.find(".degrade").hide();
			}
		}
	}, 780);
}

/***INSERIR ANEXOS***/
function chamaUploader(elemento){
	var _ordemArquivo;

	if($('.formPost .anexos li').length > 0){
		_ordemArquivo = $('.formPost .anexos li').length;
	}else if($('.recent-files .arquivos > li').length > 0){
		_ordemArquivo = $('.recent-files .arquivos > li').length;
	}else{
		if($('.formPost .uploadPost.clearfix .ajax-file-upload-statusbar').length > 0){
			_ordemArquivo = $('.formPost .uploadPost.clearfix .ajax-file-upload-statusbar').length;
		}else{
			_ordemArquivo = 0;
		}
	}

	elemento.each(function(){
		var obj = $(this), queueDiv = false;

		if(obj.hasClass("uploaderPost")){
			var textoUploader = '<span><b>Arraste arquivos para anexá-los <i class="icones ico-fecharFancy bs-tooltip" title="Fechar"></i></b></span>';
		}else if(obj.hasClass("newUploadPost")){
			queueDiv = "output";
			var textoUploader = '<span>Solte os arquivos em qualquer lugar para fazer o upload, ou</span>';
		}else{
			var textoUploader = '';
		}

		var regex = '/(\.|\/)('+PARAMS.UPLOAD_ALLOWED_EXTENSIONS+')$/i';
		var uploadObj = obj.uploadFile({
			url: urlContext+'/ws/uploadFile.htm',
			method: "POST",
			formData: {
	        	'dir': 'arquivos',
	        	'descricao': '',
	        	'tipo': '1',
	        	'user_id': userId,
	        	'comentario_id': obj.attr("data-commentId"),
	        	'msg_inbox_id': obj.attr("data-msgId"),
	        	'mode': 'json',
	        	'form_name': 'form',
	        	'ordem': _ordemArquivo,
	        	'dimensao': 'original',
	        	'form_name': 'form',
	        	'nonce_token': SESSION.USER_INFO.USER_ID+Date.now(),
	        	'wstoken': SESSION.USER_INFO.USER_WSTOKEN
	        },
	        sizeErrorStr: " não permitido. Tamanho máximo para upload: " + (PARAMS.UPLOAD_FILE_SIZE_MAX / 1000000) + "MB",
	        showQueueDiv: queueDiv,
	        allowedTypes: PARAMS.UPLOAD_ALLOWED_EXTENSIONS.replace(/\|/g, ','),
			fileName: "fileField",
			showDelete: true,
			showError: true,
			showFileCounter: false,
			showAbort: true,
			dragDropStr: textoUploader,
			maxFileSize:PARAMS.UPLOAD_FILE_SIZE_MAX, //200mb
			dragDrop: true,
			multiple: true,
			extErrorStr: 'Não é permitido o upload desse arquivo!',
			deleteCallback: function (data, pd) {
				var idAtual = data.file.id;
				jQuery.ajax({
					type: "post",
					url: urlContext+'/ws/deletar.htm?mode=json&form_name=form&id='+idAtual+'&tipo=arquivo',
				 	dataType: "json",
				 	data:{
				 		user: userLogin,
				 		wsVersion: wsVersion,
				 		wstoken:SESSION.USER_INFO.USER_WSTOKEN
				 	},
			        beforeSend: function(){
			        	pd.statusbar.find(".ajax-file-upload-red").addClass("ac_loading");
			        	$('#modalInsertMediaMural .btn-enviar-arquivos').addClass('disabled');
			        },
				 	success: function( data ) {
				 		pd.statusbar.remove();
				 		$('#insertMedia-editFile .insert-arquivo-preview').find('.insert-arquivo-preview-images, .insert-arquivo-preview-docs, .insert-arquivo-preview-others').removeClass('active').empty();
				 		$('#insertMedia-editFile .info-arquivo').removeClass('in').find('.info-arquivo-tamanho, .info-arquivo-dimensoes').empty();
				 		var idsAnexos = jQuery.trim(obj.closest(".uploaderNovo").find(".inputAnexos").val());
				 		idsAnexos = idsAnexos.replace(" "+idAtual+",", "");
				 		obj.closest(".uploaderNovo").find(".inputAnexos").val(idsAnexos);
				 		$('.recent-files .arquivos > li[data-arquivo-id="'+idAtual+'"], .formPost .uploadPost .ajax-file-upload-statusbar.alterarNome[data-id="'+idAtual+'"], #insertMedia-editFile .recent-files ul > li[data-arquivo-id="'+idAtual+'"]').remove();
				 		$('#modalInsertMediaMural .btn-enviar-arquivos').removeClass('disabled');

				 		setTimeout(function(){
				 			if($('.uploaderNovo').find('.ajax-file-upload-statusbar.alterarNome').length == 0 && $('.mural-postar-wrapper .anexos li').length == 0){
				 				$('.uploaderNovo .ajax-file-upload-more').fadeOut(function(){ $('.post-label-anexos').removeClass('active'); })
				 			}
			 			}, 100);
					}
				 });
			},
			onSubmit: function(files){
				_ordemArquivo++;

				if(!$('.new-attachments .ajax-file-upload-more').is(':visible'))
					$('.new-attachments .ajax-file-upload-more').fadeIn();

				if(!$('.post-label-anexos').hasClass('active'))
					$('.post-label-anexos').addClass('active');

				if(!$('.post-label-new-anexos').is(':visible') && $('.mural-postar-wrapper .anexos li').length > 0)
					$('.post-label-new-anexos').fadeIn();

				$('#modal-upload-files').modal('hide');

				uploadObj.update({
					formData: {
			        	'dir': 'arquivos',
			        	'descricao': '',
			        	'tipo': '1',
			        	'user_id': userId,
			        	'comentario_id': obj.attr("data-commentId"),
			        	'msg_inbox_id': obj.attr("data-msgId"),
			        	'mode': 'json',
			        	'form_name': 'form',
			        	'ordem': _ordemArquivo,
			        	'nonce_token': SESSION.USER_INFO.USER_ID+Date.now()
			        }
				});

				if(obj.hasClass("newUploadPost")){
					if($('#insertMedia-editFile .recent-files ul.arquivos > li').length == 0){
						$('#insertMedia-editFile .recent-files ul.arquivos').addClass('spinner-blue menor');
					}else{
						$('#insertMedia-editFile .recent-files ul.arquivos').append('<li class="clearfix mt-element-overlay placeholder"><div class="arquivo mt-overlay-1 custom-overlay"><div class="miniaturaArquivo spinner-blue menor"></div></div></li>');
					}

					$('#insertMedia-biblioteca .galeria-files ul.arquivos').prepend('<li class="clearfix mt-element-overlay placeholder"><div class="arquivo mt-overlay-1 custom-overlay"><div class="miniaturaArquivo spinner-blue menor"></div></div></li>');
					$(".seletorArquivos").scrollTop(0);
				}else if(obj.parent().hasClass("uploadPost") && !$(".postarTexto").hasClass("ativo")){
					$(".interacoesMural .postarTexto").click();
				}
			},
			onSuccess:function(files,data,xhr){
				if(data && data.mensagem && data.mensagem.status && data.mensagem.status == "ERRO"){
					toastr.error(data.mensagem.mensagem);
					return false;
				}
				var arquivo = data.file, nomeArquivo = files[0], extensao = data.file.extensao.toLowerCase(), classeFancy = FILE_EXTENSIONS.video[extensao] ? 'fancyJwplayer' : '';

				if(obj.hasClass("newUploadPost")){
					var recent = '',
						isImage = FILE_EXTENSIONS.image[arquivo.extensao.toLowerCase()] ? true : false,
						isDoc = FILE_EXTENSIONS.docs[arquivo.extensao.toLowerCase()] || FILE_EXTENSIONS.programs[arquivo.extensao] ? true : false,
						btnLabel = isImage ? 'Editar' : 'Visualizar',
						nomestr = arquivo.file.substring(0, arquivo.file.lastIndexOf('.')),
						thumbs = '';

						if(arquivo.thumbs){
							for(t in arquivo.thumbs){
								thumbs +='data-thumb-id' + t + '="'+arquivo.thumbs[t].id+'"';
								thumbs += 'data-thumb' + t + '="'+arquivo.thumbs[t].url+'" ';
								thumbs += 'data-thumb-width' + t + '="'+arquivo.thumbs[t].width+'"';
								thumbs += 'data-thumb-height' + t + '="'+arquivo.thumbs[t].height+'" ';
							}
						}else{
							thumbs += 'data-thumb=""';
						}

					recent += '<li class="clearfix recently-uploaded" data-arquivo-id="'+arquivo.id+'" data-descricao="" data-extensao="'+arquivo.extensao.toLowerCase()+'" data-dimensao="'+arquivo.dimensao+'" ';
							recent += 'data-height="'+arquivo.height+'" data-width="'+arquivo.width+'" data-length="'+arquivo.length+'" data-human="'+arquivo.lengthHumanReadable+'" data-nome="'+arquivo.file+'" data-nome-str="'+nomestr+'" data-url="'+arquivo.url+'" ';
							recent += 'data-is-image="'+isImage+'" data-is-doc="'+isDoc+'" data-ordem="'+arquivo.ordem+'" '+thumbs+'>';

						recent += '<div class="icon-destaque" data-arquivo-id="'+arquivo.id+'">';
							recent += '<i class="fa fa-star fa-2x" aria-hidden="true"></i>';
						recent += '</div>';
						recent += '<div class="icon-wrapper">';
							recent += '<i class="galeria-add-file fa fa-check-circle" title="Adicionar"></i>';
							recent += '<span class="fa-stack remove-from-recent fa-lg" title="Remover"><i class="fa fa-circle fa-stack-1x"></i><i class="fa fa-times fa-stack-1x fa-inverse"></i></span>';
						recent += '</div>';

						recent += '<div class="arquivo mt-overlay-1 custom-overlay" data-arquivo-id="'+arquivo.id+'">';
							recent += '<div class="miniaturaArquivo">';
								if(FILE_EXTENSIONS.image[arquivo.extensao.toLowerCase()]){
									recent +='<a >';
										if(FILE_EXTENSIONS.gif[arquivo.extensao.toLowerCase()]){
											recent +='<img src="'+arquivo.url+'" alt="'+arquivo.file+'" />'
										}else{
											recent += '<img src="'+arquivo.urlThumb+'"alt="'+arquivo.file+'" />'
										}
									recent += '</a>';
								}else{
									recent += '<i class="file-extensions-icons-big '+arquivo.extensao.toLowerCase()+'"></i>';
									recent += '<span class="extensaoArquivo">'+arquivo.extensao.toLowerCase()+'</span>';
								}

							recent += '</div>';

							recent += '<div class="clearfix title-wrapper">';
								recent += '<h4 class="custom-title">'+arquivo.file+'</h4>';
							recent += '</div>';

						recent += '</div>';
					recent += '</li>';

					$('#insertMedia-editFile .recent-files ul.arquivos, #insertMedia-biblioteca .galeria-files ul.arquivos').find('li.placeholder').remove();
					$('#insertMedia-editFile .recent-files ul.arquivos').removeClass('spinner-blue menor').append(recent);
					$('#insertMedia-biblioteca .galeria-files ul.arquivos').prepend(recent);
					setTimeout(function(){
						$('#insertMedia-biblioteca .galeria-files ul.arquivos li:first-child').click();
						$('#insertMedia-editFile .recent-files ul.arquivos li:last-child').click();
					}, 100);
				}else{
					//código antigo
					if(!data.file){
						jAlert("Falha no Upload", 'Atenção.', null);
					}else{
						obj.closest(".uploaderNovo").find(".ajax-file-upload-statusbar").not(".alterarNome").each(function(){
							if(nomeArquivo == $(this).find(".ajax-file-upload-filename").html()){
								var nomeAtual = '',
									date = new Date();

								date = date.getDay() + '' + date.getFullYear();

								nomeAtual += '<div class="anexo-preview">';
									if(FILE_EXTENSIONS.image[extensao]){
										nomeAtual += '<div class="fotoUsuario grande no-radius">';
											nomeAtual += '<a href="'+data.file.url+'" class="centraliza fancybox" target="_blank">';
												nomeAtual += '<img src="'+data.file.url+'" alt="'+data.file.file+'" onload="this.classList.add(\'loaded\'); this.parentNode.parentNode.classList.add(\'loaded\');" />';
											nomeAtual += '</a>';
										nomeAtual += '</div>';
									}else{
										nomeAtual += '<i class="file-extensions-icons-big '+extensao+'"></i>';
										nomeAtual += '<span class="extension">'+extensao+'</span>';
									}

									nomeAtual += '<div class="anexo-overlay">';
										if(FILE_EXTENSIONS.image[extensao]){
											nomeAtual += '<a href="'+data.file.url+'" class="anexo-nome fancybox" target="_blank" rel="lvcmnwpst-'+date+'">'+nomeArquivo+'</a>';
										}else{
											nomeAtual += '<a class="previewFile" data-name="'+data.file.name+'" data-url="'+data.file.url+'" data-link="'+data.file.url+'" data-ext="'+extensao+'">'+nomeArquivo+'</a>';
										}
										nomeAtual += '<p class="anexo-length">'+data.file.lengthHumanReadable+'</p>';
										if(data.file.descricao && data.file.descricao != ''){
											nomeAtual += '<p class="anexo-descricao anexo-editar-descricao upload" title="Clique para editar a descrição" data-arquivo-id="'+data.file.id+'">'+data.file.descricao+'</p>';
										}else{
											nomeAtual += '<a class="anexo-editar-descricao upload" data-arquivo-id="'+data.file.id+'">editar descrição</a>';
										}
									nomeAtual += '</div>';
								nomeAtual += '</div>';

								$(this).addClass("alterarNome").attr("data-id", data.file.id).attr('data-ordem', '');
								$(this).find(".ajax-file-upload-filename").html(nomeAtual);
								$(this).find(".ajax-file-upload-progress").hide();
							}
						});

						if(obj && obj[0] && obj[0].parentElement){
							var aux = obj[0].parentElement;
							var idsAnexos = $(aux).find('.inputAnexos').val();
							$(aux).find('.inputAnexos').val(idsAnexos +" "+data.file.id+",");
						}else{
							var idsAnexos = $('#anexosId').val();
							$('#anexosId').val(idsAnexos +" "+data.file.id+",");
						}
					}
				}
			},
			onError: function(files,data,errMsg){
				jAlert("Falha no Upload", 'Atenção.', null);
				$(".ajax-file-upload-statusbar ").find(".ajax-file-upload-red:not(.ajax-file-upload-abort)").show().addClass('remove-anexo-erro');
			}
		});
	});
}

function carregarComentarios(maxRows, page, userId, postId, obj){
	requestAjax = jQuery.ajax({
		type: "post",
		url: urlContext+"/ws/comentarios.htm?mode=json&form_name=form",
	 	dataType: "json",
	 	data: {
	 		user: userLogin,
            post_id: postId,
            user_logado_id: userId,
            maxRows: maxRows,
            page: page,
            wsVersion: wsVersion,
	 		wstoken:SESSION.USER_INFO.USER_WSTOKEN
        },
        beforeSend: function(){
        	obj.closest(".interacoesPost").find("div.abreComentarios").slideDown(function(){
        		if(obj.hasClass("botaoComentarios")){
            		obj.closest(".interacoesPost").find(".textAutoSize").focus();
            	}
        	});
        },
	 	success: function( data ) {
	 		var paramsNotification = {
				data: {
					user_id: SESSION.USER_INFO.USER_ID,
				},
				isBadges: true,
				isClear: true,
				isScroll: true,
				isShowTabNotification: false,
				isFlipAnimation: false,
				isSpinner: true,
				isMenuConfig: false,
				isShowNoResult: true,
				isAbort: true
			};

	 		if(SESSION.NOTIFICATIONS.LIST_NOTIFICATIONS && SESSION.NOTIFICATIONS.LIST_NOTIFICATIONS != ""){
	 			paramsNotification.data.list = SESSION.NOTIFICATIONS.LIST_NOTIFICATIONS;
	 		}

	 		notifications.getNotifications(paramsNotification);

	 		if(data.list || data.mensagem.status != "ERROR"){
		 		var conteudo = "";
		 		var botaoVerMais = "";
		 		if(page > 0){
		 			obj.closest(".interacoesPost").find(".btVerComentarios").attr("data-page", Number(page)+1);
		 		}else{
		 			if(data.list.length > (maxRows-1)){
		 				if(obj.closest(".interacoesPost").find(".btVerComentarios").length <= 0){
		 					obj.closest(".interacoesPost").find(".abreComentarios").prepend('<a href="#" data-page="1" data-post="'+obj.attr("data-post")+'" class="comentariosAnteriores btVerComentarios">'+i18n("comentar.carregar.comentarios")+'</a>');
		 				}
			 		}
		 		}
		 		for (var i=0;i<data.list.length;i++){
		 			if(data.list[i].userId == userId || SESSION.PERFILS.PERFIL_isAdmin){
		 				var configItem = '<a href="#" class="inline-link editarComentario" data-usuario="'+data.list[i].userId+'" data-post="'+data.list[i].postId+'" data-comment="'+data.list[i].id+'">'+i18n("comentar.editar.link")+'</a>'+
	                                     '<a href="'+urlContext+'/ws/deletar.htm?mode=json&form_name=form&id='+data.list[i].id+'&tipo=comentario" class="inline-link excluirComentario">'+i18n("comentar.excluir.link")+'</a>';
		 			}else{
		 				var configItem = '';
		 			}
		 			if(data.list[i].arquivos){
		 				var anexos = "";
						for (var a=0; a < data.list[i].arquivos.length;a++){ 
							var classePlayer = "";
							if((data.list[i].arquivos[a].extensao).toLowerCase() == "mp3" || (data.list[i].arquivos[a].extensao).toLowerCase() == "mp4" || (data.list[i].arquivos[a].extensao).toLowerCase() == "mov"){
								classePlayer = "fancyJwplayer";
							}
							var linkAnexo = '';
							anexos = anexos+'<li class="comentario-anexo" data-id="'+data.list[i].arquivos[a].id+'">';
								anexos += '<div class="anexo-preview">';
									if(FILE_EXTENSIONS.image[data.list[i].arquivos[a].extensao.toLowerCase()]){
										anexos += '<div class="fotoUsuario grande no-radius">';
											anexos += '<a href="'+data.list[i].arquivos[a].url+'" class="centraliza fancybox" target="_blank">';
												anexos += '<img src="'+data.list[i].arquivos[a].url+'" alt="'+data.list[i].arquivos[a].file+'" onload="this.classList.add(\'loaded\'); this.parentNode.parentNode.classList.add(\'loaded\');" />';
											anexos += '</a>';
										anexos += '</div>';
									}else{
										anexos += '<i class="file-extensions-icons-big '+data.list[i].arquivos[a].extensao.toLowerCase()+'"></i>';
										anexos += '<span class="extension">'+data.list[i].arquivos[a].extensao.toLowerCase()+'</span>';
									}

									anexos += '<div class="anexo-overlay">';
										if(FILE_EXTENSIONS.image[data.list[i].arquivos[a].extensao.toLowerCase()]){
											anexos += '<a href="'+data.list[i].arquivos[a].url+'" class="anexo-nome fancybox" target="_blank" rel="lvcmcmt-'+data.list[i].id+'">'+data.list[i].arquivos[a].file+'</a>';
										}else{
											anexos += '<a class="previewFile" data-name="'+data.list[i].arquivos[a].name+'" data-url="'+data.list[i].arquivos[a].url+'" data-link="'+data.list[i].arquivos[a].url+'" data-ext="'+data.list[i].arquivos[a].extensao.toLowerCase()+'">'+data.list[i].arquivos[a].file+'</a>';
										}
										anexos += '<p class="anexo-length">'+data.list[i].arquivos[a].lengthHumanReadable+'</p>';
										if(data.list[i].arquivos[a].descricao && data.list[i].arquivos[a].descricao != ''){
											anexos += '<p class="anexo-descricao" data-arquivo-id="'+data.list[i].arquivos[a].id+'">'+data.list[i].arquivos[a].descricao+'</p>';
										}
									anexos += '</div>';
								anexos += '</div>';
		 					anexos += '</li>';
						}
						
						var listaAnexos = '<ul class="anexos">'+anexos+'</ul>';
		 			}else{
		 				var listaAnexos = '';
		 			}
		 			if (data.list[i].like > 0){
		 				var textoCurtir = i18n('comentar.descurtir.label');
		 			}else {
		 				var textoCurtir = i18n('curtir.label');
		 			}

		 			if (data.list[i].likeCount == 0){
		 				var displayLike = "none";
		 			}else{
		 				var displayLike = "block";
		 			}

		 			if(data.list[i].like == 1){
		 				var curtido = "active";
		 				var dataFavorito = "0";
		 				var used = "used";
		 			}else{
		 				var curtido = "";
		 				var dataFavorito = "1";
		 				var used = "";
		 			}

		 			if(SESSION.PERMISSOES.CURTIR_COMENTARIOS == 'true'){
		 				var likeComentario = '<a href="#" class="botaoLikeMini '+used+'" data-favorito="'+dataFavorito+'" data-usuario="'+userId+'" data-comentario="'+data.list[i].id+'" title="'+textoCurtir+'"><i class="linear-icons icone-likeNewMini '+curtido+'"></i><span style="display:'+displayLike+';">'+data.list[i].likeCount+'</span></a>';
		 			}else{
		 				var likeComentario = '';
		 			}
		 			
		 			var dataTimeStamp = data.list[i].timestamp;
			 		conteudo += '<li class="clearfix" data-comentario-id="'+data.list[i].id+'">'+
			                    	'<div class="fotoUsuario pequena" data-nome="'+data.list[i].nome+'" data-foto="'+data.list[i].urlFotoThumb+'" data-id="'+data.list[i].userId+'"><a href="'+urlContext+'/usuario.htm?id='+data.list[i].userId+'"><img src="'+data.list[i].urlFotoThumb+'" alt="Foto do '+data.list[i].nome+'" /></a></div>'+
			                        '<div class="comentario clearfix">'+
			                            '<a class="nomeUsuario" data-nome="'+data.list[i].nome+'" data-foto="'+data.list[i].urlFotoThumb+'" data-id="'+data.list[i].userId+'" href="'+urlContext+'/usuario.htm?id='+data.list[i].userId+'">'+data.list[i].nome+'</a>'+
			                            '<span class="dataPost timeago bs-tooltip" title="'+timeConverter(dataTimeStamp)+'" rel="'+dataTimeStamp+'">'+data.list[i].data+'</span>'+
			                            configItem +
			                            '<pre>'+data.list[i].msg+'</pre>'+
			                            listaAnexos + likeComentario+
			                        '</div>'+
			                    '</li>';
		 		}
		 		
		 		if(data.list && data.list.length == 0){
		 			conteudo += '';
		 		}

		 		if(obj.hasClass("botaoComentarios")){
		 			obj.closest(".interacoesPost").find(".abreComentarios .listaComentarios:first").prepend(conteudo).find("li.loading").hide();
		 		}else{
		 			obj.closest(".interacoesPost").find(".abreComentarios .listaComentarios:first").prepend(conteudo).find("li.loading").hide();
		 			obj.removeClass("ac_loading");
		 		}
		 		
		 		$('.botaoLikeMini').tooltip({ html: true, placement: 'bottom' });

		 		obj.closest(".interacoesPost").find(".abreComentarios").slideDown(function(){
		 			var sp = $('.botaoComentarios[data-post="'+postId+'"]').find('span');
		 			var ts = sp.text();
		 			if(data.list.length > ts){
		 				sp.text(data.list.length);
		 			}
		 			findUrls(obj.closest(".interacoesPost").find(".abreComentarios .listaComentarios:first > li .comentario > p"));
		 			
		 			obj.closest(".interacoesPost").find(".listaComentarios:first .dataPost").each(function(){
		 				var obj = $(this);
		 				var timestamp = parseInt(obj.attr("rel"),10);
		 				if(timeVerify(timestamp)){
		 					obj.timeago();
		 				}else{
		 					obj.html(dateConverter(timestamp)).removeAttr("title");
		 				}
		 			});
		 		});
		 		if(data.list.length < 5){
		 			obj.closest(".interacoesPost").find(".btVerComentarios").remove();
		 		}
		 		findUrls(".comentario pre");
	 		}else{
	 			if(obj.hasClass("botaoComentarios")){
		 			obj.closest(".interacoesPost").find(".abreComentarios .listaComentarios:first").find("li.loading").hide();
		 		}else{
		 			obj.closest(".interacoesPost").find(".abreComentarios .listaComentarios:first").find("li.loading").hide();
		 			obj.removeClass("ac_loading");
		 		}
	 		}
	 		tooltipNomeUsuario($('#postId-'+postId+' .fotoUsuario.pequena'));
			tooltipNomeUsuario($('#postId-'+postId+' .nomeUsuario'));
	 	}
	 });
}
function posicionaLabels(){
	$(".formPost .ativarPlaceholder").each(function(e){
		var novaLargura = $(this).width();
		if(novaLargura < 114){
			$(this).closest("div").find(".mascaraLabel").addClass("fixHeight");
		}else{
			$(this).closest("div").find(".mascaraLabel").removeClass("fixHeight");
		}
	});
}

function ajaxGet(url, params, beforeSend, success) {
	jQuery.ajax({
		type: "GET",
		url: url,
	 	dataType: "json",
	 	data: params,
        beforeSend: function (data){
        	if(typeof beforeSend == 'undefined' || beforeSend == null && typeof beforeSend != "function") {
        		return;
        	}
        	beforeSend(data);
        },
	 	success: function(data) {
	 		if(typeof success == 'undefined' || success == null && typeof success != "function") {
        		return;
        	}
	 		success(data);
	 	}
	 });
}

$(document).ajaxSend(function(event, jqxhr, settings){
	var url = settings.url;
	if(!url.startsWith('http://') && !url.startsWith('https://')){
		jqxhr.setRequestHeader('nonce_token', SESSION.USER_INFO.USER_ID && SESSION.USER_INFO.USER_ID != '' ? SESSION.USER_INFO.USER_ID+Date.now() : 'notlogged'+Date.now());
	}
	if(typeof settings.data != 'undefined' && settings.data != null){
		if(typeof settings.data != 'object'){
			if(settings.data.lastIndexOf('&') > -1 || settings.data.lastIndexOf('=') > -1){
				settings.data += '&wstoken='+SESSION.USER_INFO.USER_WSTOKEN;
				if(PARAMS.NONCE_ON == '1')
					settings.data += '&nonce_token='+SESSION.USER_INFO.USER_ID+Date.now();
			}else{
				if(settings.url.lastIndexOf('ws/uploadFile.htm') == -1){
					if(settings.data) {
						var json = JSON.parse(settings.data);
						json.wstoken = SESSION.USER_INFO.USER_WSTOKEN;
						if(PARAMS.NONCE_ON == '1')
							json.nonce_token = SESSION.USER_INFO.USER_ID+Date.now();

						settings.data = JSON.stringify(json);
					}
				}
			}
		}else{
			if(settings.url.lastIndexOf('ws/uploadFile.htm') == -1){
				var json = JSON.parse(settings.data);
				json.wstoken = SESSION.USER_INFO.USER_WSTOKEN;
				if(PARAMS.NONCE_ON == '1')
					json.nonce_token = SESSION.USER_INFO.USER_ID+Date.now();

				settings.data = JSON.stringify(json);
			}
		}
	}
});

function showModal(idOrClass) {
	$(idOrClass).show();
	$("#overlay").show();
}

function closeModal(idOrClass) {
	$(idOrClass).hide();
	$("#overlay").hide();
}

function searchFilter(url, queryParam, idOrClassElement, propertyToSearch, limit, method, valuesSelected) {
	if(!valuesSelected) {
		valuesSelected = [];
	} else if(typeof valuesSelected  == 'object') {
		valuesSelected = [valuesSelected];
	}
	$(idOrClassElement).tokenInput(url, {
		method: method,
		queryParam: queryParam,
		jsonContainer : null,
		tokenLimit: limit,
		hintText: "Comece a digitar para buscar.",
        noResultsText: "Nenhum item encontrado",
        searchingText: "Carregando...",
        preventDuplicates: true,
        propertyToSearch: propertyToSearch,
        onAdd: function (item) {
			$(this).val(item.id);
        },
        onDelete: function (item) {
        	$(this).val("");
        },
        prePopulate: valuesSelected // [{obj1}, {obj2}] // array
    });
}

function httpPost(url, params, success, error, beforeSend, contentType) {
	if(!contentType) {
		contentType = "application/json";
	}
	
	if(contentType == "application/json") {
		params = JSON.stringify(params);
	}
	
	jQuery.ajax({
		url: url,
		type: "POST",
		contentType: contentType,
		data: params,
		beforeSend: function(data) {
			if(beforeSend) {
				beforeSend(data);
			}
		},
		success: function(data) {
			if(success) {
				success(data);
			}
		},
		error: function(xhr) {
			if(error) {
				error(xhr);
			} else {
				if(JSON.parse(xhr.responseText)) {
					var json = JSON.parse(xhr.responseText);
					if(json.message) {
						jAlert(json.message, "Atenção", null);
						return;
					}
				}
				jAlert("Desculpe, ocorreu um erro ao tentar realizar o cadastro", "Atenção", null);
			}
		}
	});
}

function httpPut(url, params, success, error, beforeSend, contentType) {
	if(!contentType) {
		contentType = "application/json";
	}
	
	if(contentType == "application/json") {
		params = JSON.stringify(params);
	}
	
	jQuery.ajax({
		url: url,
		type: "PUT",
		contentType: contentType,
		data: params,
		beforeSend: function(data) {
			if(beforeSend) {
				beforeSend(data);
			}
		},
		success: function(data) {
			if(success) {
				success(data);
			}
		},
		error: function(xhr) {
			if(error) {
				error(xhr);
			} else {
				if(JSON.parse(xhr.responseText)) {
					var json = JSON.parse(xhr.responseText);
					if(json.message) {
						jAlert(json.message, "Atenção", null);
						return;
					}
				}
				jAlert("Desculpe, ocorreu um erro ao atualizar o registro", "Atenção", null);
			}
		}
	});
}

function httpGet(url, params, success, error, beforeSend, contentType) {
	if(!contentType) {
		contentType = "application/json";
	}
	if(contentType == "application/json" && params) {
		params = JSON.stringify(params);
	}
	
	jQuery.ajax({
		url: url,
		type: "GET",
		contentType: contentType,
		data: params,
		beforeSend: function(data) {
			if(beforeSend) {
				beforeSend(data);
			}
		},
		success: function(data) {
			if(success) {
				success(data);
			}
		},
		error: function(xhr) {
			if(error) {
				error(data);
			} else {
				if(JSON.parse(xhr.responseText)) {
					var json = JSON.parse(xhr.responseText);
					if(json.message) {
						jAlert(json.message, "Atenção", null);
						return;
					}
				}
				jAlert("Desculpe, ocorreu um erro na pesquisa", "Atenção", null);
			}
		}
	});
}

function httpDelete(url, success, error, beforeSend, contentType) {
	if(!contentType) {
		contentType = "application/json";
	}
	
	jQuery.ajax({
		url: url,
		type: "DELETE",
		contentType: contentType,
		beforeSend: function(data) {
			if(beforeSend) {
				beforeSend(data);
			}
		},
		success: function(data) {
			if(success) {
				success(data);
			}
		},
		error: function(xhr) {
			if(error){
				error(xhr);
			}
		}
	});
}
//consulta novos posts mural -- deprecated, tem que refazer
var novosPosts = function(){}
/* var novosPosts = function(msg){
	var lastPostId = "";
	if(msg.tipo == "newPost") {
		lastPostId = $("body").find('.listaMural li:first-child').attr("data-id");
	}
	
	jQuery.ajax({
		type: "post",
		url: urlContext+"/ws/buscaPostsUsuarios.htm?mode=json&form_name=form",
	 	dataType: "json",
		data: {
	 		user_id: userLogin,
	 		buscaUsuarios: 0,
	 		buscaPosts: 1,
	 		buscaResumida: 0,
	 		comAnexo: 0,
	 		meusFavoritos: 0,
	 		meusRascunhos: 0,
	 		novos_posts_id: lastPostId,
	 		page: 0,
	 		maxRows: -1
		},
		success: function (data){
			var posts = data.busca.posts;
			if(posts && posts.length > 0){
				var textoLink = "";
				if(posts.length == 1){
					textoLink = "Você possui 1 novo post";
				}else{
					textoLink = "Você possui "+posts.length+" novos posts";
				}
				$(".stream-mural a").text(textoLink);
				$(".stream-mural").slideDown();
	 		}
		}
	});
} */


function loadTable(conteudo, rowReorder) {
	if(jsUtils.isNumber(conteudo) || jsUtils.isObject(conteudo)) {
		return dtTableUtils(conteudo);
	} else {
		$(".table > tbody").append(conteudo);
		return dtTableUtils(null, rowReorder);
	}
}

//highlight usuario sideBox
function highlightUser(){
	var user = getURLParameter("user_post_id");
	
	$("ul.list-group-usuarios li[data-id='"+user+"']").addClass("active");
}

//highlight grupo sideBox
function highlightGrupo(){
	var grupo = getURLParameter("grupo");
	
	$("ul.list-group-grupos li[data-id='"+grupo+"']").addClass("active");
}

//highlight link sideBox
function highlightLink(){
	var postId = getURLParameter("id");

	$("ul.listaLinks li[data-postid='"+postId+"']").addClass("active");
}

//highlight arquivo sideBox
function highlightArquivo(){
	var arquivo = getURLParameter("arquivo");

	$("ul.lista-arquivos li[data-id='"+arquivo+"']").addClass("active");
}

//highlight tag sideBox
function highlightTag(){
	var tag = getURLParameter("tag");
	$('ul.list-group-tags li[data-id="'+tag+'"]').addClass('ativo');
}

//highlight categoria sideBox
function highlightCateg(){
	var categ = getURLParameter("categoria");
	
	if(categ  != ""){
		var categLi = $("body").find("ul.list-group-categorias li"); 
		categLi.each(function(){
			var dataId = $(this).attr("data-id");
			if(typeof dataId !== typeof undefined && dataId !== false){
				if(dataId == categ){
					$("body").find("ul.list-group-categorias li[data-id='"+categ+"']").addClass("ativo");
				}
			}
		});
	}
}

//limpa os valores das tags da usuario
function clearTagsUsuarioPost(){
	var numTags = $('.lista-tags-post').find('.campoPost').length;
	for(var i = 0; i < numTags; i++){
		var elm = $('.lista-tags-post').find('.campoPost')[i];
		var idElm = $(elm).attr('data-id');
		$('.lista-tags-post').find('#idsTagsUsuario-'+idElm).val("");
	}
}


//tooltip categoria sideBox
function tooltipCateg(obj){
	$(obj).each(function(){
		var categId = $(this).attr("data-id");
		var categName = $(this).attr("data-name");
		var categColor = $(this).attr("data-cor");
		var textShadow = "";
		if(categColor) {
			categColor = categColor.indexOf("#") > -1	 ? categColor : "#"+categColor;
		}
		if(categColor == "#FFF" || categColor == "#fff" || categColor == "#FFFFFF" || categColor == "#ffffff"){
			textShadow += '1px 1px 3px #000';
		}else{
			textShadow += 'none';
		}
		var categUserCreate = $(this).attr("data-userCreate");
		var categUserCreateID = $(this).attr("data-userCreateID");
		
		
		$(this).tooltipster({
			contentAsHTML: true,
			interactive: true,
			theme: 'tooltipster-livecom',
			content:'<div class="tooltip-info">'+
						'<p class="tooltip-info-name"><a style="color: '+categColor+'; text-shadow: '+textShadow+';">'+categName+'</a></p>'+
						'<p class="tooltip-info-second">Criada por: <a href="'+urlContext+'/usuario.htm?id='+categUserCreateID+'" target="_blank">'+categUserCreate+'</a></p>'+
					'</div>'
		});
	});
}

//tooltip tag sideBox
function tooltipTag(obj){
$(obj).each(function(){
	var tagId = $(this).attr("data-id");
	var tagName = $(this).attr("data-name");
	var tagUserCreate = $(this).attr("data-userCreate");
	var tagUserCreateID = $(this).attr("data-userCreateID");
	
	$(this).tooltipster({
		contentAsHTML: true,
		interactive: true,
		theme: 'tooltipster-livecom',
		content:'<div class="tooltip-info">'+
					'<p class="tooltip-info-name"><a>'+tagName+'</a></p>'+
					'<p class="tooltip-info-second">Criada por: <a href="'+urlContext+'/usuario.htm?id='+tagUserCreateID+'" target="_blank">'+tagUserCreate+'</a></p>'+
				'</div>'
	});
});
}

//tooltip grupo mural
function tooltipGrupoMural(obj){
	obj.each(function(){
		var nomeGrupo = $(this).attr("data-nome"),
			idGrupo = $(this).attr("data-id"),
			fotoGrupo = $(this).attr('data-foto'),
			tipoGrupo = $(this).attr('data-tipo'),
			isVirtual = $(this).attr('data-virtual');

		if(PARAMS.TIPO_GRUPO_ON == '1'){
			if(tipoGrupo){
				switch(tipoGrupo){
					case 'ABERTO':
						tipoGrupo = 'Tipo: Aberto';
						break;
					case 'ABERTO_FECHADO':
						tipoGrupo = 'Tipo: Aberto com Aprovação';
						break;
					case 'PRIVADO_OPCIONAL':
						tipoGrupo = 'Tipo: Privado Opcional';
						break;
					case 'PRIVADO':
						tipoGrupo = 'Tipo: Privado';
						break;
					default:
						tipoGrupo = 'Tipo: '+item.tipo;
				}
			}

			if(isVirtual == 'true'){
				tipoGrupo = 'Tipo: <i class="fa fa-desktop"></i> Grupo virtual';
			}
		}else{
			tipoGrupo = '';
		}

		if(fotoGrupo != ''){
			var grupoImg = fotoGrupo;
			if(grupoImg){
				if(grupoImg.substr(0,4).indexOf('img/') > -1) {
					grupoImg = urlContext + '/' + grupoImg;
				}
			}else{
				grupoImg = urlContext + "/imagens/bg_grupo_thumb.jpg";
			}
		}else{
			var grupoImg = urlContext + "/imagens/bg_grupo_thumb.jpg";
		}

		$(this).tooltipster({
			contentAsHTML: true,
			multiple: true,
			theme: 'tooltipster-livecom',
			interactive: true,
			content: '<div class="fotoUsuario no-radius"><a class="centraliza"><img src="'+grupoImg+'" alt="Foto do '+nomeGrupo+'" /></a></div>'+
					 '<div class="tooltip-info">'+
					 	'<p class="tooltip-info-name font-blue">'+nomeGrupo+'</p>'+
						'<p class="tooltip-info-second form-group">'+tipoGrupo+'</p>'+
						'<div class="clearfix">' +
						 	'<a class="font-green-sharp sbold" href="'+urlContext+'/pages/mural.htm?grupo='+idGrupo+'">Ver Mural</a><span class="font-dark sbold"> | </span>' +
						 	'<a class="font-blue-sharp sbold" href="'+urlContext+'/grupo.htm?id='+idGrupo+'">Ver Grupo</a>' +
						 '</div>' +
					 '</div>'
		});
	});
}

//tooltip usuario (notificacao agrupada)
function tooltipUsuario(obj){
	obj.each(function(){
		var userName = $(this).attr("data-nome"),
			userPhoto = $(this).attr('data-foto'),
			userId = $(this).attr('data-userId');
		if((userName != undefined) && (userPhoto != undefined) && (userId != undefined)){
			$(this).tooltipster({
				contentAsHTML: true,
				multiple: true,
				theme: 'tooltipster-livecom',
				interactive: true,
				content: '<div class="fotoUsuario no-radius"><a class="centraliza"><img src="'+userPhoto+'" alt="Foto do '+userName+'" /></a></div>'+
				'<div class="tooltip-info">'+
				'<a class="tooltip-info-name font-blue" href="'+urlContext+'/usuario.htm?id='+userId+'">'+userName+'</a>'+
//						'<p class="tooltip-info-second form-group">'+tipoGrupo+'</p>'+
				'<div class="clearfix">' +
				'<a class="font-green-sharp sbold" href="'+urlContext+'/pages/mural.htm?user_post_id='+userId+'">Ver Mural</a><span class="font-dark sbold"> | </span>' +
				'<a class="font-blue-sharp sbold" href="'+urlContext+'/pages/chat.htm?user='+userId+'">Conversar</a>' +
				'</div>' +
				'</div>'
			});
		}
	});
}

function tooltipNomeUsuario(obj){
	obj.each(function(){
		var userName = $(this).attr("data-nome"),
			userPhoto = $(this).attr('data-foto'),
			userId = $(this).attr('data-id');

		if((userName != undefined) && (userPhoto != undefined) && (userId != undefined)){
			$(this).tooltipster({
				contentAsHTML: true,
				multiple: true,
				theme: 'tooltipster-livecom',
				interactive: true,
				content: '<div class="fotoUsuario no-radius"><a class="centraliza"><img src="'+userPhoto+'" alt="Foto do '+userName+'" /></a></div>'+
				'<div class="tooltip-info">'+
				'<a class="tooltip-info-name font-blue" href="'+urlContext+'/usuario.htm?id='+userId+'">'+userName+'</a>'+
//						'<p class="tooltip-info-second form-group">'+tipoGrupo+'</p>'+
				'<div class="clearfix">' +
				'<a class="font-green-sharp sbold" href="'+urlContext+'/pages/mural.htm?user_post_id='+userId+'">Ver Mural</a><span class="font-dark sbold"> | </span>' +
				'<a class="font-blue-sharp sbold" href="'+urlContext+'/pages/chat.htm?user='+userId+'">Conversar</a>' +
				'</div>' +
				'</div>'
			});
		}
	});
}

function tooltipPostAvaliacao(obj){
	obj.each(function(){
		var postId = $(this).attr('data-post'),
			userId = $(this).attr('data-usuario'),
			rate = $(this).data('rate');
		/* ,
			rate1 = '-o',
			rate2 = '-o',
			rate3 = '-o',
			rate4 = '-o',
			rate5 = '-o'; */

		if((postId != undefined) && (userId != undefined)){
		    /*if($(this).hasClass('rated')){
		    	if($(this).hasClass('rate1')){
		    		rate1 = '';
		    	}else if($(this).hasClass('rate2')){
		    		rate1 = '';
		    		rate2 = '';
		    	}else if($(this).hasClass('rate3')){
		    		rate1 = '';
		    		rate2 = '';
		    		rate3 = '';
		    	}else if($(this).hasClass('rate4')){
		    		rate1 = '';
		    		rate2 = '';
		    		rate3 = '';
		    		rate4 = '';
		    	}else if($(this).hasClass('rate5')){
		    		rate1 = '';
		    		rate2 = '';
		    		rate3 = '';
		    		rate4 = '';
		    		rate5 = '';
		    	}
		    }*/
			$(this).tooltipster({
				contentAsHTML: true,
				multiple: true,
				theme: 'tooltipster-livecom',
				interactive: true,
				content: '<div class="tooltip-info clearfix">'+
						'<p class="tooltip-info-name title-avalia-post sbold font-blue-sharp">Avaliar o post</p>'+
						'<div class="clearfix rate-content rate-'+rate+'">' +
							'<a class="font-yellow avalia-post rate1" onclick="avaliaPost('+postId+','+userId+', 1, this)"><i class="fa fa-2x fa-star-o" aria-hidden="true"></i></a>'+
							'<a class="font-yellow avalia-post rate2" onclick="avaliaPost('+postId+','+userId+', 2, this)"><i class="fa fa-2x fa-star-o" aria-hidden="true"></i></a>'+
	        				'<a class="font-yellow avalia-post rate3" onclick="avaliaPost('+postId+','+userId+', 3, this)"><i class="fa fa-2x fa-star-o" aria-hidden="true"></i></a>'+
	        				'<a class="font-yellow avalia-post rate4" onclick="avaliaPost('+postId+','+userId+', 4, this)"><i class="fa fa-2x fa-star-o" aria-hidden="true"></i></a>'+
	        				'<a class="font-yellow avalia-post rate5" onclick="avaliaPost('+postId+','+userId+', 5, this)"><i class="fa fa-2x fa-star-o" aria-hidden="true"></i></a>'+
					'</div></div>'
			});
		}
	});
}

function avaliaPost(post, user, rate, obj){
    var pai = obj.parentElement;
    $(pai).find('i').removeClass('fa-star').addClass('fa-star-o');
    for(i = 0; i <= rate; i++){
    	$(pai).find('a.avalia-post.rate'+i).find('i').removeClass('fa-star-o').addClass('fa-star');
    }
    jQuery.ajax({
	type: 'POST',
	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	url: urlContext + '/rest/post/rating?post='+post+'&user='+user+'&rating='+rate,
	beforeSend: function(){
		$('.listaMural #postId-'+post+' .interactions .post-avaliacao i').addClass('ac_loading');
	},
	success: function(resp){
		if(resp.status != 'OK'){
			toastr.error(resp.message);
		}else{
			var aval = $('.listaMural #postId-'+post+' .interactions a.post-avaliacao');
			$(aval).tooltipster('destroy');
			
		    if($(aval).hasClass('rated')){
		    	if($(aval).hasClass('rate1')){
		    		$(aval).removeClass('rate1');
		    	}else if($(aval).hasClass('rate2')){
		    		$(aval).removeClass('rate2');
		    	}else if($(aval).hasClass('rate3')){
		    		$(aval).removeClass('rate3');
		    	}else if($(aval).hasClass('rate4')){
		    		$(aval).removeClass('rate4');
		    	}else if($(aval).hasClass('rate5')){
		    		$(aval).removeClass('rate5');
		    	}
		    }
		    
		    $('.listaMural #postId-'+post+' .interactions .post-avaliacao').data('rate', rate).attr('data-rate', rate);
		    $(aval).addClass('rated rate'+rate);
		    $('.listaMural #postId-'+post+' .interactions .post-avaliacao i').removeClass('ac_loading');
		    
		    setTimeout(function(){
		    	tooltipPostAvaliacao($('.listaMural #postId-'+post+' .interactions .post-avaliacao'));
		    }, 100);
			toastr.success(resp.message);
		}
	},
	error: function(resp){
		toastr.error(resp.message);
	}
    });
}

//tooltip usuario cadastro
function createTooltip(obj){
	obj.each(function(){
		var userName = $(this).attr("data-name"),
			userPhoto = $(this).attr("data-img"),
			userSince = $(this).attr("data-since"),
			userCargo = $(this).attr("data-cargo");

		$(this).tooltipster({
			contentAsHTML: true,
			multiple: true,
			theme: 'tooltipster-livecom',
			interactive: true, 
			content:'<div class="fotoUsuario"><a class="centraliza"><img src="'+userPhoto+'" alt="Foto do '+userName+'" /></a></div>'+
					'<div class="tooltip-info">'+
						'<p class="tooltip-info-name"><a>'+userName+'</a></p>'+
						'<p class="tooltip-info-second">Cargo: '+userCargo+'</p>'+
						'<p class="tooltip-info-second">Membro desde: '+userSince+'</p>'+
					'</div>'
		});
	});
}

//tooltip lista grupos
function gruposTooltip(obj){
	obj.each(function(){
		var groupName = $(this).attr("data-name"),
			groupPhoto = $(this).attr("data-img"),
			userCount = $(this).attr("data-membros");

		$(this).tooltipster({
			contentAsHTML: true,
			multiple: true,
			theme: 'tooltipster-livecom',
			interactive: true, 
			content:'<div class="fotoUsuario"><a class="centraliza"><img src="'+groupPhoto+'" alt="Foto do '+groupName+'" /></a></div>'+
					'<div class="tooltip-info">'+
						'<p class="tooltip-info-name"><a>'+groupName+'</a></p>'+
						'<p class="tooltip-info-second">'+userCount+' usuários</p>'+
					'</div>'
		});
	});
}

//tooltip ações grupos
function actionsTooltip(obj){
	obj.each(function(){
		var grupoId = $(this).attr("data-id-grupo"),
			grupoFav = $(this).attr("data-favorito"),
			grupoPush = $(this).attr("data-push"),
			grupoMural = $(this).attr("data-mural"),
			spanFav = 'Favoritar grupo',
			spanPush = 'Silenciar push',
			spanMural = 'Silenciar mural',
			classFav = '',
			classPush = 'silenciar-push-grupo',
			classMural = 'silenciar-mural-grupo',
			classIcoPush = 'icone-bell-grey',
			classIcoMural = 'icone-mural-grey';
		
		if(grupoFav == "true"){
			spanFav = 'Desfavoritar grupo';
			classFav = 'favoritado';
		}		
		if(grupoPush == "false"){
			spanPush = 'Ativar push';
			classPush = 'ressoar-push-grupo';
			classIcoPush = 'icone-bell-grey-slash';
		}		
		if(grupoMural == "false"){
			spanMural = 'Ativar mural';
			classMural = 'ressoar-mural-grupo';
			classIcoMural = 'icone-mural-grey-slash';
		}
		$(this).tooltipster({
			contentAsHTML: true,
			multiple: true,
			theme: 'tooltipster-livecom',
			interactive: true, 
			content:'<div class="tooltip-info notif-card" id="actions-'+grupoId+'">'+
						'<div>'+					
							'<a class="clearfix botaoFavoritoTooltip '+classFav+' grupoTable" data-favorito="'+grupoFav+'" title="" data-original-title="Favoritar grupo" data-id-grupo="'+grupoId+'">'+
								'<i class="linear-icons icone-fav-dark"></i> <span>'+spanFav+'</span>'+
							'</a>'+
						'</div>'+
						'<div>'+
							'<a class="clearfix grupo-notifications-options grupoTable '+classPush+'" title="" data-original-title="Silenciar push" data-id-grupo="'+grupoId+'">'+
								'<i class="linear-icons '+classIcoPush+'"></i> <span>'+spanPush+'</span>'+
							'</a>'+
						'</div>'+
						'<div>'+
							'<a class="clearfix ver-mural-grupo grupoTable '+classMural+'" title="" data-original-title="Silenciar posts" data-id-grupo="'+grupoId+'">'+
								'<i class="linear-icons '+classIcoMural+'"></i> <span>'+spanMural+'</span>'+
							'</a>'+
						'</div>'+
					'</div>'
		});
	});
}

//tooltip ações conexoes
function conexoesTooltip(obj){
	obj.each(function(){
		var amgId = $(this).attr("data-id");
			amgPush = $(this).attr("data-push"),
			amgMural = $(this).attr("data-mural"),
			spanPush = 'Silenciar push',
			spanMural = 'Silenciar mural',
			classPush = 'silenciar-user',
			classMural = 'silenciar-mural',
			classIcoPush = 'icone-bell-grey',
			classIcoMural = 'icone-mural-grey';
			
			if(amgPush == 'false'){
				spanPush = 'Ativar push';
				classPush = 'ressoar-user';
				classIcoPush = 'icone-bell-grey-slash';
			}		
			if(amgMural == 'false'){
				spanMural = 'Ativar mural';
				classMural = 'ressoar-mural';
				classIcoMural = 'icone-mural-grey-slash';
			}
		$(this).tooltipster({
			contentAsHTML: true,
			multiple: true,
			theme: 'tooltipster-livecom',
			interactive: true, 
			content:'<div class="tooltip-info notif-card" id="actions-'+amgId+'">'+
						'<div>'+
							'<a class="clearfix user-notifications-options grupoTable '+classPush+'" title="" data-original-title="Silenciar push" data-id="'+amgId+'">'+
								'<i class="linear-icons '+classIcoPush+'"></i> <span>'+spanPush+'</span>'+
							'</a>'+
						'</div>'+
						'<div>'+
							'<a class="clearfix ver-mural grupoTable '+classMural+'" title="" data-original-title="Silenciar posts" data-id="'+amgId+'">'+
								'<i class="linear-icons '+classIcoMural+'"></i> <span>'+spanMural+'</span>'+
							'</a>'+
						'</div>'+
						'<div>'+					
							'<a class="clearfix desfazer-amizade grupoTable" data-id="'+amgId+'" title="" data-original-title="Desconectar">'+
								'<i class="linear-icons icone-disconnect"></i> <span>Desconectar</span>'+
							'</a>'+
						'</div>'+
					'</div>'
		});
	});
}


$.minicolors = {
    defaults: {
        animationSpeed: 50,
        animationEasing: 'swing',
        change: null,
        changeDelay: 0,
        control: 'hue',
        dataUris: true,
        defaultValue: '',
        format: 'hex',
        hide: null,
        hideSpeed: 100,
        inline: false,
        keywords: '',
        letterCase: 'lowercase',
        opacity: false,
        position: 'top left',
        show: null,
        showSpeed: 100,
        theme: 'bootstrap',
        swatches: []
    }
};

function log(msg){
	console.log(msg);
}

function whatBrowserIs(){
	var browser = "";

	//Opera
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

	// Firefox 1.0+
	var isFirefox = typeof InstallTrigger !== 'undefined';

	// At least Safari 3+: "[object HTMLElementConstructor]"
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

	// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;

	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;

	// Chrome 1+
	var isChrome = !!window.chrome && !!window.chrome.webstore;

	// Blink engine detection -- opera e chrome
	//var isBlink = (isChrome || isOpera) && !!window.CSS;
	if(isOpera == true){
		browser = "Opera";
	}

	if(isFirefox == true){
		browser = "Firefox";
	}

	if(isSafari == true){
		browser = "Safari";
	}

	if(isIE == true){
		browser = "IE";
	}

	if(isEdge == true){
		browser = "Edge";
	}

	if(isChrome == true){
		browser = "Chrome";
	}

	return browser;
}