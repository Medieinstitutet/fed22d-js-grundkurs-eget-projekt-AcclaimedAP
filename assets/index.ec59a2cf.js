(function(){const E=document.createElement("link").relList;if(E&&E.supports&&E.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const R of r.addedNodes)R.tagName==="LINK"&&R.rel==="modulepreload"&&o(R)}).observe(document,{childList:!0,subtree:!0});function i(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=i(s);fetch(s.href,r)}})();const t={NAME:"PlayerName",HEALTH_MAX:100,HEALTH_CURRENT:100,HEALTH_REGEN:1,DAMAGE:5,ATTACK_TIMER:0,ATTACK_COOLDOWN:220,CHARGE_TIMER:0,CHARGE_COOLDOWN:50,CRIT_CHANCE:.05,CRIT_MULTIPLIER:1.2,BLOCK_CHANCE:.05,GOLD:5,RESPAWN_TIMER:0,PRESTIGE_ENABLED:!1,PRESTIGE_LEVEL:0,PRESTIGE_EXP:0,PRESTIGE_EXP_LEVELUP:10,PRESTIGE_EXP_LEVELUP_MULTIPLIER:1.7,HIGHEST_LEVEL_REACHED:0,HIGHEST_LEVEL_PRESTIGED_AT:0,PRESTIGE_POINTS:15,prestige_upgrades:{BONUS_DAMAGE:{NAME:"Play Hard",DESCRIPTION:"Increases your damage by 25% per level",BOUGHT:0,MULTIPLIER:.25},REDUCE_BLOCK:{NAME:"Sneak around",DESCRIPTION:"Reduce the enemies chance to block by 1%",BOUGHT:0,MULTIPLIER:.01},LIFESTEAL:{NAME:"Bloodthirst",DESCRIPTION:"Gain life equal to 5% of damage dealt",BOUGHT:0,MULTIPLIER:.05},GOLD_MULTIPLIER:{NAME:"Stock Market",DESCRIPTION:"Gain 100% extra gold each time you kill an enemy",BOUGHT:0,MULTIPLIER:1},SMITE:{NAME:"Smite",DESCRIPTION:"Deal damage 25% of your attack every  600th tick",BOUGHT:0,MULTIPLIER:.25,TIMER:0},BLOCK_PENETRATION:{NAME:"Right through",DESCRIPTION:"When the enemy blocks, deal bonus damage",BOUGHT:0,MULTIPLIER:.1}},base:{HEALTH_MAX:100,HEALTH_REGEN:1,DAMAGE:5,ATTACK_COOLDOWN:220,CRIT_CHANCE:.05,CRIT_MULTIPLIER:1.2,BLOCK_CHANCE:.05,GOLD:5},IS_PLAYABLE_CHARACTER:!0,IS_ATTACKING:!1,IS_FRONT_OF_OPPONENT:!1,IS_ALIVE:!0,IS_RESPAWNING:!1,xPos:0,portrait:document.getElementById("playerPortrait"),image:document.getElementById("playerImage"),frameState:{idle:["assets/combatzone/player/player_idle_1.svg"],dead:"assets/combatzone/universal/gravestone.svg"},healthBar:document.getElementById("playerHealthBar"),attackTimerBar:document.getElementById("playerAttackBar"),statFrame:{spnAttack:document.getElementById("spnPlayerAttack"),spnHealthMax:document.getElementById("spnPlayerHealthMax"),spnHealthRegen:document.getElementById("spnPlayerHealthRegen"),spnAttackSpeed:document.getElementById("spnPlayerAttackSpeed"),spnCritChance:document.getElementById("spnPlayerCritChance"),spnCritMultiplier:document.getElementById("spnPlayerCritMultiplier"),spnBlockChance:document.getElementById("spnPlayerBlockChance"),spnLevel:document.getElementById("spnEnemyLevel")}},n={NAME:"Slime",HEALTH_MAX:20,HEALTH_CURRENT:20,HEALTH_REGEN:.1,DAMAGE:3,ATTACK_TIMER:0,ATTACK_COOLDOWN:310,CHARGE_TIMER:0,CHARGE_COOLDOWN:50,CRIT_CHANCE:.05,CRIT_MULTIPLIER:1.2,BLOCK_CHANCE:.05,GOLD_DROP:5,RESPAWN_TIMER:0,LEVEL:1,base:{HEALTH_MAX:20,HEALTH_REGEN:.1,DAMAGE:3,ATTACK_COOLDOWN:310,CRIT_CHANCE:.05,CRIT_MULTIPLIER:1.2,BLOCK_CHANCE:.05,GOLD_DROP:5},multiplier:{HEALTH_MAX:1.6,HEALTH_REGEN:.1,DAMAGE:1.4,GOLD_DROP:1.5},IS_PLAYABLE_CHARACTER:!1,IS_ATTACKING:!1,IS_FRONT_OF_OPPONENT:!1,IS_ALIVE:!0,IS_RESPAWNING:!1,xPosReversed:0,portrait:document.getElementById("enemyPortrait"),image:document.getElementById("enemyImage"),frameState:{idle:["assets/combatzone/enemy/slime_idle_1.svg"],dead:"assets/combatzone/universal/gravestone.svg"},healthBar:document.getElementById("enemyHealthBar"),attackTimerBar:document.getElementById("enemyAttackBar")},T={ATTACK:{NAME:"ATTACK",COST:0,BASE_COST:5,BASE_POWER:2,COST_MULTIPLIER:1.6,POWER_MULTIPLIER:1.3,BOUGHT:0,DOM:document.getElementById("shopBtnAttack")},HEALTH:{NAME:"HEALTH",COST:0,BASE_COST:4,BASE_POWER:5,COST_MULTIPLIER:1.4,POWER_MULTIPLIER:1.25,BOUGHT:0,DOM:document.getElementById("shopBtnHealth")},HEALTH_REGEN:{NAME:"HEALTH REGENERATION",COST:0,BASE_COST:6,BASE_POWER:1,COST_MULTIPLIER:1.2,POWER_MULTIPLIER:.15,BOUGHT:0,DOM:document.getElementById("shopBtnHealthRegen")},ATTACK_SPEED:{NAME:"ATTACK SPEED",COST:0,BASE_COST:30,BASE_POWER:3,COST_MULTIPLIER:2.1,POWER_MULTIPLIER:.9,BOUGHT:0,DOM:document.getElementById("shopBtnAttackSpeed")},CRIT_CHANCE:{NAME:"CRIT CHANCE",COST:0,BASE_COST:6,BASE_POWER:.05,COST_MULTIPLIER:1.5,POWER_MULTIPLIER:.6,BOUGHT:1,DOM:document.getElementById("shopBtnCritChance")},CRIT_MULTIPLIER:{NAME:"CRIT MULTIPLIER",COST:0,BASE_COST:6,BASE_POWER:.1,COST_MULTIPLIER:1.1,POWER_MULTIPLIER:1.1,BOUGHT:0,DOM:document.getElementById("shopBtnCritMultiplier")},BLOCK_CHANCE:{NAME:"BLOCK CHANCE",COST:0,BASE_COST:6,BASE_POWER:.05,COST_MULTIPLIER:1.9,POWER_MULTIPLIER:1.04,BOUGHT:0,DOM:document.getElementById("shopBtnBlockChance")}},B=15;let K=0;const P=document.getElementById("textOutput"),Z=document.getElementById("canvas"),ae=document.getElementById("goldCount"),Ae=document.getElementById("dayNight"),S={red:183,green:255,blue:255},N={red:255,green:221,blue:138},M={red:44,green:47,blue:107};let C=183,c=255,d=255,L=0;const x=document.querySelectorAll(".btnMenu"),u=document.querySelectorAll(".menuFrame"),Le=document.getElementById("spnPoints"),le=document.getElementById("spnLevel"),Ce=document.getElementById("spnCurrentExp"),ce=document.getElementById("spnMaxExp"),j=document.getElementById("btnPrestige"),H=document.getElementById("prestigeUpgradeInfo"),de=document.getElementById("pSelectedPrestigeUpgradeName"),_e=document.getElementById("pSelectedPrestigeUpgradeDescription"),Re=document.getElementById("spnSelectedPrestigeUpgradeCost"),k=document.getElementById("divBuySelectedPrestigeUpgrade"),Ie=document.getElementsByClassName("btnPrestigeUpgrade"),Oe=document.getElementById("tickCounter"),He=document.getElementById("debugButton");function ee(e,E=0){return e?(E+=1,ee(Math.floor(e/10),E)):E}function ue(e){let E=ee(e);const i=96;let o=0;console.log(`Number: ${e}`);let s=e.toFixed();if(console.log(`Finalstring: ${s}, stringLength: ${E}`),E>=4){for(;E>=4;)o+=1,E-=3;const r=1e3**o;e/=r,console.log(e),e>100?s=Math.round(e).toString()+String.fromCharCode(i+o):e>10?s=e.toFixed(1)+String.fromCharCode(i+o):s=e.toFixed(2)+String.fromCharCode(i+o)}return s}function Pe(e){if(e.classList.contains("hidden")){for(let E=0;E<u.length;E+=1)u[E].classList.contains("hidden")||u[E].classList.add("hidden");e.classList.remove("hidden")}}function te(e,E,i){var h;const o=Math.random()*100-50,s=Math.random()*100-50,r=-120,R=-100,A=document.createElement("span");switch(A.classList.add("displayText"),i){case"crit":A.classList.add("displayTextCrit"),A.innerHTML+=`<ruby>${e} <rp>(</rp><rt>Crit!</rt><rp>)</rp></ruby>`;break;case"gold":A.classList.add("displayTextGold"),A.innerHTML=`+${e} Gold`;break;case"block":A.classList.add("displayTextBlock"),A.innerHTML+=`<ruby>${e} <rp>(</rp><rt>Block!</rt><rp>)</rp></ruby>`;break;default:A.innerHTML=e;break}const U=(h=E.image)==null?void 0:h.getBoundingClientRect();A.style.left=`${(U.left-r+o).toString()}px`,A.style.top=`${(U.top-R+s).toString()}px`,Z.appendChild(A);const b=A.animate([{transform:"translateY(0px)",opacity:"1"},{transform:"translateY(-100px)",opacity:"0"}],{duration:2500,iterations:1,easing:"ease-in-out"});b.play(),b.onfinish=()=>{A.remove()}}function G(e){e.statFrame!==void 0&&(e.statFrame.spnAttack.innerHTML=Math.round(e.DAMAGE).toFixed(0),e.statFrame.spnHealthMax.innerHTML=Math.round(e.HEALTH_MAX).toString(),e.statFrame.spnHealthRegen.innerHTML=e.HEALTH_REGEN.toFixed(1),e.statFrame.spnAttackSpeed.innerHTML=(B/e.ATTACK_COOLDOWN*10).toFixed(2),e.statFrame.spnCritChance.innerHTML=`${(e.CRIT_CHANCE*100).toFixed(2)}%`,e.statFrame.spnCritMultiplier.innerHTML=`${(e.CRIT_MULTIPLIER*100).toString()}%`,e.statFrame.spnBlockChance.innerHTML=`${(e.BLOCK_CHANCE*100).toFixed(2)}%`,e.statFrame.spnLevel.innerHTML=`${n.LEVEL}`)}function D(){ae.innerHTML=ue(t.GOLD)}function y(){Le.innerHTML=t.PRESTIGE_POINTS.toString(),le.innerHTML=t.PRESTIGE_LEVEL.toString(),Ce.innerHTML=t.PRESTIGE_EXP.toString(),ce.innerHTML=ie().toString()}function Ee(e){de.innerHTML=e.NAME,_e.innerHTML=e.DESCRIPTION,Re.innerHTML=(Number(e.BOUGHT)+1).toString()}function O(e,E=!1){const{healthBar:i}=e,o=e.HEALTH_MAX,s=e.HEALTH_CURRENT;i.value=s,E&&(i.max=o,i.low=o/3,i.high=o/2,i.optimum=o*.67)}function m(e,E=!1){e.attackTimerBar.value=e.ATTACK_TIMER,E&&(e.attackTimerBar.max=e.ATTACK_COOLDOWN)}function Se(e,E){P.innerHTML+=`<${E}><br>${e}<${E}>`,P.scrollTop=P.scrollHeight}function _(e){let E=e.BASE_POWER+e.BOUGHT*e.POWER_MULTIPLIER;return e.NAME===T.ATTACK_SPEED.NAME&&(E=e.BASE_POWER/(1+e.BOUGHT*e.POWER_MULTIPLIER)),(e.NAME===T.CRIT_CHANCE.NAME||e===T.BLOCK_CHANCE)&&(E=e.BASE_POWER+e.BOUGHT/1e3*e.POWER_MULTIPLIER),e===T.CRIT_MULTIPLIER&&(E=e.BASE_POWER+e.BOUGHT/100*e.POWER_MULTIPLIER),E>=1?Number(E.toFixed(0)):E>=.1?Number(E.toFixed(1)):E>=.01?Number(E.toFixed(2)):Number(E.toFixed(3))}function ne(e){return Math.round(e.BASE_COST+e.BASE_COST*e.COST_MULTIPLIER*e.BOUGHT)}function a(e){const E=ne(e);let i=_(e);if(e===T.BLOCK_CHANCE||e===T.CRIT_CHANCE){const o=`${i.toString()}%`;e.DOM.innerHTML=`${e.NAME}<br>${E} Gold<br>+ ${o}`}else if(e===T.ATTACK_SPEED)e.DOM.innerHTML=`${e.NAME}<br>${E} Gold<br>- ${i*15} ms`;else if(e===T.CRIT_MULTIPLIER){i*=100;const o=`${i.toString()}%`;e.DOM.innerHTML=`${e.NAME}<br>${E} Gold<br>+ ${o}`}else e.DOM.innerHTML=`${e.NAME}<br>${E} Gold<br>+ ${i}`}function Te(){t.DAMAGE=t.base.DAMAGE+_(T.ATTACK),t.HEALTH_MAX=t.base.HEALTH_MAX+_(T.HEALTH),t.HEALTH_REGEN=t.base.HEALTH_REGEN+_(T.HEALTH_REGEN),t.CRIT_CHANCE=t.base.CRIT_CHANCE+_(T.CRIT_CHANCE)/100,t.CRIT_MULTIPLIER=t.base.CRIT_MULTIPLIER+_(T.CRIT_MULTIPLIER),t.BLOCK_CHANCE=t.base.BLOCK_CHANCE+_(T.BLOCK_CHANCE),t.ATTACK_COOLDOWN=t.base.ATTACK_COOLDOWN-_(T.ATTACK_SPEED)}function Ne(){n.HEALTH_MAX=n.base.HEALTH_MAX+n.LEVEL*n.multiplier.HEALTH_MAX,n.DAMAGE=n.base.DAMAGE+n.LEVEL*n.multiplier.DAMAGE,n.GOLD_DROP=n.base.GOLD_DROP+n.LEVEL*n.multiplier.GOLD_DROP,n.HEALTH_REGEN=n.base.HEALTH_REGEN+n.LEVEL*n.multiplier.HEALTH_REGEN,n.BLOCK_CHANCE=n.base.BLOCK_CHANCE+n.LEVEL/1e3,O(n,!0)}function I(e){e.COST=ne(e),t.GOLD>=e.COST&&(t.GOLD-=e.COST,D(),a(e),Te(),G(t),e.BOUGHT+=1)}function ie(){return t.PRESTIGE_EXP_LEVELUP+t.PRESTIGE_EXP_LEVELUP*t.PRESTIGE_LEVEL*t.PRESTIGE_EXP_LEVELUP_MULTIPLIER}function se(){const e=ie();t.PRESTIGE_EXP>=e&&(t.PRESTIGE_LEVEL+=1,t.PRESTIGE_POINTS+=1,t.PRESTIGE_EXP-=e,se())}function Me(){const e=n.LEVEL-t.HIGHEST_LEVEL_PRESTIGED_AT;let E=0;console.log(`levels climbed${e}`),e>0?(t.HIGHEST_LEVEL_PRESTIGED_AT=t.HIGHEST_LEVEL_REACHED,E=e/2.5+n.LEVEL/80):E=n.LEVEL/80,t.PRESTIGE_EXP+=Math.round(E)}function fe(e){k.innerHTML="";const E=document.createElement("button");E.innerHTML="Purchase",k.appendChild(E),E.addEventListener("click",()=>{const i=Number(e.BOUGHT)+1;t.PRESTIGE_POINTS>=i&&(t.PRESTIGE_POINTS-=i,e.BOUGHT+=1,y(),Ee(e))})}function me(){H!=null&&H.classList.contains("hidden")&&H.classList.remove("hidden");const e=this.dataset.name;let E=t.prestige_upgrades.BONUS_DAMAGE;switch(e){case"BONUS_DAMAGE":E=t.prestige_upgrades.BONUS_DAMAGE;break;case"REDUCE_BLOCK":E=t.prestige_upgrades.REDUCE_BLOCK;break;case"LIFESTEAL":E=t.prestige_upgrades.LIFESTEAL;break;case"GOLD_MULTIPLIER":E=t.prestige_upgrades.GOLD_MULTIPLIER;break;case"SMITE":E=t.prestige_upgrades.REDUCE_BLOCK;break;case"BLOCK_PENETRATION":E=t.prestige_upgrades.BLOCK_PENETRATION;break;default:return}Ee(E),fe(E)}function ge(){a(T.ATTACK),a(T.HEALTH),a(T.HEALTH_REGEN),a(T.ATTACK_SPEED),a(T.CRIT_CHANCE),a(T.CRIT_MULTIPLIER),a(T.BLOCK_CHANCE)}function oe(){Te(),G(t),O(t),D(),m(t,!0),O(n),m(n,!0),y(),ge()}function g(e,E){e.IS_ALIVE&&E!=null?e.HEALTH_CURRENT+=E:!e.IS_ALIVE&&E!=null?e.HEALTH_CURRENT=E:e.HEALTH_CURRENT=e.HEALTH_MAX}function p(e){e.IS_RESPAWNING=!0,e.image.src!==e.frameState.dead&&(e.image.src=e.frameState.dead);const E=150;e.RESPAWN_TIMER+=1,e.RESPAWN_TIMER>=E&&(e.IS_PLAYABLE_CHARACTER===!1?(n.LEVEL+=1,!t.PRESTIGE_ENABLED&&n.LEVEL>=50&&(t.PRESTIGE_ENABLED=!0,j.disabled=!1),t.GOLD+=n.GOLD_DROP,te(n.GOLD_DROP.toString(),t,"gold"),D(),G(t),t.HIGHEST_LEVEL_REACHED<=n.LEVEL&&(t.HIGHEST_LEVEL_REACHED=n.LEVEL)):(n.LEVEL>10?n.LEVEL-=10:n.LEVEL=1,g(n)),Ne(),g(e),e.RESPAWN_TIMER=0,e.IS_ALIVE=!0,e.IS_RESPAWNING=!1,e.ATTACK_TIMER=0,e.image.src=e.frameState.idle[0],O(e))}function F(e){e.HEALTH_CURRENT<e.HEALTH_MAX&&(g(e,e.HEALTH_REGEN/(1e3/B)),O(e))}function pe(e){Math.floor(e.HEALTH_CURRENT)<=0&&(e.IS_ALIVE=!1,p(e))}function Be(e,E){let i=0;const o=Math.random();let s="normal";if(E.BLOCK_CHANCE>=o)s="block",i=e.DAMAGE*.2;else{const R=Math.random();e.CRIT_CHANCE>=R?(i=e.DAMAGE*e.CRIT_MULTIPLIER,s="crit"):i=e.DAMAGE}return[i,s]}function v(e,E){const i=Be(e,E);E.HEALTH_CURRENT-=i[0],e.ATTACK_TIMER=0,O(E),Se(`${e.NAME} attacks ${E.NAME} and deals ${i[0]} damage!`),te(i[0].toFixed(0),E,i[1]),pe(E)}function W(e,E){!e.IS_ALIVE||!E.IS_ALIVE||(e.ATTACK_TIMER+=1,m(e),e.ATTACK_TIMER>=e.ATTACK_COOLDOWN&&(e.IS_ATTACKING=!0))}function l(e,E,i=1){return e<E?e+=i:e>E&&(e-=i),e}function Ge(){L+=.1,L>=360&&(L=0),Ae.style.transform=`rotate(${L}deg)`,L>=300||L<=50?(C=l(C,S.red,.6),d=l(d,S.green,.6),c=l(c,S.blue,.6)):L<300&&L>250||L>50&&L<90?(C=l(C,N.red,.6),d=l(d,N.green,.6),c=l(c,N.blue,.6)):L>90&&L<250&&(C=l(C,M.red,.6),d=l(d,M.green,.6),c=l(c,M.blue,.6)),Z.style.backgroundColor=`rgb(${C},${d},${c})`}function $(e){e.IS_ATTACKING=!1,e.ATTACK_TIMER=0,e.CHARGE_TIMER=0}function De(){const o=t.portrait,s=n.portrait;t.IS_ATTACKING?(t.IS_FRONT_OF_OPPONENT||(t.xPos+=1,o.style.left=`${t.xPos}%`),t.xPos+n.xPosReversed>=50&&(t.IS_FRONT_OF_OPPONENT=!0),t.IS_FRONT_OF_OPPONENT&&(t.CHARGE_TIMER+=1),t.CHARGE_TIMER>=t.CHARGE_COOLDOWN&&(v(t,n),$(t),t.IS_FRONT_OF_OPPONENT=!1)):!t.IS_ATTACKING&&t.xPos>5&&(t.xPos-=1,o.style.left=`${t.xPos}%`),n.IS_ATTACKING?(n.IS_FRONT_OF_OPPONENT||(n.xPosReversed+=1,s.style.right=`${n.xPosReversed}%`),t.xPos+n.xPosReversed>=50&&(n.IS_FRONT_OF_OPPONENT=!0),n.IS_FRONT_OF_OPPONENT&&(n.CHARGE_TIMER+=1,n.CHARGE_TIMER>=n.CHARGE_COOLDOWN&&(v(n,t),$(n),n.IS_FRONT_OF_OPPONENT=!1))):!n.IS_ATTACKING&&n.xPosReversed>5&&(n.xPosReversed-=1,s.style.right=`${n.xPosReversed}%`),Ge()}He.addEventListener("click",()=>{console.log(t),console.log(n),console.log(T)});function ye(){const e=document.getElementById("degreeSpn");e.innerHTML=`${L.toFixed(1)}<br>red: ${C.toFixed(1)}<br>green: ${d.toFixed(1)}<br>blue: ${c.toFixed(1)}`}const Ue=document.getElementById("ticksPerSecond"),be=new Date;let V=be.getTime(),f=0;function he(){if(f+=1,f===100){const E=new Date().getTime(),i=1e3/((E-V)/100);Ue.innerHTML=i.toFixed(2),V=E,f=0}}function Ke(){t.DAMAGE=t.base.DAMAGE,t.HEALTH_MAX=t.base.HEALTH_MAX,t.HEALTH_CURRENT=t.base.HEALTH_MAX,t.HEALTH_REGEN=t.base.HEALTH_REGEN,t.ATTACK_COOLDOWN=t.base.ATTACK_COOLDOWN,t.ATTACK_TIMER=0,t.BLOCK_CHANCE=t.base.BLOCK_CHANCE,t.CRIT_CHANCE=t.base.CRIT_CHANCE,t.CRIT_MULTIPLIER=t.base.CRIT_MULTIPLIER,t.GOLD=t.base.GOLD,n.DAMAGE=n.base.DAMAGE,n.HEALTH_MAX=n.base.HEALTH_MAX,n.HEALTH_CURRENT=n.base.HEALTH_MAX,n.HEALTH_REGEN=n.base.HEALTH_REGEN,n.ATTACK_COOLDOWN=n.base.ATTACK_COOLDOWN,n.ATTACK_TIMER=0,n.BLOCK_CHANCE=n.base.BLOCK_CHANCE,n.CRIT_CHANCE=n.base.CRIT_CHANCE,n.CRIT_MULTIPLIER=n.base.CRIT_MULTIPLIER}function re(){K+=1,Oe.innerHTML=K.toString(),W(t,n),W(n,t),F(t),F(n),t.IS_RESPAWNING&&p(t),n.IS_RESPAWNING&&p(n),De(),he(),ye(),setTimeout(re,B)}var X;(X=T.ATTACK.DOM)==null||X.addEventListener("click",()=>{I(T.ATTACK),a(T.ATTACK)});var w;(w=T.HEALTH.DOM)==null||w.addEventListener("click",()=>{I(T.HEALTH),a(T.HEALTH)});var q;(q=T.HEALTH_REGEN.DOM)==null||q.addEventListener("click",()=>{I(T.HEALTH_REGEN),a(T.HEALTH_REGEN)});var z;(z=T.ATTACK_SPEED.DOM)==null||z.addEventListener("click",()=>{I(T.ATTACK_SPEED),a(T.ATTACK_SPEED)});var Y;(Y=T.CRIT_CHANCE.DOM)==null||Y.addEventListener("click",()=>{I(T.CRIT_CHANCE),a(T.CRIT_CHANCE)});var J;(J=T.CRIT_MULTIPLIER.DOM)==null||J.addEventListener("click",()=>{I(T.CRIT_MULTIPLIER),a(T.CRIT_MULTIPLIER)});var Q;(Q=T.BLOCK_CHANCE.DOM)==null||Q.addEventListener("click",()=>{I(T.BLOCK_CHANCE),a(T.BLOCK_CHANCE)});for(let e=0;e<x.length;e+=1)x[e].addEventListener("click",()=>{Pe(u[e])});j.addEventListener("click",()=>{console.log("prestige!"),Me(),se(),y(),Ke(),oe()});function xe(e){e.addEventListener("click",me)}Array.from(Ie).forEach(xe);oe();re();
