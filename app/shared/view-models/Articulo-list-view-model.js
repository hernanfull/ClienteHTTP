var config = require("../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var viewModel;

function ArticuloListViewModel(items) {
    viewModel = new ObservableArray(items);

    viewModel.load = function(key) {
        var nombre = (key)? "nombre/" + key:"";
        return fetch(config.apiUrl + "articulos/" + nombre).then(response => {
            return response.json();
        }).then(function(r) {
            viewModel.empty();
            r.forEach(function(articulo){
                viewModel.push(articulo);
            })
        }).catch(handleErrors);
    };

    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    viewModel.add = function(articulo) {
        return fetchModule.fetch(config.apiUrl + "articulos/", {
            method: "PUT",
            body: JSON.stringify(articulo),
            headers: {
                "Content-Type": "application/json"
            }
        }).catch(handleErrors);
    };

    viewModel.delete = function(id) {
        return fetchModule.fetch(config.apiUrl + "articulos/" + id, {
            method: "DELETE"
        })
        .catch(handleErrors);
    };

    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log("Errores: ")
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = ArticuloListViewModel;
