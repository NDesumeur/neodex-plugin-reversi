// lancé par le test « local » de NeoDex : une nouvelle partie, le plein écran et la place prise par le jeu (avec NEO_SHOTS : garde une image du jeu)
module.exports = async ({ pj, js, sleep }) => {
  const shot = async n => { if (!process.env.NEO_SHOTS) return; const d = await pj(`document.getElementById('gc').toDataURL()`); require('fs').writeFileSync(require('path').join(process.env.NEO_SHOTS, '.-' + n + '.png'), Buffer.from(d.split(',')[1], 'base64')); };
  await pj(`window.__e = []; addEventListener('error', e => __e.push(e.message)); 0`);
  await pj(`document.getElementById('gNew').click(), 0`); await sleep(1500);
  for (const k of ['ArrowUp', 'ArrowDown']) { await pj(`document.dispatchEvent(new KeyboardEvent('keydown', {key: '${k}', bubbles: true})), 0`); await sleep(300); await pj(`document.dispatchEvent(new KeyboardEvent('keyup', {key: '${k}', bubbles: true})), 0`); }
  await shot('1-partie');
  await pj(`document.getElementById('rvFs').click(), 0`); await sleep(700);
  const fs = await pj(`(() => { const c = document.getElementById('gc'), r = c.getBoundingClientRect(); return document.fullscreenElement === c.parentElement && (Math.abs(r.height - innerHeight) < 3 || Math.abs(r.width - innerWidth) < 3); })()`);
  await shot('2-plein-ecran');
  await pj(`document.fullscreenElement && document.exitFullscreen(), 0`); await sleep(300);
  if (!fs) throw new Error('le plein écran ne remplit pas l’écran');
  const L = await pj(`(() => { const r = document.getElementById('gc').getBoundingClientRect(); let s = 0; for (let e = document.getElementById('gc').parentElement; e; e = e.parentElement) s += e.scrollTop; return { bottom: Math.round(r.bottom + s), h: Math.round(r.height), wh: innerHeight, ww: innerWidth, sw: document.documentElement.scrollWidth }; })()`);
  if (L.bottom > L.wh + 1 || L.sw > L.ww + 1 || L.h < 300) throw new Error('le jeu dépasse la fenêtre ou reste petit : ' + JSON.stringify(L));
  // à deux sur ce PC : les noirs puis les blancs jouent au clic
  const R = code => pj(`(() => { const T = document.getElementById('gc').__rv, rv = T.st(); ${code} })()`);
  const tap = (x, y) => pj(`(() => { const c = document.getElementById('gc'), r = c.getBoundingClientRect(), T = c.__rv; c.dispatchEvent(new PointerEvent('pointerdown', {bubbles: true, clientX: r.left + (T.RV.X + ${x} * T.RV.C + 12) / 320 * r.width, clientY: r.top + (T.RV.Y + ${y} * T.RV.C + 12) / 216 * r.height})); return 0; })()`);
  await pj(`(() => { const s = document.getElementById('rvMode'); s.value = 'deux'; s.dispatchEvent(new Event('change')); return 0; })()`); await sleep(200);
  for (let k = 0; k < 2; k++) { const m = await R('const m = T.moves()[0]; return [m.x, m.y];'); await tap(m[0], m[1]); await sleep(500); }
  if (await R('return rv.n + "|" + rv.turn + "|" + rv.think;') !== '2|1|0') throw new Error('à deux : ' + await R('return rv.n + "|" + rv.turn;'));
  await shot('3-a-deux');
  // à distance : un faux serveur de parties dans la page de NeoDex (WebSocket remplacé) ; l'hôte, le plugin et ctx.room sont les vrais
  await js(`(() => { window.__RealWS ??= WebSocket; window.WebSocket = class { constructor(u) { this.url = u; this.sent = []; this.readyState = 1; window.__fakeWs = this;
    setTimeout(() => this.onmessage?.({data: JSON.stringify({t: 'bienvenue', id: 'moi', host: true, joueurs: []})}), 50); }
    send(d) { this.sent.push(d); } close() { this.readyState = 3; } }; return 0; })()`);
  await pj(`(() => { const s = document.getElementById('rvMode'); s.value = 'net'; s.dispatchEvent(new Event('change')); document.getElementById('rvHost').click(); return 0; })()`); await sleep(600);
  const n0 = await pj(`[document.getElementById('gc').__rv.net().code, document.getElementById('rvNetInfo').textContent]`);
  if (!/^[A-Z0-9]{6}$/.test(n0[0]) || !/Code de la partie/.test(n0[1])) throw new Error('création de partie : ' + JSON.stringify(n0));
  await js(`__fakeWs.onmessage({data: JSON.stringify({t: 'arrive', id: 'ami', name: 'invité'})}), 0`); await sleep(300);
  const sent = () => js(`__fakeWs.sent.map(s => JSON.parse(s).data)`);
  if (!(await sent()).some(m => m?.t === 'start' && m.you === 2)) throw new Error('annonce du début : ' + JSON.stringify(await sent()));
  const m1 = await R('const m = T.moves()[0]; return [m.x, m.y];'); await tap(m1[0], m1[1]); await sleep(400);
  const mv = (await sent()).filter(m => m?.t === 'coup'); if (mv.length !== 1 || mv[0].n !== 0 || mv[0].x !== m1[0]) throw new Error('mon coup envoyé : ' + JSON.stringify(mv));
  const m2 = await R('const m = T.moves()[0]; return [m.x, m.y];'); await tap(m2[0], m2[1]); await sleep(200);
  if ((await sent()).filter(m => m?.t === 'coup').length !== 1) throw new Error('un coup parti hors de mon tour');
  await js(`__fakeWs.onmessage({data: JSON.stringify({t: 'msg', from: 'ami', data: {t: 'coup', x: ${m2[0]}, y: ${m2[1]}, n: 1}})}), 0`); await sleep(400);
  if (await R('return rv.n + "|" + rv.turn;') !== '2|1') throw new Error("coup de l'ami : " + await R('return rv.n + "|" + rv.turn;'));
  await shot('4-a-distance');
  await js(`__fakeWs.onmessage({data: JSON.stringify({t: 'part', id: 'ami'})}), 0`); await sleep(200);
  if (!/a quitté/.test(await pj(`document.getElementById('rvNetInfo').textContent`))) throw new Error("départ de l'ami");
  await pj(`(() => { const s = document.getElementById('rvMode'); s.value = 'ia'; s.dispatchEvent(new Event('change')); return 0; })()`); await js(`window.WebSocket = window.__RealWS, 0`); await sleep(200);
  if (await R('return T.rvs().mode + rv.mode;') !== 'iaplay') throw new Error('retour contre l’ordinateur : ' + await R('return T.rvs().mode + rv.mode;'));
  const errs = await pj(`window.__e.join(' | ')`); if (errs) throw new Error('erreur : ' + errs);
  return 'nouvelle partie · plein écran · ' + L.h + ' px dans ' + L.ww + '×' + L.wh;
};
