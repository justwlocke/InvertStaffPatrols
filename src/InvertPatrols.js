/// <reference path="../lib/openrct2.d.ts" />


const viewport = "staff-selector-viewport";
var toggle = false;

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

var window = null;

function openWindow() {
    window = ui.getWindow("staff-selector-window");
	if(window) {
		debug("The Staff Selector window is already shown.");
		window.bringToFront();
	}
	else {
        ui.openWindow({
            onClose: function() {
                toggle = false
                ui.tool.cancel() 
            },
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
                        {
                            type: "button",
                            border: true,
                            x: 25,
                            y: 160,
                            width: 24,
                            height: 24,
                            image: 29467,
                            isPressed: toggle,
                            onClick: selectStaff(),
                        },
                    ]
                },
            ]
        });

        console.log("Opened Window");
	}
}

var update = null;

function selectStaff() {
    console.log("Select Staff button pressed.");

    if (!window) {
        return
    }
    else {
        if (toggle !== false) {
            toggle = false
            buttonPicker.isPressed = toggle
            ui.tool.cancel();
        }
        else {
            toggle = true;
            buttonPicker.isPressed = toggle
            ui.activateTool({
                id: toolSelectStaff,
                cursor: "cross_hair",
                filter: ["entity"],
                onDown: checkEntity(),
            })
        }
    }
}

function checkEntity() {
    var pluginViewport = window.findWidget<ViewportWidget>(viewport);

    if (e.entityId !== undefined) {
        console.log(e.entityId)
        var entity = map.getEntity(e.entityId);
        var staff = entity.staff;
        idStaff = staff;
        if (!entity || entity.type !== "staff") {
            toggle = false;
            if (update !== null) {
                update.dispose();
                update = null;
            }
            pluginViewport.viewport.moveTo({x: -9000, y: -9000, z: 0});
            ui.tool.cancel();
            ui.showError("You have to select", "a staff member")
            debug("invalid entity selected");
        }
        else {
            ui.tool.cancel();
            toggle = false;
            const pluginViewport = window.findWidget<ViewportWidget>(viewport);
            update = context.subscribe("interval.tick", function () {
                pluginViewport.viewport.moveTo({ x: staff.x, y: staff.y, z: staff.z })
                });
        }
    }
    return
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