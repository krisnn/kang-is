function blockLinks(parentID, children) {
    var parent = document.getElementById(parentID),
        content = parent.getElementsByTagName(children);
    for(var i = 0; i < content.length; i++) {
        if(content[i].innerHTML.indexOf('</a>') !== -1) {
            content[i].innerHTML = "<mark>No live link!!!</mark> Dilarang nyepam broo..!!!";
            content[i].className = "spammer-detected";
        }
    }
}
blockLinks('comment_block', 'p');

function blockAds(parentID, children) {
    var parent = document.getElementById(parentID),
        content = parent.getElementsByTagName(children);
    for(var i = 0; i < content.length; i++) {
        if (/(^| |>)(shop|blackberry|obat kuat|alat kesehatan|part time|pengobatan|parabola|rental|jasa kirim)(<| |$)/i.test(content[i].innerHTML)) {
          content[i].innerHTML = "<del>Ups! dilarang ngiklan di kolom komentar bro...</del>";
            content[i].className = "spammer-detected";
        }
    }
}
blockAds('comment_block', 'p');

$('#comments p, #comments dd').each(function() {
    // Singkirkan semua tag <br> di sebelah tag <b rel^="h">
    // (semua elemen <b> dengan nilai atrubut rel yang diawali dengan "h")
    $('b[rel^="h"]', this).next('br').remove();
    // Menyisipkan tag <pre>
    $('i[rel="pre"]').replaceWith(function() {
    return $('<pre><code>' + $(this).html() + '</code></pre>');
});
    // Menyisipkan gambar
    $('i[rel="image"]', this).replaceWith(function() {
        return $('<img src="" />').attr('src', $(this).text());
    });
    // Menyisipkan tag <h3>
    $('b[rel="h3"]', this).replaceWith(function() {
        return $('<h3></h3>').append($(this).contents());
    });
    // Menyisipkan quota/catatan
    $('b[rel="quote"]', this).replaceWith(function() {
        return $('<blockquote></blockquote>').append($(this).contents());
    });
    // Menyisipkan tag <code>
    $('i[rel="code"]', this).contents().unwrap().wrap('<code />');
 	$('i[rel="linku"]', this).replaceWith(function() {
        return $('<a href="' + $(this).text() + '">[Link]</a>');
    });
});
  
a = document.getElementById('comments');
if (a) {
	b = a.getElementsByTagName("div");
	for (i = 0; i < b.length; i++) {
		if (b.item(i).getAttribute('CLASS') == 'comment_body') {
			ki_comm = b.item(i).innerHTML.replace(/\[code\](.[^\]]*)\[\/code\]/ig, "<code>$1<\/code>");
			ki_comm = ki_comm.replace(/\[pre\](.[^\]]*)\[\/pre\]/ig, "<pre>$1<\/pre>");
			ki_comm = ki_comm.replace(/\[blockquote\](.[^\]]*)\[\/blockquote\]/ig, "<blockquote>$1<\/blockquote>");
			ki_comm = ki_comm.replace(/\[catatan\](.[^\]]*)\[\/catatan\]/ig, "<blockquote>$1<\/blockquote>");          
			ki_comm = ki_comm.replace(/\[img\](.[^\]]*)\[\/img\]/ig, "<img class='cm-image' src='$1' alt='loading...' \/>");
			b.item(i).innerHTML = ki_comm;
		}
	}
}
       
// Menyisipkan markup tabir animasi
$(document.body).append('<div id="page-loader">Loading...</div>');
// Saat halaman aktif terpicu untuk berpindah/keluar menuju halaman lain...
$(window).on("beforeunload", function() {
    // ... tampilkan tabir animasi dengan efek `.fadeIn()`
    $('#page-loader').fadeIn(1000).delay(6000).fadeOut(1000);
});

