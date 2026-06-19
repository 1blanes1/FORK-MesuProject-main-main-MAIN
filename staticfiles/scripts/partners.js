function addPartnerCard(title, img_path, url) {
    const partnersWrapper = document.getElementById('partners-wrapper');
    if (!partnersWrapper) {
        console.error('Контейнер #partners-wrapper не найден!');
        return;
    }

    const link = document.createElement('a');
    link.href = url || '#';
    link.className = 'partner-link';
    link.style.textDecoration = 'none';
    link.target = '_blank';

    const card = document.createElement('div');
    card.className = 'organizer-card';
    
    // ВСЕ СТИЛИ КАРТОЧКИ включая закругление
    card.style.transition = 'all 0.3s ease';
    card.style.background = 'white';
    card.style.borderRadius = '30px';
    card.style.padding = '25px';
    card.style.textAlign = 'center';
    card.style.cursor = 'pointer';
    card.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)';
    
    card.onmouseenter = function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
        this.style.borderRadius = '30px';
        const img = this.querySelector('.organizer-logo');
        if (img) img.style.transform = 'scale(1.08)';
    };
    card.onmouseleave = function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)';
        this.style.borderRadius = '30px';
        const img = this.querySelector('.organizer-logo');
        if (img) img.style.transform = 'scale(1)';
    };

    const img = document.createElement('img');
    img.className = 'organizer-logo';
    img.src = img_path || '/static/partner_img/placeholder.png';
    img.alt = title || 'Логотип партнёра';
    img.style.transition = 'transform 0.3s ease';
    img.style.maxWidth = '150px';
    img.style.margin = '0 auto 15px';
    img.style.display = 'block';
    
    const titleEl = document.createElement('h3');
    titleEl.textContent = title || 'Без названия';
    titleEl.style.fontSize = '18px';
    titleEl.style.color = '#333';
    titleEl.style.margin = '0 0 10px 0';
    
    const descEl = document.createElement('p');
    descEl.textContent = 'Партнер проекта';
    descEl.style.color = '#666';
    descEl.style.margin = '0';
    
    card.appendChild(img);
    card.appendChild(titleEl);
    card.appendChild(descEl);
    link.appendChild(card);
    partnersWrapper.appendChild(link);
}

async function loadPartners() {
    try {
        const res = await fetch('/partners');
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        
        const partners = await res.json();
        console.log(`Загружено ${partners.length} партнёров`);
        
        const partnersWrapper = document.getElementById('partners-wrapper');
        if (partnersWrapper) {
            partnersWrapper.innerHTML = '';
            
            for (const partner of partners) {
                addPartnerCard(partner.title, partner.img_path, partner.url);
            }
            
            console.log('Все карточки добавлены с borderRadius 30px');
        }
        
    } catch (error) {
        console.error('Ошибка:', error);
        const partnersWrapper = document.getElementById('partners-wrapper');
        if (partnersWrapper && partnersWrapper.children.length === 0) {
            partnersWrapper.innerHTML = '<p style="text-align:center;padding:40px;color:#666;">Не удалось загрузить партнёров</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', loadPartners);