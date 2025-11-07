// Timeline interactivity + copy button + toast notifications
document.addEventListener('DOMContentLoaded', () => {
  const milestones = Array.from(document.querySelectorAll('.milestone'));
  let index = 0;

  if (milestones[0]) milestones[0].classList.add('open');

  milestones.forEach((ms, i) => {
    ms.addEventListener('click', () => ms.classList.toggle('open'));
    ms.setAttribute('tabindex', '0');
    ms.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        ms.classList.toggle('open');
      }
    });
  });

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const expandAllBtn = document.getElementById('expandAll');

  function showIndex(i) {
    if (!milestones[i]) return;
    milestones.forEach((m, idx) => m.classList.toggle('open', idx === i));
    milestones[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
    index = i;
  }

  prevBtn.addEventListener('click', () => {
    const next = (index - 1 + milestones.length) % milestones.length;
    showIndex(next);
  });

  nextBtn.addEventListener('click', () => {
    const next = (index + 1) % milestones.length;
    showIndex(next);
  });

  expandAllBtn.addEventListener('click', () => {
    const anyClosed = milestones.some(m => !m.classList.contains('open'));
    milestones.forEach(m => m.classList.toggle('open', anyClosed));
    expandAllBtn.textContent = anyClosed ? 'Collapse All' : 'Expand All';
  });

  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-copy');
      const el = document.getElementById(targetId);
      if (!el) return;
      try {
        await navigator.clipboard.writeText(el.value || el.innerText);
        showToast('Copied to clipboard!');
      } catch {
        showToast('Copy failed. Please copy manually.');
      }
    });
  });

  const toast = document.getElementById('toast');
  let toastTimer = null;
  function showToast(msg) {
    if (toastTimer) clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }
});