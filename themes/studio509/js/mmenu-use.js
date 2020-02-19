(function($) {
  // Initial l'instance du menu
  var init_menu = function(){
    var mmenu = new Mmenu( "#hamburger-menu",
      {
        // options
        navbar: {
          title: ""
        },
        extensions: [
          "fullscreen"
       ]
      },
      {
        // configuration
        classNames: {
          selected: "active"
        }
      }
    );
    // Récupère les fonctionnalités de l'API du menu
    var mmenu_api = mmenu.API;
    // Quand l'ouverture du menu se termine
    mmenu_api.bind( "open:finish",
        ( panel ) => {
          // On change l'état du bouton hamburger
          $('.t-hamburger-button-toggle').addClass('is-active');
        }
    );
    // Quand la fermeture du menu se termine
    mmenu_api.bind( "close:finish",
        ( panel ) => {
          // On change l'état du bouton hamburger
          $('.t-hamburger-button-toggle').removeClass('is-active');
        }
    );
    // Avant de tenter l'ouverture du menu
    mmenu_api.bind( "open:before",
        ( panel ) => {
          // On affiche le menu
          $('#hamburger-menu').css('visibilty', 'visible');
        }
    );
    // Avant de tenter la fermeture du menu
    mmenu_api.bind( "close:before",
        ( panel ) => {
          // On affiche le menu
          $('#hamburger-menu').css('visibilty', 'none');
        }
    );
    // Au clic sur le bouton pour fermer le menu
    $('.e-hamburger-button-close').off('click.close').on('click.close', function(e){
      e.preventDefault();
      mmenu_api.close();
    });
  }

  // Fonction permettant de créer le contenu du menu
  // Exemple de tableau pour le paramètre "menus_add"
  /*
  [
    {title: "Accueil", url: "/"},
    {title: "Prestations", submenus: [
      {title: "Développement", url: "/prestations/development"},
      {title: "Graphisme", url: "/prestations/graphism"}
    ]},
    {title: "Projets": url: "/projects", submenus: [
      {title: "Toto", url: "/projects/toto"},
      {title: "Tata", url: "/projects/tata", submenus: [
        {title: "Tata 1", url: "/projects/tata1"},
        {title: "Tata 2", url: "/projects/tata2"},
      ]}
    ]},
    {title: "Contact", url: "/contact", blank: true}
  ]
  */
  var add_menus = function(menus_add, menu_parent){
    if(typeof menus_add !== "object"){ return; }
    menu_parent = menu_parent || undefined;

    var menu_content = $('#hamburger-menu').find('.t-hamburger-menu-content');
    // Pour chaque menu
    for(var k_menu_add in menus_add){
      var $li =  $('<li></li>');// Balise LI du menu
      var $span = $('<span></span>'); // Balise SPAN du menu si il n'a pas d'URL
      var $a = $('<a></a>'); // Balise A du menu si il a une URL
      var $ul = $('<ul></ul>'); // Balise UL du menu si il y a des sous-menus
      // Si il a une URL
      if(menus_add[k_menu_add].url !== undefined){
        // Ajoute l'url à la balise A
        $a.attr("href", menus_add[k_menu_add].url);
        // Si on veut le target _blank, on l'ajout
        if(menus_add[k_menu_add].blank === true){
          $a.attr("target", "_blank");
        }
        // Ajoute le titre
        $a.text(menus_add[k_menu_add].title);
        // Ajoute la balise A au menu
        $li.append($a);
      }
      else{
        // Ajoute le titre
        $span.text(menus_add[k_menu_add].title);
        // Ajoute la balise SPAN au menu
        $li.append($span);
      }
      // Si il y a des sous-menus
      if(menus_add[k_menu_add].submenus !== undefined){
        $li.append($ul);
        // Ajoute les sous-menus à ce menu
        add_menus(menus_add[k_menu_add].submenus, $li)
      }
      // Si on a un menu parent passé en paramètre, on lui ajoute ce menu
      if(menu_parent !== undefined){
        menu_parent.find('ul').append($li);
      }
      // Sinon, on l'ajoute au menu principal
      else{
        menu_content.append($li);
      }
    }
  }

  // Rend les fonctions publiques, et accessible avec les data du menu
  $('#hamburger-menu').data('add_menus', add_menus);
  $('#hamburger-menu').data('init_menu', init_menu);
})(window.jQuery);
