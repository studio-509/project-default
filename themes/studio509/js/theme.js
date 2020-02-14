(function ($, Drupal) {

  // It's best practice to use strict mode, can help avoid some browser issues.
  'use strict';

  // Generally you always want to use behaviors, remember to depend on Drupal js.
  Drupal.behaviors.name = {
    // Called on document ready and when no elements is added to the page.
    attach: function (context, settings) {}
  }

  // Sometimes you just want to do something when DOM is full loaded.
  $(window).on('load', function(){});

  // Sometimes you just want to do something when DOM is ready.
  $(document).ready(function() {
    // Si on a le menu hamburger
    if($('#hamburger-menu').length > 0){
      var menus_datas = []; // Conitendra les données des menus actuels traitées pour les ajouter dans le menu hamburger
      var menus_current = $('#hamburger-block').data('menus'); //"block-clepsydra-main-menu,block-navigationprincipaleb"
      // Si on a des menus spécifiés
      if((menus_current !== undefined) && (menus_current !== "")){
        var menus_id = menus_current.split(',');
        // Pour chaque menu actuel à ajouter dans le menu hamburger
        for(var k_menu_id in menus_id){
          var menu_id = menus_id[k_menu_id].replace('#', '');
          var menu_current = $('#'+menu_id);
          // Si le menu a été trouvé
          if(menu_current.length > 0){
            var $li_all = menu_current.children('ul').children('li');
            // Pour chaque LI du menu
            $li_all.each(function(){
              var datas_tmp = {};
              var $a = $(this).children('a');
              datas_tmp.title = $a.text();
              datas_tmp.url = $a.attr('href');
              // Si il y a des sous-menus
              if($(this).children('div').length > 0){
                var $a_all_submenu = $(this).children('div').children('a');
                datas_tmp.submenus = [];
                // Pour chaque A du menu
                $a_all_submenu.each(function(){
                  var datas_submenu_tmp = {};
                  datas_submenu_tmp.title = $(this).text();
                  datas_submenu_tmp.url = $(this).attr('href');
                  datas_tmp.submenus.push(datas_submenu_tmp);
                });
              }
              menus_datas.push(datas_tmp);
            });
          }
        }
        if(menus_datas.length > 0){
          $('#hamburger-menu').data('add_menus')(menus_datas);
          $('#hamburger-menu').data('init_menu')();
        }
      }
    }
  });

})(window.jQuery, window.Drupal);
