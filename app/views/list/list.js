var observable = require("data/observable");
var frameModule = require("ui/frame");
var dialogs = require("ui/dialogs");
var ArticuloListViewModel = require("../../shared/view-models/Articulo-list-view-model");
var socialShare = require("nativescript-social-share");
var page;
var search;
var articulos;
var pageData = new observable.Observable;

exports.loaded = function(args) {
    articulos = new ArticuloListViewModel([]);
    pageData.set("articulos", articulos);

    page = args.object;
    page.bindingContext = pageData;

    articulos.load();

}

exports.reload = function(){
    articulos.load();
}

exports.submit = function() {
    console.log("submited")
    search = page.getViewById("search");
    articulos.load(search.text);
}

exports.moveToCreateItem = function() {
    frameModule.topmost().navigate("views/newItem/newItem");
}

exports.more = function(args) {
    var item = args.view.bindingContext;
    dialogs.action({
        title: "Acciones",
        cancelButtonText: "",
        actions: ["Compartir", "Eliminar"]
    }).then(function(result) {
        if (result == "Compartir") {
            var listString = item.Nombre + " " + item.Descripcion + " " + item.Precio;
            socialShare.shareText(listString);
        }

        if (result == "Eliminar") {
            articulos.delete(item.Id).then(function() {
                articulos.load();
            })
        }
    });

    /*dialogs.confirm("Desea eliminar \"" + item.Nombre + " " + item.Descripcion + "\"?").then(function(result) {
        if(result){
            console.log("Eliminando");
            articulos.delete(item.Id).then(function(){
                articulos.empty();
                articulos.load();
            })
        }
    });*/

}

exports.share = function() {
    var list = [];
    for (var i = 0, size = articulos.length; i < size ; i++) {
        list.push(articulos.getItem(i).Nombre + " " + articulos.getItem(i).Descripcion + " " + articulos.getItem(i).Precio);
    }
    var listString = list.join("\n").trim();
    socialShare.shareText(listString);
};
