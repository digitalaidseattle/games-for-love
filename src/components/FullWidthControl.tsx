import { IControl, Map } from "maplibre-gl";
import { useContext } from "react";
import { ControlPosition, useControl } from "react-map-gl";
import { DrawerWidthContext } from "../context/DrawerWidthContext";

class FullWidthControlClass implements IControl {
    onClick: (map: Map) => void;
    showDrawer: boolean;
    map: Map | undefined;
    container: HTMLElement | undefined;
    button: HTMLElement | undefined;

    constructor(onClick: (map: Map) => void) {
        this.showDrawer = true;
        this.onClick = onClick;
    }

    createButton(show: boolean) {
        const span = document.createElement("span");
        span.classList.add(
            "maplibregl-ctrl-icon"
        );

        const button = document.createElement("button");
        button.classList.add(
            show ? "maplibregl-ctrl-fullscreen" : "maplibregl-ctrl-shrink"
        );
        button.title = show ? "Close drawer" : "Open drawer";
        button.type = "button";
        button.ariaLabel = show ? "Close drawer" : "Open drawer";
        button.appendChild(span);
        return button;
    }

    toggle() {
        this.showDrawer = !this.showDrawer;
        if (this.button) {
            this.button.title = this.showDrawer ? "Close drawer" : "Open drawer";
            this.button.ariaLabel = this.showDrawer ? "Close drawer" : "Open drawer";
            this.button.classList.remove(this.showDrawer ? "maplibregl-ctrl-shrink" : "maplibregl-ctrl-fullscreen");
            this.button.classList.add(this.showDrawer ? "maplibregl-ctrl-fullscreen" : "maplibregl-ctrl-shrink");
        }

        if (this.map && this.onClick) {
            this.onClick(this.map);
        }
    }

    onAdd(map: Map) {
        this.map = map;
        this.container = document.createElement("div");
        this.container.classList.add(
            "maplibregl-ctrl",
            "maplibregl-ctrl-group"
        );

        this.button = this.createButton(this.showDrawer);
        this.container.appendChild(this.button);
        this.container.onclick = () => this.toggle();
        return this.container;
    }

    onRemove() {
        if (this.container) {
            this.container.parentNode?.removeChild(this.container);
            this.map = undefined;
        }
    }
}

const FullWidthControl = (props: { position: ControlPosition }) => {
    const { toggle } = useContext(DrawerWidthContext);
    useControl(() => new FullWidthControlClass(toggle), { position: props.position });
    return null; // No need to render anything in React tree
};

export default FullWidthControl;