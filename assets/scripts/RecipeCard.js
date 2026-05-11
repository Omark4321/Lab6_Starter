// RecipeCard.js

class RecipeCard extends HTMLElement {
	constructor() {
		super();

		const shadow = this.attachShadow({ mode: 'open' });

		const article = document.createElement('article');
		const style = document.createElement('style');

		style.textContent = `
			* {
				font-family: sans-serif;
				margin: 0;
				padding: 0;
			}

			a {
				text-decoration: none;
			}

			a:hover {
				text-decoration: underline;
			}

			article {
				align-items: center;
				border: 1px solid rgb(223, 225, 229);
				border-radius: 8px;
				display: grid;
				grid-template-rows: 118px 56px 14px 18px 15px 36px;
				height: auto;
				row-gap: 5px;
				padding: 0 16px 16px 16px;
				width: 178px;
			}

			div.rating {
				align-items: center;
				column-gap: 5px;
				display: flex;
			}

			div.rating .stars {
				background: linear-gradient(90deg, #f5a623 var(--pct), #d3d3d3 var(--pct));
				-webkit-background-clip: text;
				background-clip: text;
				-webkit-text-fill-color: transparent;
				color: transparent;
				font-size: 14px;
				letter-spacing: 1px;
				line-height: 1;
			}

			div.rating .num,
			div.rating .count {
				color: #70757A;
				font-size: 12px;
			}

			article>img {
				border-top-left-radius: 8px;
				border-top-right-radius: 8px;
				height: 118px;
				object-fit: cover;
				margin-left: -16px;
				width: calc(100% + 32px);
			}

			p.ingredients {
				height: 32px;
				line-height: 16px;
				padding-top: 4px;
				overflow: hidden;
			}

			p.organization {
				color: black !important;
			}

			p.title {
				display: -webkit-box;
				font-size: 16px;
				height: 36px;
				line-height: 18px;
				overflow: hidden;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			p:not(.title),
			span,
			time {
				color: #70757A;
				font-size: 12px;
			}
		`;

		shadow.appendChild(style);
		shadow.appendChild(article);
	}

	set data(data) {
		if (!data) return;

		const article = this.shadowRoot.querySelector('article');

		const rating = Number(data.rating) || 0;
		const num = Number(data.numRatings) || 0;
		const pct = (rating / 5) * 100;
		const count = num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num;

		article.innerHTML = `
			<img src="${data.imgSrc}" alt="${data.imgAlt}">
			<p class="title">
				<a href="${data.titleLnk}">${data.titleTxt}</a>
			</p>
			<p class="organization">${data.organization}</p>
			<div class="rating">
				<span class="num">${rating.toFixed(1)}</span>
				<span class="stars" style="--pct: ${pct}%">★★★★★</span>
				<span class="count">(${count})</span>
			</div>
			<time>${data.lengthTime}</time>
			<p class="ingredients">${data.ingredients}</p>
		`;
	}
}

customElements.define('recipe-card', RecipeCard);
