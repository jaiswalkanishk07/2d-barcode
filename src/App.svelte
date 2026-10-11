<script>
  let view = $state('generator');
</script>

<div class="app">
  <header class="header">
    <div class="header__brand">
      <span class="header__logo" aria-hidden="true">▦</span>
      <div>
        <h1 class="header__title">2d barcode</h1>
        <p class="header__subtitle">generate · scan · download</p>
      </div>
    </div>
    <nav class="header__nav" aria-label="Primary">
      <button type="button" class:active={view === 'generator'} class="header__link" onclick={() => (view = 'generator')}>Generator</button>
      <button type="button" class:active={view === 'library'} class="header__link" onclick={() => (view = 'library')}>Library</button>
      <button type="button" class:active={view === 'login'} class="header__link" onclick={() => (view = 'login')}>Login</button>
    </nav>
  </header>

  <main class="app__main">
    {#if view === 'generator'}
      <section class="card generator" aria-label="QR generator">
        <p class="generator__hint">Instant QR core lands in Stage 3.</p>
      </section>
      <section class="card preview" aria-label="QR preview">
        <p class="preview__hint">Preview canvas lands in Stage 3.</p>
      </section>
    {:else if view === 'library'}
      <section class="card library" aria-label="Saved codes">
        <h2 class="library__title">Library</h2>
        <p class="library__empty">Login to sync codes. Stage 5 wires Supabase.</p>
      </section>
    {:else}
      <section class="card auth" aria-label="Login">
        <h2 class="auth__title">Login</h2>
        <p class="auth__hint">Email + password lands in Stage 4.</p>
      </section>
    {/if}
  </main>

  <footer class="footer">
    <p class="footer__text">Client-side only. No tracking.</p>
  </footer>
</div>

<style>
  .header__link.active {
    color: var(--accent-strong);
    border-color: var(--accent);
  }
</style>
