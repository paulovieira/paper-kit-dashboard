// note: this code was originally in the "paper-dashboard.js" file

function initRightMenu(){

    //console.log(Date.now())
    var navbar_menu_visible = false;

    var $sidebar = $('.sidebar');

    // create a new offcanvas menu using the existing div.navbar-collapse as a
    // starting point; the contents are copied from the items present in div.sidebar 
    // (the regular sidebar on the left) and from the div.navbar-collapse
    var $sidebar_offcanvas = $('nav').find('.navbar-collapse').first().clone(true);

    $sidebar_offcanvas.attr('data-background-color', $sidebar.data('background-color'));
    $sidebar_offcanvas.attr('data-active-color', $sidebar.data('active-color'));
    $sidebar_offcanvas.addClass('off-canvas-sidebar');

    var ul_content = '<ul class="nav navbar-nav">';

    // copy the contents from navbar-collapse
    $sidebar_offcanvas.children('ul').each(function(){
        ul_content += $(this).html();
    });

    // copy the contents from the regular sidebar on the left
    ul_content += '<li class="divider"></li>'+ $sidebar.find('.nav').html();
    ul_content += '</ul>';

    var logoContents = ($sidebar.find('.logo').first())[0].outerHTML;
    $sidebar_offcanvas.html('<div class="sidebar-wrapper">' + logoContents + ul_content + '</div>');

    // change classes in the $sidebar_offcanvas element
    $sidebar_offcanvas.find('a').removeClass('btn btn-round btn-default');
    $sidebar_offcanvas.find('button').removeClass('btn-round btn-fill btn-info btn-primary btn-success btn-danger btn-warning btn-neutral');
    $sidebar_offcanvas.find('button').addClass('btn-simple btn-block');

    $('body').append($sidebar_offcanvas);

    // now take care of the interaction in the offcanvas menu (via the toggle button)
    var $toggleBtn = $('.navbar-toggle');

    var changeToggleBtnClass = function(){
        $toggleBtn.toggleClass('toggled');
    };

    $toggleBtn.on('click', function (){

        if(navbar_menu_visible) {
            // should never get here, but verify anyway
            return;
        } 

        var $div = $('<div id="bodyClick" style="cursor: pointer;" title="Click to close the menu on the right"></div>');

        $div.on('click', function() {

            $('#bodyClick').remove();
            $('html').toggleClass('nav-open');
            navbar_menu_visible = false;
            setTimeout(changeToggleBtnClass, 350);
        });
        
        $('body').append($div);
        $('html').toggleClass('nav-open');
        navbar_menu_visible = true;
        setTimeout(changeToggleBtnClass, 350);
    });
}

initRightMenu();

