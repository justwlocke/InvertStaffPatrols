/// <reference path="../lib/openrct2.d.ts" />


function invertPatrolArea() {
    console.log("Now actually do the code.")

    var numStaff = 0;

    for (var i = 0; i < map.numEntities; i++) {
        var entity = map.getEntity(i);
        if (entity && entity.type === 'staff') {
            numStaff++;
        }
    }

    console.log("You have " + numStaff + " Staff.");

}

function windowChecker() {
    if (typeof ui !== 'undefined') {
        console.log("There are this many windows open: " + ui.windows);
        for (var i = 0; i < ui.windows; i++) {
            console.log("Window title: " + ui.getWindow(i).title);
        }
    }
}

function openWindow() {
    var window = ui.getWindow("staff-selector-window");
	if(window) {
		debug("The Staff Selector window is already shown.");
		window.bringToFront();
	}
	else {
	    ui.openWindow({
		    classification: "staff-selector-window",
		    title: "Staff Selector",
		    width: 260,
		    height: 250,
            colours: [19, 19],
            tabs: [
                {
                    image: 5628,
                    widgets: [
                        {
                            type: "viewport",
                            x: 20,
                            y: 50,
                            width: 100,
                            height: 100,
                            viewport: {
                                //A viewport that is way off in the distance looking at nothing
                                left: -9000,
                                top: -9000,
							}
						},
                    ]
                },
            ]
        });

        console.log("Opened Window");
	}
}



function main() {
    console.log("Your plug-in has started!");

    ui.registerMenuItem('Invert Patrols', function () {
        openWindow();
    });

    ui.registerMenuItem('Window Checker', function () {
        windowChecker();
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