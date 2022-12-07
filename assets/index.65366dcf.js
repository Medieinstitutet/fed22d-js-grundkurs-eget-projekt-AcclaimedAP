(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const A of document.querySelectorAll('link[rel="modulepreload"]'))o(A);new MutationObserver(A=>{for(const l of A)if(l.type==="childList")for(const R of l.addedNodes)R.tagName==="LINK"&&R.rel==="modulepreload"&&o(R)}).observe(document,{childList:!0,subtree:!0});function T(A){const l={};return A.integrity&&(l.integrity=A.integrity),A.referrerpolicy&&(l.referrerPolicy=A.referrerpolicy),A.crossorigin==="use-credentials"?l.credentials="include":A.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(A){if(A.ep)return;A.ep=!0;const l=T(A);fetch(A.href,l)}})();const D=15;let M=0;const E={NAME:"PlayerName",HEALTH_MAX:100,HEALTH_CURRENT:100,HEALTH_REGEN:5,DAMAGE:5,ATTACK_TIMER:0,ATTACK_COOLDOWN:220,CHARGE_TIMER:0,CHARGE_COOLDOWN:50,CRIT_CHANCE:.05,CRIT_MULTIPLIER:1.2,BLOCK_CHANCE:.05,GOLD:500,RESPAWN_TIMER:0,base:{HEALTH_MAX:100,HEALTH_REGEN:5,DAMAGE:5,ATTACK_COOLDOWN:220,CRIT_CHANCE:.05,CRIT_MULTIPLIER:1.2,BLOCK_CHANCE:.05},IS_PLAYABLE_CHARACTER:!0,IS_ATTACKING:!1,IS_FRONT_OF_OPPONENT:!1,IS_ALIVE:!0,IS_RESPAWNING:!1,xPos:0,portrait:document.getElementById("playerPortrait"),image:document.getElementById("playerImage"),frameState:{idle:["assets/combatzone/player/player_idle_1.svg"],dead:"assets/combatzone/universal/gravestone.svg"},healthBar:document.getElementById("playerHealthBar"),attackTimerBar:document.getElementById("playerAttackBar"),statFrame:{spnAttack:document.getElementById("spnPlayerAttack"),spnHealthMax:document.getElementById("spnPlayerHealthMax"),spnAttackSpeed:document.getElementById("spnPlayerAttackSpeed")}},t={NAME:"Slime",HEALTH_MAX:20,HEALTH_CURRENT:20,HEALTH_REGEN:.1,DAMAGE:3,ATTACK_TIMER:0,ATTACK_COOLDOWN:310,CHARGE_TIMER:0,CHARGE_COOLDOWN:50,CRIT_CHANCE:.05,CRIT_MULTIPLIER:1.2,BLOCK_CHANCE:.05,GOLD_DROP:5,RESPAWN_TIMER:0,LEVEL:1,base:{HEALTH_MAX:20,HEALTH_REGEN:.1,DAMAGE:3,GOLD_DROP:5},multiplier:{HEALTH_MAX:1.6,HEALTH_REGEN:1.05,DAMAGE:1.4,GOLD_DROP:1.5},IS_PLAYABLE_CHARACTER:!1,IS_ATTACKING:!1,IS_FRONT_OF_OPPONENT:!1,IS_ALIVE:!0,IS_RESPAWNING:!1,xPosReversed:0,portrait:document.getElementById("enemyPortrait"),image:document.getElementById("enemyImage"),frameState:{idle:["assets/combatzone/enemy/slime_idle_1.svg"],dead:"assets/combatzone/universal/gravestone.svg"},healthBar:document.getElementById("enemyHealthBar"),attackTimerBar:document.getElementById("enemyAttackBar")},s={ATTACK:{NAME:"ATTACK",COST:0,BASE_COST:6,BASE_POWER:2,COST_MULTIPLIER:1.6,POWER_MULTIPLIER:1.3,BOUGHT:0,DOM:document.getElementById("shopBtnAttack")},HEALTH:{NAME:"HEALTH",COST:0,BASE_COST:6,BASE_POWER:5,COST_MULTIPLIER:1.4,POWER_MULTIPLIER:1.25,BOUGHT:0,DOM:document.getElementById("shopBtnHealth")},HEALTH_REGEN:{NAME:"HEALTH REGENERATION",COST:0,BASE_COST:6,BASE_POWER:1,COST_MULTIPLIER:1.2,POWER_MULTIPLIER:1.15,BOUGHT:0,DOM:document.getElementById("shopBtnHealthRegen")},ATTACK_SPEED:{NAME:"ATTACK SPEED",COST:0,BASE_COST:6,BASE_POWER:3,COST_MULTIPLIER:2.1,POWER_MULTIPLIER:.9,BOUGHT:0,DOM:document.getElementById("shopBtnAttackSpeed")},CRIT_CHANCE:{NAME:"CRIT CHANCE",COST:0,BASE_COST:6,BASE_POWER:.005,COST_MULTIPLIER:1.5,POWER_MULTIPLIER:1.04,BOUGHT:0,DOM:document.getElementById("shopBtnCritChance")},CRIT_MULTIPLIER:{NAME:"CRIT MULTIPLIER",COST:0,BASE_COST:6,BASE_POWER:.1,COST_MULTIPLIER:1.1,POWER_MULTIPLIER:1.1,BOUGHT:0,DOM:document.getElementById("shopBtnCritMultiplier")},BLOCK_CHANCE:{NAME:"BLOCK CHANCE",COST:0,BASE_COST:6,BASE_POWER:.005,COST_MULTIPLIER:1.9,POWER_MULTIPLIER:1.04,BOUGHT:0,DOM:document.getElementById("shopBtnBlockChance")}},c=document.getElementById("textOutput"),b=document.getElementById("canvas"),h=document.getElementById("goldCount"),F=document.getElementById("dayNight"),C={red:183,green:255,blue:255},d={red:255,green:221,blue:138},I={red:44,green:47,blue:107};let _=183,a=255,O=255,i=0;const x=document.getElementById("tickCounter"),$=document.getElementById("debugButton");function p(e){e.statFrame!==void 0&&(e.statFrame.spnAttack.innerHTML=Math.round(e.DAMAGE).toString(),e.statFrame.spnHealthMax.innerHTML=Math.round(e.HEALTH_MAX).toString(),e.statFrame.spnAttackSpeed.innerHTML=(D/e.ATTACK_COOLDOWN*10).toFixed(2))}function S(){h.innerHTML=E.GOLD.toString()}function L(e,n=!1){const T=e.healthBar,o=e.HEALTH_MAX,A=e.HEALTH_CURRENT;T.value=A,n&&(T.max=o,T.low=o/3,T.high=o/2,T.optimum=o*.67)}function N(e,n=!1){e.attackTimerBar.value=e.ATTACK_TIMER,n&&(e.attackTimerBar.max=e.ATTACK_COOLDOWN)}function v(e,n){c.innerHTML+=`<${n}><br>${e}<${n}>`,c.scrollTop=c.scrollHeight}function k(e){const n=e.BASE_POWER+e.BOUGHT*e.POWER_MULTIPLIER;return n>=1?Number(n.toFixed(0)):n>=.1?Number(n.toFixed(1)):n>=.01?Number(n.toFixed(2)):Number(n.toFixed(3))}function g(e){return Math.round(e.BASE_COST+e.BASE_COST*e.COST_MULTIPLIER*e.BOUGHT)}function U(e){const n=g(e);let T=k(e);if(e===s.BLOCK_CHANCE||e===s.CRIT_CHANCE||e===s.CRIT_MULTIPLIER){T*=100;const o=`${T.toString()}%`;e.DOM.innerHTML=`${e.NAME}<br>${n} Gold<br>+ ${o}`}else e===s.ATTACK_SPEED?e.DOM.innerHTML=`${e.NAME}<br>${n} Gold<br>- ${T*10} ms`:e.DOM.innerHTML=`${e.NAME}<br>${n} Gold<br>+ ${T}`}function K(){E.DAMAGE=E.base.DAMAGE+s.ATTACK.BASE_POWER+s.ATTACK.BOUGHT*s.ATTACK.POWER_MULTIPLIER,E.HEALTH_MAX=E.base.HEALTH_MAX+s.HEALTH.BASE_POWER+s.HEALTH.BOUGHT*s.HEALTH.POWER_MULTIPLIER}function V(){t.HEALTH_MAX=t.base.HEALTH_MAX+t.LEVEL*t.multiplier.HEALTH_MAX,t.DAMAGE=t.base.DAMAGE+t.LEVEL*t.multiplier.DAMAGE,t.GOLD_DROP=t.base.GOLD_DROP+t.LEVEL*t.multiplier.GOLD_DROP,t.HEALTH_REGEN=t.base.HEALTH_REGEN+t.LEVEL*t.multiplier.HEALTH_REGEN,L(t,!0)}function X(e){e.COST=g(e),E.GOLD>=e.COST&&(E.GOLD-=e.COST,e.BOUGHT+=1,S(),K(),p(E),U(e))}function P(e,n){e.IS_ALIVE&&n!=null?e.HEALTH_CURRENT+=n:!e.IS_ALIVE&&n!=null?e.HEALTH_CURRENT=n:e.HEALTH_CURRENT=e.HEALTH_MAX}function H(e){e.IS_RESPAWNING=!0,e.image.src!==e.frameState.dead&&(e.image.src=e.frameState.dead);const n=150;e.RESPAWN_TIMER+=1,e.RESPAWN_TIMER>=n&&(e.IS_PLAYABLE_CHARACTER===!1?(t.LEVEL+=1,E.GOLD+=t.GOLD_DROP,S()):(t.LEVEL>10?t.LEVEL-=10:t.LEVEL=1,P(t)),V(),P(e),e.RESPAWN_TIMER=0,e.IS_ALIVE=!0,e.IS_RESPAWNING=!1,e.ATTACK_TIMER=0,e.image.src=e.frameState.idle[0],L(e))}function w(e){Math.floor(e.HEALTH_CURRENT)<=0&&(e.IS_ALIVE=!1,H(e))}function z(e,n){let T=0;const o=Math.random();if(n.BLOCK_CHANCE>=o)T=e.DAMAGE*.2;else{const A=Math.random();e.CRIT_CHANCE>=A?T=e.DAMAGE*e.CRIT_MULTIPLIER:T=e.DAMAGE}return T}function f(e,n){const T=z(e,n);n.HEALTH_CURRENT-=T,e.ATTACK_TIMER=0,L(n),v(`${e.NAME} attacks ${n.NAME} and deals ${T} damage!`),w(n)}function m(e,n){!e.IS_ALIVE||!n.IS_ALIVE||(e.ATTACK_TIMER+=1,N(e),e.ATTACK_TIMER>=e.ATTACK_COOLDOWN&&(e.IS_ATTACKING=!0))}function r(e,n,T=1){return e<n?e+=T:e>n&&(e-=T),e}function Y(){i+=.2,i>=360&&(i=0),F.style.transform=`rotate(${i}deg)`,i>=280||i<=80?(_=r(_,C.red),O=r(O,C.green),a=r(a,C.blue)):i<280&&i>240||i>80&&i<120?(_=r(_,d.red),O=r(O,d.green),a=r(a,d.blue)):i>120&&i<240&&(_=r(_,I.red),O=r(O,I.green),a=r(a,I.blue)),b.style.backgroundColor=`rgb(${_},${O},${a})`}function B(e){e.IS_ATTACKING=!1,e.ATTACK_TIMER=0,e.CHARGE_TIMER=0}function j(){const o=E.portrait,A=t.portrait;E.IS_ATTACKING?(E.IS_FRONT_OF_OPPONENT||(E.xPos+=1,o.style.left=`${E.xPos}%`),E.xPos+t.xPosReversed>=50&&(E.IS_FRONT_OF_OPPONENT=!0),E.IS_FRONT_OF_OPPONENT&&(E.CHARGE_TIMER+=1),E.CHARGE_TIMER>=E.CHARGE_COOLDOWN&&(f(E,t),B(E),E.IS_FRONT_OF_OPPONENT=!1)):!E.IS_ATTACKING&&E.xPos>5&&(E.xPos-=1,o.style.left=`${E.xPos}%`),t.IS_ATTACKING?(t.IS_FRONT_OF_OPPONENT||(t.xPosReversed+=1,A.style.right=`${t.xPosReversed}%`),E.xPos+t.xPosReversed>=50&&(t.IS_FRONT_OF_OPPONENT=!0),t.IS_FRONT_OF_OPPONENT&&(t.CHARGE_TIMER+=1,t.CHARGE_TIMER>=t.CHARGE_COOLDOWN&&(f(t,E),B(t),t.IS_FRONT_OF_OPPONENT=!1))):!t.IS_ATTACKING&&t.xPosReversed>5&&(t.xPosReversed-=1,A.style.right=`${t.xPosReversed}%`),Y()}$.addEventListener("click",()=>{console.log(E),console.log(t)});const q=document.getElementById("ticksPerSecond"),J=new Date;let G=J.getTime(),u=0;function Q(){if(u+=1,u===100){const n=new Date().getTime(),T=(n-G)/100;q.innerHTML=T.toString(),G=n,u=0}}function W(){M+=1,x.innerHTML=M.toString(),m(E,t),m(t,E),E.IS_RESPAWNING&&H(E),t.IS_RESPAWNING&&H(t),j(),Q(),setTimeout(W,D)}var y;(y=s.ATTACK.DOM)==null||y.addEventListener("click",()=>{X(s.ATTACK),U(s.ATTACK)});K();p(E);L(E);S();N(E,!0);L(t);N(t,!0);W();
