<script lang="ts">
  import { onMount } from 'svelte';
  import Gobang from '../utils/Gobang';
  import { addPool } from '../worker';

  export let title: string;

  let canvas: HTMLCanvasElement | undefined;

  onMount(() => {
    addPool();
    if (canvas) {
      const gobang = new Gobang(canvas, { distance: 60, radius: 20, lines: 10 });
      gobang.init();
    }
  });
</script>

<div>
  <div>{title}</div>
  <canvas id="gobang" bind:this={canvas} style="width: 600px;height:600px" />
</div>
