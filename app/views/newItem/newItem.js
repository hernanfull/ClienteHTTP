var observable = require("data/observable");
var frameModule = require("ui/frame");
var dialogs = require("ui/dialogs");
var ObservableArray = require("data/observable-array").ObservableArray;
var RubroListViewModel = require("../../shared/view-models/Rubro-list-view-model");
var ArticuloListViewModel = require("../../shared/view-models/Articulo-list-view-model");
var page;
var rubros;
var pageData;

exports.loaded = function(args){
    pageData = new observable.Observable;
    rubros = new RubroListViewModel([]);
    page = args.object;
    pageData.set("item", rubros)
    page.bindingContext = pageData;

    rubros.empty();
    rubros.load();
}

exports.submit = function(){
    var nombre = page.getViewById("Nombre");
    var precio = page.getViewById("Precio");
    var descripcion = page.getViewById("Descripcion");
    var rubro = page.getViewById("Rubro");
    var error = false;

    if(nombre.text == "" || precio.text == "" || descripcion.text == "" || rubro.selectedIndex == null){
        dialogs.alert("Campos requeridos");
        error = true;
    }

    if(isNaN(precio.text)){
        dialogs.alert("Precio debe ser un número");
        error= true;
    }

    if(error){
        return false;
    }

    var articulo = new observable.fromObject({
        Nombre: nombre.text,
        Precio: precio.text,
        Descripcion: descripcion.text,
        IdRubro: rubros.getValue(rubro.selectedIndex)
    });

    new ArticuloListViewModel().add(articulo).then(function() {
        frameModule.topmost().navigate("views/list/list");
    });
}
