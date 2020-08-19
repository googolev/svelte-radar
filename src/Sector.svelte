<script>
    import getHexCorner from "./utils/getHexCorner.js";
    export let direction = 0;
    export let name;
    export let value;

    const grid = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

    const flip = direction === 2 || direction === 1;

    const radarTranslation = {
        hobby: "ХОББИ",
        friendship: "ДРУЖБА",
        health: "ЗДОРОВЬЕ",
        job: "РАБОТА",
        love: "ЛЮБОВЬ",
        rich: "БЛАГОСОСТОЯНИЕ"
    };
</script>

<style>
  polygon {
    fill: #293038;
    stroke: #424a54;
  }
  text {
    font-size: 8px;
    fill: white;
  }
  .rich {
    fill: #469573;
  }
  .hobby {
    fill: #7c3f7a;
  }
  .friendship {
    fill: #5c6bc0;
  }
  .health {
    fill: #e5b744;
  }
  .job {
    fill: #e16838;
  }
  .love {
    fill: #e23f45;
  }
</style>

{#each grid as gridValue, i}
  <polygon
    points={`${getHexCorner(gridValue * 10, direction)}, ${getHexCorner(gridValue * 10, direction + 1)}, 0, 0`}
    strokeLinejoin="miter-clip"
    stroke-dasharray="1"
    stroke-width="0.5"
    style={gridValue === 10 ? `opacity: 1` : `opacity: 0.${gridValue}`}
    class={value >= gridValue ? name : ''}
    {name}
    value={gridValue} />
{/each}

<g
  transform={`translate(${getHexCorner(105, flip ? direction + 1 : direction)}) rotate(${direction * 60 + (flip ? -90 : 90)})`}>
  <text x="50" y={flip ? 5 : 0} text-anchor="middle">
    {radarTranslation[name]}
  </text>
  <text x="50" y={flip ? 18 : -10} text-anchor="middle" class="value">
    {value}
  </text>
</g>