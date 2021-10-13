<script lang="ts">
  import { onMount } from 'svelte';
  import Gobang from '../utils/Gobang';

  export let title: string;

  let canvas: HTMLCanvasElement | undefined;

  const lines = 8;
  const distance = 60;
  const radius = 20;
  const styleStr = `width:${lines * distance}px;height:${lines * distance}px`;

  onMount(() => {
    if (canvas) {
      const gobang = new Gobang(canvas, { distance, radius, lines });
      gobang.init();
    }
  });
</script>

<div>
  <div>{title}</div>
  <canvas id="gobang" bind:this={canvas} style={styleStr} />
</div>
