<script lang="ts">
  import { onMount } from 'svelte';
  import Gobang from '../utils/Gobang';

  export let title: string;

  let canvas: HTMLCanvasElement | undefined;

  onMount(() => {
    if (canvas) {
      const gobang = new Gobang(canvas);
      gobang.init();
    }
  });
</script>

<div>
  <div>{title}</div>
  <canvas id="gobang" width="800" height="800" bind:this={canvas} />
</div>
