var config = require("../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;
var dropdown = require("nativescript-drop-down");

function RubroListViewModel(items) {
    var viewModel = new dropdown.ValueList();


    viewModel.load = function() {
        return fetch(config.apiUrl + "rubros/").then(response => {
            return response.json();
        }).then(function(r) {
            r.forEach(function(rubro){
                viewModel.push({
                    value: rubro.Id,
                    display: rubro.Nombre
                });
            })
        }).catch(handleErrors);
    };

    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = RubroListViewModel;
