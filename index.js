import{a as w,S as v,i}from"./assets/vendor-DcHCnVjq.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const S="55987378-0f15016f4214d4089a58d5c81";async function f(r,t){return(await w.get("https://pixabay.com/api/",{params:{key:S,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}})).data}const h=document.querySelector(".gallery"),p=document.querySelector(".loader"),m=document.querySelector(".load-more"),q=new v(".gallery a",{captionsData:"alt",captionDelay:250});function g(r){const t=r.map(o=>`
      <li class="gallery-item">
        <a href="${o.largeImageURL}">
          <img
            src="${o.webformatURL}"
            alt="${o.tags}"
          />
        </a>

        <div class="info">
          <p><b>Likes</b> ${o.likes}</p>
          <p><b>Views</b> ${o.views}</p>
          <p><b>Comments</b> ${o.comments}</p>
          <p><b>Downloads</b> ${o.downloads}</p>
        </div>
      </li>
    `).join("");h.insertAdjacentHTML("beforeend",t),q.refresh()}function P(){h.innerHTML=""}function y(){p.classList.remove("hidden")}function L(){p.classList.add("hidden")}function b(){m.classList.remove("hidden")}function l(){m.classList.add("hidden")}const u=document.querySelector(".form"),R=document.querySelector(".load-more");let n=1,c="";u.addEventListener("submit",async r=>{if(r.preventDefault(),c=r.currentTarget.elements["search-text"].value.trim(),!c){i.error({title:"Error",message:"Please fill in the field!",position:"topRight"});return}n=1,P(),l(),y();try{const t=await f(c,n);if(t.hits.length===0){i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}g(t.hits),t.totalHits<=15?(l(),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):b()}catch{i.error({title:"Error",message:"Something went wrong!",position:"topRight"})}finally{L(),u.reset()}});R.addEventListener("click",async()=>{l(),y(),n+=1;try{const r=await f(c,n);g(r.hits);const t=Math.ceil(r.totalHits/15);n>=t?(l(),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):b();const a=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:a*2,behavior:"smooth"})}catch{i.error({title:"Error",message:"Something went wrong!",position:"topRight"})}finally{L()}});
//# sourceMappingURL=index.js.map
