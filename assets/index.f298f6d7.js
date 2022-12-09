(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const L of i)if(L.type==="childList")for(const d of L.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function A(i){const L={};return i.integrity&&(L.integrity=i.integrity),i.referrerpolicy&&(L.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?L.credentials="include":i.crossorigin==="anonymous"?L.credentials="omit":L.credentials="same-origin",L}function s(i){if(i.ep)return;i.ep=!0;const L=A(i);fetch(i.href,L)}})();const B=15;let U=0;const E={NAME:"PlayerName",HEALTH_MAX:100,HEALTH_CURRENT:100,HEALTH_REGEN:1,DAMAGE:5,ATTACK_TIMER:0,ATTACK_COOLDOWN:220,CHARGE_TIMER:0,CHARGE_COOLDOWN:50,CRIT_CHANCE:.05,CRIT_MULTIPLIER:1.2,BLOCK_CHANCE:.05,GOLD:5,RESPAWN_TIMER:0,PRESTIGE_LEVEL:0,PRESTIGE_EXP:0,PRESTIGE_EXP_LEVELUP:10,PRESTIGE_EXP_LEVELUP_MULTIPLIER:1.7,HIGHEST_LEVEL_REACHED:0,HIGHEST_LEVEL_PRESTIGED_AT:0,PRESTIGE_POINTS:0,base:{HEALTH_MAX:100,HEALTH_REGEN:1,DAMAGE:5,ATTACK_COOLDOWN:220,CRIT_CHANCE:.05,CRIT_MULTIPLIER:1.2,BLOCK_CHANCE:.05,GOLD:5},IS_PLAYABLE_CHARACTER:!0,IS_ATTACKING:!1,IS_FRONT_OF_OPPONENT:!1,IS_ALIVE:!0,IS_RESPAWNING:!1,xPos:0,portrait:document.getElementById("playerPortrait"),image:document.getElementById("playerImage"),frameState:{idle:["assets/combatzone/player/player_idle_1.svg"],dead:"assets/combatzone/universal/gravestone.svg"},healthBar:document.getElementById("playerHealthBar"),attackTimerBar:document.getElementById("playerAttackBar"),statFrame:{spnAttack:document.getElementById("spnPlayerAttack"),spnHealthMax:document.getElementById("spnPlayerHealthMax"),spnHealthRegen:document.getElementById("spnPlayerHealthRegen"),spnAttackSpeed:document.getElementById("spnPlayerAttackSpeed"),spnCritChance:document.getElementById("spnPlayerCritChance"),spnCritMultiplier:document.getElementById("spnPlayerCritMultiplier"),spnBlockChance:document.getElementById("spnPlayerBlockChance"),spnLevel:document.getElementById("spnEnemyLevel")}},n={NAME:"Slime",HEALTH_MAX:20,HEALTH_CURRENT:20,HEALTH_REGEN:.1,DAMAGE:3,ATTACK_TIMER:0,ATTACK_COOLDOWN:310,CHARGE_TIMER:0,CHARGE_COOLDOWN:50,CRIT_CHANCE:.05,CRIT_MULTIPLIER:1.2,BLOCK_CHANCE:.05,GOLD_DROP:5,RESPAWN_TIMER:0,LEVEL:1,base:{HEALTH_MAX:20,HEALTH_REGEN:.1,DAMAGE:3,ATTACK_COOLDOWN:310,CRIT_CHANCE:.05,CRIT_MULTIPLIER:1.2,BLOCK_CHANCE:.05,GOLD_DROP:5},multiplier:{HEALTH_MAX:1.6,HEALTH_REGEN:.1,DAMAGE:1.4,GOLD_DROP:1.5},IS_PLAYABLE_CHARACTER:!1,IS_ATTACKING:!1,IS_FRONT_OF_OPPONENT:!1,IS_ALIVE:!0,IS_RESPAWNING:!1,xPosReversed:0,portrait:document.getElementById("enemyPortrait"),image:document.getElementById("enemyImage"),frameState:{idle:["assets/combatzone/enemy/slime_idle_1.svg"],dead:"assets/combatzone/universal/gravestone.svg"},healthBar:document.getElementById("enemyHealthBar"),attackTimerBar:document.getElementById("enemyAttackBar")},T={ATTACK:{NAME:"ATTACK",COST:0,BASE_COST:5,BASE_POWER:2,COST_MULTIPLIER:1.6,POWER_MULTIPLIER:1.3,BOUGHT:0,DOM:document.getElementById("shopBtnAttack")},HEALTH:{NAME:"HEALTH",COST:0,BASE_COST:4,BASE_POWER:5,COST_MULTIPLIER:1.4,POWER_MULTIPLIER:1.25,BOUGHT:0,DOM:document.getElementById("shopBtnHealth")},HEALTH_REGEN:{NAME:"HEALTH REGENERATION",COST:0,BASE_COST:6,BASE_POWER:1,COST_MULTIPLIER:1.2,POWER_MULTIPLIER:.15,BOUGHT:0,DOM:document.getElementById("shopBtnHealthRegen")},ATTACK_SPEED:{NAME:"ATTACK SPEED",COST:0,BASE_COST:30,BASE_POWER:3,COST_MULTIPLIER:2.1,POWER_MULTIPLIER:.9,BOUGHT:0,DOM:document.getElementById("shopBtnAttackSpeed")},CRIT_CHANCE:{NAME:"CRIT CHANCE",COST:0,BASE_COST:6,BASE_POWER:.05,COST_MULTIPLIER:1.5,POWER_MULTIPLIER:.6,BOUGHT:1,DOM:document.getElementById("shopBtnCritChance")},CRIT_MULTIPLIER:{NAME:"CRIT MULTIPLIER",COST:0,BASE_COST:6,BASE_POWER:.1,COST_MULTIPLIER:1.1,POWER_MULTIPLIER:1.1,BOUGHT:0,DOM:document.getElementById("shopBtnCritMultiplier")},BLOCK_CHANCE:{NAME:"BLOCK CHANCE",COST:0,BASE_COST:6,BASE_POWER:.05,COST_MULTIPLIER:1.9,POWER_MULTIPLIER:1.04,BOUGHT:0,DOM:document.getElementById("shopBtnBlockChance")}},u=document.getElementById("textOutput"),Y=document.getElementById("canvas"),Ae=document.getElementById("goldCount"),ie=document.getElementById("dayNight"),P={red:183,green:255,blue:255},S={red:255,green:221,blue:138},M={red:44,green:47,blue:107};let a=183,r=255,R=255,C=0;const K=document.querySelectorAll(".btnMenu"),O=document.querySelectorAll(".MenuFrame"),se=document.getElementById("spnPoints"),oe=document.getElementById("spnLevel"),Le=document.getElementById("spnCurrentExp"),Ce=document.getElementById("spnMaxExp"),_e=document.getElementById("btnPrestige"),le=document.getElementById("tickCounter"),ae=document.getElementById("debugButton");function re(e){if(e.classList.contains("hidden")){for(let t=0;t<O.length;t+=1)O[t].classList.contains("hidden")||O[t].classList.add("hidden");e.classList.remove("hidden")}}function j(e,t,A=!1,s){var b;const i=Math.random()*100-50,L=Math.random()*100-50,d=-120,Te=-100,_=document.createElement("span");_.innerHTML=e,_.classList.add("displayText"),A&&(_.classList.add("displayTextCrit"),_.innerHTML+="!"),s&&(_.classList.add("displayTextGold"),_.innerHTML=`+${_.innerHTML} Gold`);const g=(b=t.image)==null?void 0:b.getBoundingClientRect();_.style.left=`${(g.left-d+i).toString()}px`,_.style.top=`${(g.top-Te+L).toString()}px`,Y.appendChild(_);const y=_.animate([{transform:"translateY(0px)",opacity:"1"},{transform:"translateY(-100px)",opacity:"0"}],{duration:2500,iterations:1,easing:"ease-in-out"});y.play(),y.onfinish=()=>{_.remove()}}function p(e){e.statFrame!==void 0&&(e.statFrame.spnAttack.innerHTML=Math.round(e.DAMAGE).toFixed(0),e.statFrame.spnHealthMax.innerHTML=Math.round(e.HEALTH_MAX).toString(),e.statFrame.spnHealthRegen.innerHTML=e.HEALTH_REGEN.toFixed(1),e.statFrame.spnAttackSpeed.innerHTML=(B/e.ATTACK_COOLDOWN*10).toFixed(2),e.statFrame.spnCritChance.innerHTML=`${(e.CRIT_CHANCE*100).toFixed(2)}%`,e.statFrame.spnCritMultiplier.innerHTML=`${(e.CRIT_MULTIPLIER*100).toString()}%`,e.statFrame.spnBlockChance.innerHTML=`${(e.BLOCK_CHANCE*100).toFixed(2)}%`,e.statFrame.spnLevel.innerHTML=`${n.LEVEL}`)}function D(){Ae.innerHTML=E.GOLD.toString()}function J(){se.innerHTML=E.PRESTIGE_POINTS.toString(),oe.innerHTML=E.PRESTIGE_LEVEL.toString(),Le.innerHTML=E.PRESTIGE_EXP.toString(),Ce.innerHTML=ee().toString()}function I(e,t=!1){const{healthBar:A}=e,s=e.HEALTH_MAX,i=e.HEALTH_CURRENT;A.value=i,t&&(A.max=s,A.low=s/3,A.high=s/2,A.optimum=s*.67)}function f(e,t=!1){e.attackTimerBar.value=e.ATTACK_TIMER,t&&(e.attackTimerBar.max=e.ATTACK_COOLDOWN)}function Re(e,t){u.innerHTML+=`<${t}><br>${e}<${t}>`,u.scrollTop=u.scrollHeight}function c(e){let t=e.BASE_POWER+e.BOUGHT*e.POWER_MULTIPLIER;return e.NAME===T.ATTACK_SPEED.NAME&&(t=e.BASE_POWER/(1+e.BOUGHT*e.POWER_MULTIPLIER)),(e.NAME===T.CRIT_CHANCE.NAME||e===T.BLOCK_CHANCE)&&(t=e.BASE_POWER+e.BOUGHT/1e3*e.POWER_MULTIPLIER),e===T.CRIT_MULTIPLIER&&(t=e.BASE_POWER+e.BOUGHT/100*e.POWER_MULTIPLIER),t>=1?Number(t.toFixed(0)):t>=.1?Number(t.toFixed(1)):t>=.01?Number(t.toFixed(2)):Number(t.toFixed(3))}function Q(e){return Math.round(e.BASE_COST+e.BASE_COST*e.COST_MULTIPLIER*e.BOUGHT)}function o(e){const t=Q(e);let A=c(e);if(e===T.BLOCK_CHANCE||e===T.CRIT_CHANCE){const s=`${A.toString()}%`;e.DOM.innerHTML=`${e.NAME}<br>${t} Gold<br>+ ${s}`}else if(e===T.ATTACK_SPEED)e.DOM.innerHTML=`${e.NAME}<br>${t} Gold<br>- ${A*15} ms`;else if(e===T.CRIT_MULTIPLIER){A*=100;const s=`${A.toString()}%`;e.DOM.innerHTML=`${e.NAME}<br>${t} Gold<br>+ ${s}`}else e.DOM.innerHTML=`${e.NAME}<br>${t} Gold<br>+ ${A}`}function Z(){E.DAMAGE=E.base.DAMAGE+c(T.ATTACK),E.HEALTH_MAX=E.base.HEALTH_MAX+c(T.HEALTH),E.HEALTH_REGEN=E.base.HEALTH_REGEN+c(T.HEALTH_REGEN),E.CRIT_CHANCE=E.base.CRIT_CHANCE+c(T.CRIT_CHANCE)/100,E.CRIT_MULTIPLIER=E.base.CRIT_MULTIPLIER+c(T.CRIT_MULTIPLIER),E.BLOCK_CHANCE=E.base.BLOCK_CHANCE+c(T.BLOCK_CHANCE),E.ATTACK_COOLDOWN=E.base.ATTACK_COOLDOWN-c(T.ATTACK_SPEED)}function ce(){n.HEALTH_MAX=n.base.HEALTH_MAX+n.LEVEL*n.multiplier.HEALTH_MAX,n.DAMAGE=n.base.DAMAGE+n.LEVEL*n.multiplier.DAMAGE,n.GOLD_DROP=n.base.GOLD_DROP+n.LEVEL*n.multiplier.GOLD_DROP,n.HEALTH_REGEN=n.base.HEALTH_REGEN+n.LEVEL*n.multiplier.HEALTH_REGEN,I(n,!0)}function H(e){e.COST=Q(e),E.GOLD>=e.COST&&(E.GOLD-=e.COST,D(),o(e),Z(),p(E),e.BOUGHT+=1)}function ee(){return E.PRESTIGE_EXP_LEVELUP+E.PRESTIGE_EXP_LEVELUP*E.PRESTIGE_LEVEL*E.PRESTIGE_EXP_LEVELUP_MULTIPLIER}function Ee(){const e=ee();E.PRESTIGE_EXP>=e&&(E.PRESTIGE_LEVEL+=1,E.PRESTIGE_POINTS+=1,E.PRESTIGE_EXP-=e,Ee())}function de(){const e=n.LEVEL-E.HIGHEST_LEVEL_PRESTIGED_AT;let t=0;console.log(`levels climbed${e}`),e>0?(E.HIGHEST_LEVEL_PRESTIGED_AT=E.HIGHEST_LEVEL_REACHED,t=e/4+n.LEVEL/100):t=n.LEVEL/100,E.PRESTIGE_EXP+=Math.round(t)}function He(){o(T.ATTACK),o(T.HEALTH),o(T.HEALTH_REGEN),o(T.ATTACK_SPEED),o(T.CRIT_CHANCE),o(T.CRIT_MULTIPLIER),o(T.BLOCK_CHANCE)}function ne(){Z(),p(E),I(E),D(),f(E,!0),I(n),f(n,!0),J(),He()}function m(e,t){e.IS_ALIVE&&t!=null?e.HEALTH_CURRENT+=t:!e.IS_ALIVE&&t!=null?e.HEALTH_CURRENT=t:e.HEALTH_CURRENT=e.HEALTH_MAX}function G(e){e.IS_RESPAWNING=!0,e.image.src!==e.frameState.dead&&(e.image.src=e.frameState.dead);const t=150;e.RESPAWN_TIMER+=1,e.RESPAWN_TIMER>=t&&(e.IS_PLAYABLE_CHARACTER===!1?(n.LEVEL+=1,E.GOLD+=n.GOLD_DROP,j(n.GOLD_DROP.toString(),E,!1,!0),D(),p(E),E.HIGHEST_LEVEL_REACHED<=n.LEVEL&&(E.HIGHEST_LEVEL_REACHED=n.LEVEL)):(n.LEVEL>10?n.LEVEL-=10:n.LEVEL=1,m(n)),ce(),m(e),e.RESPAWN_TIMER=0,e.IS_ALIVE=!0,e.IS_RESPAWNING=!1,e.ATTACK_TIMER=0,e.image.src=e.frameState.idle[0],I(e))}function x(e){e.HEALTH_CURRENT<e.HEALTH_MAX&&(m(e,e.HEALTH_REGEN/(1e3/B)),I(e))}function Ie(e){Math.floor(e.HEALTH_CURRENT)<=0&&(e.IS_ALIVE=!1,G(e))}function Oe(e,t){let A=0;const s=Math.random();let i=!1;if(t.BLOCK_CHANCE>=s)A=e.DAMAGE*.2;else{const d=Math.random();e.CRIT_CHANCE>=d?(A=e.DAMAGE*e.CRIT_MULTIPLIER,i=!0):A=e.DAMAGE}return[A,i]}function h(e,t){const A=Oe(e,t);t.HEALTH_CURRENT-=A[0],e.ATTACK_TIMER=0,I(t),Re(`${e.NAME} attacks ${t.NAME} and deals ${A[0]} damage!`),j(A[0].toFixed(0),t,A[1]),Ie(t)}function W(e,t){!e.IS_ALIVE||!t.IS_ALIVE||(e.ATTACK_TIMER+=1,f(e),e.ATTACK_TIMER>=e.ATTACK_COOLDOWN&&(e.IS_ATTACKING=!0))}function l(e,t,A=1){return e<t?e+=A:e>t&&(e-=A),e}function ue(){C+=.1,C>=360&&(C=0),ie.style.transform=`rotate(${C}deg)`,C>=300||C<=50?(a=l(a,P.red,.6),R=l(R,P.green,.6),r=l(r,P.blue,.6)):C<300&&C>250||C>50&&C<90?(a=l(a,S.red,.6),R=l(R,S.green,.6),r=l(r,S.blue,.6)):C>90&&C<250&&(a=l(a,M.red,.6),R=l(R,M.green,.6),r=l(r,M.blue,.6)),Y.style.backgroundColor=`rgb(${a},${R},${r})`}function F(e){e.IS_ATTACKING=!1,e.ATTACK_TIMER=0,e.CHARGE_TIMER=0}function Pe(){const s=E.portrait,i=n.portrait;E.IS_ATTACKING?(E.IS_FRONT_OF_OPPONENT||(E.xPos+=1,s.style.left=`${E.xPos}%`),E.xPos+n.xPosReversed>=50&&(E.IS_FRONT_OF_OPPONENT=!0),E.IS_FRONT_OF_OPPONENT&&(E.CHARGE_TIMER+=1),E.CHARGE_TIMER>=E.CHARGE_COOLDOWN&&(h(E,n),F(E),E.IS_FRONT_OF_OPPONENT=!1)):!E.IS_ATTACKING&&E.xPos>5&&(E.xPos-=1,s.style.left=`${E.xPos}%`),n.IS_ATTACKING?(n.IS_FRONT_OF_OPPONENT||(n.xPosReversed+=1,i.style.right=`${n.xPosReversed}%`),E.xPos+n.xPosReversed>=50&&(n.IS_FRONT_OF_OPPONENT=!0),n.IS_FRONT_OF_OPPONENT&&(n.CHARGE_TIMER+=1,n.CHARGE_TIMER>=n.CHARGE_COOLDOWN&&(h(n,E),F(n),n.IS_FRONT_OF_OPPONENT=!1))):!n.IS_ATTACKING&&n.xPosReversed>5&&(n.xPosReversed-=1,i.style.right=`${n.xPosReversed}%`),ue()}ae.addEventListener("click",()=>{console.log(E),console.log(n),console.log(T)});function Se(){const e=document.getElementById("degreeSpn");e.innerHTML=`${C.toFixed(1)}<br>red: ${a.toFixed(1)}<br>green: ${R.toFixed(1)}<br>blue: ${r.toFixed(1)}`}const Me=document.getElementById("ticksPerSecond"),Ne=new Date;let v=Ne.getTime(),N=0;function fe(){if(N+=1,N===100){const t=new Date().getTime(),A=1e3/((t-v)/100);Me.innerHTML=A.toFixed(2),v=t,N=0}}function me(){E.DAMAGE=E.base.DAMAGE,E.HEALTH_MAX=E.base.HEALTH_MAX,E.HEALTH_CURRENT=E.base.HEALTH_MAX,E.HEALTH_REGEN=E.base.HEALTH_REGEN,E.ATTACK_COOLDOWN=E.base.ATTACK_COOLDOWN,E.ATTACK_TIMER=0,E.BLOCK_CHANCE=E.base.BLOCK_CHANCE,E.CRIT_CHANCE=E.base.CRIT_CHANCE,E.CRIT_MULTIPLIER=E.base.CRIT_MULTIPLIER,E.GOLD=E.base.GOLD,n.DAMAGE=n.base.DAMAGE,n.HEALTH_MAX=n.base.HEALTH_MAX,n.HEALTH_CURRENT=n.base.HEALTH_MAX,n.HEALTH_REGEN=n.base.HEALTH_REGEN,n.ATTACK_COOLDOWN=n.base.ATTACK_COOLDOWN,n.ATTACK_TIMER=0,n.BLOCK_CHANCE=n.base.BLOCK_CHANCE,n.CRIT_CHANCE=n.base.CRIT_CHANCE,n.CRIT_MULTIPLIER=n.base.CRIT_MULTIPLIER}function te(){U+=1,le.innerHTML=U.toString(),W(E,n),W(n,E),x(E),x(n),E.IS_RESPAWNING&&G(E),n.IS_RESPAWNING&&G(n),Pe(),fe(),Se(),setTimeout(te,B)}var $;($=T.ATTACK.DOM)==null||$.addEventListener("click",()=>{H(T.ATTACK),o(T.ATTACK)});var V;(V=T.HEALTH.DOM)==null||V.addEventListener("click",()=>{H(T.HEALTH),o(T.HEALTH)});var k;(k=T.HEALTH_REGEN.DOM)==null||k.addEventListener("click",()=>{H(T.HEALTH_REGEN),o(T.HEALTH_REGEN)});var X;(X=T.ATTACK_SPEED.DOM)==null||X.addEventListener("click",()=>{H(T.ATTACK_SPEED),o(T.ATTACK_SPEED)});var w;(w=T.CRIT_CHANCE.DOM)==null||w.addEventListener("click",()=>{H(T.CRIT_CHANCE),o(T.CRIT_CHANCE)});var q;(q=T.CRIT_MULTIPLIER.DOM)==null||q.addEventListener("click",()=>{H(T.CRIT_MULTIPLIER),o(T.CRIT_MULTIPLIER)});var z;(z=T.BLOCK_CHANCE.DOM)==null||z.addEventListener("click",()=>{H(T.BLOCK_CHANCE),o(T.BLOCK_CHANCE)});for(let e=0;e<K.length;e+=1)K[e].addEventListener("click",()=>{re(O[e])});_e.addEventListener("click",()=>{console.log("prestige!"),de(),Ee(),J(),me(),ne()});ne();te();
