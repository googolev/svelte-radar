<script>
import Sector from './Sector.svelte';
import { radar } from "./store/store.js";
import handleRadar from "./utils/handleRadar.js";
</script>

<svg viewBox="-115 -110 230 220" use:handleRadar>
    {#each $radar as sector, direction (sector.name)}
        <Sector {...sector} {direction}/>
    {/each}
</svg>