/// <reference path="../lib/openrct2.d.ts" />


function invertPatrolArea() {
    console.log("Now actually do the code.")

}



function main() {
    console.log("Your plug-in has started!");

    ui.registerMenuItem('Invert Patrols', function () {
        invertPatrolArea();
    });
}

registerPlugin({
    name: 'InvertPatrols',
    version: '1.0',
    authors: ['CommanderLouiz'],
    type: 'remote',
    licence: 'MIT',
    targetApiVersion: 34,
    main: main
});