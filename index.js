import{a as w,S,i as s}from"./assets/vendor-DcHCnVjq.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&d(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const v="55987378-0f15016f4214d4089a58d5c81";async function u(r,t){return(await w.get("https://pixabay.com/api/",{params:{key:v,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}})).data}const f=document.querySelector(".gallery"),m=document.querySelector(".loader"),h=document.querySelector(".load-more"),q=new S(".gallery a",{captionsData:"alt",captionDelay:250});function y(r){const t=r.map(n=>`
      <li class="gallery-item">
        <a href="${n.largeImageURL}">
          <img
            src="${n.webformatURL}"
            alt="${n.tags}"
          />
        </a>

        <div class="info">
          <p><b>Likes</b> ${n.likes}</p>
          <p><b>Views</b> ${n.views}</p>
          <p><b>Comments</b> ${n.comments}</p>
          <p><b>Downloads</b> ${n.downloads}</p>
        </div>
      </li>
    `).join("");f.insertAdjacentHTML("beforeend",t),q.refresh()}function M(){f.innerHTML=""}function p(){m.classList.remove("hidden")}function g(){m.classList.add("hidden")}function P(){h.classList.remove("hidden")}function L(){h.classList.add("hidden")}const b=document.querySelector(".form"),$=document.querySelector(".load-more");let a=1,i="",l=0;b.addEventListener("submit",B);$.addEventListener("click",O);async function B(r){if(r.preventDefault(),i=r.target.elements["search-text"].value.trim(),!i){s.error({message:"Please fill in the field!"});return}a=1,M(),L(),p();try{const t=await u(i,a);if(l=t.totalHits,t.hits.length===0){s.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}y(t.hits),l>15&&P()}catch{s.error({message:"Something went wrong!"})}finally{g(),b.reset()}}async function O(){a+=1,p();try{const r=await u(i,a);y(r.hits);const t=Math.ceil(l/15);a>=t&&(L(),s.info({message:"We're sorry, but you've reached the end of search results."})),x()}catch{s.error({message:"Something went wrong!"})}finally{g()}}function x(){const r=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:r.height*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