$(document).ready(function() {
// Tooltip only Text
$('.thumbTooltip').hover(function(){
        // Hover over code
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="thumb-tooltip"></p>')
        .text(title)
        .appendTo('body')
        .fadeIn('slow');
}, function() {
        // Hover out code
        $(this).attr('title', $(this).data('tipText'));
        $('.thumb-tooltip').remove();
}).mousemove(function(e) {
        var mousex = e.pageX + 20; //Get X coordinates
        var mousey = e.pageY + 10; //Get Y coordinates
        $('.thumb-tooltip')
        .css({ top: mousey, left: mousex })
});
});   
     
$(document).ready(function() {
// Tooltip only Text
$('.masterTooltip').hover(function(){
        // Hover over code
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
        .text(title)
        .appendTo('body')
        .fadeIn('slow');
}, function() {
        // Hover out code
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
}).mousemove(function(e) {
        var mousex = e.pageX + 20; //Get X coordinates
        var mousey = e.pageY + 10; //Get Y coordinates
        $('.tooltip')
        .css({ top: mousey, left: mousex })
});
});
     
$('<a href="#" class="help-text">?</a>').on("click", function() {
    setDialog("open", {
        title: "Info", 
        content: "Untuk menyalin kode, klik ganda (double click) pada area kode",
        buttons: {
            "OK": function() {
                setDialog("close");
            }
        }
    });
    return false;
}).appendTo($('pre'));    
  
var pres = document.getElementsByTagName(&quot;pre&quot;);
for (var i = 0; i &lt; pres.length; i++) {
  pres[i].addEventListener(&quot;dblclick&quot;, function () {
    var selection = getSelection();
    var range = document.createRange();
    range.selectNodeContents(this);
    selection.removeAllRanges();
    selection.addRange(range);
  }, false);
} 
   
var jump=function(e)
{
    //alert(&#39;here&#39;);
   if (e){
       //e.preventDefault();
       var target = jQuery(this).attr(&quot;href&quot;).replace(&#39;/&#39;, &#39;&#39;);
   }else{
       var target = location.hash;
   }

   jQuery(&#39;html,body&#39;).animate(
   {
       scrollTop: (jQuery(target).offset().top) - 100
   },500,function()
   {
       //location.hash = target;
   });

}

jQuery(&#39;html, body&#39;).hide();

jQuery(document).ready(function($)
{
    $(document).on(&#39;click&#39;, &#39;a[href*=#]&#39;, jump);

    if (location.hash){
        setTimeout(function(){
            $(&#39;html, body&#39;).scrollTop(0).show();
            jump();
        }, 0);
    }else{
        $(&#39;html, body&#39;).show();
    }
});    

//Perkecil dimensi Avatar pada Komentar
var avatar=$(&quot;#comments&quot;);
avatar.find(&#39;.avatar-image-container img&#39;).each(function() {
        var ava = $(this).attr(&#39;longdesc&#39;) ? $(this).attr(&#39;longdesc&#39;) : $(this).attr(&#39;src&#39;);
        $(this).show().attr(&#39;src&#39;, ava.replace(/\/s[0-9]+(\-c)?\//,&quot;/s55-c/&quot;)).removeAttr(&#39;longdesc width height&#39;);
});
function blockNotAllowed(parentID, children) {
    var parent = document.getElementById(parentID),
        content = parent.getElementsByTagName(children);
    for (var i = 0; i < content.length; i++) {
        var regex = /(^| |>)(oot|OOT|minta template|bagi template|share template)(<| |$)/g,
            html = content[i].innerHTML;
      content[i].innerHTML = (regex.test(html)) ? '<del>' + html.replace(regex, "$1<mark>$2</mark>$3") + '</del><br><br><cite class=\'note\'>Kata-kata yang ditandai sudah tidak diperbolehkan dalam komentar. Kenapa komentar Anda diblok> cari tau <a href=\'/2013/05/cara-berkomentar-yang-baik.html\' >DISINI<\/a></cite>' : html;
    }
}

// Jalankan fungsi!
blockNotAllowed('comment_block', 'p'); 
