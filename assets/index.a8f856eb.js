(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function E(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerpolicy&&(i.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?i.credentials="include":a.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=E(a);fetch(a.href,i)}})();const n={NAME:"PlayerName",HEALTH_MAX:100,HEALTH_CURRENT:100,HEALTH_REGEN:1,DAMAGE:5,ATTACK_TIMER:0,ATTACK_COOLDOWN:220,CHARGE_TIMER:0,CHARGE_COOLDOWN:50,CRIT_CHANCE:.05,CRIT_MULTIPLIER:1.2,BLOCK_CHANCE:.05,GOLD:5e5,RESPAWN_TIMER:0,PRESTIGE_ENABLED:!1,PRESTIGE_LEVEL:0,PRESTIGE_EXP:0,PRESTIGE_EXP_LEVELUP:10,PRESTIGE_EXP_LEVELUP_MULTIPLIER:1.7,HIGHEST_LEVEL_REACHED:0,HIGHEST_LEVEL_PRESTIGED_AT:0,PRESTIGE_POINTS:15,prestige_upgrades:{BONUS_DAMAGE:{NAME:"Play Hard",DESCRIPTION:"Increases your damage by 25% per level",BOUGHT:0,MULTIPLIER:.25},REDUCE_BLOCK:{NAME:"Sneak around",DESCRIPTION:"Reduce the enemies chance to block by 1% per level",BOUGHT:0,MULTIPLIER:.01},LIFESTEAL:{NAME:"Bloodthirst",DESCRIPTION:"Gain life equal to 5% of damage dealt per level",BOUGHT:0,MULTIPLIER:.05},GOLD_MULTIPLIER:{NAME:"Stock Market",DESCRIPTION:"Gain 100% per level extra gold each time you kill an enemy",BOUGHT:0,MULTIPLIER:1},SMITE:{NAME:"Smite",DESCRIPTION:"Deal damage 25% per level of your attack every 600th tick",BOUGHT:0,MULTIPLIER:.25,TIMER:0},BLOCK_PENETRATION:{NAME:"Right through",DESCRIPTION:"When the enemy blocks, deal 10% per level bonus damage",BOUGHT:0,MULTIPLIER:.1}},base:{HEALTH_MAX:100,HEALTH_REGEN:1,DAMAGE:5,ATTACK_COOLDOWN:220,CRIT_CHANCE:.05,CRIT_MULTIPLIER:1.2,BLOCK_CHANCE:.05,GOLD:5},IS_PLAYABLE_CHARACTER:!0,IS_ATTACKING:!1,IS_FRONT_OF_OPPONENT:!1,IS_ALIVE:!0,IS_RESPAWNING:!1,ANIMATION_ACTIVE:!1,xPos:0,portrait:document.getElementById("playerPortrait"),image:document.getElementById("playerImage"),imageDead:document.getElementById("playerImageDead"),frameState:{idle:["assets/combatzone/player/player_idle_1.svg"]},healthBar:document.getElementById("playerHealthBar"),attackTimerBar:document.getElementById("playerAttackBar"),spnCanvasHealthCurrent:document.getElementById("spnCanvasPlayerHealthCurrent"),spnCanvasHealthMax:document.getElementById("spnCanvasPlayerHealthMax"),statFrame:{spnAttack:document.getElementById("spnPlayerAttack"),spnHealthMax:document.getElementById("spnPlayerHealthMax"),spnHealthRegen:document.getElementById("spnPlayerHealthRegen"),spnAttackSpeed:document.getElementById("spnPlayerAttackSpeed"),spnCritChance:document.getElementById("spnPlayerCritChance"),spnCritMultiplier:document.getElementById("spnPlayerCritMultiplier"),spnBlockChance:document.getElementById("spnPlayerBlockChance"),spnLevel:document.getElementById("spnEnemyLevel")}},T={NAME:"Slime",HEALTH_MAX:20,HEALTH_CURRENT:20,HEALTH_REGEN:.1,DAMAGE:3,ATTACK_TIMER:0,ATTACK_COOLDOWN:310,CHARGE_TIMER:0,CHARGE_COOLDOWN:50,CRIT_CHANCE:.05,CRIT_MULTIPLIER:1.2,BLOCK_CHANCE:.05,GOLD_DROP:5,RESPAWN_TIMER:0,LEVEL:1,base:{HEALTH_MAX:20,HEALTH_REGEN:.1,DAMAGE:3,ATTACK_COOLDOWN:3100,CRIT_CHANCE:.05,CRIT_MULTIPLIER:1.2,BLOCK_CHANCE:.05,GOLD_DROP:5},multiplier:{HEALTH_MAX:1.6,HEALTH_REGEN:.001,DAMAGE:1.4,GOLD_DROP:1.5},IS_PLAYABLE_CHARACTER:!1,IS_ATTACKING:!1,IS_FRONT_OF_OPPONENT:!1,IS_ALIVE:!0,IS_RESPAWNING:!1,ANIMATION_ACTIVE:!1,xPosReversed:0,portrait:document.getElementById("enemyPortrait"),image:document.getElementById("enemyImage"),imageDead:document.getElementById("enemyImageDead"),frameState:{idle:["assets/combatzone/enemy/slime_idle_1.svg"]},healthBar:document.getElementById("enemyHealthBar"),attackTimerBar:document.getElementById("enemyAttackBar"),spnCanvasHealthCurrent:document.getElementById("spnCanvasEnemyHealthCurrent"),spnCanvasHealthMax:document.getElementById("spnCanvasEnemyHealthMax"),spnCanvasEnemyLevel:document.getElementById("spnCanvasEnemyLevel")},s={ATTACK:{NAME:"ATTACK",COST:0,BASE_COST:5,BASE_POWER:2,COST_MULTIPLIER:1.8,POWER_MULTIPLIER:1.5,BOUGHT:0,DOM:document.getElementById("shopBtnAttack")},HEALTH:{NAME:"HEALTH",COST:0,BASE_COST:4,BASE_POWER:5,COST_MULTIPLIER:1.4,POWER_MULTIPLIER:1.65,BOUGHT:0,DOM:document.getElementById("shopBtnHealth")},HEALTH_REGEN:{NAME:"HEALTH REGENERATION",COST:0,BASE_COST:6,BASE_POWER:.3,COST_MULTIPLIER:1.2,POWER_MULTIPLIER:1.01,BOUGHT:0,DOM:document.getElementById("shopBtnHealthRegen")},ATTACK_SPEED:{NAME:"ATTACK SPEED",COST:0,BASE_COST:30,BASE_POWER:3,COST_MULTIPLIER:2.1,POWER_MULTIPLIER:.9,BOUGHT:0,DOM:document.getElementById("shopBtnAttackSpeed")},CRIT_CHANCE:{NAME:"CRIT CHANCE",COST:0,BASE_COST:6,BASE_POWER:.005,COST_MULTIPLIER:1.5,POWER_MULTIPLIER:1.3,BOUGHT:1,DOM:document.getElementById("shopBtnCritChance")},CRIT_MULTIPLIER:{NAME:"CRIT MULTIPLIER",COST:0,BASE_COST:6,BASE_POWER:.1,COST_MULTIPLIER:1.1,POWER_MULTIPLIER:1.6,BOUGHT:0,DOM:document.getElementById("shopBtnCritMultiplier")},BLOCK_CHANCE:{NAME:"BLOCK CHANCE",COST:0,BASE_COST:6,BASE_POWER:.005,COST_MULTIPLIER:1.9,POWER_MULTIPLIER:1.2,BOUGHT:0,DOM:document.getElementById("shopBtnBlockChance")}};function de(){localStorage.setItem("player",JSON.stringify(n)),localStorage.setItem("enemy",JSON.stringify(T)),localStorage.setItem("shop",JSON.stringify(s))}function Ae(){if(localStorage.getItem("player")!==null&&localStorage.getItem("enemy")!==null&&localStorage.getItem("shop")!==null){const e=JSON.parse(localStorage.getItem("player")),t=JSON.parse(localStorage.getItem("enemy")),E=JSON.parse(localStorage.getItem("shop"));n.NAME=e.NAME,n.GOLD=e.GOLD,n.PRESTIGE_ENABLED=e.PRESTIGE_ENABLED,n.PRESTIGE_LEVEL=e.PRESTIGE_LEVEL,n.PRESTIGE_EXP=e.PRESTIGE_EXP,n.PRESTIGE_EXP_LEVELUP=e.PRESTIGE_EXP_LEVELUP,n.PRESTIGE_EXP_LEVELUP_MULTIPLIER=e.PRESTIGE_EXP_LEVELUP_MULTIPLIER,n.HIGHEST_LEVEL_REACHED=e.HIGHEST_LEVEL_REACHED,n.HIGHEST_LEVEL_PRESTIGED_AT=e.HIGHEST_LEVEL_PRESTIGED_AT,n.PRESTIGE_POINTS=e.PRESTIGE_POINTS,n.prestige_upgrades.BONUS_DAMAGE=e.prestige_upgrades.BONUS_DAMAGE,n.prestige_upgrades.REDUCE_BLOCK=e.prestige_upgrades.REDUCE_BLOCK,n.prestige_upgrades.LIFESTEAL=e.prestige_upgrades.LIFESTEAL,n.prestige_upgrades.GOLD_MULTIPLIER=e.prestige_upgrades.GOLD_MULTIPLIER,n.prestige_upgrades.SMITE=e.prestige_upgrades.SMITE,n.prestige_upgrades.BLOCK_PENETRATION=e.prestige_upgrades.BLOCK_PENETRATION,s.ATTACK.BOUGHT=E.ATTACK.BOUGHT,s.HEALTH.BOUGHT=E.HEALTH.BOUGHT,s.ATTACK_SPEED.BOUGHT=E.ATTACK_SPEED.BOUGHT,s.HEALTH_REGEN.BOUGHT=E.HEALTH_REGEN.BOUGHT,s.BLOCK_CHANCE.BOUGHT=E.BLOCK_CHANCE.BOUGHT,s.CRIT_CHANCE.BOUGHT=E.CRIT_CHANCE.BOUGHT,s.CRIT_MULTIPLIER.BOUGHT=E.CRIT_MULTIPLIER.BOUGHT,T.LEVEL=t.LEVEL,console.log(n,T,s)}}function Ee(e,t=0){return e?(t+=1,Ee(Math.floor(e/10),t)):t}function ce(e){let t=Ee(e);const E=96;let r=0,a=e.toFixed();if(t>=4){for(;t>=4;)r+=1,t-=3;const i=1e3**r;e/=i,e>100?a=Math.round(e).toString()+String.fromCharCode(E+r):e>10?a=e.toFixed(1)+String.fromCharCode(E+r):a=e.toFixed(2)+String.fromCharCode(E+r)}return a}const F=document.querySelectorAll(".btnMenu"),P=document.querySelectorAll(".menuFrame");function Ce(e){if(e.classList.contains("hidden")){for(let t=0;t<P.length;t+=1)P[t].classList.contains("hidden")||P[t].classList.add("hidden");e.classList.remove("hidden")}}function _e(e,t){const E=document.getElementById("textOutput");E.innerHTML+=`<${t}><br>${e}<${t}>`,E.scrollTop=E.scrollHeight}const se=document.getElementById("canvas"),Ie=document.getElementById("goldCount"),ue=document.getElementById("dayNight"),G={red:183,green:255,blue:255},f={red:255,green:221,blue:138},y={red:44,green:47,blue:107};let L=0,c=183,C=255,_=255;function d(e,t,E=1){return e<t?e+=E:e>t&&(e-=E),e}function He(){L+=.1,L>=360&&(L=0),ue.style.transform=`rotate(${L}deg)`,L>=300||L<=50?(c=d(c,G.red,.6),_=d(_,G.green,.6),C=d(C,G.blue,.6)):L<300&&L>250||L>50&&L<90?(c=d(c,f.red,.6),_=d(_,f.green,.6),C=d(C,f.blue,.6)):L>90&&L<250&&(c=d(c,y.red,.6),_=d(_,y.green,.6),C=d(C,y.blue,.6)),se.style.backgroundColor=`rgb(${c},${_},${C})`}function Re(){const e=document.getElementById("degreeSpn");e.innerHTML=`${L.toFixed(1)}<br>red: ${c.toFixed(1)}<br>green: ${_.toFixed(1)}<br>blue: ${C.toFixed(1)}`}function b(){Ie.innerHTML=ce(n.GOLD)}function N(e,t,E){var g;const r=Math.random()*100-50,a=Math.random()*100-50,i=-120,o=-100,l=document.createElement("span");switch(l.classList.add("displayText"),E){case"crit":l.classList.add("displayTextCrit"),l.innerHTML+=`<ruby>${e} <rp>(</rp><rt>Crit!</rt><rp>)</rp></ruby>`;break;case"gold":l.classList.add("displayTextGold"),l.innerHTML=`+${e} Gold`;break;case"block":l.classList.add("displayTextBlock"),l.innerHTML+=`<ruby>${e} <rp>(</rp><rt>Block!</rt><rp>)</rp></ruby>`;break;case"heal":l.classList.add("displayTextHeal"),l.innerHTML+=`<ruby>${e} <rp>(</rp><rt>Heal!</rt><rp>)</rp></ruby>`;break;case"skill":l.classList.add("displayTextSkill"),l.innerHTML+=`<ruby>${e} <rp>(</rp><rt>SMITE!</rt><rp>)</rp></ruby>`;break;default:l.innerHTML=e;break}const O=(g=t.image)==null?void 0:g.getBoundingClientRect();l.style.left=`${(O.left-i+r).toString()}px`,l.style.top=`${(O.top-o+a).toString()}px`,se.appendChild(l);const S=l.animate([{transform:"translateY(0px)",opacity:"1"},{transform:"translateY(-100px)",opacity:"0"}],{duration:2500,iterations:1,easing:"ease-in-out"});S.play(),S.onfinish=()=>{l.remove()}}const K=15;function A(e){let t=e.BASE_POWER+e.BOUGHT**e.POWER_MULTIPLIER;return e.NAME===s.ATTACK_SPEED.NAME&&(t=e.BASE_POWER+e.BOUGHT*e.POWER_MULTIPLIER),e.NAME===s.CRIT_CHANCE.NAME||e===s.BLOCK_CHANCE?(t=e.BASE_POWER+(e.BOUGHT/1e3)**e.POWER_MULTIPLIER,t):e===s.CRIT_MULTIPLIER?(t=e.BASE_POWER+(e.BOUGHT/30)**e.POWER_MULTIPLIER,t):t>=1?Number(t.toFixed(0)):t>=.1?Number(t.toFixed(1)):t>=.01?Number(t.toFixed(2)):Number(t.toFixed(3))}function Te(e){return Math.round(e.BASE_COST+e.BASE_COST*e.COST_MULTIPLIER*e.BOUGHT)}function ae(e){const t=Te(e),E=A(e);e.BOUGHT+=1;let r=A(e);if(e.BOUGHT-=1,r-=E,e===s.BLOCK_CHANCE||e===s.CRIT_CHANCE||e===s.CRIT_MULTIPLIER){const a=`${(r*100).toFixed(2)}%`;e.DOM.innerHTML=`<p class="shopUpgradeName">${e.NAME}</p><p class="shopUpgradeCost">${t} Gold<br>+ ${a}</p>`}else e===s.ATTACK_SPEED?e.DOM.innerHTML=`<p class="shopUpgradeName">${e.NAME}</p><p class="shopUpgradeCost">${t} Gold<br>${r*15} ms</p>`:e.DOM.innerHTML=`<p class="shopUpgradeName">${e.NAME}</p><p class="shopUpgradeCost">${t} Gold<br>+ ${r}</p>`}function H(e){e.COST=Te(e),n.GOLD>=e.COST&&(n.GOLD-=e.COST,e.BOUGHT+=1,b(),v(),B(n),ae(e),e===s.HEALTH&&u(n,!0),e===s.ATTACK_SPEED&&M(n,!0))}function Oe(){let e;for(e in s)ae(s[e])}function u(e,t=!1){const E=e.spnCanvasHealthCurrent,{healthBar:r}=e,a=e.HEALTH_CURRENT;if(r.value=a,E.innerHTML=Math.round(a),t){const i=e.HEALTH_MAX,o=e.spnCanvasHealthMax;o.innerHTML=Math.round(i),r.max=i,r.low=i/3,r.high=i/2,r.optimum=i*.67}}function M(e,t=!1){e.attackTimerBar.value=e.ATTACK_TIMER,t&&(e.attackTimerBar.max=e.ATTACK_COOLDOWN)}function B(e){e.statFrame!==void 0&&(e.statFrame.spnAttack.innerHTML=Math.round(e.DAMAGE).toFixed(0),e.statFrame.spnHealthMax.innerHTML=Math.round(e.HEALTH_MAX).toString(),e.statFrame.spnHealthRegen.innerHTML=e.HEALTH_REGEN.toFixed(1),e.statFrame.spnAttackSpeed.innerHTML=(K/e.ATTACK_COOLDOWN*10).toFixed(2),e.statFrame.spnCritChance.innerHTML=`${(e.CRIT_CHANCE*100).toFixed(2)}%`,e.statFrame.spnCritMultiplier.innerHTML=`${(e.CRIT_MULTIPLIER*100).toString()}%`,e.statFrame.spnBlockChance.innerHTML=`${(e.BLOCK_CHANCE*100).toFixed(2)}%`,e.statFrame.spnLevel.innerHTML=`${T.LEVEL}`)}function v(){n.DAMAGE=(n.base.DAMAGE+A(s.ATTACK))*(1+n.prestige_upgrades.BONUS_DAMAGE.BOUGHT*n.prestige_upgrades.BONUS_DAMAGE.MULTIPLIER),n.HEALTH_MAX=n.base.HEALTH_MAX+A(s.HEALTH),n.HEALTH_REGEN=n.base.HEALTH_REGEN+A(s.HEALTH_REGEN),n.CRIT_CHANCE=n.base.CRIT_CHANCE+A(s.CRIT_CHANCE),n.CRIT_MULTIPLIER=n.base.CRIT_MULTIPLIER+A(s.CRIT_MULTIPLIER),n.BLOCK_CHANCE=n.base.BLOCK_CHANCE+A(s.BLOCK_CHANCE),n.ATTACK_COOLDOWN=n.base.ATTACK_COOLDOWN-A(s.ATTACK_SPEED)}function Se(){const e=T,t=n;e.HEALTH_MAX=e.base.HEALTH_MAX+e.LEVEL*e.multiplier.HEALTH_MAX,e.DAMAGE=e.base.DAMAGE+e.LEVEL*e.multiplier.DAMAGE,e.GOLD_DROP=e.base.GOLD_DROP+e.LEVEL*e.multiplier.GOLD_DROP,e.HEALTH_REGEN=e.base.HEALTH_REGEN+e.LEVEL*e.multiplier.HEALTH_REGEN,e.BLOCK_CHANCE=e.base.BLOCK_CHANCE+e.LEVEL/1e3-t.prestige_upgrades.REDUCE_BLOCK.BOUGHT*t.prestige_upgrades.REDUCE_BLOCK.MULTIPLIER,u(T,!0)}const ge=document.getElementById("spnPoints"),pe=document.getElementById("spnLevel"),Pe=document.getElementById("spnCurrentExp"),Me=document.getElementById("spnMaxExp"),W=document.getElementById("btnMenuPrestige"),ie=document.getElementById("btnPrestige"),p=document.getElementById("prestigeUpgradeInfo"),me=document.getElementById("pSelectedPrestigeUpgradeName"),Ne=document.getElementById("pSelectedPrestigeUpgradeDescription"),Be=document.getElementById("spnSelectedPrestigeUpgradeCost"),$=document.getElementById("divBuySelectedPrestigeUpgrade"),Ge=document.getElementsByClassName("btnPrestigeUpgrade");function V(){ge.innerHTML=n.PRESTIGE_POINTS.toString(),pe.innerHTML=n.PRESTIGE_LEVEL.toString(),Pe.innerHTML=n.PRESTIGE_EXP.toString(),Me.innerHTML=le().toString()}function re(e){me.innerHTML=String(e.NAME),Ne.innerHTML=String(e.DESCRIPTION),Be.innerHTML=(Number(e.BOUGHT)+1).toString()}function fe(e){$.innerHTML="";const t=document.createElement("button");t.innerHTML="Purchase",$.appendChild(t),t.addEventListener("click",()=>{const E=Number(e.BOUGHT)+1;n.PRESTIGE_POINTS>=E&&(n.PRESTIGE_POINTS-=E,e.BOUGHT+=1,V(),re(e),v(),B(n))})}function ye(){p!=null&&p.classList.contains("hidden")&&p.classList.remove("hidden");const e=this.dataset.name;let t=n.prestige_upgrades.BONUS_DAMAGE;switch(e){case"BONUS_DAMAGE":t=n.prestige_upgrades.BONUS_DAMAGE;break;case"REDUCE_BLOCK":t=n.prestige_upgrades.REDUCE_BLOCK;break;case"LIFESTEAL":t=n.prestige_upgrades.LIFESTEAL;break;case"GOLD_MULTIPLIER":t=n.prestige_upgrades.GOLD_MULTIPLIER;break;case"SMITE":t=n.prestige_upgrades.SMITE;break;case"BLOCK_PENETRATION":t=n.prestige_upgrades.BLOCK_PENETRATION;break;default:return}re(t),fe(t)}function Ue(e){const t=document.getElementById(e).getElementsByTagName("button");for(let E=0;E<t.length;E+=1)console.log(t[E]),t[E].disabled=!1}function le(){return n.PRESTIGE_EXP_LEVELUP+n.PRESTIGE_EXP_LEVELUP*n.PRESTIGE_LEVEL*n.PRESTIGE_EXP_LEVELUP_MULTIPLIER}function oe(){const e=le();if(n.PRESTIGE_EXP>=e){n.PRESTIGE_LEVEL+=1,n.PRESTIGE_POINTS+=1,n.PRESTIGE_EXP-=e;const t=n.PRESTIGE_LEVEL;console.log(t),console.log(t/10);const E=`tier${Math.floor(t/10).toFixed(0)}`;console.log(E),Ue(E),oe()}}function De(){const e=T.LEVEL-n.HIGHEST_LEVEL_PRESTIGED_AT;let t=0;console.log(`levels climbed${e}`),e>0?(n.HIGHEST_LEVEL_PRESTIGED_AT=n.HIGHEST_LEVEL_REACHED,t=e/3+T.LEVEL/80):t=T.LEVEL/80,n.PRESTIGE_EXP+=Math.round(t)}function he(){const t=n.prestige_upgrades.SMITE;if(t.TIMER+=1,t.TIMER>=600&&T.IS_ALIVE){console.log("SMITTEN");const E=n.DAMAGE*t.BOUGHT*t.MULTIPLIER;T.HEALTH_CURRENT-=E,N(E.toFixed(0),T,"skill"),t.TIMER=0}}function m(e,t){e.IS_ALIVE&&t!=null?e.HEALTH_CURRENT+=t:!e.IS_ALIVE&&t!=null?e.HEALTH_CURRENT=t:e.HEALTH_CURRENT=e.HEALTH_MAX}function h(e){e.IS_RESPAWNING=!0;const t=e.imageDead,E=e.image;t.classList.contains("hidden")&&(t.classList.remove("hidden"),E.classList.add("hidden"));const r=150;if(e.RESPAWN_TIMER+=1,e.RESPAWN_TIMER>=r){if(e.IS_PLAYABLE_CHARACTER===!1){T.LEVEL+=1,!W.disabled&&T.LEVEL>=30&&(n.PRESTIGE_ENABLED=!0,ie.disabled=!1,W.disabled=!1);const i=T.GOLD_DROP*(1+n.prestige_upgrades.GOLD_MULTIPLIER.BOUGHT*n.prestige_upgrades.GOLD_MULTIPLIER.MULTIPLIER);n.GOLD+=i,N(i.toString(),n,"gold"),b(),B(n),n.HIGHEST_LEVEL_REACHED<=T.LEVEL&&(n.HIGHEST_LEVEL_REACHED=T.LEVEL)}else T.LEVEL>10?T.LEVEL-=10:T.LEVEL=1,m(T);Se(),m(e);const a=T.spnCanvasEnemyLevel;a&&(a.innerHTML=T.LEVEL.toString()),e.RESPAWN_TIMER=0,e.IS_ALIVE=!0,e.IS_RESPAWNING=!1,e.ATTACK_TIMER=0,t.classList.add("hidden"),E.classList.remove("hidden"),u(e)}}function X(e){e.HEALTH_CURRENT<e.HEALTH_MAX&&(m(e,e.HEALTH_REGEN/(1e3/K)),u(e))}function be(e){Math.floor(e.HEALTH_CURRENT)<=0&&(e.IS_ALIVE=!1,h(e))}function Ke(e,t){var o,l,O,S,g;let E=0;const r=Math.random();let a="normal";if(t.BLOCK_CHANCE>=r){const I=(l=(o=e.prestige_upgrades)==null?void 0:o.BLOCK_PENETRATION.BOUGHT)!=null?l:0,Le=(S=(O=e.prestige_upgrades)==null?void 0:O.BLOCK_PENETRATION.multiplier)!=null?S:0;a="block",E=e.DAMAGE*.2*(1+I*Le)}else{const I=Math.random();e.CRIT_CHANCE>=I?(E=e.DAMAGE*e.CRIT_MULTIPLIER,a="crit"):E=e.DAMAGE}if((g=e.prestige_upgrades)!=null&&g.LIFESTEAL.BOUGHT){const I=E*e.prestige_upgrades.LIFESTEAL.BOUGHT*e.prestige_upgrades.LIFESTEAL.MULTIPLIER;m(e,I),I>=1&&N(I.toFixed(0),e,"heal")}return[E,a]}function ve(e,t){const E=Ke(e,t);t.HEALTH_CURRENT-=E[0],u(t),_e(`${e.NAME} attacks ${t.NAME} and deals ${E[0]} damage!`),N(E[0].toFixed(0),t,E[1]),be(t)}function Ve(e){e.IS_ATTACKING=!1,e.ATTACK_TIMER=0,e.CHARGE_TIMER=0}function xe(e,t){const E=document.getElementById("playerPortrait"),r=document.getElementById("enemyPortrait");let a;ve(e,t);let i={};e.IS_PLAYABLE_CHARACTER?(a=E,i=[{left:"30%"},{left:"1%"}]):(a=r,i=[{right:"30%"},{right:"1%"}]);const o={duration:700,easing:"ease-in-out",fill:"forwards"},l=a.animate(i,o);l.play(),l.onfinish=()=>{e.IS_FRONT_OF_OPPONENT=!1,Ve(e),e.ANIMATION_ACTIVE=!1}}function ke(e,t){if(!e.IS_ATTACKING&&!e.ANIMATION_ACTIVE){const E=n.portrait,r=T.portrait;let a={},i;e.IS_PLAYABLE_CHARACTER?(i=E,a=[{left:"1%"},{left:"30%"}]):(i=r,a=[{right:"1%"},{right:"30%"}]),e.ANIMATION_ACTIVE=!0;const o={duration:700,fill:"forwards",easing:"ease-in-out",endDelay:400};e.IS_ATTACKING=!0;const l=i.animate(a,o);l.play(),l.onfinish=()=>{e.IS_FRONT_OF_OPPONENT=!0,xe(e,t)}}}function w(e,t){!e.IS_ALIVE||!t.IS_ALIVE||(e.ATTACK_TIMER+=1,M(e),e.ATTACK_TIMER>=e.ATTACK_COOLDOWN&&!e.IS_ATTACKING&&ke(e,t))}const Fe=document.getElementById("tickCounter"),We=document.getElementById("debugButton");let Y=0;const $e=document.getElementById("btnSave"),q=document.getElementById("btnLoad");function x(){v(),B(n),u(n,!0),b(),M(n,!0),u(T,!0),M(T,!0),V(),Oe()}function Xe(){n.DAMAGE=n.base.DAMAGE,n.HEALTH_MAX=n.base.HEALTH_MAX,n.HEALTH_CURRENT=n.base.HEALTH_MAX,n.HEALTH_REGEN=n.base.HEALTH_REGEN,n.ATTACK_COOLDOWN=n.base.ATTACK_COOLDOWN,n.ATTACK_TIMER=0,n.BLOCK_CHANCE=n.base.BLOCK_CHANCE,n.CRIT_CHANCE=n.base.CRIT_CHANCE,n.CRIT_MULTIPLIER=n.base.CRIT_MULTIPLIER,n.GOLD=n.base.GOLD,T.DAMAGE=T.base.DAMAGE,T.HEALTH_MAX=T.base.HEALTH_MAX,T.HEALTH_CURRENT=T.base.HEALTH_MAX,T.HEALTH_REGEN=T.base.HEALTH_REGEN,T.ATTACK_COOLDOWN=T.base.ATTACK_COOLDOWN,T.ATTACK_TIMER=0,T.BLOCK_CHANCE=T.base.BLOCK_CHANCE,T.CRIT_CHANCE=T.base.CRIT_CHANCE,T.CRIT_MULTIPLIER=T.base.CRIT_MULTIPLIER,s.ATTACK.BOUGHT=0,s.ATTACK_SPEED.BOUGHT=0,s.BLOCK_CHANCE.BOUGHT=0,s.CRIT_CHANCE.BOUGHT=0,s.CRIT_MULTIPLIER.BOUGHT=0,s.HEALTH.BOUGHT=0,s.HEALTH_REGEN.BOUGHT=0}function k(){Y+=1,Fe.innerHTML=Y.toString(),w(n,T),w(T,n),X(n),X(T),n.prestige_upgrades.SMITE.BOUGHT>0&&he(),n.IS_RESPAWNING&&h(n),T.IS_RESPAWNING&&h(T),He(),ze(),Re(),setTimeout(k,K)}const R=document.getElementById("overlay"),U=document.getElementById("btnGameStart");function we(){var t;const e=document.getElementById("inputNameSelect");(e==null?void 0:e.value)!==""||(e==null?void 0:e.value)==null?n.NAME=(t=e==null?void 0:e.value)!=null?t:"null":n.NAME="Player",x(),R==null||R.classList.add("hidden"),k()}function Ye(){Ae(),x(),R==null||R.classList.add("hidden"),k()}We.addEventListener("click",()=>{console.log(n),console.log(T),console.log(s)});const qe=document.getElementById("ticksPerSecond"),Je=new Date;let J=Je.getTime(),D=0;function ze(){if(D+=1,D===100){const t=new Date().getTime(),E=1e3/((t-J)/100);qe.innerHTML=E.toFixed(2),J=t,D=0}}var z;(z=s.ATTACK.DOM)==null||z.addEventListener("click",()=>{H(s.ATTACK)});var Q;(Q=s.HEALTH.DOM)==null||Q.addEventListener("click",()=>{H(s.HEALTH)});var Z;(Z=s.HEALTH_REGEN.DOM)==null||Z.addEventListener("click",()=>{H(s.HEALTH_REGEN)});var j;(j=s.ATTACK_SPEED.DOM)==null||j.addEventListener("click",()=>{H(s.ATTACK_SPEED)});var ee;(ee=s.CRIT_CHANCE.DOM)==null||ee.addEventListener("click",()=>{H(s.CRIT_CHANCE)});var te;(te=s.CRIT_MULTIPLIER.DOM)==null||te.addEventListener("click",()=>{H(s.CRIT_MULTIPLIER)});var ne;(ne=s.BLOCK_CHANCE.DOM)==null||ne.addEventListener("click",()=>{H(s.BLOCK_CHANCE)});for(let e=0;e<F.length;e+=1)F[e].addEventListener("click",()=>{Ce(P[e])});ie.addEventListener("click",()=>{De(),oe(),V(),Xe(),x()});function Qe(e){e.addEventListener("click",ye)}Array.from(Ge).forEach(Qe);$e.addEventListener("click",de);localStorage.getItem("player")!==null&&localStorage.getItem("enemy")!==null&&localStorage.getItem("shop")!==null?q.addEventListener("click",Ye):q.disabled=!0;U==null||U.addEventListener("click",we);
