import { radar, activeSector } from "../store/store.js";

import { get } from "svelte/store"; 

export default function handleRadar(node) {
    const getRadarElementAtPoint = e => {
        const event = e.touches ? e.touches[0] : e;
        const element = document.elementFromPoint(event.pageX, event.pageY);
        const score = element.getAttribute('value');
        const id = element.getAttribute('name');
        return { id, score, type: event.type }
    }
    const start = e => {
        const { id } = getRadarElementAtPoint(e);
        activeSector.set(id);
    }
    const end = () => {
        activeSector.set(null)
    }
    const move = e => {
        window.requestAnimationFrame(() => {
            const { id, score, type } = getRadarElementAtPoint(e)
            if (!id || (id !== get(activeSector) && type !== 'click') || !score) return;
            radar.set(id, score);
        })
    }

    node.addEventListener("mousedown", start);
    node.addEventListener("touchstart", start);
    node.addEventListener("mouseup", end);
    node.addEventListener("touchend", end);
    node.addEventListener("mousemove", move);
    node.addEventListener("touchmove", move);
    node.addEventListener("touch", move);
    node.addEventListener("click", move);

    return {
        destroy() {
          node.removeEventListener("mousedown", start);
          node.removeEventListener("touchstart", start);
          node.removeEventListener("mouseup", end);
          node.removeEventListener("touchend", end);
          node.removeEventListener("mousemove", move);
          node.removeEventListener("touchmove", move);
          node.removeEventListener("touch", move);
          node.removeEventListener("click", move);
        }
    };
}